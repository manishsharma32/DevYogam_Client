import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GlobalCssStyles } from "../../style/GlobalCSS";
import AddPooja from "./AddPooja";
import { useNavigate } from "react-router-dom";
import PujaCard from "../../component/PoojaCard";
import { GetAllPoojasAPI } from "../../services/GetAllPoojasAPI";
export default function Pooja() {
  const { navigate } = useNavigate();

  const [openCreatePoOja, setOpenCreatePoOja] = useState(false);

  const getPooja = async () => {
    const res = await GetAllPoojasAPI();
    console.log(res);
  };

  useEffect(() => {
    getPooja();
  }, []);

  return (
    <GlobalCssStyles>
      <Box sx={{ padding: "2%", width: "90%", margin: "auto" }}>
        <Box className="heading-container">
          <Typography className="heading-text">Pooja List</Typography>
          <Button
            className="create-btn"
            onClick={() => {
              window.open(`${window?.location?.origin}/pooja/create`);
              // setOpenCreatePoOja(true);
            }}
          >
            Add Pooja
          </Button>
        </Box>

        {/* Pooja List  */}

        <Grid container size={4}>
          {/* <PujaCard
            bannerText="ऋणमुक्तेश्वर महादेव पूजा"
            bannerSubText="ऋणमुक्तेश्वर महादेव मंदिर, उज्जैन"
            bannerBg="#FFEB3B"
            image="https://images.unsplash.com/photo-1676731790152-fe6f3b9eb025?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            title="Rinmukteshwar Mahadev Puja"
            subtitle="To get rid of debt…"
            location="Rin Mukteshwar Mahadev Temple, Ujjain"
            date="2025-08-26"
            onBook={() => alert("Book Puja Clicked!")}
          /> */}
          <PujaCard
            bannerImg="https://images.unsplash.com/photo-1676731790152-fe6f3b9eb025?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            // Your puja's banner image URL
            badge={
              <Box
                component="span"
                sx={{ display: "flex", alignItems: "center", gap: 0.6 }}
              >
                2{" "}
                <Box component="span" sx={{ fontSize: 12, ml: 0.3 }}>
                  लाख+
                </Box>
              </Box>
            }
            date="2025-09-07"
            dateBg="#FFD700"
            headingHi={
              <>
                पितृदोष
                <br />
                शांति पूजा
              </>
            }
            headingEn="Pitradosh Shanti Puja, Ujjain"
            highlight={
              <>
                <span role="img" aria-label="peace">
                  🕉️
                </span>{" "}
                <span style={{ fontWeight: 600 }}>
                  Bring peace to ancestral souls and remove lineage obstacles
                  with Pitradosh Shanti Puja.
                </span>
              </>
            }
            highlightColor="#ED6A12"
            location="Siddhvat Mandir, Ram Ghat, Ujjain, Madhya Pradesh, India"
            ctaText="Limited Slots"
            ctaColor="#ED6A12"
            onCtaClick={() => alert("Slot Booked!")}
          />
        </Grid>
      </Box>
    </GlobalCssStyles>
  );
}
