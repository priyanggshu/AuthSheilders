import {BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ThemeProvider from "./context/Theme_Context";
import OtpVerification from "./pages/OtpVerification";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/verify-otp' element={<OtpVerification />}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
