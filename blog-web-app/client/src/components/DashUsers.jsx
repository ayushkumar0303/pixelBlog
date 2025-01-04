import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GrStatusGood } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

function DashUsers() {
  const [users, setUsers] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [usersLoading, setUsersLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setUsersLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/server/user/get-users`, {
          credentials: "include",
        });
        // console.log(res);
        const data = await res.json();

        // console.log(data.users);

        if (res.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log(error.message);
      }
      setUsersLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div className="overflow-x-auto mx-auto py-5">
      {!usersLoading ? (
        <>
          {currentUser.isAdmin && users.length > 0 ? (
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Date created</Table.HeadCell>
                <Table.HeadCell>Profile</Table.HeadCell>
                <Table.HeadCell>Username</Table.HeadCell>
                <Table.HeadCell>Email</Table.HeadCell>
                <Table.HeadCell>Admin</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell>
                  <span className="">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              {users.map((user) => (
                <Table.Body className="divide-y" key={user._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className="h-10 w-10 rounded-full object-cover bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${user._id}`}>{user.username}</Link>
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? (
                        <GrStatusGood className="text-green-500" />
                      ) : (
                        <RxCross2 className="text-red-500" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          // setShowModal(true);
                          // postId.current = post._id;
                        }}
                        className="text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/update-user/${user._id}`}>
                        <span className="text-teal-500 hover:underline">
                          Edit
                        </span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          ) : (
            <h1>No user found</h1>
          )}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default DashUsers;
