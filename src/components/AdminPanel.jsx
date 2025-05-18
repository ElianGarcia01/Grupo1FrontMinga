import { useEffect, useState } from "react"
import { getAllUsers, toggleUserActive } from "../services/users"
import { useAuth } from "../hooks/useAuth"

export default function AdminPanel() {
  const { user, token } = useAuth()
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchUsers = () => {
    setLoading(true)
    getAllUsers(token, search ? { email: search } : {})
      .then(setUsers)
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (token) fetchUsers()
  }, [token, search])

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await toggleUserActive(id, !currentStatus, token)
      fetchUsers()
    } catch (error) {
      console.error("Error toggling active status", error)
    }
  }

  if (user?.role !== 3) return <p className="p-4">Access denied: Admins only</p>

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Panel - All Users</h1>
      <input
        type="text"
        placeholder="Search by email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="p-2 border rounded w-full mb-4"
      />

      {loading ? (
        <p className="text-center">Loading users...</p>
      ) : (
        <div className="overflow-auto rounded border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Online</th>
                <th className="p-2">Active</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-t hover:bg-gray-50">
                  <td className="p-2">{u.email}</td>
                  <td className="p-2 text-center">{u.role}</td>
                  <td className="p-2 text-center">{u.online ? "✅" : "❌"}</td>
                  <td className="p-2 text-center">{u.active ? "✅" : "❌"}</td>
                  <td className="p-2 text-center">
                    <button
                      className={`px-3 py-1 rounded text-white ${u.active ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}`}
                      onClick={() => handleToggleActive(u._id, u.active)}
                    >
                      {u.active ? "Deactivate" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
