import React from "react";
import { Card, Box, Typography, Button, CardContent } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// Helper to get day and month
function getDateParts(dateString) {
  const d = new Date(dateString);
  return {
    day: d.getDate(),
    month: d.toLocaleString("default", { month: "long" }),
  };
}

export default function PujaCard({
  bannerImg, // Banner image URL
  badge, // JSX or string for top-left badge
  date, // "YYYY-MM-DD"
  dateBg = "#FFD700",
  headingHi, // Hindi/main heading (string, can include <br/> tag or \n)
  headingEn, // English heading
  highlight, // JSX or string-highlighted desc
  highlightColor = "#ED6A12",
  location, // string
  locationIconColor = "#ED6A12",
  ctaText = "Limited Slots",
  ctaColor = "#ED6A12",
  onCtaClick,
}) {
  const { day, month } = getDateParts(date);

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        width: 360,
        p: 0,
        overflow: "visible",
        position: "relative",
      }}
    >
      {/* Top Banner with overlay badges */}
      <Box sx={{ position: "relative" }}>
        <img
          src={bannerImg}
          alt="banner"
          style={{
            width: "100%",
            height: 142,
            objectFit: "cover",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        {/* Top LEFT badge */}
        {badge && (
          <Box
            sx={{
              position: "absolute",
              top: 6,
              left: 8,
              background: "#B2041A",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              px: 1.5,
              py: "2px",
              borderRadius: "6px",
              minWidth: 40,
              zIndex: 2,
              boxShadow: 1,
              letterSpacing: 0.3,
            }}
          >
            {badge}
          </Box>
        )}
        {/* Date badge */}
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            background: dateBg,
            color: "#222",
            borderRadius: "8px",
            px: 1.2,
            py: 0.6,
            fontWeight: 700,
            minWidth: 60,
            textAlign: "center",
            zIndex: 2,
            boxShadow: 1,
            letterSpacing: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontWeight: 600, fontSize: 17, m: 0, p: 0, lineHeight: 1 }}
          >
            {day}
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontSize: 13, m: 0, p: 0, mt: "-2px" }}
          >
            {month}
          </Typography>
        </Box>
        {/* Hindi Heading overlay - bottom right */}
        {headingHi && (
          <Box
            sx={{
              position: "absolute",
              bottom: 12,
              right: 12,
              textAlign: "right",
              background: "rgba(255,255,255,0.00)",
              p: 0,
              zIndex: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#fff",
                fontWeight: 900,
                textShadow: "0 0 7px #490101",
              }}
            >
              {headingHi}
            </Typography>
          </Box>
        )}
      </Box>
      {/* Card Content */}
      <CardContent sx={{ pt: 2, pb: 2, px: 2 }}>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, mb: 0.2, fontSize: 19 }}
        >
          {headingEn}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: highlightColor,
            mb: 0.5,
            fontWeight: 500,
            fontSize: 15,
            display: "flex",
            alignItems: "center",
            gap: 0.8,
          }}
        >
          {/* Example highlight: <span role="img" aria-label="star">&#x2728;</span> Bring peace to ancestral souls */}
          {highlight}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1, mt: 1 }}>
          <LocationOnIcon
            sx={{ color: locationIconColor, fontSize: 20, mr: 0.7 }}
          />
          <Typography variant="body2" sx={{ color: "#555", fontSize: 15 }}>
            {location}
          </Typography>
        </Box>
        <Button
          fullWidth
          onClick={onCtaClick}
          sx={{
            // background: ctaColor,
            backgroundColor: "#9a67e6",
            color: "#fff",
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 600,
            py: 1.3,
            fontSize: 16,
            boxShadow: "0 2px 8px 2px rgba(237,106,18,0.09)",
            mt: 1,
            letterSpacing: 0.5,
            "&:hover": { background: "#cd5200" },
          }}
          endIcon={<span style={{ fontSize: "22px" }}>→</span>}
        >
          {ctaText}
        </Button>
      </CardContent>
    </Card>
  );
}
