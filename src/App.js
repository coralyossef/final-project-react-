import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import ServiceList from './components/ServiceList';
import RegisterForm from './components/RegisterForm';
import ServiceForm from './components/ServiceForm';
import CustomerEditForm from './components/CustomerEditForm';
import ServiceEditForm from './components/ServiceEditForm';
import ServiceAssignmentForm from './components/ServiceAssignmentForm';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import NavBar from './components/NavBar';
import OperatorRoute from './components/OperatorRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/customers"
            element={
              <OperatorRoute>
                <CustomerList />
              </OperatorRoute>
            }
          />
          <Route
            path="/customers/:id"
            element={
              <OperatorRoute>
                <CustomerList />
              </OperatorRoute>
            }
          />
          <Route
            path="/services"
            element={
              <OperatorRoute>
                <ServiceList />
              </OperatorRoute>
            }
          />
          <Route
            path="/add-service"
            element={
              <OperatorRoute>
                <ServiceForm />
              </OperatorRoute>
            }
          />
          <Route
            path="/customers/edit/:id"
            element={
              <OperatorRoute>
                <CustomerEditForm />
              </OperatorRoute>
            }
          />
          <Route
            path="/services/edit/:id"
            element={
              <OperatorRoute>
                <ServiceEditForm />
              </OperatorRoute>
            }
          />
          <Route
            path="/customers/:customerId/services"
            element={
              <OperatorRoute>
                <ServiceAssignmentForm />
              </OperatorRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
