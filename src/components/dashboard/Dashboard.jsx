import Header from "./Header";
import StatsWidget from "./StatsWidget";

const Dashboard = ({ data, onDelete }) => {
  return (
    <>
      <Header transactions={data} />
      <StatsWidget data={data} onDelete={onDelete} />
    </>
  );
};

export default Dashboard;
