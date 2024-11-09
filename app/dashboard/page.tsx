"use client";

import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>You are not logged in</div>;
  }

  return (
    <div>
      <h1>Welcome, {session?.user?.name}</h1>
      <img src={session?.user?.image} alt="User Avatar" />
      <p>Email: {session?.user?.email || "No email provided"}</p>
    </div>
  );
};

export default Dashboard;
