import { StrictMode } from "react";
import Home from "../Pages/Home";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Detail from "../Pages/Detail";

function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/detail" element={<Detail/>}/>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
}

export default App;
