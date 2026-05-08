import { useEffect, useState } from "react";
import api from "../api/axios";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
  });

  const getTickets = async () => {
    const res = await api.get("/tickets");
    setTickets(res.data);
  };

  const addTicket = async (e) => {
    e.preventDefault();
    await api.post("/tickets", form);
    setForm({
      title: "",
      description: "",
      priority: "Medium",
      status: "Open",
    });
    getTickets();
  };

  const deleteTicket = async (id) => {
    await api.delete(`/tickets/${id}`);
    getTickets();
  };

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tickets</h1>

      <form onSubmit={addTicket} className="bg-white rounded-2xl border p-5 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input placeholder="Ticket Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border px-4 py-2 rounded-xl" />
        <input placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border px-4 py-2 rounded-xl" />

        <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="border px-4 py-2 rounded-xl">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="border px-4 py-2 rounded-xl">
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
        </select>

        <button className="bg-indigo-600 text-white rounded-xl py-2">
          Add Ticket
        </button>
      </form>

      <div className="bg-white rounded-2xl border p-5">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-3">Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-b hover:bg-slate-50">
                <td className="py-4 font-medium">{ticket.title}</td>
                <td>{ticket.description}</td>
                <td>{ticket.priority}</td>
                <td>{ticket.status}</td>
                <td>
                  <button onClick={() => deleteTicket(ticket.id)} className="text-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {tickets.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-400">
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tickets;