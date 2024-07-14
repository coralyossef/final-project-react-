# Customer Management System - Frontend

This is the frontend part of the Customer Management System built using React. This application allows users to manage customers and services through a user-friendly interface.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Screenshots](#screenshots)
=- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Project Description

The Customer Management System is designed to streamline customer and service management for businesses. It includes features for user authentication, role-based access control, and CRUD operations for managing customer and service data. The main goal is to enhance the customer management process and improve service delivery.


### Key Objectives

- **Centralized Management**: Provide a single platform to manage all customer and service data.
- **Role-Based Access Control**: Ensure that different user roles have access to the specific functionalities they need.
- **User-Friendly Interface**: Create an intuitive and responsive user interface to enhance the user experience.
- **Automation**: Automate tasks such as sending email notifications to reduce manual effort.

### User Roles

The system supports three types of user roles:
- **Customer**: Manage their profile and view relevant services.
- **Manager**: Manage customers and view all service details.
- **Operator**: Manage the services offered by the business.

### Functionalities

- **User Authentication and Authorization**: Secure login and registration system to ensure that only authorized users can access the system.
- **Customer Management**: Managers can add, edit, and delete customer information. Customers can view and update their own profile.
- **Service Management**: Operators can add, edit, and delete services. Customers can view services that are relevant to their customer type.
- **Search and Filter**: Users can search and filter customers and services based on various criteria to quickly find the information they need.
- **Email Notifications**: The system sends automated email notifications upon user registration to keep users informed.

## Features

- User authentication and authorization
- Role-based access control (Customer, Manager, Operator)
- CRUD operations for customers and services
- Email notifications upon user registration
- Responsive design

## Screenshots


### Login Page
The Login Page allows users to log in with their credentials. It includes links to the home and registration pages.

![login page](https://github.com/user-attachments/assets/fa190631-59b7-47bf-bc3f-353c0444840f)

### Register Page
The Register Page allows new users to register by providing their details. 

![register page](https://github.com/user-attachments/assets/9199836d-8b16-478e-875b-281418701983)


### Private User Home Page
The Private User Home Page displays information relevant to private users, including their services.

![privat user home page](https://github.com/user-attachments/assets/20797dad-0aea-4dc8-9352-055096e31dde)

### User Profile Page
The User Profile Page displays the user's details and their associated services.

![user profile page](https://github.com/user-attachments/assets/d838432e-7ac7-423d-893e-e9e880220da4)

### Manager Home Page
The Manager Home Page provides an overview of customers and services. It allows managers to manage customers and view service details.

![manager home page](https://github.com/user-attachments/assets/ebc9f447-141b-436b-8431-fe72720013b3)

### Customer List
The Customer List page displays a list of all customers, with options to edit or delete each customer. It also includes a search and sorting functionality.

![customer list](https://github.com/user-attachments/assets/ecaa2338-de9a-4341-827b-3b6ee3aeae5f)


### Service List
The Service List page displays a list of all services, with options to edit or delete each service. It also includes a filtering functionality based on customer type.

![service list](https://github.com/user-attachments/assets/8e56a75b-4562-448f-894c-d894871b642e)




## Project Structure

The project structure is organized to maintain a clean and scalable codebase. Here is an overview of the main directories and files:

### Directories

- `src/components`: Contains reusable React components.
  - Each component has its own folder containing the component file and its corresponding CSS file.
  - Example: `Button`, `Header`, `Sidebar`, etc.

- `src/pages`: Contains the different pages of the application.
  - Each page represents a distinct view in the application.
  - Example: `HomePage`, `LoginPage`, `RegisterPage`, `CustomerListPage`, etc.

- `src/services`: Contains the service functions to interact with the backend API.
  - These functions handle API calls and manage data fetching, posting, updating, and deleting.
  - Example: `customerService.js`, `authService.js`, `serviceService.js`, etc.

- `src`: Contains the main entry points for the React application.
  - `App.js`: The main component that sets up the application routes and renders the navigation bar and page components.
  - `index.js`: The entry point that renders the React application to the DOM.

### Files

- `App.js`: The main component that sets up the application routes and renders the navigation bar and page components.
- `index.js`: The entry point that renders the React application to the DOM.
- `App.css`: Contains global styles for the application.
- `index.css`: Contains global styles and CSS resets.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---


