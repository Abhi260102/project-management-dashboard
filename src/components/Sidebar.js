"use client";
import { Avatar, Popover } from "antd";
import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from '@heroicons/react/solid'; // Import Heroicons

import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { NavElement, UserElement } from "./Store";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { getUserData } from "../redux/itemSlice";

const Sidebar = () => {
  const navigation = useNavigate()
  const location=useLocation()
  const useNavElement = NavElement((state) => state.value);
  const navChange = NavElement((state) => state.navChange);
  const userDetails = UserElement((state) => state.User);
  const setUserDetails = UserElement((state) => state.setUserData);
  const handleChange = (val) => {
    navChange(val);
  };

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  // Toggle dark/light mode


  useEffect(()=>{
   if(localStorage.getItem('userData')){
    setUserDetails(JSON.parse(localStorage.getItem('userData')))

   }
  },[])


  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);


  

  return (
    <>
      <div className={`sm:min-w-[260px] sm:flex sm:flex-col hidden sm:visible  flex-row items-center justify-center sm:h-screen  ${theme=='dark'?'bg-black border-r':'bg-neutral-200'} `}>
        <div className=" w-full sm:h-[50%]  flex  sm:flex-col   items-center p-2">
          <Avatar
            style={{
              backgroundColor: "grey",
              verticalAlign: "middle",
            }}
            size={64}
            icon={<UserOutlined />}
          />

          <p className={`${theme=='dark'?'text-white':'text-neutral-400'} text-xl pt-2 font-bold`}>

            {userDetails?.username}
          </p>
          <p className={` ${theme=='dark'?'text-white':'text-neutral-400'}  font-bold`}>Employee</p>
          <div className="flex items-center justify-center mt-4">
          <button
            onClick={()=>dispatch(toggleTheme())}
            className="bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-600 transition-colors flex items-center justify-center"
          >
            {theme!=='dark' ? (
              <SunIcon className="h-6 w-6 text-yellow-500" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-800" />
            )}
          </button>

        </div>
        </div>

      
        <div className="w-full flex sm:block">
          <div
            className={
              "w-full px-2 py-5  cursor-pointer " +
              (location?.pathname == "/dashboard"
                ? `   ${theme=='dark'?'text-black bg-white':'text-neutral-400 bg-[rgba(0,0,0,0.1)]'}  text-black font-bold`
                : "text-neutral-600")
            }
            onClick={() => { handleChange("project"); navigation('/dashboard') }}
          >
            Projects
          </div>
          <div
            className={
              "w-full px-2 py-5 cursor-pointer " +
              (location?.pathname ==  "/task"
                ? ` ${theme=='dark'?'text-black bg-white':'text-neutral-400 bg-[rgba(0,0,0,0.1)]'} font-bold`
                : "text-neutral-600")
            }
            onClick={() => { handleChange("task"); navigation('/task') }}
          >
            Task Manager
          </div>
          <div
            className="w-full text-center mt-10 text-2xl text-neutral-500 cursor-pointer hover:text-red-600"
            onClick={() => {
              setUserDetails({ username: "", password: "" });
                  localStorage.removeItem('userData')
                  dispatch(getUserData({}))
            }}
          >

            <LogoutOutlined /> LogOut
          </div>
        </div>
      </div>
      <div className=" sm:hidden  flex bg-neutral-200 ">
        <div className="flex items-center gap-2 p-2">
          <Popover
            title="Employee"
            content={
              <div div className="flex w-full justify-between">
                <p className="text-neutral-700 text-md font-bold">
                  {userDetails?.username}
                </p>
                <div
                  className="text-md text-neutral-500 cursor-pointer hover:text-red-600"
                  onClick={() => {
                    setUserDetails({ username: "", password: "" });
                  }}
                >
                  {" "}
                  <LogoutOutlined />
                </div>
              </div>
            }
          >
            <Avatar
              style={{
                backgroundColor: "grey",
                verticalAlign: "middle",
              }}
              size={34}
              icon={<UserOutlined />}
            />
          </Popover>

        </div>
        <div
          className={
            "w-full px-2 py-5  cursor-pointer " +
            (useNavElement == "project"
              ? "  bg-[rgba(0,0,0,0.1)]  text-black font-bold"
              : "text-neutral-600")
          }
          onClick={() => handleChange("project")}
        >
          Projects
        </div>
        <div
          className={
            "w-full px-2 py-5 cursor-pointer " +
            (useNavElement == "task"
              ? "  bg-[rgba(0,0,0,0.2)] text-black font-bold"
              : "text-neutral-600")
          }
          onClick={() => handleChange("task")}
        >
          Task Manager
        </div>
      </div>
    </>
  );
};

export default Sidebar;
