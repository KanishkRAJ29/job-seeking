
import { Context } from "../../main";
import React, { useContext } from "react"
import { Link } from "react-router-dom";
import {FaFacebook,FaYoutube,FaLinkedin} from 'react-icons/fa'
import {RiInstagramFill} from 'react-icons/ri'
const  Footer=()=>{
  const{isAuthorized}=useContext(Context);
  return<>
  <footer className={isAuthorized?"footerShow":"footerHide"}>
  <div>&copy; All Rights Reserved By Kanishk</div>
  <div>
    <Link to={'/'} target="_blank">
    <FaFacebook/></Link>
    <Link to={'/'} target="_blank"><FaYoutube/></Link>
    <Link to={'/'} target="_blank"><FaLinkedin/></Link>
    <Link to={'/'} target="_blank"><RiInstagramFill/></Link>
  </div>
  </footer>
  </>
};
export default Footer;