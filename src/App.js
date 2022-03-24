import WeekView from "./components/WeekView";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import ClassSearch from "./components/ClassSearch";

function App() {
  return (
    <div className="App">
      <Header />
      <ClassSearch />
      {/* <WeekView /> */}
    </div>
  );
}

export default App;
