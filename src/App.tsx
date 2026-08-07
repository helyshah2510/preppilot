import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup_login/Signup";
import Login from "./pages/signup_login/Login";
import Landing from "./pages/landing_1/Landing";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard/>}/>

      </Routes>
  );
}

export default App;