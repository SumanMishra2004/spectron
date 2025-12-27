import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";

export default async function BrokerDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Broker Dashboard</h1>
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <p className="text-lg text-purple-900">
          Welcome to the Broker Dashboard! {session?.user?.email && `You are logged in as: `}<strong>{session?.user?.email}</strong>
        </p>
        {session?.user?.role && (
          <p className="text-sm text-purple-700 mt-2">
            Your Role: <span className="font-semibold">{session.user.role}</span>
          </p>
        )}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Broker Features:</h2>
          <ul className="list-disc list-inside space-y-1 text-purple-800">
            <li>Manage multiple property listings</li>
            <li>Handle client inquiries</li>
            <li>Commission tracking</li>
            <li>Market analytics and insights</li>
            <li>Client relationship management</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
