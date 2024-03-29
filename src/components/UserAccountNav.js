"use client";
import React from "react";

const UserAccountNav = ({ user }) => {
  return (
    <>
      <div className="bg-black">
        <div className="card">
          <ul className="list-group list-group-flush ">
            {user?.image && (
              <li className="list-group-item">
                <img
                  src={user.image}
                  alt={`${user.name}'s profile`}
                  className="rounded-3 border border-warning border border-2"
                  style={{ width: "50px", height: "50px" }}
                />
              </li>
            )}
            <li className="list-group-item font-monospace ">
              {user?.name && <div>{user.name}</div>}
            </li>
            <li className="list-group-item font-monospace">
              {user?.email && <div>{user.email}</div>}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserAccountNav;
