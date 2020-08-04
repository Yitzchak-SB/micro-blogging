import React from "react";

const UserContext = React.createContext({
  user: null,
  tweets: null,
  searchTerm: null,
  setSearch: null,
  searchUsers: null,
  setSearchUsers: null,
});
export default UserContext;
