import React from "react";
import UsersList from "../components/UsersList";

// is not where we sign up not even loged in , we can see a list of users and how many places they have shared.
// output a list of users

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Azi",
      image:
        "https://images.pexels.com/photos/1855582/pexels-photo-1855582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};

export default Users;
