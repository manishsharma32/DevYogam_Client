import React from "react";
import {
  Card,
  Box,
  Typography,
  Button,
  CardContent,
  CardMedia,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { motion } from "framer-motion";

// Extracts day and short month from date string
function getDateParts(dateString) {
  const d = new Date(dateString);
  return {
    day: d.getDate(),
    month: d.toLocaleString("default", { month: "short" }),
  };
}

export default function PujaCard({
  bannerImg,
  badge,
  date,
  headingEn,
  highlight,
  highlightColor = "#ED6A12",
  location,
  locationIconColor = "#ED6A12",
  ctaText = "Participate Now",
  onCtaClick,
}) {
  const { day, month } = getDateParts(date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 8px 20px rgba(124, 58, 237, 0.3)",
      }}
      transition={{ duration: 0.3 }}
      style={{ height: "100%" }}
    >
      <Card
        sx={{
          borderRadius: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          border: "1.5px solid #ddd",
          boxShadow: 3,
          cursor: "pointer",
          fontFamily: "Poppins",
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
        onClick={onCtaClick}
      >
        <CardMedia
          component="img"
          height="180"
          image={bannerImg}
          alt="puja-banner"
          sx={{
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "anchor-center",
            backgroundColor: "#f3eaff",
            py: 1,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            borderTop: "1px solid #d1bee7",
            fontWeight: 700,
            letterSpacing: 1,
            color: "#7c3aed",
            fontSize: "1.1rem",
            gap: 1,
            userSelect: "none",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 700, fontFamily: "Poppins" }}
          >
            {day}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              textTransform: "uppercase",
              // mt: "4px",
              fontFamily: "Poppins",
            }}
          >
            {month}
          </Typography>
        </Box>
        <CardContent sx={{ flexGrow: 1, px: 3, pt: 3 }}>
          {badge && (
            <Box
              sx={{
                backgroundColor: "#B2041A",
                color: "#fff",
                fontWeight: 700,
                fontSize: 13,
                px: 2,
                py: "3px",
                borderRadius: 2,
                display: "inline-block",
                mb: 1,
                letterSpacing: 0.5,
                userSelect: "none",
                fontFamily: "Poppins",
              }}
            >
              {badge}
            </Box>
          )}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 1,
              fontFamily: "Poppins",
              color: "#79245a",
            }}
          >
            {headingEn}
          </Typography>
          {highlight && (
            <Typography
              sx={{
                color: highlightColor,
                fontWeight: 600,
                mb: 1,
                userSelect: "none",
                fontFamily: "Poppins",
                color: "#7c3aed",
              }}
            >
              {highlight}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              color: "#555",
              gap: 0.7,
            }}
          >
            <LocationOnIcon
              sx={{
                color: locationIconColor,
                fontSize: 20,
                fontFamily: "Poppins",
              }}
            />
            <Typography
              variant="body2"
              sx={{
                fontSize: 15,
                fontFamily: "Poppins",
                color: locationIconColor,
              }}
            >
              {location}
            </Typography>
          </Box>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#7c3aed",
              fontFamily: "Poppins",
              color: "#fff",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              py: 1,
              fontSize: 16,
              boxShadow: "0 4px 12px rgba(124, 58, 237, 0.4)",
              // "&:hover": { backgroundColor: "#5b20c9" }
              "&:hover": { background: "#cd5200" },

              transition: "background-color 0.3s ease",
            }}
            endIcon={<span style={{ fontSize: 22 }}>→</span>}
            onClick={onCtaClick}
          >
            {ctaText}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
