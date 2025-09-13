import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Typography } from "@mui/material";
import { GlobalCssStyles } from "../../style/GlobalCSS";
// import { useParams } from "react-router-dom";
// import { GetPoojaByID } from "../../services/GetPoojaByID";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

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

const product = {
  "_id": "68bd6e0ea3e98a924f80c10c",
  "title": "Shraddh Dashami Vishesh: Pitra Rin Mukti Puja",
  "titleHi": "Test pooja",
  "subtitle": "Bring Peace To Ancestral Souls And Remove Lineage Obstacles With Pitradosh Shanti Puja.",
  "subtitleHi": "Test pooja",
  "location": "Mahakal Mandir, Ujjain",
  "locationHi": "Test pooja",
  "capDate": "2025-09-11T18:30:00.000Z",
  "benefit": [
    {
      "title": "odn",
      "titleHi": "qq",
      "description": "Test poojaTest pooja",
      "descriptionHi": "Test pooja",
      "_id": "68bd6e0ea3e98a924f80c10d"
    }
  ],
  "faq": [
    {
      "question": "Test pooja",
      "questionHi": "Test pooja",
      "answer": "Test pooja",
      "answerHi": "Test pooja",
      "_id": "68bd6e0ea3e98a924f80c10e"
    }
  ],
  "images": [
    // "https://i.ibb.co/MkGsPGSm/d3ae19561d97cc0b0fab7bc37ec7874f.jpg"
    "https://i.ibb.co/d8Hhr7t/cf840a98ef692a7eb981c226aa444d2a.png"
  ],
  "images_hi": [
    "https://i.ibb.co/d8Hhr7t/cf840a98ef692a7eb981c226aa444d2a.png"
  ],
  "price": [],
  "createdAt": "2025-09-07T11:35:42.842Z",
  "updatedAt": "2025-09-07T11:35:42.842Z",
  "__v": 0
};

const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

export default function PoojaDetails() {
  // const { id } = useParams();
  // const [poojaData, setPoojaData] = useState(null);

  // useEffect(() => {
  //   const getPooja = async () => {
  //     const res = await GetPoojaByID(id);
  //     setPoojaData(res);
  //   };
  //   getPooja();
  // }, [id]);

  // Use the product data directly instead of API response
  const poojaData = product;

  // Combine images and images_hi arrays for the carousel
  const images = (poojaData.images || []).concat(poojaData.images_hi || []);
  return (
    <GlobalCssStyles>
      <Box sx={{ marginTop: "3%" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12, lg: 6 }}>
              <Item>
                <Carousel showThumbs={false} showIndicators infiniteLoop>
                  {images.map((url, idx) => (
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
                <Box sx={{textAlign:'start', fontFamily:'Poppins'}} >
                  <Typography  sx={{fontFamily:'Poppins', fontSize:'1.5rem', fontWeight:500 }}>
                    {poojaData.title}
                  </Typography>
                  <Typography sx={{fontFamily:'Poppins', fontSize:'1rem', fontWeight:500 }}  >
                    {poojaData.subtitle}
                  </Typography>
                  <Typography variant="body1" mt={1}>
                    <strong>Location:</strong> {poojaData.location}
                  </Typography>
                  <Typography variant="body1" mt={1}>
                    <strong>Date:</strong>{" "}
                    {new Date(poojaData.capDate).toLocaleDateString()}
                  </Typography>
                  <hr />
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
                  </section>
                  {poojaData.price?.length > 0 && (
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
                  )}
                  <hr />
                  <Typography variant="caption">
                    Created: {new Date(poojaData.createdAt).toLocaleString()}
                  </Typography>
                </Box>
              </Item>
            </Grid>
            <Grid size={{ xs: 6, md: 8 }}>
              <Item> </Item>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" gap="2rem" alignItems="flex-start">
          <Box flex="1 1 0%"></Box>
        </Box>
      </Box>
    </GlobalCssStyles>
  );
}
