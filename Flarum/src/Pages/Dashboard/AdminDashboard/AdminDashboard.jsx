import useAuth from "../../../Hooks/useAuth";
import useLoadSecureData from "../../../Hooks/useLoadSecureData";
import { BsPostcardHeartFill } from "react-icons/bs";
import { FaUsers, FaComments } from "react-icons/fa";
import { PieChart, Pie, Cell, Legend } from "recharts";
import AddTags from "./AddTags";

const AdminDashboard = () => {
  const { user } = useAuth();
  const userURL = `/users/${user?.email}`;
  const { data: dbUser } = useLoadSecureData(userURL);

  const { data: adminData } = useLoadSecureData("/admin-data");

  const { postCount, userCount, totalCommentsCount } = adminData || {}
  // pie chart data
  const COLORS = ["#1D84B5", "#65B9ED", "#0A2239"];

  const data = [
    { name: "Posts", value: postCount },
    { name: "Users", value: userCount },
    { name: "Comments", value: totalCommentsCount },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <div className="flex">
        <div className="flex items-center gap-10">
          <img
            className="w-56 h-56 object-cover rounded-full"
            src={dbUser?.photoURL}
            alt="Image"
          />

          <div className="flex flex-col justify-center gap-4">
            <div className="flex items-center gap-4">
              <p>Name :</p>
              <h2 className="text-lg font-medium">{dbUser?.name}</h2>
            </div>
            <div className="flex items-center gap-4">
              <p>Email :</p>
              <h4 className="text-lg font-medium">{dbUser?.email}</h4>
            </div>
            <div className="flex items-center gap-4">
              <p>Badge :</p>
              <p className="text-lg font-medium">
                {dbUser?.badge === "bronze" ? "Bronze" : "Gold"}
              </p>
            </div>
          </div>
        </div>
        <div>
          <PieChart width={400} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend></Legend>
          </PieChart>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-20">
        <div className="py-10 bg-primary text-white text-2xl flex justify-center items-center gap-8 rounded-xl">
          <BsPostcardHeartFill className="text-7xl"></BsPostcardHeartFill>
          <div>
            <p>{postCount}</p>
            <p>Post</p>
          </div>
        </div>

        <div className="py-10 bg-secondary text-2xl flex justify-center items-center gap-8 rounded-xl text-textColor">
          <FaUsers className="text-7xl"></FaUsers>
          <div>
            <p>{userCount}</p>
            <p>Users</p>
          </div>
        </div>

        <div className="py-10 px-10 bg-textColor text-white text-2xl flex justify-center items-center gap-8 rounded-xl">
          <FaComments className="text-7xl"></FaComments>
          <div>
            <p>{totalCommentsCount}</p>
            <p>Comments</p>
          </div>
        </div>
      </div>
      <AddTags></AddTags>
    </div>
  );
};

export default AdminDashboard;
