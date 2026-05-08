import { useEffect, useState } from "react";
import api from "../api/axios";

function Deals() {
  const [deals, setDeals] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    client: "",
    stage: "Proposal",
  });

  const getDeals = async () => {
    const res = await api.get("/deals");
    setDeals(res.data);
  };

  const addDeal = async (e) => {
    e.preventDefault();
    await api.post("/deals", {
      ...form,
      amount: Number(form.amount),
    });
    setForm({
      title: "",
      amount: "",
      client: "",
      stage: "Proposal",
    });
    getDeals();
  };

  const deleteDeal = async (id) => {
    await api.delete(`/deals/${id}`);
    getDeals();
  };

  useEffect(() => {
    getDeals();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Deals</h1>

      <form onSubmit={addDeal} className="bg-white rounded-2xl border p-5 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input placeholder="Deal Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border px-4 py-2 rounded-xl" />
        <input placeholder="Amount" type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className="border px-4 py-2 rounded-xl" />
        <input placeholder="Client" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} className="border px-4 py-2 rounded-xl" />

        <select value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })} className="border px-4 py-2 rounded-xl">
          <option>Proposal</option>
          <option>Negotiation</option>
          <option>Won</option>
          <option>Lost</option>
        </select>

        <button className="bg-indigo-600 text-white rounded-xl py-2">
          Add Deal
        </button>
      </form>

      <div className="bg-white rounded-2xl border p-5">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-3">Title</th>
              <th>Amount</th>
              <th>Client</th>
              <th>Stage</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {deals.map((deal) => (
              <tr key={deal.id} className="border-b hover:bg-slate-50">
                <td className="py-4 font-medium">{deal.title}</td>
                <td>₹{deal.amount}</td>
                <td>{deal.client}</td>
                <td>{deal.stage}</td>
                <td>
                  <button onClick={() => deleteDeal(deal.id)} className="text-red-500">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {deals.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-400">
                  No deals found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Deals;