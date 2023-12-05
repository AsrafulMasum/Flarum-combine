import Announcements from "./Announcements/Announcements";
import Banner from "./Banner/Banner";
import Posts from "./Posts/Posts";
import Tags from "./Tags/Tags";

const Home = () => {
  return (
    <div className="mb-20 space-y-10">
      <Banner></Banner>
      <Tags></Tags>
      <Announcements></Announcements>
      <Posts></Posts>
    </div>
  );
};

export default Home;
