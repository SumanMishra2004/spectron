import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";

export default async function OwnerDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Owner Dashboard</h1>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-lg text-blue-900">
          Welcome to the Owner Dashboard! {session?.user?.email && `You are logged in as: `}<strong>{session?.user?.email}</strong>
        </p>
        {session?.user?.role && (
          <p className="text-sm text-blue-700 mt-2">
            Your Role: <span className="font-semibold">{session.user.role}</span>
          </p>
        )}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Owner Features:</h2>
          <ul className="list-disc list-inside space-y-1 text-blue-800">
            <li>Post and manage your properties</li>
            <li>View leads and inquiries</li>
            <li>Track property performance</li>
            <li>Manage property listings</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
