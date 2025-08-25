import React, { useEffect, useState } from "react";
import { NavLink, matchPath,Link } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import IntelliLogo from "../../assets/Logo/Intelli-logo.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import {GiHamburgerMenu} from "react-icons/gi"
import {RxCross1} from "react-icons/rx"

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();
  const [loading, setLoading] = useState(false)

  // const subLinks = [
  //   {
  //     title: "python",
  //     link: "/catalog/python",
  //   },
  //   {
  //     title: "web dev",
  //     link: "/catalog/web-development",
  //   },
  // ];

  const[subLinks , setSubLinks] = useState([]);
  const [showNavbar , setShowNavbar] = useState(false);

  const fetchSublinks = async () => {
      try {
        setLoading(true);
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        // console.log("Printing sub Links result:", result);
        setSubLinks(result.data.data);
      } catch (error) {
        throw new Error(error);
        // console.log("Could not fetch the category list");
      }
      setLoading(false);
    };

  useEffect(() => {
     fetchSublinks();
  },[])

  const matchRoute = (route) => {
    return matchPath(route, location.pathname);
  };
  return (
    <div className=" md:flex items-center justify-center py-[0.75rem] md:py-[0.5rem] border-b-[1px] border-b-richblack-700 bg-richblack-800">
      <div className=" md:flex relative  w-11/12 max-w-maxContent items-center justify-between mx-auto">
        {/* Image */}
        <NavLink to="/">
          <img
            src={IntelliLogo}
            alt="logo img"
            width={160}
            height={42}
            loading="lazy"
            className=""
          />
        </NavLink>

        {/* Nav Links */}
        <nav className="hidden  md:block transition-all duration-2000">
          <ul className="md:flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ?(
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="spinner"></p>
                        ) : subLinks.length ? (
                          <>
                            {
                              subLinks?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                    <NavLink to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link?.title}
                      </p>
                    </NavLink>
                  )
                  }
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Login/Signup/Dashboard */}
        <div className="md:flex items-center gap-x-4  hidden  transition-all duration-2000">

        <div>
        {user && user?.accountType !== "Instructor" && (
            <NavLink to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-richblack-100 w-6 h-6"  />
              {totalItems > 0 && <span
              className="absolute -top-1 -right-2 bg-[green] text-xs w-5 h-5 flex 
                    justify-center items-center animate-bounce rounded-full text-white"
              >{totalItems}</span>}
            </NavLink>
          )}
        </div>
         
                <div>
                {token === null && (
                <NavLink to="/login">
              <button
                className="border border-richblack-700 
                                bg-richblack-800  px-[12px] py-[8px]
                                rounded-md text-richblack-100"
              >
                Log in
              </button>
            </NavLink>
            )}
                </div>
                
                <div>
                {token === null && (
            <NavLink to="/signup">
              <button
                className="border border-richblack-700 
                                bg-richblack-800  px-[12px] py-[8px]
                                rounded-md text-richblack-100"
              >
                Sign Up
              </button>
            </NavLink>
          )}
                </div>
          

          

          {token !== null && <ProfileDropDown />}
        </div>



          {/* Nav Links for mobile */}
          <nav className={`${showNavbar ? "block" :  "hidden"}
           md:hidden  mx-auto text-center mt-[3rem] transition-all duration-2000`}>
          <ul className="text-center flex flex-col gap-6 gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ?(
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 justify-center w-[100%] ${
                        matchRoute("/catalog/:catalogName")
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      <p>{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                        {loading ? (
                          <p className="spinner"></p>
                        ) : subLinks.length ? (
                          <>
                            {
                              subLinks?.map((subLink, i) => (
                                <Link
                                  to={`/catalog/${subLink.name
                                    .split(" ")
                                    .join("-")
                                    .toLowerCase()}`}
                                  className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                  key={i}
                                >
                                  <p>{subLink.name}</p>
                                </Link>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Courses Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                    <NavLink to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link?.title}
                      </p>
                    </NavLink>
                  )
                  }
                </li>
              );
            })}
          </ul>
          </nav>

        {/* Login/Signup/Dashboard for mobile */}
        <div className={`${showNavbar ? "block" :  "hidden"} md:hidden 
        text-center mt-[3rem] transition-all duration-2000  `}>
            <div className="relative" >
            {user && user?.accountType !== "Instructor" && (
                <NavLink to="/dashboard/cart" className="relative">
                  <AiOutlineShoppingCart className="absolute -left-4 bottom-2 text-richblack-100 w-6 h-6"  />
                  {totalItems > 0 && <span
                  className="absolute -top-9 -right-5 bg-[green] text-xs w-5 h-5 flex 
                        justify-center items-center animate-bounce rounded-full text-white"
                  >{totalItems}</span>}
                </NavLink>
              )}
            </div>
            
                    <div className="mb-[1rem]">
                    {token === null && (
                    <NavLink to="/login">
                  <button
                    className="border border-richblack-700 
                                    bg-richblack-800  px-[12px] py-[8px]
                                    rounded-md text-richblack-100"
                  >
                    Log in
                  </button>
                </NavLink>
                )}
                    </div>
                    
                    <div>
                    {token === null && (
                <NavLink to="/signup">
                  <button
                    className="border border-richblack-700 
                                    bg-richblack-800  px-[12px] py-[8px]
                                    rounded-md text-richblack-100"
                  >
                    Sign Up
                  </button>
                </NavLink>
              )}
                    </div>
              

              

              {token !== null && <ProfileDropDown />}
        </div>
                  
        <div
          onClick={() => setShowNavbar(!showNavbar)}
         className="md:hidden block absolute right-4 top-0 text-3xl text-richblack-200">
         {
          showNavbar ? (<RxCross1/>) : (<GiHamburgerMenu/>)
         }
          
          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
