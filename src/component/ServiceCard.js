import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function ServiceCard({
  icon,
  title,
  description,
  btnLabel = "Learn More",
  onClick,
  sx = {},
  ...props
}) {
  const theme = useTheme();
  // Detect if the screen is small/mobile (adjust breakpoint as needed)
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const trigger = useScrollTrigger({ threshold: 100 });
  const [once, setOnce] = React.useState(false);

  React.useEffect(() => {
    if (trigger && !once) {
      setOnce(true);
    }
  }, [trigger, once]);

  // For mobile: always show the Slide; for desktop, use scroll trigger and "once"
  const slideIn = isMobile ? true : trigger || once;

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        minHeight: 230,
        borderRadius: 3,
        fontFamily: "Poppins",
        gap: 1.2,
        background: "rgba(248,246,252,0.6)",
        ...sx,
      }}
      {...props}
    >
      <Slide direction="right" in={slideIn} mountOnEnter unmountOnExit={false}>
        <Box sx={{ textAlign: "start", cursor: "pointer" }} onClick={onClick}>
          <Box sx={{ fontSize: 40, color: "#89255b", mb: 1 }}>{icon}</Box>
          <Typography
            variant="h6"
            sx={{
              mb: 1,
              fontWeight: 700,
              color: "#2d1637",
              fontFamily: "Poppins",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ flexGrow: 1, color: "#59405b", fontFamily: "Poppins" }}
          >
            {description}
          </Typography>
          {btnLabel && (
            <Button
              sx={{
                mt: 2,
                minWidth: 110,
                color: "#89255b",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "18px",
                textAlign: "start",
                fontFamily: "Poppins",
              }}
              onClick={onClick}
            >
              {btnLabel}
            </Button>
          )}
        </Box>
      </Slide>
    </Paper>
  );
}
