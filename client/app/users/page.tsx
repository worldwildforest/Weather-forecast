"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface UsersProps {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

const Users = () => {
  const router = useRouter();

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    // const res = await fetch("http://localhost:8000/api/v1/users")
    // const data = await res.json()
    const data = await axios.get("http://localhost:5000/api/v1/users");
    setUsers(data.data.data);
    console.log(data.data.data);
  };

  const deleteUser = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/v1/user/${id}`);
    const singleUser = users.filter((user: UsersProps) => user._id !== id);
    setUsers(singleUser);
    toast.success("User Deleted Successfully");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="users mt-10">
        <div className="flex justify-end p-4">
          <button
            className="bg-indigo-500 text-white rounded-md px-3 py-2"
            onClick={() => router.push("/")}
          >
            Add User
          </button>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Profile
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: UsersProps) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-400">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-500 whitespace-nowrap dark:text-white"
                    >
                      {user.firstName}
                    </th>
                    <td className="px-6 py-4">{user.lastName}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.phone}</td>
                    <td className="px-6 py-4">
                      <img
                        className="h-16 w-16 rounded-full"
                        src={user.avatar}
                        alt=""
                      />
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white p-2 rounded-lg"
                      >
                        Delete
                      </button>
                      <Link
                        className="ml-3 bg-blue-500 text-white p-2 rounded-lg"
                        href={`/users/${user._id}`}
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
