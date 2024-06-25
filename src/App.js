import React from "react";
import { UserProvider } from "./context/UserContext";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import UserDetails from "./components/UserDetails";

const App = () => {
  return (
    <UserProvider>
      <div className="container mx-auto p-4">
        <UserList />
        <UserForm />
        <UserDetails />
      </div>
    </UserProvider>
  );
};

export default App;
