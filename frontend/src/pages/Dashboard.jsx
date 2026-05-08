import { useEffect, useState } from "react";

import {
  Users,
  TrendingUp,
  BadgeDollarSign,
  Ticket,
} from "lucide-react";

import StatCard from "../components/StatCard";
import api from "../api/axios";

function Dashboard() {
  const [stats, setStats] = useState({
    total_contacts: 0,
    total_leads: 0,
    total_revenue: 0,
    open_tickets: 0,
  });

  const getStats = async () => {
    const res = await api.get("/dashboard/stats");
    setStats(res.data);
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Total Contacts"
          value={stats.total_contacts}
          icon={Users}
          change="+12%"
        />

        <StatCard
          title="Total Leads"
          value={stats.total_leads}
          icon={TrendingUp}
          change="+8%"
        />

        <StatCard
          title="Revenue"
          value={`₹${stats.total_revenue}`}
          icon={BadgeDollarSign}
          change="+18%"
        />

        <StatCard
          title="Open Tickets"
          value={stats.open_tickets}
          icon={Ticket}
          change="-4%"
        />
      </div>
    </div>
  );
}

export default Dashboard;