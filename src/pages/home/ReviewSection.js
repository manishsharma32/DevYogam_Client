import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { reviewsData } from "../../utils/constant/Constant";

export default function ReviewCard() {
  const [selectedItem, setSelectedItem] = useState(0);

  // Handler for slide change
  const onChange = (index) => {
    setSelectedItem(index);
  };

  // Responsive: show only 1 card on mobile
  const getCenterSlidePercentage = () => {
    if (window.innerWidth < 600) return 100; // full width on mobile
    if (window.innerWidth < 960) return 50; // half width on tablets
    return 33.33; // 3 cards on desktop
  };

  return (
    <>
      <Typography
        sx={{
          fontFamily: "Poppins",
          fontSize: "2rem",
          fontWeight: 600,
          fontFamily: "Poppins",
          textAlign: "center",
        }}
      >
        Customer Reviews
      </Typography>
      <div style={{ margin: "40px auto", maxWidth: 1200 }}>
        <Carousel
          centerMode={true}
          showStatus={false}
          autoFocus={true}
          centerSlidePercentage={getCenterSlidePercentage()}
          showArrows={true}
          showIndicators={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          stopOnHover={true}
          swipeable={true}
          emulateTouch={true}
          onChange={onChange}
          selectedItem={selectedItem}
          transitionTime={500}
        >
          {reviewsData.map((item, i) => {
            const isCenter = i === selectedItem;

            const slideStyle = {
              transition: "transform 0.5s, opacity 0.5s",
              transform: isCenter ? "scale(1)" : "scale(0.9)",
              opacity: isCenter ? 1 : 0.5,
              filter: isCenter ? "none" : "grayscale(50%)",
              margin: "0 10px",
              cursor: "pointer",
            };

            return (
              <div key={item.name + i} style={slideStyle}>
                <Card
                  sx={{
                    maxWidth: 340,
                    minHeight: 390,
                    backgroundColor: "#DBDBDB",
                    padding: "2%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    boxShadow: 2,
                    borderRadius: 3,
                    mx: "auto",
                  }}
                >
                  <CardMedia
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "16px",
                    }}
                  >
                    <Avatar src={item?.avatar} sx={{ height: 80, width: 80 }} />
                  </CardMedia>

                  <CardContent sx={{ textAlign: "center" }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      sx={{ fontWeight: 600 }}
                    >
                      {item?.mainQuote}
                    </Typography>

                    <div
                      style={{
                        position: "relative",
                        margin: "24px 0",
                        minHeight: 120,
                        padding: "24px 16px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FormatQuoteIcon
                        sx={{
                          fontSize: 38,
                          color: "grey.400",
                          opacity: 0.5,
                          position: "absolute",
                          top: 0,
                          left: -9,
                          zIndex: 1,
                          transform: "rotate(180deg)",
                          pointerEvents: "none",
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontStyle: "italic", zIndex: 2, width: "100%" }}
                      >
                        {item?.review}
                      </Typography>
                      <FormatQuoteIcon
                        sx={{
                          fontSize: 38,
                          color: "grey.400",
                          opacity: 0.5,
                          position: "absolute",
                          bottom: 4,
                          right: 10,
                          zIndex: 1,
                          pointerEvents: "none",
                        }}
                      />
                    </div>

                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: "bold", marginTop: 2 }}
                    >
                      - {item.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: "text.secondary" }}
                    >
                      {item?.designation}
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
}
