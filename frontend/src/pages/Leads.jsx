import { useEffect, useState } from "react";
import api from "../api/axios";

function Leads() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "NEW",
    priority: "Medium",
  });

  const getLeads = async () => {
    const res = await api.get("/leads");
    setLeads(res.data);
  };

  const addLead = async (e) => {
    e.preventDefault();
    await api.post("/leads", form);
    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "NEW",
      priority: "Medium",
    });
    getLeads();
  };

  const deleteLead = async (id) => {
    await api.delete(`/leads/${id}`);
    getLeads();
  };

  useEffect(() => {
    getLeads();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Leads</h1>

      <form onSubmit={addLead} className="bg-white rounded-2xl border p-5 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="border px-4 py-2 rounded-xl" />
        <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="border px-4 py-2 rounded-xl" />
        <input placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="border px-4 py-2 rounded-xl" />
        <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="border px-4 py-2 rounded-xl" />

        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="border px-4 py-2 rounded-xl">
          <option>NEW</option>
          <option>CONTACTED</option>
          <option>QUALIFIED</option>
          <option>CONVERTED</option>
          <option>LOST</option>
        </select>

        <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="border px-4 py-2 rounded-xl">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button className="bg-indigo-600 text-white rounded-xl py-2">
          Add Lead
        </button>
      </form>

      <div className="bg-white rounded-2xl border p-5">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-3">Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b hover:bg-slate-50">
                <td className="py-4 font-medium">{lead.name}</td>
                <td>{lead.email}</td>
                <td>{lead.phone}</td>
                <td>{lead.company}</td>
                <td>{lead.status}</td>
                <td>{lead.priority}</td>
                <td>
                  <button onClick={() => deleteLead(lead.id)} className="text-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {leads.length === 0 && (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-400">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leads;