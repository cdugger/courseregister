// import WeekView from "./components/WeekView";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
// import ClassSearch from "./components/ClassSearch";
import SearchItem from "./components/SearchItem";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <ClassSearch /> */}
      <SearchItem course="CSC 330 - Program Design and Development" crn="2001" times="10:00 AM - 10:30 AM" days="M-W" units="4" instructor="C. Dugger" prereqs={['CSC 127B', 'CSC 227', 'CSC 318']} />

    </div>
  );
}

export default App;
