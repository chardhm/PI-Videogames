import "./App.css";
import { Link } from "react-router-dom";
import css from './App.css'

function App() {
  return (
    <div className="landing">
      <div className="buttonCont">
       <Link to="/home">
         <button className="buttonLanding">Insert Coin to Enter</button>
       </Link>
      </div>
    </div>
  );
}

export default App;