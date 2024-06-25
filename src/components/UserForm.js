import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const UserForm = () => {
  const { state, dispatch, saveUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (state.selectedUser) {
      setName(state.selectedUser.name);
      setEmail(state.selectedUser.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [state.selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser({ id: state.selectedUser?.id, name, email });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {state.selectedUser ? "Edit User" : "Create User"}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="mt-1 block w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 block w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch({ type: "CANCEL_EDIT" })}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserForm;
