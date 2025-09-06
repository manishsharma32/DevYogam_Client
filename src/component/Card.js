import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ImgCard({ item }) {
  console.log("iniiiniiiiiiiiiii", item);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={item?.images?.[0]}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {item?.title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {item?.bhagwan}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {item?.templeDescription} Lizards are a widespread group of squamate
          reptiles, with over 6,000 species, ranging across all continents
          except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{
            height: "33px",
            width:'100%',
            borderRadius:'1rem',
            border: "2px solid #9a67e6",
            color: " #9a67e6",
            minWidth: "100px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          Visit Temple
        </Button>
      </CardActions>
    </Card>
  );
}
