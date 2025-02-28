// "use client";
// import React, { useEffect, useState } from "react";
// import { ProjectElements } from "../../../../components/Store";
// import { Button, Input, Select, p } from "antd";
// import { useNavigate, useParams } from "react-router";
// import { useSelector } from "react-redux";

// const ProjectSettings = () => {
//   const router = useNavigate();
//   function status(val) {
//     if (val == 1) return "finished";
//     if (val == 2) return "onhold";
//     if (val == 3) return "bandoned";
//     if (val == 4) return "progress";
//   }

// const navigate=useNavigate()
//   const user = useSelector(userData => userData?.users?.userData)
//   useEffect(() => {
//     if (!user?.username) navigate("/login");
//   }, [user])


//   const projectData = ProjectElements((state) => state.ProjectData);
//   const setProjectData = ProjectElements((state) => state.setProjectData);
//   const params = useParams();
//   const [currentProject, setCurrentProject] = useState(
//     projectData
//       .map((e, index) => ({ ...e, index }))
//       .filter((e) => e.project_code === params.id)[0]
//   );
//   // console.log(currentProject);

//   const theme = useSelector((state) => state.theme.theme);

//   return (
//     <div className={`h-screen w-full ${theme=='dark'?'bg-black':'bg-white'} flex flex-col-reverse sm:flex-row text-neutral-400 `}>
//       <div className="sm:h-full h-fit sm:w-[45%] p-10 flex  flex-col gap-5 justify-center">
//         <p className="text-xl ">Project Details:</p>
//         <div className="w-full flex gap-10 justify-around items-center">
//           <p className="w-[150px]">Name:</p>
//           <Input
//             value={currentProject?.projectName}
//             onChange={(e) => {
//               setCurrentProject((prev) => ({
//                 ...prev,
//                 ["projectName"]: e.target.value,
//               }));
//             }}
//           />
//         </div>
//         <div className="w-full flex gap-10 justify-around items-center">
//           <p className="w-[150px]">Type:</p>{" "}
//           <Input value={currentProject?.type} />
//         </div>
//         <div className="w-full flex gap-10 justify-around items-center">
//           <p className="w-[150px]">Created At:</p>{" "}
//           <Input value={currentProject?.created_at} />
//         </div>
//         <div className="w-full flex gap-10 justify-around items-center">
//           <p className="w-[150px]">Deadline:</p>{" "}
//           <Input value={currentProject?.deadline} />
//         </div>
//         <div className="w-full flex gap-10 justify-around items-center">
//           <p className="w-[150px]">Team Lead:</p>{" "}
//           <Input value={currentProject?.team_lead} />
//         </div>
//         <div className="w-full flex gap-10 justify-around items-center">
//           <p className="w-[150px]">Status</p>{" "}
//           <Select
//             value={status(currentProject?.status)}
//             options={[
//               { value: "1", label: "finished" },
//               { value: "2", label: "onhold" },
//               { value: "3", label: "abandoned" },
//               { value: "4", label: "in progress" },
//             ]}
//             className="w-full"
//             onChange={(e) => {
//               setCurrentProject((prev) => ({
//                 ...prev,
//                 ["status"]: e,
//               }));
//             }}
//           />
//         </div>
//         <div className="w-full flex justify-center gap-10">
//           <Button
//             type="primary"
//             className="w-[40%]"
//             onClick={() => {
//               let updateProject = [...projectData];
//               updateProject[currentProject.index] = {
//                 ...updateProject[currentProject.index],
//                 ...currentProject,
//               };
//               setProjectData(updateProject);
//               router("/dashboard");
//             }}
//           >
//             Update
//           </Button>
//           <Button
//             className="w-[40%]"
//             onClick={() => {
//               router("/dashboard");
//             }}
//           >
//             Back
//           </Button>
//         </div>
//       </div>
//       <div className="h-full flex items-center ">
//         <img
//           src={currentProject?.project_Img}
//           className="w-full sm:h-[600px] sm:p-10 h-[300px] "
//         />
//       </div>
//     </div>
//   );
// };

// export default ProjectSettings;





