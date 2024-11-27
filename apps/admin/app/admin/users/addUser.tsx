import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useUserStore } from "@/app/admin/utils/userStore";

const addUser: React.FC = () => {
  const router = useRouter();
  const { addUser, isLoading, error } = useUserStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as string,
    };

    const token = localStorage.getItem("token") || "";

    try {
      await addUser(token, userData);

      if (error) {
        toast.error(error);
      } else {
        toast.success("User added successfully");
        router.push("/admin/users");
      }
    } catch (err) {
      toast.error("Failed to add user");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New User</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full px-3 py-2 border rounded"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-3 py-2 border rounded"
            required
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Role</label>
          <select
            name="role"
            className="w-full px-3 py-2 border rounded"
            required
            disabled={isLoading}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add User"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/users")}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default addUser;
