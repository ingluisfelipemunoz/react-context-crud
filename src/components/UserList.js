import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const UserList = () => {
  const { state, dispatch, fetchUsers } = useContext(UserContext);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => dispatch({ type: "CREATE_USER" })}
      >
        Create New User
      </button>
      <ul className="list-disc pl-5">
        {state.users.map((user) => (
          <li
            key={user.id}
            onClick={() => dispatch({ type: "SELECT_USER", payload: user })}
            className="cursor-pointer text-blue-500 hover:underline"
          >
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
