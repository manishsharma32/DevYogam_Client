import React from "react";
import Grid from "@mui/material/Grid";
import ServiceCard from "../../component/ServiceCard";
import TempleHinduOutlinedIcon from "@mui/icons-material/TempleHinduOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import EmojiObjectsOutlinedIcon from "@mui/icons-material/EmojiObjectsOutlined";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const services = [
  {
    icon: <LocalFireDepartmentOutlinedIcon fontSize="inherit" />,
    title: "Pujas",
    description:
      "Book personalized online pujas performed by experienced priests, with prasad delivered to your doorstep.",
    btnLabel: "Book Now",
    link: "/pooja",
  },
  {
    icon: <EmojiObjectsOutlinedIcon fontSize="inherit" />,
    title: "Chadhava",
    description:
    "Offer chadava at India’s most renowned temples and be part of age-old traditions. Seek divine blessings for yourself, all from the comfort of your home.",
    btnLabel: "Offer Now",
    link: "/chadhava",
  },
  {
    icon: <TempleHinduOutlinedIcon fontSize="inherit" />,
    title: "Temples",
    description:
      "Connect with India’s most revered temples, participate in rituals, and be part of a divine spiritual journey from anywhere.",
    btnLabel: "Join Now",
    link: "/temple",
  },
];

export default function OurServices() {
  const navigate = useNavigate()
  return (
    <Box sx={{ width: "90%", margin: "auto" }}>
      <Typography
        sx={{ fontFamily: "Poppins", fontSize: "2.5rem", fontWeight: 600 }}
      >
        Our Services
      </Typography>
      <Grid container spacing={4} py={4} justifyContent={"center"}>
        {services.map((service, idx) => (
          <Grid sx={{}} key={idx} item size={{ xs: 6, md: 6, sm: 4, lg: 4 }}>
            <ServiceCard onClick={() => navigate(service?.link) } {...service} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
