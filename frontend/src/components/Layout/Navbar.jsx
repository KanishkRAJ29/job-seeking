import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useContext, useState } from "react"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import {GiHamburgerMenu} from 'react-icons/gi'
const  Navbar=()=>{
  const [show,setShow]=useState(false);
  const {isAuthorized,setIsAuthorized,user}=useContext(Context);
  const navigateTo=useNavigate();

  const handleLogout = async()=>{
    try{
      const response=await axios.get("http://localhost:4000/api/v1/user/logout",{withCredentials: true});
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    }
    catch(error){
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  }

  return<>
  <nav className={isAuthorized?"navbarShow":"navbarHide"}>
    <div className="container">
    <div className="logo">
      <img src="logo_white.png" alt="logo" />
    </div>
    <ul className={!show?"menu":"show-menu menu"}>
      <li>
        <Link to={"/"} onClick={()=>setShow(false)}>
        Home</Link>
      </li>
      <li>
        <Link to={"/job/getall"} onClick={()=>setShow(false)}>
        ALL JOBS</Link>
      </li>
      <li>
        <Link to={"/application/me"} onClick={()=>setShow(false)}>
        {
          user && user.role==="Employer"?"APPLICANT'S APPLICATIONS":"MY APPLICATIONS"
        }
        </Link>
      </li>
      {
        user && user.role==="Employer"?(
          <>
            <li>
              <Link to={'/job/post'} onClick={()=>setShow(false)}>POST NEW JOB</Link>
            </li>
            <li>
              <Link to={'/job/me'} onClick={()=>setShow(false)}>VIEW MY JOBS</Link>
            </li>
          </>
        ):(<></>)
      }
      <button onClick={handleLogout}>LOGOUT</button>
    </ul>
    <div className="hamburger">
      <GiHamburgerMenu onClick={()=>setShow(!show)}/>
    </div>
    </div>
  </nav>
  </>
};
export default Navbar;