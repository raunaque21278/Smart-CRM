import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminAnalytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/analytics").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card title="Total Users" value={stats.total_users} />
        <Card title="Contacts" value={stats.total_contacts} />
        <Card title="Leads" value={stats.total_leads} />
        <Card title="Deals" value={stats.total_deals} />
        <Card title="Tickets" value={stats.total_tickets} />
        <Card title="Revenue" value={`₹${stats.revenue}`} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white rounded-2xl border p-6 shadow-sm">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}

export default AdminAnalytics;