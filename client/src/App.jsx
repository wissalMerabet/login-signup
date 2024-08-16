import Styles from './App.module.css';
import { Login } from './componentes/Login/Login';
import { Signup } from './componentes/SignUp/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";


export default function App() {
  return (
    <div className={Styles.App}>
      <BrowserRouter>
      <Routes>

          <Route path="/" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}


