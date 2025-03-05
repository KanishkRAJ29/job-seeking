
import React, { useContext } from "react"
import {Context} from '../../main'
import { Navigate } from "react-router-dom";
import HeroSection from "./HeroSection";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";
import HowItWorks from "./HowItWorks";
const  Home=()=>{
  const { isAuthorized, user } = useContext(Context);
  if (isAuthorized === null) {
    return <div>Loading...</div>; // Prevent redirection until the state is resolved
  }
  if (!isAuthorized) {
    return <Navigate to={'/login'} />;
  }
  
  return<section className="homePage page">
    <HeroSection/>
    <HowItWorks/>
    <PopularCategories/>
    <PopularCompanies/>
  </section>
};
export default Home;