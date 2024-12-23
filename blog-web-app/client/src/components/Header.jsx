import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { BsMoonFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toogleMode } from "../store/store";

function Header() {
  const path = useLocation().pathname;
  // const urlparams = new URLSearchParams(path.search);
  // console.log(urlparams);
  // console.log(urlparams.get("tab"));
  // console.log(path);

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleToogleButton = (event) => {
    dispatch(toogleMode());
  };

  return (
    <Navbar className="shadow-md">
      <Link to="/" className="font-semibold text-sm sm:text-xl">
        <span className="bg-green-700 px-3 py-1 rounded text-white">Pixel</span>
        Blog
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search"
          rightIcon={AiOutlineSearch}
          // className="sm:inline"
        />
      </form>
      <Navbar.Toggle />
      <Navbar.Collapse className="lg:w-1/2">
        <div className="w-full flex gap-4 flex-col lg:flex-row lg:justify-between ">
          <div className="flex gap-4 lg:order-2 items-center">
            <Button
              color="gray"
              pill
              // className="h-full"
              onClick={handleToogleButton}
            >
              <BsMoonFill />
            </Button>
            {currentUser && currentUser.email ? (
              <Dropdown
                label={
                  <Avatar
                    rounded
                    img={currentUser.profilePicture}
                    className="border-solid border-2 border-gray-500 rounded-full"
                  />
                }
                inline
                arrowIcon={false}
              >
                <Dropdown.Header>
                  <span className="block text-sm">{`@${currentUser.username}`}</span>
                  <span className="block truncate text-sm font-semibold">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Link to="/dashboard/?tab=profile">
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
                <Dropdown.Item>Sign out</Dropdown.Item>
              </Dropdown>
            ) : (
              <Button color="success" outline>
                SignIn
              </Button>
            )}
          </div>
          <div className="flex flex-col gap-8 md:flex-row md:items-center ">
            <Navbar.Link active={path === "/home"} as={"div"}>
              <Link to="/home">Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/about"} as={"div"}>
              <Link to="/about">About</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/dashboard"} as={"div"}>
              <Link to="/dashboard">Dashboard</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/projects"} as={"div"}>
              <Link to="/projects">Projects</Link>
            </Navbar.Link>
          </div>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;