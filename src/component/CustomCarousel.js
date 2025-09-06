import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // required CSS

/**
 * @param {Array} items - Array of slide objects (each with image, title, description, etc.)
 * @param {object} carouselProps - (optional) Pass-through props for Carousel
 */
export default function CustomCarousel({ items = [], carouselProps = {} }) {
  return (
    <Carousel
      showArrows={true}
      showIndicators={true}
      showThumbs={false}
      infiniteLoop
      autoPlay
      interval={3500}
      stopOnHover
      swipeable
      emulateTouch
      dynamicHeight={false}
      {...carouselProps}
    >
      {items.map((item, idx) => (
        <>
          <div
            key={idx}
            style={{
              position: "relative",
              width: "100%",
              height: "64vw",
              maxHeight: 600,
              minHeight: 250,
              overflow: "hidden",
            }}
          >
            <img
              src={item.image}
              alt="Banner"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
            />
            {/* <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.33) 0%, rgba(0,0,0,0.65) 100%)",
                  zIndex: 1,
                }}
              /> */}

            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textShadow: "0 2px 8px rgba(0,0,0,0.45)",
                zIndex: 2,
              }}
            >
              {/* For title/caption use: */}
              {(item.title || item.description) && (
                <div className="legend">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              )}
            </div>
          </div>
        </>
      ))}
    </Carousel>
  );
}
