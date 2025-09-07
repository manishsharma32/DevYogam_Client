import React from "react";
import Grid from "@mui/material/Grid";
import ServiceCard from "../../component/ServiceCard";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SpaIcon from "@mui/icons-material/Spa";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const services = [
  {
    icon: <SpaIcon fontSize="inherit" />,
    title: "Bhakti Dhara",
    description:
      "India’s First Bhakti Subscription. Offer Chadava to different deities monthly, live talks & more.",
    btnLabel: "Join Now",
  },
  {
    icon: <WhatshotIcon fontSize="inherit" />,
    title: "Pujas",
    description:
      "Book online pujas anytime, anywhere and get prasad delivered to your home.",
    btnLabel: "Book Now",
  },
  {
    icon: <EmojiObjectsIcon fontSize="inherit" />,
    title: "Chadhava",
    description:
      "Offer Chadava at India’s renowned temples for blessings & solving life’s problems.",
    btnLabel: "Offer Now",
  },
  // {
  //   icon: <SpaIcon fontSize="inherit" />,
  //   title: "Bhakti Dhara",
  //   description:
  //     "India’s First Bhakti Subscription. Offer Chadava to different deities monthly, live talks & more.",
  //   btnLabel: "Join Now",
  // },
  // {
  //   icon: <WhatshotIcon fontSize="inherit" />,
  //   title: "Pujas",
  //   description:
  //     "Book online pujas anytime, anywhere and get prasad delivered to your home.",
  //   btnLabel: "Book Now",
  // },
  // {
  //   icon: <EmojiObjectsIcon fontSize="inherit" />,
  //   title: "Chadhava",
  //   description:
  //     "Offer Chadava at India’s renowned temples for blessings & solving life’s problems.",
  //   btnLabel: "Offer Now",
  // },
];

export default function OurServices() {
  return (
    <Box sx={{ width: "90%", margin: "auto" }}>
      <Typography sx={{ fontFamily: "Poppins", fontSize: "2.5rem", fontWeight: 600 }}
      >
        Our Services
      </Typography>
      <Grid container spacing={4} py={4} justifyContent={"center"}>
        {services.map((service, idx) => (
          <Grid sx={{}} key={idx} item size={{ xs: 6, md: 6, sm: 4, lg: 4 }}>
            <ServiceCard {...service} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
