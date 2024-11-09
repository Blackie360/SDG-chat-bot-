// Dashboard.tsx
"use client"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.githubData) {
      setLoading(false);
    } else {
      setError("No GitHub data found.");
      setLoading(false);
    }
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Please log in to view your dashboard.</div>;
  }

  const githubData = session.user.githubData;

  if (loading) {
    return <div>Loading your GitHub data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your GitHub Dashboard</h1>
      <div className="bg-white shadow-lg p-4 rounded-lg mb-4">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <div className="mt-2">
          <p><strong>Name:</strong> {githubData?.name}</p>
          <p><strong>GitHub ID:</strong> {githubData?.githubId}</p>
          <p><strong>Followers:</strong> {githubData?.followers?.length}</p>
        </div>
      </div>

      {/* Additional GitHub Data */}
      <div className="bg-white shadow-lg p-4 rounded-lg mb-4">
        <h2 className="text-2xl font-semibold">Repositories</h2>
        <ul>
          {githubData?.repos?.map((repo: any) => (
            <li key={repo.id}>{repo.name}</li>
          ))}
        </ul>
      </div>

      {/* Render issues, pull requests, etc. similarly */}
    </div>
  );
};

export default Dashboard;
