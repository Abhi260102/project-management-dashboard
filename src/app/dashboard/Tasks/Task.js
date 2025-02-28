"use client";
import React, { useEffect, useState } from "react";
import {  RightOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { ProjectElements } from "../../../components/Store.js";
import CardContainer from "../../../components/CardContainer.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Task = () => {
  const projectsData = ProjectElements((state) => state.ProjectData);
  const [cards, setCards] = useState({});

  const [Projects, SetProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(0);
  useEffect(() => {
    let ProjectsArray = [];

    projectsData.map((e, index) =>
      ProjectsArray.push({ label: e?.projectName, value: index })
    );
    SetProjects(ProjectsArray);
    setCards(projectsData?.[0]?.tasks);
  }, []);
  const theme = useSelector((state) => state.theme.theme);


  const router = useNavigate();
  const user = useSelector(userData => userData?.users?.userData)
  useEffect(() => {
      if (!user?.username) router("/login");
  }, [user])


  return (
    <div className={`w-full ${theme=='dark'?'bg-black':'bg-white'} text-black h-screen `}>
      <p className={`p-10 font-bold text-4xl   ${theme=='dark'?'text-white':'text-slate-800'} `}>
        <RightOutlined /> Task Manager
      </p>
      <p className={` px-10 text-md ${theme=='dark'?'text-white':''} font-bold`}>
        Select a Project:
        <Select
          placeholder="select project"
          className="mx-2"
          defaultValue={projectsData?.[0]?.projectName}
          options={Projects}
          onChange={(value) => {
            setSelectedProject(value);
            setCards(projectsData?.[value]?.tasks);
          }}
        />
      </p>
      <div className=" sm:h-[78%] w-full ">
        <div className="flex h-full w-full gap-3 overflow-x-scroll p-12 ">
          <CardContainer
            cards={cards}
            setCards={setCards}
            selectedProjectIndex={selectedProject}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
