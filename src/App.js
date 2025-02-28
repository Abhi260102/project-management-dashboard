import './App.css';
import LoginPage from './app/loginPage/page';
import ProjectSetting from './app/dashboard/Projects/ProjectSettings/layout';
import Project from './app/dashboard/layout';
import Task from './app/dashboard/Tasks/layout';
import "react-quill/dist/quill.snow.css";
import "chartjs-adapter-date-fns";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useEffect } from 'react';
function App() {

  useEffect(() => {
    if (window?.location?.pathname == '/') {
      window.location.href = '/login'
    }
  }, [])


  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Project />} />
          <Route path="/task" element={<Task />} />
          <Route path="/dashboard/project-setting/:id" element={<ProjectSetting />} />

        </Routes>
      </Router>

    </>
  );
}

export default App;
