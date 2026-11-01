"use client";
import { useEffect, useState } from "react";
import { getUsers } from "../../services/questionnaireService";
import type { User } from "../../utils/types";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((err: unknown) => {
        console.error("Error fetching users:", err);
        setError("Failed to load submissions.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
          Submissions
        </h1>

        {loading && (
          <p className="text-center text-gray-500">Loading submissions…</p>
        )}

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {!loading && !error && users.length === 0 && (
          <p className="text-center text-gray-500">No submissions yet.</p>
        )}

        {!loading && !error && users.length > 0 && (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-3 font-semibold text-gray-700">ID</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Role</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Score</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-700">{user.id}</td>
                  <td className="px-4 py-3 text-gray-700">{user.role}</td>
                  <td className="px-4 py-3 font-bold text-green-600">{user.score}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(user.submittedAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
