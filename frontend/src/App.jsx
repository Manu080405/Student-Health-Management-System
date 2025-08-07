import { Routes, Route } from "react-router-dom";
import './App.css';
import ContactPage from "./pages/ContactPage";
import StudentGridPage from "./pages/StudentGridPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Homepage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/students" element={<StudentGridPage />} />
      </Routes>
    </>
  );
}

export default App;
