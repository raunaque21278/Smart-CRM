import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await api.delete(`/admin/users/${id}`);
    getUsers();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">User Management</h1>

      <div className="bg-white rounded-2xl border p-5">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-3">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Verified</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-4">{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.is_verified}</td>
                <td>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;