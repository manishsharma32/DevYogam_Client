import React from "react";
import { Route, Routes } from "react-router";
import Pooja from "../pages/pooja/Pooja";
import Chadhava from "../pages/chadhava/Chadhava";
import Mandir from "../pages/mandir/Mandir";
import Home from "../pages/home/Home";
import AddPooja from "../pages/pooja/AddPooja";
import AddTemple from "../pages/mandir/AddTemple";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/about" element={<About />} /> */}
      {/* <Route path="/contact" element={<Contact />} /> */}
      <Route path="/pooja" element={<Pooja />} />
      <Route path="/pooja/create" element={<AddPooja />} />
      <Route path="/chadava" element={<Chadhava />} />
      <Route path="/mandir" element={<Mandir />} />
      <Route path="/mandir/create" element={<AddTemple />} />
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
