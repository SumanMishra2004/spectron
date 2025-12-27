import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";

export default async function PublicDashboard() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Public Dashboard</h1>
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <p className="text-lg text-green-900">
          Welcome to the Public Dashboard! {session?.user?.email && `You are logged in as: `}<strong>{session?.user?.email}</strong>
        </p>
        {session?.user?.role && (
          <p className="text-sm text-green-700 mt-2">
            Your Role: <span className="font-semibold">{session.user.role}</span>
          </p>
        )}
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Public User Features:</h2>
          <ul className="list-disc list-inside space-y-1 text-green-800">
            <li>Browse available properties</li>
            <li>Save favorite properties</li>
            <li>Contact property owners</li>
            <li>View property details</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
