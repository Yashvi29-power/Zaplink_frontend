import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">
        Welcome {user?.name}
      </h1>

      <p className="mb-4">Email: {user?.email}</p>

      <button
        onClick={logout}
        className="px-6 py-2 bg-red-500 text-white rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;