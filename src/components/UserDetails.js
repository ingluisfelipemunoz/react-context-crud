import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const UserDetails = () => {
  const { state, dispatch, deleteUser } = useContext(UserContext);

  if (!state.selectedUser) return null;

  const handleDelete = () => {
    deleteUser(state.selectedUser.id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <p>
        <strong>Name:</strong> {state.selectedUser.name}
      </p>
      <p>
        <strong>Email:</strong> {state.selectedUser.email}
      </p>
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
        onClick={() =>
          dispatch({ type: "EDIT_USER", payload: state.selectedUser })
        }
      >
        Edit
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default UserDetails;
