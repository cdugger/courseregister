import json
import re
from string import ascii_uppercase
from random import choice, sample
import requests
from bs4 import BeautifulSoup


"""
The major code is always surrounded by parathesis
Ex: Computer Science (C SC)

Some major codes have whitespace in them i.e C SC. This wouldn't be a problem if the whitespace was used consistently when a major code is referenced in the prereq section of the course descriptions.
Unfortunately, its usage isn't consistent. Therefore we're better off simply removing any whitespace in the major code before its encoded to JSON.
"""


def main():
    with open("ua_catalog.html") as f:
        soup = BeautifulSoup(f, "html.parser")

    last_names = get_names("last-names.txt")
    crns = sample(range(0, 10000), 10000)
    course_catalog = []
    meta = []
    subjects = soup.find_all("li")
    for subject in subjects:
        text = subject.a.getText()  # ex: Computer Science (CSC)
        subject_name = text[: text.find("(") - 1] # Computer Science
        subject_code = text[text.find("(") + 1 : text.find(")")].replace(" ", "").strip() # CSC
        subject_data = {
            "subject": subject_name,
            "code": subject_code,
            "courses": get_courses(subject.a["href"], subject_code, last_names, crns),
        }
        course_catalog.append(subject_data)
        meta.append({"subject": subject_name, "code": subject_code})
    with open("out.json", "w") as f:
        f.write(json.dumps(course_catalog, indent=4))

    with open("meta.json", "w") as f:
        f.write(json.dumps(meta, indent=4))


"""
Get last names for a text file and return them as a list
"""


def get_names(fname):
    result = []
    with open(fname) as f:
        for name in f.readlines():
            result.append(name.strip())

    return result


"""
Match semester and units: ( I )|(II)|(\([1-9]\))
Match Prereqs: (P,[^.]+)
"""


def get_courses(href, subject_code, last_names, crns):
    result = []
    try:
        r = requests.get(href)
        soup = BeautifulSoup(r.content, "html.parser")
        r.close()
        course_info = soup.find_all("p")
        for p in course_info:
            if p.b and p.b.a:
                desc = p.getText()
                number = p.b.a.getText().replace(".", "")
                time_info = create_meeting_dates()
                result.append(
                    {
                        "subject": subject_code,
                        "title": clean_text(
                            p.b.getText()[p.b.getText().find(" ") + 1 :]
                        ),
                        "number": number,
                        "crn": choice(crns),
                        "description": desc,
                        "instructor": create_instructor(last_names),
                        "days": time_info["days"],
                        "timeStart": time_info["timeStart"],
                        "timeEnd": time_info["timeEnd"], 
                        "component": get_component(number),
                        "attributes": get_attributes(number, desc),
                        "units": get_units(desc),
                        "terms": get_terms(desc),
                        "prerequisites": get_prereqs(desc),
                    }
                )

    except requests.ConnectionError as e:
        print(f"Unable to get page: {href}")
        return result

    return result


"""
Make up a meeting date for a course
There are three options for meeting days:
Option 1: MonWed
Option 2: TueThu
Option 3: MonTueWedThuFri
"""
def create_meeting_dates():
    option = choice([1,2,3])
    start_hour = choice(list(range(8,21)))
    rand_start_time = f'{start_hour}:{choice(["00","30"])}' # 8am-9pm
    end = choice([60, 90]) # an hour or an hour and 30 mins
    end_time = f'{(start_hour%25)+1}:00' if end == 60 else f'{(start_hour%25)+1}:30'
    if option == 1:
        return {"days": "MonWed", "timeStart": rand_start_time, "timeEnd": end_time}
    elif option == 2:
        return {"days": "TueThu", "timeStart": rand_start_time, "timeEnd": end_time}
    elif option == 3:
        return {"days": "MonTueWedThuFri", "timeStart": rand_start_time, "timeEnd": end_time}

"""

"""
def create_instructor(last_names):
    return choice(ascii_uppercase) + ". " + choice(last_names)


"""
Seminar: 96
Ind. Study: 99
Colloquium: 95
Workshop: 97
Practicum: 94

Course component can by found by reading the last two digits of a course number
"""


def get_component(course_number):
    components = {
        "94": "Practicum",
        "95": "Colloquium",
        "96": "Seminar",
        "97": "Workshop",
        "99": "Independent Study",
    }

    code = course_number[1:3]

    return components[code] if code in components else None


"""
H after course number is honors.
Field Trip an Writing Emphasis are found in the course description
"""


def get_attributes(course_number, course_description):
    result = []
    if course_number[-1] == "H":
        result.append("Honors")
    if "Field Trip" in course_description:
        result.append("Field Trip")
    if "Writing Emphasis" in course_description:
        result.append("Writing Emphasis")

    return result


"""
Get the number of units from a courses description.
They are always surrounded by paranthesis and come after the course title
"""


def get_units(course_description):
    units = re.findall("(?<=\()[0-9]-?[0-9]?", course_description)
    if units:
        return units[0]
    else:
        return choice(range(1,4))


"""
I = Fall, II = Spring, S, = Summer
"""


def get_terms(course_description):
    result = []
    m = re.findall(" I |II", course_description)
    if " I " in m:
        result.append("Fall")
    if "II" in m:
        result.append("Spring")

    return result


"""
  P, C SC 330, C SC 342, C SC 344.

  The codes for all courses are 4 characters. This includes spaces between letters.
  ([A-Z ]{3,6})([0-9]{3}[A-Z]?)
  The above regex will extract all courses found in a string. The first group is the course and the second group is the course number 
"""


def get_prereqs(course_description):
    result = []
    prereqs_str = re.findall("(?<=P,)[^.]+", clean_text(course_description))
    if prereqs_str:
        for match in re.finditer("([A-Z ]{3,6})([0-9]{3}[A-Z]?)", prereqs_str[0]):
            if len(match.groups()) == 2:
                # remove whitespace in major code
                major_code = match.groups()[0].replace(" ", "")
                course_number = match.groups()[1].replace(" ", "")
                result.append(major_code + " " + course_number)

    return result


def clean_text(s):
    return s.replace("\r\n", "").strip()


if __name__ == "__main__":
    main()
