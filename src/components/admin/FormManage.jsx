import React, { useEffect, useState } from "react";
import useUserStore from "../../stores/userStore";
import { User } from "lucide-react";
import { toast } from "react-toastify";
import { updateUserRole } from "../../api/UserApi";

const FormManage = () => {
  const token = useUserStore((state) => state.token);
  const getUsers = useUserStore((state) => state.getUsers);
  const users = useUserStore((state) => state.users);
  const [roles, setRoles] = useState(["ADMIN", "USER"]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleRoleChange = async (id, newRole) => {
    try {
      await updateUserRole(token, id, newRole); // Pass token here
      toast.success(`Role updated to ${newRole}`);
      getUsers();
    } catch (error) {
      console.error(error); // Log error details for debugging
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="container mx-auto p-4 shadow-xl rounded-xl">
      <div className="flex flex-row justify-between">
        <h1 className="text-2xl font-bold">Users Management</h1>
      </div>
      <div className="divider"></div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>No.</th>
              <th>Image</th>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Role</th>
              <th>Enabled</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="bg-white hover:bg-gray-200">
                <th>{index + 1}</th>
                <td>
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="w-16 h-16 object-cover"
                    />
                  ) : (
                    <User />
                  )}
                </td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.address}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)} // Pass user.id and new role
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{user.enabled ? "Enabled" : "Disabled"}</td>
                <td>
                  <button onClick={() => {}} className="btn btn-primary btn-sm">
                    Edit
                  </button>
                  <button onClick={() => {}} className="btn btn-error btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormManage;
