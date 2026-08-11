import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/signup_login/Signup";
import Login from "./pages/signup_login/Login";
import Landing from "./pages/landing_1/Landing";
import Dashboard from "./pages/dashboard/Dashboard";
import MockInterview from "./pages/MockInterview/MockInterview";
import ActiveInterview from "./pages/MockInterview/ActiveInterview/ActiveInterview";
import InterviewResult from "./pages/MockInterview/ActiveInterview/InterviewResult";
import ResumeAnalyzer from "./pages/ResumeAnalyzer/ResumeAnalyzer";
import DSAPractice from "./pages/DSA/DSAprac";
import LearningRoadmap from "./pages/Roadmap/LearningRoadmap";
import Progress from "./pages/progress/Progress";
import DSAQues from "./pages/DSA/DSAQues";

function App() {
  return (
      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/mock-interview" element={<MockInterview/>}/>
        <Route path="/mock-interview/session" element={<ActiveInterview/>}/>
        <Route path="/mock-interview/result" element={<InterviewResult/>}/>
        <Route path="/resume-analyzer" element={<ResumeAnalyzer/>}/>
        <Route path="/dsa-practice" element={<DSAPractice/>}/>
        <Route path="/learning-roadmap" element={<LearningRoadmap/>}/>
        <Route path="/progress" element={<Progress/>}/>
        <Route path="/dsa-question/:topic/:difficulty" element={<DSAQues/>}/>

      </Routes>
  );
}

export default App;