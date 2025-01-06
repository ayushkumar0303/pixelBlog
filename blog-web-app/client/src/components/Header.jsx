import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess, toogleMode } from "../store/store";

function Header() {
  const path = useLocation().pathname;
  // const urlparams = new URLSearchParams(path.search);
  // console.log(urlparams);
  // console.log(urlparams.get("tab"));
  // console.log(path);

  const { currentUser } = useSelector((state) => state.user);
  const { isDark } = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleToogleButton = (event) => {
    dispatch(toogleMode());
  };

  const handleSignOut = async (req, res) => {
    console.log("handling signout");
    try {
      const res = await fetch("http://localhost:3000/server/user/sign-out", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signOutSuccess());
        navigate("/signin");
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar className=" border-b-2 border-b-teal-800">
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
              {isDark ? <BsSunFill /> : <BsMoonFill />}
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
                <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
              </Dropdown>
            ) : (
              <Link to="/signin">
                <Button color="success" outline>
                  SignIn
                </Button>
              </Link>
            )}
          </div>
          <div className="flex flex-col gap-8 md:flex-row md:items-center ">
            <Navbar.Link active={path === "/home"} as={"div"}>
              <Link to="/home">Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path === "/about"} as={"div"}>
              <Link to="/about">About</Link>
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
