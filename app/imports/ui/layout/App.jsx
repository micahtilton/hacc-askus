import React from "react";
import Home from "../pages/Home";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import ReportsPage from "../pages/report/ReportsPage";
import ManageFAQPage from "../pages/faq/ManageFAQPage";
import { Meteor } from "meteor/meteor";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTracker } from "meteor/react-meteor-data";
import { Roles } from "meteor/alanning:roles";
import SignIn from "../pages/SignIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Only allow admins to view these routes
const AdminProtectedRoute = ({ ready, children }) => {
  const isLogged = Meteor.userId() !== null;

  // Return to signin page if user not logged-in
  if (!isLogged) {
    return <Navigate to="/signin" />;
  }

  if (!ready) {
    return <LoadingSpinner />;
  }

  const isAdmin = Roles.userIsInRole(Meteor.userId(), "admin");

  // Navigates to not authorized page if user is not admin
  return isLogged && isAdmin ? children : <Navigate to="/notauthorized" />;
};

// Basic page with text
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
          <Route path="/notauthorized" element={<Page text={"You Are Not Authorized"} />} />
          <Route path="/signin" element={<SignIn />} />
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
        <ToastContainer
          position="bottom-left"
          autoClose={1700}
          closeButton={false}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          draggable={false}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          rtl={false}
          theme="colored"
        />
        <Footer />
      </div>
    </Router>
  );
};
