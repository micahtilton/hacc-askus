import React from "react";
import Home from "../pages/Home";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ChatBot from "../pages/chatbot/ChatBot";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import HelpDesk from "../pages/HelpDesk";
import ReportsPage from "../pages/report/ReportsPage";
import ManageFAQPage from "../pages/faq/ManageFAQPage";
import AdminLogin from "../pages/AdminLogin";
import { Meteor } from "meteor/meteor";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTracker } from "meteor/react-meteor-data";
import { Roles } from "meteor/alanning:roles";
import { Button } from "react-bootstrap";

const ProtectedRoute = ({ children }) => {
  const isLogged = Meteor.userId() !== null;
  return isLogged ? children : <Navigate to="/admin" />;
};

const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;
  if (!isLogged) {
    return <Navigate to="/admin" />;
  }
  if (!ready) {
    return <LoadingSpinner />;
  }
  const isAdmin = Roles.userIsInRole(Meteor.userId(), "admin");

  return isLogged && isAdmin ? children : <Navigate to="/notauthorized" />;
};

const Page = ({ text }) => (
  <div className={"d-flex justify-content-center"}>
    <h1 className={"p-5"}>{text}</h1>
  </div>
);

export const App = () => {
  const { ready } = useTracker(() => {
    const rdy = Roles.subscription.ready();
    return {
      ready: rdy,
    };
  });

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/help" element={<HelpDesk />} />
          <Route path="/notauthorized" element={<Page text={"You Are Not Authorized"} />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/report"
            element={
              <AdminProtectedRoute ready={ready}>
                <ReportsPage />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/faq"
            element={
              <AdminProtectedRoute ready={ready}>
                <ManageFAQPage />
              </AdminProtectedRoute>
            }
          />
          <Route path="*" element={<Page text={"Error 404: Page Not Found"} />} />
        </Routes>
        <ChatBot />
        <Footer />
      </div>
    </Router>
  );
};
