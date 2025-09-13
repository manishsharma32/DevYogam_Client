import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";

export default function ServiceCard({
  icon,
  title,
  description,
  btnLabel = "Learn More",
  onClick,
  sx = {},
  ...props
}) {
  // Use scroll trigger as before
  const trigger = useScrollTrigger({ threshold: 160 });
  // Once state - true after the animation fires the first time
  const [once, setOnce] = React.useState(false);

  // When trigger becomes true for the first time, set once=true
  React.useEffect(() => {
    if (trigger && !once) {
      setOnce(true);
    }
  }, [trigger, once]);

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
        gap: 1.2,
        background: "rgba(248,246,252,0.6)",
        ...sx,
      }}
      {...props}
    >
      <Slide
        direction="right"
        in={trigger || once}
        mountOnEnter
        unmountOnExit={false}
      >
        <Box sx={{ textAlign: "start", cursor:'pointer' }} onClick={onClick} >
          <Box sx={{ fontSize: 40, color: "#89255b", mb: 1 }}>{icon}</Box>
          <Typography
            variant="h6"
            sx={{ mb: 1, fontWeight: 700, color: "#2d1637" }}
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ flexGrow: 1, color: "#59405b" }}>
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
