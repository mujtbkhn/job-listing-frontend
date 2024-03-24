import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/LoginPage";
import Register from "./pages/RegisterPage/RegisterPage";
import Home from "./components/Home/Home";
import JobPostPage from "./pages/JobPostPage/JobPostPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job-post" element={<JobPostPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
