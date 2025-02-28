import { create } from "zustand";
import { projects } from "../data/projects.js";

export const NavElement = create((set) => ({
  value: "project",
  navChange: (val) => set(() => ({ value: val })),
}));

export const ProjectElements = create((set) => ({
  ProjectData: projects,
  setProjectData: (data) => set(() => ({ ProjectData: data })),
}));

export const UserElement = create((set) => ({
  User: {
    username: "",
    password: "",
    userType:''
  },

  setUserData: (data) => set(() => ({ User: data })),
}));
