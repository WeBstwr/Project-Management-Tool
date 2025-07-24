import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./assets/globals.css";
import Home from "./pages/Home/Home.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <div className="main-content-with-header">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
