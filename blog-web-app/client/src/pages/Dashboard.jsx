import React from "react";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

function Dashboard() {
  return (
    <div className="min-h-screen flex">
      <DashSidebar />
      <DashProfile />
    </div>
  );
}

export default Dashboard;
