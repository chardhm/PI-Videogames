import "./App.css";
import { Link } from "react-router-dom";
import imgBg from "./img/1 (1).jpg";

function App() {
  return (
    <div className="App">
       <Link to="/Inicio">Press Start!</Link>
       <div className="imgBg">
         <img src={imgBg} alt="" />
       </div>
    </div>
  );
}

export default App;