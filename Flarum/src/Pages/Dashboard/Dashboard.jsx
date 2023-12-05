import { Outlet } from "react-router-dom";
import SideBar from "./Components/SideBar";


const Dashboard = () => {
  return (
    <div className="min-h-screen grid grid-cols-5">
      <div className="col-span-1 bg-primary text-white"><SideBar></SideBar></div>
      <div className="col-span-4 p-20">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;