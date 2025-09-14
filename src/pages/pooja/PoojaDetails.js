import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Button, Paper, Typography } from "@mui/material";
import { GlobalCssStyles } from "../../style/GlobalCSS";
import { useNavigate, useParams } from "react-router-dom";
import { GetPoojaByID } from "../../services/GetPoojaByID";
import { styled } from "@mui/material/styles";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Grid from "@mui/material/Grid";
import wtspLogo from "../../assests/wtsp.png";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function PoojaDetails() {
  const navigate = useNavigate();
  const { name, id } = useParams();
  const [poojaData, setPoojaData] = useState(null);

  useEffect(() => {
    const getPooja = async () => {
      const res = await GetPoojaByID(id);
      setPoojaData(res);
    };
    getPooja();
  }, [id]);

  // Use the product data directly instead of API response
  // const poojaData = product;

  // Combine images and images_hi arrays for the carousel
  const priceData = poojaData?.price;
  const images = (poojaData?.images || []).concat(poojaData?.images_hi || []);
  const priceDetails = poojaData?.price?.[0] || {};

  const pricePackages = [
    {
      key: "single",
      title: "Single",
      subtitle: "For 1 person",
      recommended: false,
    },
    {
      key: "couple",
      title: "Couple",
      subtitle: "Upto 2 people",
      recommended: true,
    },
    {
      key: "family",
      title: "Family",
      subtitle: "Upto 4 people",
      recommended: false,
    },
  ];

  const handleNavigate = (type, name, id) => {
    navigate(`/pooja-booking/${type}/${name}/${id}`);
  };

  return (
    <GlobalCssStyles>
      <Box sx={{ marginTop: "3%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item size={{ xs: 12, md: 12, lg: 6 }}>
              <Item>
                <Carousel showThumbs={false} showIndicators infiniteLoop>
                  {images?.map((url, idx) => (
                    <div key={idx}>
                      <img
                        src={url}
                        alt={`slide-${idx}`}
                        style={{ borderRadius: 12 }}
                      />
                    </div>
                  ))}
                </Carousel>
              </Item>
            </Grid>
            <Grid size={{ xs: 12, md: 12, lg: 6 }}>
              <Item>
                <Box sx={{ textAlign: "start", fontFamily: "Poppins" }}>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "1.5rem",
                      fontWeight: 500,
                      marginTop: "2%",
                    }}
                  >
                    {poojaData?.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "1rem",
                      fontWeight: 500,
                      marginTop: "2%",
                    }}
                  >
                    {poojaData?.subtitle}
                  </Typography>

                  <Typography
                    variant="body1"
                    mt={1}
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "1rem",
                      fontWeight: 500,
                      marginTop: "2%",
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    <LocationOnOutlinedIcon /> {poojaData?.location}
                  </Typography>
                  <Typography
                    mt={1}
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "1rem",
                      fontWeight: 500,
                      marginTop: "2%",
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    <CalendarMonthOutlinedIcon />{" "}
                    {new Date(poojaData?.capDate).toLocaleDateString()}
                  </Typography>
                  <hr style={{ marginTop: "2%", opacity: "70%" }} />

                  <Typography
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "1rem",
                      fontWeight: 500,
                      marginTop: "2%",
                    }}
                  >
                    <strong>1000+ </strong>
                    Devotees booked this Puja with Dev Yogam
                  </Typography>

                  <Box
                    sx={{
                      width: "100%",
                      marginTop: "2%",
                      display: "flex",
                      alignItems: "end",
                    }}
                  >
                    <Button
                      sx={{
                        backgroundColor: "#9a67e6",
                        color: "#fff",
                        borderRadius: 2,
                        textTransform: "none",
                        fontFamily: "Poppins",
                        fontWeight: 600,
                        py: 0.5,
                        height: "3rem",
                        fontSize: 16,
                        boxShadow: "0 2px 8px 2px rgba(237,106,18,0.09)",
                        mt: 1,
                        letterSpacing: 0.1,
                        "&:hover": { background: "#cd5200" },
                        width: "80%",
                      }}
                      onClick={()=>{handleNavigate('single', name , id)}}
                    >
                      Book Pooja
                    </Button>
                    <Button sx={{ marginTop: "10px" }} onClick={() =>  window.open("https://wa.me/917024542030", "_blank")}>
                      <img
                        style={{ width: "45px", height: "45px" }}
                        src={wtspLogo}
                      />
                    </Button>
                  </Box>

                  {/* 
                  <section>
                    <Typography variant="h6" mt={2}>
                      Benefits
                    </Typography>
                    {(poojaData.benefit || []).map((b) => (
                      <Box key={b._id} mb={2}>
                        <Typography variant="subtitle1">
                          <strong>{b.title}</strong>
                        </Typography>
                        <Typography variant="body2">{b.description}</Typography>
                      </Box>
                    ))}
                  </section>
                  <section>
                    <Typography variant="h6" mt={2}>
                      FAQs
                    </Typography>
                    {(poojaData.faq || []).map((f) => (
                      <Box key={f._id} mb={2}>
                        <Typography variant="subtitle2">
                          <strong>Q: {f.question}</strong>
                        </Typography>
                        <Typography variant="body2">A: {f.answer}</Typography>
                      </Box>
                    ))}
                  </section> */}
                  {/* {poojaData.price?.length > 0 && (
                    <section>
                      <Typography variant="h6" mt={2}>
                        Price
                      </Typography>
                      <ul>
                        {poojaData.price.map((p, idx) => (
                          <li key={idx}>{p}</li>
                        ))}
                      </ul>
                    </section>
                  )} */}
                  {/* <hr /> */}
                  {/* <Typography variant="caption">
                    Created: {new Date(poojaData.createdAt).toLocaleString()}
                  </Typography> */}
                </Box>
              </Item>
            </Grid>
          </Grid>
          <Box sx={{ width: "90%", margin: "auto" }}>
            {/* Price Boxes */}
            {poojaData?.price?.length > 0 && (
              <Box sx={{ mt: 5 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    mb: 2,
                    fontFamily: "Poppins",
                    fontSize: "1.5rem",
                  }}
                >
                  Select Puja Package
                </Typography>
                <Grid container spacing={2}>
                  {pricePackages?.map((pkg, idx) => {
                    const data = priceDetails[pkg.key];
                    if (!data || data.amaount == null) return null;
                    // Optionally split long description into brief benefits using ". " split
                    const benefits = data.description
                      ?.split(". ")
                      .filter(Boolean);

                    return (
                      <Grid item size={{ xs: 12, md: 12, lg: 4 }} key={pkg.key}>
                        <Paper
                          // elevation={1}
                          sx={{
                            borderRadius: 3,
                            p: 3,
                            position: "relative",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            // boxShadow:
                            //   pkg.recommended &&
                            //   "0 2px 8px 2px rgba(237,106,18,0.13)",
                            // border: pkg.recommended && "2px solid #ec407a",
                          }}
                        >
                          {/* {pkg.recommended && (
                            <Box
                              sx={{
                                position: "absolute",
                                top: 18,
                                left: 18,
                                background: "#ec407a",
                                color: "#fff",
                                px: 1.5,
                                py: 0.5,
                                borderRadius: 2,
                                textTransform: "uppercase",
                                fontWeight: "bold",
                                fontSize: 13,
                                zIndex: 2,
                              }}
                            >
                              Recommended
                            </Box>
                          )} */}
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 500,
                              mb: 1,
                              fontFamily: "Poppins",
                            }}
                          >
                            {pkg?.title}
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{
                              color: "#7c3aed",
                              fontWeight: 700,
                              mb: 1,
                              fontFamily: "Poppins",
                            }}
                          >
                            {data.amaount !== null
                              ? `₹${data.amaount}`
                              : "Contact for price"}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{ mb: 1, color: "#444", fontFamily: "Poppins" }}
                          >
                            {pkg.subtitle}
                          </Typography>

                          <Box sx={{ mb: 2, flexGrow: 1, mt: 3 }}>
                            {benefits?.map((benefit, bidx) => (
                              <Box
                                key={bidx}
                                display="flex"
                                alignItems="flex-start"
                                mb={1}
                                sx={{ fontFamily: "Poppins" }}
                              >
                                {/* <ArrowRightIcon
                                  sx={{
                                    color: "#7c3aed",
                                    fontSize: 20,
                                    mt: "2px",
                                    mr: 1,
                                  }}
                                /> */}
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontFamily: "Poppins",
                                    color: "#555",
                                    lineHeight: 1.5,
                                  }}
                                >
                                  {benefit}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                          <Button
                            variant="contained"
                            sx={{
                              mt: 1,
                              background: "#7c3aed",
                              color: "#fff",
                              fontWeight: 600,
                              borderRadius: 2,
                              width: "100%",
                              fontFamily: "Poppins",
                              fontSize: 16,
                              letterSpacing: 0.1,
                              "&:hover": { background: "#cd5200" },
                            }}
                            onClick={()=>handleNavigate(pkg?.key, name , id)}
                          >
                            Confirm Package
                          </Button>
                        </Paper>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>
            )}
          </Box>
          {/* Benefits Section */}
          {poojaData?.benefit && poojaData?.benefit?.length > 0 && (
            <Box sx={{ marginTop: "8%", width: "90%", mx:'auto' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontFamily: "Poppins",
                }}
              >
                Benefits
              </Typography>
              {poojaData.benefit.map((item) => (
                <Typography
                  key={item._id}
                  variant="body1"
                  sx={{
                    mb: 2,
                    whiteSpace: "pre-line",
                    fontFamily: "Poppins",
                  }}
                >
                  {item.description}
                </Typography>
              ))}
            </Box>
          )}
          {/* FAQ Accordion */}
          {poojaData?.faq && poojaData?.faq?.length > 0 && (
            <Box sx={{ mt: 5, width: "90%", mx:'auto' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  fontFamily: "Poppins",
                }}
              >
                FAQs
              </Typography>
              {poojaData?.faq?.map((item) => (
                <Accordion key={item._id} sx={{ mb: 1, fontFamily: "Poppins" }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1">
                      {item?.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
                      {item?.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}
        </Box>
        <Box display="flex" gap="2rem" alignItems="flex-start">
          <Box flex="1 1 0%"></Box>
        </Box>
      </Box>
    </GlobalCssStyles>
  );
}
