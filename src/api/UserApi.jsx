import axios from "axios";

export const getUser = async () => {
  return await axios.get("http://localhost:8000/users");
};

export const updateUserRole = async (token, id, newRole) => {
  return await axios.post(
    `http://localhost:8000/user/change-role/${id}`,
    { role: newRole },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
