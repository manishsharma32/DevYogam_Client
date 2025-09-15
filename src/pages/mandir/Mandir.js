import React, { useEffect, useState } from "react";
import SplitHeader from "./SplitHeader";
import { GlobalCssStyles } from "../../style/GlobalCSS";
import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import Card from "../../component/Card";
import { GetAllTempleAPI } from "../../services/GetAllTempleAPI";

export default function Mandir() {
  const [templeData, setTempleData] = useState([]);
  const getTemple = async () => {
    const res = await GetAllTempleAPI();
    setTempleData(res);
  };
  useEffect(() => {
    getTemple();
  }, []);
const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // <600px
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600-900px

  return (
    <GlobalCssStyles>
    <Box className="parent-container" >

      {isSmallScreen || isMediumScreen ? null : (
        <Box sx={{ minHeight: "100vh" }}>
          <SplitHeader />
        </Box>
      )}
      <Box sx={{ width: "90%", margin: "auto", padding: "2%" }}>
        <Box sx={{display:'flex', justifyContent:'flex-end', m:2}}>
          {/* <Typography className="heading-text">
            Explore Temples With Dev Yogam{" "}
          </Typography> */}
          <Button
            className="create-btn"
            onClick={() => {
              window.open(`${window?.location?.origin}/temple/create`);
              // setOpenCreatePoOja(true);
            }}
          >
            Add Temple
          </Button>
        </Box>

        <Grid container spacing={2} justifyContent={"center"} >
          {Array.isArray(templeData) &&
            templeData.map((item) => (
              <Grid key={item._id} item lg={3} md={4} sm={6} xs={12}>
                <Card item={item} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>

    </GlobalCssStyles>
  );
}

//  {
//       "_id": "68b440799ab7ef8b34c064ba",
//       "title": "string",
//       "location": "string",
//       "bhagwan": "string",
//       "templeDescription": "string",
//       "longDescription": "string",
//       "is_active": true,
//       "images": [
//           "https://i.ibb.co/MDLn4sqy/3a1f7a6673279a4e068c2020bc0a1a16.jpg"
//       ],
//       "benefit_tags": [],
//       "deity": [],
//       "creatives": [],
//       "multilingual_data": [],
//       "createdAt": "2025-08-31T12:30:49.198Z",
//       "updatedAt": "2025-08-31T12:30:49.198Z",
//       "__v": 0
//   },
