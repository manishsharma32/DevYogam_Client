import React, { useEffect, useState } from "react";
import SplitHeader from "./SplitHeader";
import { GlobalCssStyles } from "../../style/GlobalCSS";
import {
  Box,
  Button,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PujaCard from "../../component/PoojaCard"; 
import temple2 from "../../assests/temple2.png"
import { GetAllTempleAPI } from "../../services/GetAllTempleAPI";
import { useNavigate } from "react-router-dom";

export default function Mandir({ user }) {
  const [templeData, setTempleData] = useState([]);
  const navigate = useNavigate();

  const getTemple = async () => {
    const res = await GetAllTempleAPI();
    setTempleData(res);
  };

  useEffect(() => {
    getTemple();
  }, []);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600-900px

  const handleNavigate = (id, name) => {
    let s = name.split(" ").join("-");
    navigate(`/temple-details/${s}/${id}`);
  };

  return (
    <GlobalCssStyles>
      <Box className="parent-container">
        {isSmallScreen || isMediumScreen ? null : (
          <Box sx={{ minHeight: "100vh" }}>
            <SplitHeader />
          </Box>
        )}
        <Box sx={{ width: "90%", margin: "auto", padding: "2%" }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", m: 2 }}>
            {user?.role === "admin" && (
              <Button
                className="create-btn"
                onClick={() => {
                  window.open(`${window?.location?.origin}/temple/create`);
                }}
              >
                Add Temple
              </Button>
            )}
          </Box>

          <Grid container spacing={2} justifyContent="center">
            {Array.isArray(templeData) && templeData.length > 0 ? (
              templeData.map((item) => (
                <Grid
                  key={item._id}
                  item
                  size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <Box sx={{ p: 1 }}>
                    <PujaCard
                      bannerImg={item?.images?.[0] || temple2}
                      date={item?.createdAt}
                      headingEn={item?.title}
                      highlight={item?.templeDescription}
                      location={item?.location}
                      isDeleted={item?.isDeleted}
                      ctaText="Explore Temple"
                      onCtaClick={() => handleNavigate(item?._id, item?.title)}
                      user={user}
                    />
                  </Box>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Typography
                  sx={{ fontFamily: "Poppins", textAlign: "center", mt: 4 }}
                >
                  No Temple Found
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </GlobalCssStyles>
  );
}
