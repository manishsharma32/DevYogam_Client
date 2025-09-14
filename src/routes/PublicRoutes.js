import React from "react";
import { Route, Routes } from "react-router";
import Pooja from "../pages/pooja/Pooja";
import Chadhava from "../pages/chadhava/Chadhava";
import Mandir from "../pages/mandir/Mandir";
import Home from "../pages/home/Home";
import AddPooja from "../pages/pooja/AddPooja";
import AddTemple from "../pages/mandir/AddTemple";
import PrivacyPolicy from "../pages/policies/PrivacyPolicy";
import Disclamer from "../pages/policies/Disclaimer";
import TermsAndConditions from "../pages/policies/TermsAndConditions";
import AddChadhava from "../pages/chadhava/AddChadhava";
import PoojaDetails from "../pages/pooja/PoojaDetails";
import PujaBookingPage from "../pages/pooja/PujaBookingPage";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/contact" element={<Contact />} /> */}
      <Route path="/pooja" element={<Pooja />} />
      <Route path="/pooja/create" element={<AddPooja />} />
      <Route path="/pooja-details/:name/:id" element={<PoojaDetails />} />
      <Route path="/pooja-booking/:type/:name/:id" element={<PujaBookingPage />} />
      <Route path="/chadhava" element={<Chadhava />} />
      <Route path="/temple" element={<Mandir />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/disclaimer" element={<Disclamer />} />
      <Route path="/terms-conditions" element={<TermsAndConditions />} />
      <Route path="/temple/create" element={<AddTemple />} />
      <Route path="/chadhava/create" element={<AddChadhava/>}/>
      {/* You can add more routes here */}
    </Routes>
  );
}

const navItemsLeft = [
  { label: "Home", link: "#" },
  { label: "Pooja", link: "/pooja" },
];
const navItemsRight = [
  { label: "Chadava", link: "/chadhava" },
  { label: "Mandir", link: "/mandir" },
];
const moreOptions = [
  { label: "Login", link: "/login" },
  // { label: "Crystals", link: "#" },
  { label: "Contact Us", link: "/contact" },
];
