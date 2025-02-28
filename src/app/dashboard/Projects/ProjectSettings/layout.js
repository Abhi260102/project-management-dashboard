"use client";
import { useNavigate } from "react-router";
import Sidebar from "../../../../components/Sidebar";
import { UserElement } from "../../../../components/Store";
import ProjectSetting from "../ProjectSettings/ProjectSetting";

export default function RootLayout({ }) {
  

    return (
        <div className="sm:flex">
            <Sidebar />
            <ProjectSetting />
        </div>
    );
}
