# Project Management Dashboard

Welcome to the Project Management Dashboard! This application is built with Next.js and provides a comprehensive solution for managing projects, tasks, and team members. The dashboard features robust functionality including user authentication, project and task management, and drag-and-drop task organization. 

 **Live Link**: https://abhi-project-management-dashboard.vercel.app/login

## Features

- **User Authentication**: Secure login page with complete form validation.
- **Project Management**: 
  - View, edit, and delete projects.
  - Add and manage project members.
  - Create, update, and remove tasks associated with projects.
- **Task Management**: 
  - Add new tasks, update existing tasks, and delete tasks.
  - Drag-and-drop functionality to move tasks between different statuses (Todo, In Progress, Completed, Backlog).
- **Global State Management**: Real-time updates across the application, ensuring changes in tasks are reflected in the associated projects.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later) or yarn (v1.22 or later)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Abhi260102/project-management-dashboard.git
   cd project-management-dashboard
   ```

2. Install dependencies:

   ```sh
   npm install --f
   # or
   yarn install --f
   ```

### Running the Application

Start the development server:

```sh
npm start
# or
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to view the application.

### Build for Production

```
Automatic Build and deployment using Vercel.
```


## Features Overview

### User Authentication

- Secure login page with form validation.
-  Protected Routes

### Project Management

- **View Projects**: See a list of all projects.
- **Edit Projects**: Update project details, including adding or removing members/tasks.
- **Delete Projects**: Remove projects from the dashboard.

### Task Management

- **Add Tasks**: Create new tasks and associate them with projects.
- **Update Tasks**: Modify existing tasks.
- **Delete Tasks**: Remove tasks from the project.
- **Drag-and-Drop**: Organize tasks by dragging them between different statuses.

### Global State Management

- **Real-Time Updates**: Changes in tasks automatically reflect in the associated projects.
- **Centralized Data Handling**: Ensures consistency and synchronization across the application.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

### Issues

If you encounter any issues, please open an issue on GitHub.

---

Thank you for using the Project Management Dashboard! We hope it helps you manage your projects and tasks efficiently. If you have any questions or feedback, feel free to reach out.
