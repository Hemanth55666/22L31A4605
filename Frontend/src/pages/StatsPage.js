import React, { useEffect, useState } from "react";
import axios from "axios";
import StatsTable from "../components/StatsTable";

const StatsPage = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/shorturls");
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <>
      <h2>Short URL Statistics</h2>
      <StatsTable stats={stats} />
    </>
  );
};

export default StatsPage;
