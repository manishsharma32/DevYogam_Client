import React from "react";
import CustomCarousel from "../../component/CustomCarousel";
import OurServices from "./OurServices";
import ExploreTemples from "./ExploreTemples";
import ReviewSection from "./ReviewSection";
import Typography from "@mui/material/Typography";
import Footer from "../../component/Footer";
import img1 from "../../assests/1.png"
import img2 from "../../assests/2.png"
const slides = [
  {
    image: img1,
    title: "Welcome to DevYogam",
    description: "A divine journey begins here.",
  },
  {
    image: img2,
    title: "Spiritual Pooja Services",
    description: "Book sacred rituals online anytime.",
  },
  {
    image: "https://images.unsplash.com/photo-1667670651830-2d5bcd0e4f8f?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Visit Mandir",
    description: "Explore famous temples and holy places.",
  },
];

export default function Home() {
  return (
    <div>
      <CustomCarousel items={slides} />
      <OurServices />
      <ExploreTemples/>
      <ReviewSection />
    </div>
  );
}
