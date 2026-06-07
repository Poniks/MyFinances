import Header from "./Header";
import StatsWidget from "./StatsWidget";

const Dashboard = ({ data }) => {
  return (
    <>
      <Header transactions={data} />
      <StatsWidget data={data} />
    </>
  );
};

export default Dashboard;
