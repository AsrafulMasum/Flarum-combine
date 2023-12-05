import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Navbar/Header';



const MainLayout = () => {
  return (
    <div className="font-['Lato']">
      <Header>
        <Outlet></Outlet>
      </Header>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;