"use client";
import { useNavigate } from "react-router";
import Sidebar from "../../../components/Sidebar";
import { UserElement } from "../../../components/Store";
import Tasks from "./Task";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function RootLayout({ }) {
 

    return (
        <div className="sm:flex">
            <Sidebar />
            <Tasks />
        </div>
    );
}
