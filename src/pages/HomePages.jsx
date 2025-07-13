import React from "react";
import Hero from "../componant/Hero";
import HomeCard from "../componant/HomeCard"
import JobListings from "../componant/JobListings"
import ViewAllJobs from "../componant/ViewAllJobs";
const HomePages = () => {
  return (
    <>
      <Hero />
      <HomeCard />
      <JobListings isHome={true} />
      <ViewAllJobs />
    </>
  );
};

export default HomePages;
