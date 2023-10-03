import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
import { searchUsers } from "../../context/github/GithubAction";

function UserSearch() {
  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);
  const [text, setText] = useState("");
  const handleChange = (e) => {
    console.log(e.target.value);
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("please enter something", "error");
    } else {
      dispatch({ type: "SET_LOADING" });
      const users = await searchUsers(text);
      dispatch({ type: "GET_USERS", payload: users });
      setText("");
    }
  };
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="search"
                onChange={handleChange}
                value={text}
              />
              <button
                className="absolute top-0 right-0 rounder-l-none w-36 btn btn-lg"
                type="submit"
              >
                GO
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button
            onClick={() => dispatch({ type: "CLEAR_USERS" })}
            className="btn-ghost btn-large"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
