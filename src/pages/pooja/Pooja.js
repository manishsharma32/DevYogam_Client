import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { GlobalCssStyles } from "../../style/GlobalCSS";
import { useNavigate } from "react-router-dom";
import PujaCard from "../../component/PoojaCard";
import { GetAllPoojasAPI } from "../../services/GetAllPoojasAPI";

export default function Pooja() {
  const navigate = useNavigate();
  const [poojaData, setPoojaData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Get user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userRole = storedUser?.role || "user";

  const getPooja = async () => {
    setLoading(true);
    const res = await GetAllPoojasAPI();

    // just store all data (admin filter will be applied later in render)
    setPoojaData(res);
    setLoading(false);
  };

  useEffect(() => {
    getPooja();
  }, []);

  const handeNavigate = (id, name) => {
    let s = name.split(" ").join("-");
    navigate(`/pooja-details/${s}/${id}`);
  };

  // Skeleton UI
  const skeletons = Array.from(new Array(6)).map((_, index) => (
    <Grid
      item
      key={index}
      xs={12}
      sm={6}
      md={4}
      size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
    >
      <Card
        sx={{
          width: "100%",
          border: "1px solid #D9D9D9",
          borderRadius: 2,
          boxShadow: "none",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={160}
          sx={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
        />
        <CardContent sx={{ p: 2 }}>
          <Skeleton variant="text" width="60%" height={30} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="40%" height={25} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="95%" height={20} sx={{ mb: 2 }} />
          <Box display="flex" justifyContent="flex-end">
            <Skeleton
              variant="rectangular"
              width={120}
              height={36}
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid>
  ));

  const visiblePoojas =
    userRole === "admin"
      ? poojaData 
      : poojaData.filter((item) => !item.isDeleted); 
  return (
    <GlobalCssStyles>
      <Box sx={{ padding: "2%", width: "90%", margin: "auto" }}>
        <Box className="heading-container">
          <Typography className="heading-text">Pooja List</Typography>
          {userRole === "admin" && (
            <Button
              className="create-btn"
              onClick={() => {
                window.open(`${window?.location?.origin}/pooja/create`);
              }}
            >
              Add Pooja
            </Button>
          )}
        </Box>

        {/* Pooja List */}
        <Grid container spacing={2}>
          {loading ? (
            skeletons
          ) : visiblePoojas.length > 0 ? (
            visiblePoojas.map((item, index) => (
              <Grid
                item
                key={index}
                size={{ xs: 12, sm: 6, md: 4, lg: 4 }}
                xs={12}
                sm={6}
                md={4}
                lg={4}
              >
                <Box sx={{ p: 1 }}>
                  <PujaCard
                    user={storedUser}
                    isDeleted={item?.isDeleted}
                    bannerImg={item?.images?.[0]?.url}
                    badge={item?.badge}
                    date={item?.capDate}
                    dateBg={item?.dateBg || "#FFD700"}
                    headingHi={item?.titleHi}
                    headingEn={item?.title}
                    highlight={item?.subtitle}
                    highlightColor={item?.highlightColor || "#ED6A12"}
                    location={item?.location}
                    ctaText={item?.ctaText || "Participate Now"}
                    ctaColor={item?.ctaColor || "#ED6A12"}
                    onCtaClick={() => handeNavigate(item?._id, item?.title)}
                  />
                </Box>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography sx={{ fontFamily: "Poppins", textAlign: "center" }}>
                No Pooja Found
              </Typography>
            </Grid>
          )}
        </Grid>
      </Box>
    </GlobalCssStyles>
  );
}
