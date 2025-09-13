import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GlobalCssStyles } from "../../style/GlobalCSS";
import AddPooja from "./AddPooja";
import { useNavigate } from "react-router-dom";
import PujaCard from "../../component/PoojaCard";
import { GetAllPoojasAPI } from "../../services/GetAllPoojasAPI";
export default function Pooja() {
  const navigate = useNavigate();

  const [openCreatePoOja, setOpenCreatePoOja] = useState(false);
  const [poojaData, setPoojaData] = useState([]);

  const getPooja = async () => {
    const res = await GetAllPoojasAPI();
    setPoojaData(res);
  };

  useEffect(() => {
    getPooja();
  }, []);

  const handeNavigate = (id, name) => {
    let s = name.split(" ").join("-")
    navigate(`/pooja-details/${s}/${id}`);
  };

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

        <Grid container spacing={2}>
          {poojaData?.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <PujaCard
                bannerImg={item?.images[0]}
                badge={item?.badge}
                date={item?.capDate}
                dateBg={item?.dateBg || "#FFD700"}
                headingHi={item?.titleHi}
                headingEn={item?.title}
                highlight={item?.highlight}
                highlightColor={item?.highlightColor || "#ED6A12"}
                location={item?.location}
                ctaText={item?.ctaText || "Participate Now"}
                ctaColor={item?.ctaColor || "#ED6A12"}
                onCtaClick={() => handeNavigate(item?._id, item?.title)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </GlobalCssStyles>
  );
}
