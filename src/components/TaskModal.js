import { Button, DatePicker, Input, Popover, Select,Form } from "antd";
import React, { useEffect, useState } from "react";
import { UserOutlined, FormOutlined } from "@ant-design/icons";
import { ProjectElements } from "./Store";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
const TaskModal = ({
  taskDetails,
  selectedProjectIndex,
  column,
  id,
  setCards,
  height,
}) => {


  const projectsData = ProjectElements((state) => state.ProjectData);
  const setProjectData = ProjectElements((state) => state.setProjectData);

  const [ModifyTask, setModifyTask] = useState(
    taskDetails || {
      name: "",
      description: "",
      assignees: [],
      Review_manager: "",
      Project_manager: "",
      deadline: new Date().toUTCString(),
      status_code: column,
      isCompleted: false,
      id: projectsData?.[selectedProjectIndex]?.tasks?.length + 1,
    }
  );

  useEffect(()=>{
    if(taskDetails)setModifyTask(taskDetails)

  },[taskDetails])

  const [optionAssignees, setoptionAssignees] = useState("");
  const [popOpen, setpopOpen] = useState(false);
  // const popContentTask = (
  //   <div>
  //     <p className="flex flex-col gap-2">
  //       <Input
  //         size="large"
  //         placeholder="Name of Task"
  //         value={ModifyTask.name}
  //         onChange={(e) =>
  //           setModifyTask((prev) => ({
  //             ...prev,
  //             ["name"]: e.target.value,
  //             ["id"]: `${ModifyTask.id}`,
  //           }))
  //         }
  //         prefix={<FormOutlined />}
  //       />

  //       <TextArea
  //         rows={4}
  //         placeholder="Description"
  //         value={ModifyTask.description}
  //         maxLength={100}
  //         onChange={(e) =>
  //           setModifyTask((prev) => ({
  //             ...prev,
  //             ["description"]: e.target.value,
  //           }))
  //         }
  //       />

       

  //       <Input
  //         size="large"
  //         placeholder="Review Manager"
  //         value={ModifyTask.Review_manager}
  //         onChange={(e) =>
  //           setModifyTask((prev) => ({
  //             ...prev,
  //             ["Review_manager"]: e.target.value,
  //           }))
  //         }
  //         prefix={<UserOutlined />}
  //       />
  //       <Input
  //         size="large"
  //         placeholder="Project Manager"
  //         value={ModifyTask.Project_manager}
  //         onChange={(e) =>
  //           setModifyTask((prev) => ({
  //             ...prev,
  //             ["Project_manager"]: e.target.value,
  //           }))
  //         }
  //         prefix={<UserOutlined />}
  //       />
  //       <DatePicker
  //         defaultValue={dayjs(ModifyTask.deadline, "YYYY-MM-DD")}
  //         format={"YYYY-MM-DD"}
  //         onChange={(date, dateString) => {
  //           setModifyTask((prev) => ({
  //             ...prev,
  //             ["deadline"]: dateString,
  //           }));
  //         }}
  //       />
  //       <Select
  //         mode="multiple"
  //         allowClear
  //         className="max-w-[250px]"
  //         defaultValue={ModifyTask.assignees}
  //         placeholder="Assignees"
  //         onChange={(members) =>
  //           setModifyTask((prev) => ({ ...prev, ["assignees"]: members }))
  //         }
  //         options={optionAssignees}
  //       />
  //       <Select
  //         className="max-w-[250px]"
  //         placeholder="Task Status "
  //         defaultValue={column}
  //         onChange={(status) =>
  //           setModifyTask((prev) => ({ ...prev, ["status_code"]: status }))
  //         }
  //         options={[
  //           { value: "todo", label: "todo" },
  //           { value: "doing", label: "doing" },
  //           { value: "done", label: "done" },
  //         ]}
  //       />
  //       <Button
  //         type="primary"
  //         // onClick={(e) => {
  //         //   const newProjectData = [...projectsData];
  //         //   {
  //         //     id !== "-1"
  //         //       ? (newProjectData[selectedProjectIndex].tasks = newProjectData[
  //         //         selectedProjectIndex
  //         //       ].tasks.map((task) => {
  //         //         if (task.id === id) {
  //         //           return ModifyTask;
  //         //         }
  //         //         return task;
  //         //       }))
  //         //       : newProjectData[selectedProjectIndex]?.tasks?.push(ModifyTask);
  //         //   }

  //         //   setProjectData(newProjectData);

  //         //   setCards(newProjectData[selectedProjectIndex]?.tasks);
  //         //   setpopOpen(!popOpen);
  //         // }}
  //       >
  //         {id === "-1" ? "Add" : "Update"}
  //       </Button>
  //       <Button onClick={() => setpopOpen(!popOpen)}>{popOpen} Close</Button>
  //     </p>
  //   </div>
  //   // <></>
  // );


  const TaskForm = ({  }) => {
    const validationSchema = Yup.object({
      name: Yup.string().required("Task name is required."),
      description:Yup.string().required("Description is required.")
      .max(100, "Description cannot exceed 100 characters."),
      Review_manager: Yup.string().required("Review manager is required."),
      Project_manager: Yup.string().required("Project manager is required."),
      deadline: Yup.date().required("Deadline is required."),
      assignees: Yup.array().min(1, "At least one assignee is required."),
      status_code: Yup.string().required("Status is required."),
    });
  
    const formik = useFormik({
      initialValues: {
        name: ModifyTask?.name || "",
        description: ModifyTask?.description || "",
        Review_manager: ModifyTask?.Review_manager || "",
        Project_manager: ModifyTask?.Project_manager || "",
        deadline: ModifyTask?.deadline ? dayjs(ModifyTask.deadline).format("YYYY-MM-DD") : "",
        assignees: ModifyTask?.assignees || [],
        status_code: column || "todo",
      },
      validationSchema,
      onSubmit: (values) => {
        const newProjectData = [...projectsData];
  
        if (id !== "-1") {
          newProjectData[selectedProjectIndex].tasks = newProjectData[selectedProjectIndex].tasks.map((task) =>
            task.id === id ? {...task, ...values, id } : task
          );
        } else {
          newProjectData[selectedProjectIndex]?.tasks?.push({ ...values, id: `${Date.now()}` });
        }
  
        setProjectData(newProjectData);
        setCards(newProjectData[selectedProjectIndex]?.tasks);
        setpopOpen(!popOpen);
      },
    });
  
    return (
      <Form onFinish={formik.handleSubmit} className="flex flex-col gap-2">
        <Input
          size="large"
          placeholder="Name of Task"
          {...formik.getFieldProps("name")}
          prefix={<FormOutlined />}
        />
        {formik.touched.name && formik.errors.name ? <div className="text-red-500">{formik.errors.name}</div> : null}
  
        <Input.TextArea
          rows={4}
          placeholder="Description"
          {...formik.getFieldProps("description")}
          maxLength={100}
        />

        {formik.touched.description && formik.errors.description ? <div className="text-red-500">{formik.errors.description}</div> : null}
  
        <Input
          size="large"
          placeholder="Review Manager"
          {...formik.getFieldProps("Review_manager")}
          prefix={<UserOutlined />}
        />
        {formik.touched.Review_manager && formik.errors.Review_manager ? (
          <div className="text-red-500">{formik.errors.Review_manager}</div>
        ) : null}
  
        <Input
          size="large"
          placeholder="Project Manager"
          {...formik.getFieldProps("Project_manager")}
          prefix={<UserOutlined />}
        />
        {formik.touched.Project_manager && formik.errors.Project_manager ? (
          <div className="text-red-500">{formik.errors.Project_manager}</div>
        ) : null}
  
        <DatePicker
          format={"YYYY-MM-DD"}
          value={formik.values.deadline ? dayjs(formik.values.deadline, "YYYY-MM-DD") : null}
          onChange={(date, dateString) => formik.setFieldValue("deadline", dateString)}
        />
        {formik.touched.deadline && formik.errors.deadline ? <div className="text-red-500">{formik.errors.deadline}</div> : null}
  
        <Select
          mode="multiple"
          allowClear
          className="max-w-[250px]"
          placeholder="Assignees"
          value={formik.values.assignees}
          onChange={(value) => formik.setFieldValue("assignees", value)}
          options={optionAssignees}
        />
        {formik.touched.assignees && formik.errors.assignees ? <div className="text-red-500">{formik.errors.assignees}</div> : null}
  
        <Select
          className="max-w-[250px]"
          placeholder="Task Status"
          value={formik.values.status_code}
          onChange={(value) => formik.setFieldValue("status_code", value)}
          options={[
            { value: "todo", label: "To Do" },
            { value: "doing", label: "Doing" },
            { value: "done", label: "Done" },
          ]}
        />
        {formik.touched.status_code && formik.errors.status_code ? <div className="text-red-500">{formik.errors.status_code}</div> : null}
  
        <Button type="primary" htmlType="submit">
          {id === "-1" ? "Add" : "Update"}
        </Button>
        <Button onClick={() => setpopOpen(!popOpen)}>Close</Button>
      </Form>
    );
  };










  return (
    <Popover
      title="Title"
      trigger="click"
      placement="right"
      open={popOpen}
      // content={popContentTask}

      content={
        <TaskForm
          // ModifyTask={ModifyTask}
          // setModifyTask={setModifyTask}
          // setpopOpen={setpopOpen}
          // popOpen={popOpen}
          // projectsData={projectsData}
          // selectedProjectIndex={selectedProjectIndex}
          // setProjectData={setProjectData}
          // setCards={setCards}
          // optionAssignees={optionAssignees}
          // setoptionAssignees={setoptionAssignees}
          // id={id}
          // column={column}
        />
      }
      onOpenChange={(e) => {
        let optionValues = [];
        projectsData[selectedProjectIndex]?.assignees?.map((member) => {
          optionValues.push({
            value: member,
            label: member,
          });
        });
        setoptionAssignees(optionValues);
        setpopOpen(e);
      }}
    >
      <div
        className={`absolute left-0 top-0 min-h-full min-w-56 cursor-pointer opacity-70 z-20`}
      ></div>
    </Popover>
  );
};

export default TaskModal;
