"use client";
import React, { useEffect, useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Modal,
  Input,
  Popover,
  DatePicker,
  Select,
} from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


import { UserOutlined, FormOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea.js";
import { ProjectElements } from "../../../components/Store.js";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";

function status(val) {
  if (val == 1) return <p className="text-green-600"> finished</p>;
  if (val == 2) return <p className="text-yellow-400"> onhold</p>;
  if (val == 3) return <p className="text-red-500"> abandoned</p>;
  if (val == 4) return <p className="text-blue-500"> in progress</p>;

}





function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const Project = () => {
  const navigate = useNavigate()
  const projectsData = ProjectElements((state) => state.ProjectData);
  const setPorjectData = ProjectElements((state) => state.setProjectData);
  const [modelOpen, setModelOpen] = useState(true);
  const user = useSelector(userData => userData?.users?.userData)
  useEffect(() => {
    if (!user?.username) navigate("/login");
  }, [user])


  const [popMemeberOpen, setPopMemeberOpen] = useState(false);
  const [popTaskOpen, setPopTaskOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState("");
  const [newMember, setNewMember] = useState("");
  const [optionAssignees, setoptionAssignees] = useState("");
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    assignees: [],
    Review_manager: "",
    Project_manager: "",
    deadline: "",
    status_code: 0,
    isCompleted: false,
  });
  const delete_project = (index) => {
    setPorjectData(
      projectsData.filter((e, i) => {
        return i != index;
      })
    );
  };

  const popContentMember = (
    <div>
      <p>
        <Input
          size="large"
          placeholder="Member Name"
          value={newMember}
          onChange={(e) =>setNewMember(e.target.value)}
          prefix={<UserOutlined />}
          suffix={
            <Button
              type="primary"
              onClick={() => {
                if(newMember){
                const NewAssignees = projectsData[modalIndex].assignees;
                NewAssignees.push(newMember);
                const newProjectData = [...projectsData];
                newProjectData[modalIndex] = {
                  ...newProjectData[modalIndex],
                  ["assignees"]: NewAssignees,
                };
                setPorjectData(newProjectData);
                setPopMemeberOpen(false);
                setNewMember('')
              }
              }}
            >
              Add
            </Button>
          }
        />
      </p>
    </div>
  );
  const popContentTask = (
    <div>
      <p className="flex flex-col gap-2">
        <Input
          size="large"
          placeholder="Name of Task"
          value={newTask.name}
          onChange={(e) =>
            setNewTask((prev) => ({
              ...prev,
              ["name"]: e.target.value,
              ["id"]: `${projectsData[modalIndex].tasks.length}`,
            }))
          }
          prefix={<FormOutlined />}
        />
        <TextArea
          rows={4}
          placeholder="Description"
          value={newTask.description}
          maxLength={100}
          onChange={(e) =>
            setNewTask((prev) => ({ ...prev, ["description"]: e.target.value }))
          }
        />
        <Input
          size="large"
          placeholder="Review Manager"
          value={newTask.Review_manager}
          onChange={(e) =>
            setNewTask((prev) => ({
              ...prev,
              ["Review_manager"]: e.target.value,
            }))
          }
          prefix={<UserOutlined />}
        />
        <Input
          size="large"
          placeholder="Project Manager"
          value={newTask.Project_manager}
          onChange={(e) =>
            setNewTask((prev) => ({
              ...prev,
              ["Project_manager"]: e.target.value,
            }))
          }
          prefix={<UserOutlined />}
        />

        <DatePicker
          onChange={(date, dateString) => {
            setNewTask((prev) => ({
              ...prev,
              ["deadline"]: dateString,
            }));
          }}
        />

        <Select
          mode="multiple"
          allowClear
          className="max-w-[250px]"
          defaultValue={projectsData[modalIndex]?.assignees[0]}
          placeholder="Assignees"
          onChange={(members) =>
            setNewTask((prev) => ({ ...prev, ["assignees"]: members }))
          }
          options={optionAssignees}
        />
        <Select
          className="max-w-[250px]"
          placeholder="Task Status "
          onChange={(status) =>
            setNewTask((prev) => ({ ...prev, ["status_code"]: status }))
          }
          options={[
            { value: "todo", label: "todo" },
            { value: "doing", label: "doing" },
            { value: "done", label: "done" },
            // { value: "backlog", label: "backlog" },
          ]}
        />

        <Button
          type="primary"
          onClick={() => {
            const NewTasks = projectsData[modalIndex].tasks;
            NewTasks.push(newTask);
            const newProjectData = [...projectsData];
            newProjectData[modalIndex] = {
              ...newProjectData[modalIndex],
              ["tasks"]: NewTasks,
            };
            setPorjectData(newProjectData);
            setPopTaskOpen(false);
            setNewTask({
              name: "",
              description: "",
              assignees: [],
              Review_manager: "",
              Project_manager: "",
              deadline: "",
              status_code: 0,
              isCompleted: false,
            });
          }}
        >
          Add
        </Button>
      </p>
    </div>
  );





  const TaskForm = ({ projectsData, modalIndex, setProjectData, setPopTaskOpen }) => {  
    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Task Name is required."),
      description:Yup.string().required("Description is required.")
      .max(100, "Description cannot exceed 100 characters."),
      Review_manager: Yup.string().required("Review Manager is required."),
      Project_manager: Yup.string().required("Project Manager is required."),
      deadline: Yup.string().required("Deadline is required."),
      assignees: Yup.array().min(1, "At least one assignee is required."),
      status_code: Yup.string().required("Task status is required."),
    });
  
    return (
      <Formik
        initialValues={{
          name: "",
          description: "",
          Review_manager: "",
          Project_manager: "",
          deadline: "",
          assignees: [],
          status_code: "",
          isCompleted: false,
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          const newTask = {
            ...values,
            id: `${projectsData[modalIndex].tasks.length}`,
          };
  
          const newProjectData = [...projectsData];
          newProjectData[modalIndex].tasks.push(newTask);
          setProjectData(newProjectData);
          setPopTaskOpen(false);
          resetForm();
        }}
      >
        {({ setFieldValue }) => (
          <Form className="flex flex-col gap-2">
            <div>
              <Field as={Input} size="large" name="name" placeholder="Name of Task" prefix={<FormOutlined />} />
              <ErrorMessage name="name" component="div" className="text-red-500" />
            </div>
  
            <div>
              <Field as={Input.TextArea} rows={4} name="description" placeholder="Description" maxLength={100} />
              <ErrorMessage name="description" component="div" className="text-red-500" />
            </div>
  
            <div>
              <Field as={Input} size="large" name="Review_manager" placeholder="Review Manager" prefix={<UserOutlined />} />
              <ErrorMessage name="Review_manager" component="div" className="text-red-500" />
            </div>
  
            <div>
              <Field as={Input} size="large" name="Project_manager" placeholder="Project Manager" prefix={<UserOutlined />} />
              <ErrorMessage name="Project_manager" component="div" className="text-red-500" />
            </div>
  
              <DatePicker
                onChange={(date, dateString) => setFieldValue("deadline", dateString)}
                placeholder="Select Deadline"
              />
              <ErrorMessage name="deadline" component="div" className="text-red-500" />
  
              <Select
                mode="multiple"
                allowClear
                className="max-w-[250px]"
                placeholder="Assignees"
                onChange={(members) => setFieldValue("assignees", members)}
                options={optionAssignees}
              />
              <ErrorMessage name="assignees" component="div" className="text-red-500" />
  
              <Select
                className="max-w-[250px]"
                placeholder="Task Status"
                onChange={(status) => setFieldValue("status_code", status)}
                options={[
                  { value: "todo", label: "To Do" },
                  { value: "doing", label: "Doing" },
                  { value: "done", label: "Done" },
                ]}
              />
              <ErrorMessage name="status_code" component="div" className="text-red-500" />
  
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form>
        )}
      </Formik>
    );
  };



  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className={`h-screen overflow-y-scroll overflow-x-hidden min-w-[70%]  w-full  ${theme == 'dark' ? 'bg-black' : 'bg-white'}  `}>
      <p className={`p-10 font-bold text-4xl  ${theme == 'dark' ? 'text-white' : 'text-slate-800'}   `}>
        <RightOutlined /> Projects
      </p>
      <div className="flex m-auto  flex-wrap w-[80%]">
        {projectsData?.map((e, index) => {
          return (
            <>
              <div
                key={index}
                className="bg-[rgba(0,0,0,0.2)] m-4 h-fit rounded "
              >
                <img
                  src={e.project_Img}

                  className="p-2 h-[250px] w-[300px]"
                />
                <div className="flex justify-between px-4">
                  <p className="text-neutral-800 font-sherif  ">
                    {" "}
                    {e.projectName}
                  </p>
                  {status(e.status_code)}
                </div>
                <div className="buttons justify-around flex py-4">
                  <Button
                    type="primary"
                    className="font-bold"
                    onClick={() => {
                      setModalIndex(index);
                      setModelOpen(true);

                    }}
                  >
                    View
                  </Button>
                 {user?.userType=='admin'&& <Link
                    to={`/dashboard/project-setting/${e.project_code}`}
                    className="px-4 flex items-center rounded  bg-yellow-300 text-orange-500 font-bold hover:brightness-110"
                  >
                    Edit
                  </Link>}
                  {user?.userType=='admin'&&<Button
                    className="bg-red-500 text-slate-800 font-bold"
                    type="primary"
                    onClick={() => delete_project(index)}
                    danger
                  >
                    Delete
                  </Button>}
                </div>
              </div>
              {modalIndex === index && (
                <Modal
                  title="Project Details"
                  open={modelOpen}
                  onOk={() => {
                    setModelOpen(false);
                  }}
                  onCancel={() => {
                    setModelOpen(false);
                  }}
                  footer={[
                    <Button key={"back"} onClick={() => setModelOpen(false)}>
                      Close
                    </Button>,
                    user?.userType=='admin'&& <Link
                    onClick={()=>{setModelOpen(false)}}
                      href="/dashboard"
                      className="p-2 px-4 m-2 rounded-md  bg-yellow-300 text-orange-500 font-bold"
                    >
                      Edit
                    </Link>,
                  ]}
                >
                  <div>
                    <img
                      src={e.project_Img}
                      height={"400px"}
                      width={"100%"}
                      className="p-4"
                    />
                    <div className="flex justify-between">
                      <p>
                        <span className="font-bold text-sm mr-2"> Name:</span>
                        <span className=" font-semibold text-blue-400">
                          {e.projectName}
                        </span>
                      </p>
                      <p className="bg-slate-200 p-1 px-2 rounded-xl">

                        {status(e.status)}
                      </p>
                    </div>

                    <p>
                      <span className="font-bold text-sm mr-2" abbr="hello">
                        Team Lead:
                      </span>{" "}
                      <abbr title={`${e.team_lead}`} className="cursor-pointer">
                        <Avatar
                          size={27}
                          style={{
                            backgroundColor: `${getRandomColor()}`,
                            color: `white`,
                          }}
                        >
                          {e.team_lead.charAt(0)}{" "}
                        </Avatar>{" "}
                      </abbr>
                    </p>
                    <div className="flex justify-between">
                      <p>
                        <span className="font-bold text-sm mr-2">
                          Created At:
                        </span>
                        {e.created_at}
                      </p>
                      <p>
                        <span className="font-bold text-sm mr-2">
                          Deadline:
                        </span>
                        <span className="text-red-500 font-bold">
                          {e.deadline}
                        </span>
                      </p>
                    </div>
                    <p className="py-2">
                      <span className="font-bold text-sm mr-2">Tasks: </span>
                      <div className="flex gap-2 flex-wrap">
                        {e.tasks.map((t, index) => (
                          <>
                            <span
                              key={index}
                              className=" p-1 bg-orange-200 rounded-lg mx-1 text-orange-500  text-nowrap"
                            >
                              {t.name}
                            </span>
                          </>
                        ))}{" "}
                        {user?.userType=='admin'&& <Popover
                          open={popTaskOpen}
                          // content={popContentTask}

                          content={<TaskForm projectsData={projectsData} modalIndex={modalIndex} setProjectData={setPorjectData} setPopTaskOpen={setPopTaskOpen} />}

                          title="Add new Task:"
                          trigger="click"
                          onOpenChange={(e) => {
                            let optionValues = [];
                            projectsData[modalIndex].assignees.map((member) => {
                              optionValues.push({
                                value: member,
                                label: member,
                              });
                            });
                            setoptionAssignees(optionValues);
                            setPopTaskOpen(e);
                          }}
                        >
                          <span className="h-[20px] w-[20px] rounded-full bg-blue-200 cursor-pointer flex justify-center items-center text-xl pb-1 text-white self-center justify-self-end">
                            +
                          </span>
                        </Popover>}
                      </div>
                    </p>
                    <p>
                      <span className="font-bold text-sm mr-2">
                        Assignees :
                      </span>
                      <div className="flex w-full justify-between items-center">
                        <Avatar.Group>
                          {e.assignees.map((member, index) => (
                            <abbr
                              key={index}
                              title={`${member}`}
                              className="cursor-pointer"
                            >
                              <Avatar
                                size={27}
                                style={{
                                  backgroundColor: `${getRandomColor()}`,
                                  color: `white`,
                                }}
                              >
                                {member.charAt(0)}{" "}
                              </Avatar>{" "}
                            </abbr>
                          ))}
                        </Avatar.Group>
                        {user?.userType=='admin'&& <Popover
                          open={popMemeberOpen}
                          content={popContentMember}
                          title="Enter Member Name:"
                          trigger="click"
                          onOpenChange={(e) => {
                            setPopMemeberOpen(e);
                          }}
                        >
                          <span className="h-[20px] w-[20px] rounded-full bg-blue-200 cursor-pointer flex justify-center items-center text-xl pb-1 text-white">
                            +
                          </span>
                        </Popover>}
                      </div>
                    </p>
                  </div>
                </Modal>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Project;
