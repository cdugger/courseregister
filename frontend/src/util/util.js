const formatTime = (time) => {
    let hour = Number.parseInt(time.substring(0, time.indexOf(':')));
    let minute = time.substring(time.indexOf(':') + 1);
    if(hour > 12) {
        return `${hour-12}:${minute}PM`;
    } else {
        return `${hour}:${minute}AM`
    }
}

export { formatTime };