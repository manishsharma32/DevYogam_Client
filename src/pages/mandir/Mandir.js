import React, { useEffect, useState } from "react";
import SplitHeader from "./SplitHeader";
import { GlobalCssStyles } from "../../style/GlobalCSS";
import { Box, Button, Grid, Typography } from "@mui/material";
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

  return (
    <GlobalCssStyles>
      <Box sx={{ minHeight: "100vh" }}>
        <SplitHeader />
      </Box>
      <Box sx={{ width: "90%", margin: "auto", padding: "2%" }}>
        <Box className="heading-container">
          <Typography className="heading-text">
            Explore Temples With Dev Yogam{" "}
          </Typography>
          {/* <Button
            className="create-btn"
            onClick={() => {
              window.open(`${window?.location?.origin}/mandir/create`);
              // setOpenCreatePoOja(true);
            }}
          >
            Add Temple
          </Button> */}
        </Box>

        <Grid container spacing={2}>
          {Array.isArray(templeData) &&
            templeData.map((item) => (
              <Grid key={item._id} item lg={3} md={4} sm={6} xs={12}>
                <Card item={item} />
              </Grid>
            ))}
        </Grid>
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
