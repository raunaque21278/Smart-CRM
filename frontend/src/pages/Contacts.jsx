import { useEffect, useState } from "react";
import api from "../api/axios";

function Contacts() {
  const [contacts, setContacts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "Active",
    source: "Website",
  });

  const getContacts = async () => {
    const res = await api.get("/contacts");
    setContacts(res.data);
  };

  const addContact = async (e) => {
    e.preventDefault();

    await api.post("/contacts", form);

    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
      status: "Active",
      source: "Website",
    });

    getContacts();
  };

  const deleteContact = async (id) => {
    await api.delete(`/contacts/${id}`);
    getContacts();
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Contacts
      </h1>

      <form
        onSubmit={addContact}
        className="bg-white rounded-2xl border p-5 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border px-4 py-2 rounded-xl"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="border px-4 py-2 rounded-xl"
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="border px-4 py-2 rounded-xl"
        />

        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
          className="border px-4 py-2 rounded-xl"
        />

        <button className="bg-indigo-600 text-white rounded-xl">
          Add Contact
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
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {contacts.map((contact) => (
              <tr
                key={contact.id}
                className="border-b hover:bg-slate-50"
              >
                <td className="py-4 font-medium">
                  {contact.name}
                </td>

                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.company}</td>
                <td>{contact.status}</td>

                <td>
                  <button
                    onClick={() =>
                      deleteContact(contact.id)
                    }
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Contacts;