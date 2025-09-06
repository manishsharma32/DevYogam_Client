import React from "react";
import Grid from "@mui/material/Grid";
import ServiceCard from "../../component/ServiceCard";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SpaIcon from "@mui/icons-material/Spa";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomCarousel from "../../component/CustomCarousel";
import TempleCard from "../../component/TempleCardCarousal";
import ReviewCard from "../../component/ReviewCard";

export default function ReviewSection() {
  return (
    <Box sx={{ width: "88%", maxWidth: 1300, mx: "auto", my: 5 }}>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: "2.5rem",
          fontWeight: 600,
          mb: 4,
          textAlign: "center",
        }}
      >
        Customers Reviews
      </Typography>
      <Grid container spacing={1} py={4} justifyContent={"center"}>
        <ReviewCard />
      </Grid>
    </Box>
  );
}
