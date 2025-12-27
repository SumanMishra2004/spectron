import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-lg text-red-900">
          Welcome to the Admin Dashboard! {session?.user?.email && `You are logged in as: `}<strong>{session?.user?.email}</strong>
        </p>
        {session?.user?.role && (
          <p className="text-sm text-red-700 mt-2">
            Your Role: <span className="font-semibold">{session.user.role}</span>
          </p>
        )}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Admin Features:</h2>
          <ul className="list-disc list-inside space-y-1 text-red-800">
            <li>Manage all users and roles</li>
            <li>Approve/reject property listings</li>
            <li>Platform analytics and reports</li>
            <li>System configuration</li>
            <li>Monitor platform activity</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