"use client";
import React, { useEffect } from "react";
import { ProjectElements } from "../../../../components/Store";
import { Button, Input, Select } from "antd";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProjectSettings = () => {
  const navigate = useNavigate();
  const params = useParams();
  const projectData = ProjectElements((state) => state.ProjectData);
  const setProjectData = ProjectElements((state) => state.setProjectData);
  const user = useSelector((state) => state?.users?.userData);
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    if (!user?.username) navigate("/login");
  }, [user]);

  const currentProject =
    projectData
      .map((e, index) => ({ ...e, index }))
      .find((e) => e.project_code === params.id) || {};

  const validationSchema = Yup.object().shape({
    projectName: Yup.string().required("Project Name is required."),
    type: Yup.string().required("Type is required."),
    created_at: Yup.string().required("Creation date is required."),
    deadline: Yup.string().required("Deadline is required."),
    team_lead: Yup.string().required("Team Lead is required."),
    status: Yup.string().required("Status is required."),
  });

  return (
    <div
      className={`h-screen w-full ${
        theme === "dark" ? "bg-black" : "bg-white"
      } flex flex-col-reverse sm:flex-row text-neutral-400 `}
    >
      <Formik
        initialValues={{
          projectName: currentProject?.projectName || "",
          type: currentProject?.type || "",
          created_at: currentProject?.created_at || "",
          deadline: currentProject?.deadline || "",
          team_lead: currentProject?.team_lead || "",
          status: currentProject?.status ? String(currentProject?.status) : "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          let updatedProjectList = [...projectData];
          updatedProjectList[currentProject.index] = {
            ...updatedProjectList[currentProject.index],
            ...values,
          };
          setProjectData(updatedProjectList);
          navigate("/dashboard");
        }}
      >
        {({ setFieldValue }) => (
          <Form className="sm:h-full h-fit sm:w-[45%] p-10 flex flex-col gap-5 justify-center">
            <p className="text-xl ">Project Details:</p>

            <div className="w-full flex gap-10 justify-around items-center">
              <p className="w-[150px]">Name:</p>
              <Field as={Input} name="projectName" />
            </div>
            <div className="mx-[130px]">
            <ErrorMessage name="projectName" component="div" className="text-red-500 text-sm" />
            </div>



            <div className="w-full flex gap-10 justify-around items-center">
              <p className="w-[150px]">Type:</p>
              <Field as={Input} name="type" />
            </div>
            <div className="mx-[130px]">
            <ErrorMessage name="type" component="div" className="text-red-500 text-sm" />
            </div>


            <div className="w-full flex gap-10 justify-around items-center">
              <p className="w-[150px]">Created At:</p>
              <Field as={Input} name="created_at" />
            </div>
            <div className="mx-[130px]">
            <ErrorMessage name="created_at" component="div" className="text-red-500 text-sm" />
            </div>


            <div className="w-full flex gap-10 justify-around items-center">
              <p className="w-[150px]">Deadline:</p>
              <Field as={Input} name="deadline" />
            </div>
            <div className="mx-[130px]">
            <ErrorMessage name="deadline" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="w-full flex gap-10 justify-around items-center">
              <p className="w-[150px]">Team Lead:</p>
              <Field as={Input} name="team_lead" />
            </div>
            <div className="mx-[130px]">
            <ErrorMessage name="team_lead" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="w-full flex gap-10 justify-around items-center">
              <p className="w-[150px]">Status</p>
              <Select
                value={String(currentProject?.status)}
                className="w-full"
                options={[
                  { value: "1", label: "Finished" },
                  { value: "2", label: "On Hold" },
                  { value: "3", label: "Abandoned" },
                  { value: "4", label: "In Progress" },
                ]}
                onChange={(value) => setFieldValue("status", value)}
              />
            </div>
            <div className="mx-[130px]">
            <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="w-full flex justify-center gap-10">
              <Button type="primary" htmlType="submit" className="w-[40%]">
                Update
              </Button>
              <Button className="w-[40%]" onClick={() => navigate("/dashboard")}>
                Back
              </Button>
            </div>
          </Form>
        )}
      </Formik>

      <div className="h-full flex items-center ">
        <img
          src={currentProject?.project_Img}
          className="w-full sm:h-[600px] sm:p-10 h-[300px]"
          alt="Project"
        />
      </div>
    </div>
  );
};

export default ProjectSettings;
