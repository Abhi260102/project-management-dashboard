"use client";
import { useNavigate } from "react-router";
import Sidebar from "../../components/Sidebar";
import { UserElement } from "../../components/Store";
import Projects from "./Projects";

export default function RootLayout({ }) {
  return (
    <div className="sm:flex">
      <Sidebar />
      <Projects />
    </div>
  );
}
