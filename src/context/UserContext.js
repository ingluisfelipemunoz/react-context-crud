import React, { createContext, useReducer } from "react";
import axios from "axios";

const UserContext = createContext();

const initialState = {
  users: [],
  selectedUser: null,
  isEditing: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SELECT_USER":
      return { ...state, selectedUser: action.payload, isEditing: false };
    case "CREATE_USER":
      return { ...state, selectedUser: null, isEditing: true };
    case "EDIT_USER":
      return { ...state, selectedUser: action.payload, isEditing: true };
    case "SAVE_USER":
      const updatedUsers = state.selectedUser
        ? state.users.map((user) =>
            user.id === action.payload.id ? action.payload : user
          )
        : [...state.users, action.payload];
      return {
        ...state,
        users: updatedUsers,
        selectedUser: action.payload,
        isEditing: false,
      };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        selectedUser: null,
      };
    case "CANCEL_EDIT":
      return { ...state, selectedUser: null, isEditing: false };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      dispatch({ type: "SET_USERS", payload: response.data });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const saveUser = async (user) => {
    try {
      const response = user.id
        ? await axios.put(`http://localhost:3000/users/${user.id}`, user)
        : await axios.post("http://localhost:3000/users", user);
      dispatch({ type: "SAVE_USER", payload: response.data });
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/users/${userId}`);
      dispatch({ type: "DELETE_USER", payload: userId });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ state, dispatch, fetchUsers, saveUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
