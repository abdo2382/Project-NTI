# Project Documentation: TaskFlow — Task Management System

## 1. Project Name
**TaskFlow** – A Team Task Management System

---

## 2. Project Description

TaskFlow is a full-stack web application that helps small teams and organizations organize, assign, and track work. It solves the problem of scattered task tracking (spreadsheets, chat messages, sticky notes) by giving every team a single place to create projects, assign tasks to members, attach files, and monitor progress.

- **Problem it solves:** Teams lose track of who is doing what, deadlines slip, and there's no central record of task status or attachments.
- **Target users:** Small-to-medium teams, startups, and project managers who need a lightweight alternative to heavier tools like Jira or Asana.
- **Main purpose:** Let managers create projects and assign tasks, let team members update task progress and attach files, and let admins manage the overall system (users, projects, permissions).

---

## 3. Users and Roles

| Role | Permissions | Available Actions |
|------|-------------|--------------------|
| **Admin** | Full system control | Manage all users, manage all projects, manage all tasks, view system analytics, delete any resource |
| **Manager** | Manage own projects and team | Create/edit/delete projects, create/assign tasks, add team members to projects, view project reports |
| **Member** | Manage assigned work | View assigned tasks, update task status, comment on tasks, upload files to tasks, edit own profile |

---

## 4. Main Features

### Authentication Features
- Register (with email verification)
- Login / Logout
- Forgot password / Reset password
- JWT-based session handling

### Authorization Features
- Role-based access control (Admin / Manager / Member)
- Protected routes based on role (e.g., only Managers/Admins can create projects)
- Different dashboard views per role
- Members can only see/edit tasks assigned to them

### CRUD Features

**1. Users Management (Admin only)**
- Create: Add new user, assign role
- Read: View all users, view user profile
- Update: Edit user info, change role, activate/deactivate account
- Delete: Remove user

**2. Projects Management**
- Create: Add new project (name, description, deadline, members)
- Read: View all projects, view project details
- Update: Edit project info, add/remove members
- Delete: Archive/delete project

**3. Tasks Management**
- Create: Add new task within a project (title, description, assignee, due date, priority)
- Read: View task list (board/list view), view task details
- Update: Edit task, change status (To Do / In Progress / Done), reassign task
- Delete: Remove task

**4. Comments Management**
- Create: Add comment on a task
- Read: View comments on a task
- Update: Edit own comment
- Delete: Remove own comment

---

## 5. Image/File Upload Features

| Upload Location | Allowed File Types | Max Size | Uploaded By |
|------------------|--------------------|----------|-------------|
| User Profile Picture | JPG, PNG | 5 MB | Any logged-in user (own profile) |
| Task Attachments | JPG, PNG, PDF, DOCX, XLSX | 10 MB | Members assigned to the task, Managers, Admins |
| Project Cover Image | JPG, PNG | 5 MB | Managers, Admins |

---

## 6 & 7. UI Design — Pages and Screens

Since design was done as a wireframe plan (can be recreated in Figma), here is the page-by-page breakdown:

### Login Page
- Email/password fields
- "Forgot password?" link
- "Register" link
- Login button

### Register Page
- Name, email, password, confirm password fields
- Register button
- "Already have an account? Login" link

### Home / Dashboard
- Sidebar navigation (Projects, Tasks, Team, Profile — items shown vary by role)
- Top bar with user avatar and notifications
- Summary cards: Total Projects, Tasks Due Today, In Progress, Completed
- Recent activity feed

### Projects List Page
- Table/grid of project cards (name, deadline, member avatars, progress bar)
- "New Project" button (Manager/Admin only)
- Search input and status filter

### Project Details Page
- Project header (name, description, deadline, members)
- Task board (Kanban: To Do / In Progress / Done columns)
- "Add Task" button
- Member list with "Add Member" option (Manager/Admin)

### Task Details Page
- Task title, description, assignee, priority, due date
- Status dropdown
- Attachments section with upload button
- Comments thread with input box

### Add/Edit Task Form (Modal)
- Title, description, assignee dropdown, priority selector, due date picker
- File attachment input
- Save / Cancel buttons

### Team Management Page (Admin only)
- Table of all users: name, email, role, status
- "Add User" button
- Edit/Delete/Deactivate actions per row

### Profile Page
- Profile picture upload
- Name, email (editable)
- Change password section

---

## 8. Submission Summary

**Project Name:** TaskFlow — Team Task Management System

**Project Description:** A task management system that lets managers create projects and assign tasks to team members, while members track and update their assigned work, attach files, and comment. Admins oversee users and system-wide data.

**User Roles:**
```
Admin:
- Manage all users
- Manage all projects and tasks
- View system-wide reports

Manager:
- Create/manage own projects
- Assign and manage tasks
- Add/remove project members

Member:
- View and update assigned tasks
- Upload attachments
- Comment on tasks
```

**Features List:**
```
Authentication:
✓ Register (email verification)
✓ Login / Logout
✓ Forgot / Reset Password

Authorization:
✓ Role-based dashboards
✓ Protected routes by role
✓ Task visibility restricted to assigned members

CRUD:
✓ Manage users (Admin)
✓ Manage projects
✓ Manage tasks
✓ Manage comments

Upload:
✓ Profile pictures
✓ Task attachments
✓ Project cover images
```

**UI Design Link:

---

## Suggested Tech Stack (optional reference)
- **Frontend:** React + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB or PostgreSQL
- **Auth:** JWT + bcrypt
- **File Storage:** Cloudinary or local storage with Multer
