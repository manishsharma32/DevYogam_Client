import React, { useEffect, useState } from "react";
import { GlobalCssStyles } from "../../style/GlobalCSS";
import { Box, Button, Grid } from "@mui/material";
import { GetAllChadhavaAPI } from "../../services/GetAllChadhavaAPI";
import PujaCard from "../../component/PoojaCard";
import chadhava from "../../assests/chadava.png"

export default function Chadhava({ user }) {
  const [chadhavaData, setChadhavaData] = useState([]);

  const getChadhava = async () => {
    const res = await GetAllChadhavaAPI();
    setChadhavaData(res);
  };

  useEffect(() => {
    getChadhava();
  }, []);

  // ✅ Fallback data if empty
  const safeChadhavaData =
    Array.isArray(chadhavaData) && chadhavaData.length > 0
      ? chadhavaData
      : [
          {
            _id: "fallback",
            title: ["Default Chadhava"],
            subtitle: "Default Subtitle",
            desc: "No data available at the moment.",
            createdAt: new Date().toISOString(),
            items: [
              {
                image: "/chadhava.png", // fallback image
                title: "Default Item",
                price: 0,
              },
            ],
          },
        ];

  return (
    <GlobalCssStyles>
      <Box sx={{ width: "90%", margin: "auto", padding: "2%" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {user?.role === "admin" && (
            <Button
              className="create-btn"
              onClick={() => {
                window.open(`${window?.location?.origin}/chadhava/create`);
              }}
            >
              Add Chadhava
            </Button>
          )}
        </Box>

        <Grid container spacing={2} justifyContent="center">
          {safeChadhavaData.map((item) => {
            const firstItem = item.items?.[0] || {};
            return (
              <Grid
                key={item._id}
                item
                size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
                lg={3}
                md={4}
                sm={6}
                xs={12}
              >
                <PujaCard
                  bannerImg={firstItem.image || chadhava}
                  date={item.createdAt || new Date().toISOString()}
                  headingEn={item.title?.[0] || "Chadhava"}
                  highlight={item.subtitle || ""}
                  highlightColor="#7c3aed"
                  location={`₹${firstItem.price || 0}`}
                  ctaText="Contribute"
                  onCtaClick={() => {
                    console.log("Chadhava clicked:", item._id);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </GlobalCssStyles>
  );
}
