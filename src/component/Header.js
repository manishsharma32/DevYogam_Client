import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import logo from "../assests/logo.png"
// Nav data
const navItemsLeft = [
  { label: "Home", link: "/" },
  { label: "Pooja", link: "/pooja" },
];
const navItemsRight = [
  { label: "Chadava", link: "/chadhava" },
  { label: "Temples", link: "/temple" },
];
const moreOptions = [
  { label: "Login", link: "/login" },
  // { label: "Crystals", link: "#" },
  { label: "Contact Us", link: "/contact" },
];

// Hide on scroll helper
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const trigger = useScrollTrigger({ threshold: 10 });

  // Responsive breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Drawer content for mobile/tablet
  const drawerList = (
    <Box
      sx={{ width: 260, py: 2 }}
      role="presentation"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
      <List>
        {[...navItemsLeft, ...navItemsRight].map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component="a" href={item.link}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText
            primary="More"
            primaryTypographyProps={{
              sx: {
                fontWeight: "bold",
                pt: 1,
                pl: 0.5,
                fontSize: "1.1rem",
                color: "#aa4466",
              },
            }}
          />
        </ListItem>
        {moreOptions.map((option) => (
          <ListItem key={option.label} disablePadding>
            <ListItemButton component="a" href={option.link}>
              <ListItemText primary={option.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <HideOnScroll {...props}>
      <AppBar
        position="absolute"
        elevation={trigger ? 4 : 0}
        sx={{
          backgroundColor:'white',
          // backgroundImage:
          //   "linear-gradient(360deg, #E8DAF9 0%, #C1A4F0 20%, #9a67e6 100%)",
          boxShadow: trigger ? 3 : 0,
          // transition: "background-image 0.3s, box-shadow 0.3s",
          py: 1, 
        }}
      >
        <Toolbar
          sx={{
            minHeight: "72px",
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2, md: 4 },
          }}
        >
          {/* Left Navs or Hamburger */}
          {!isMobile ? (
            <Box sx={{ display: "flex", gap: 3 }}>
              {navItemsLeft.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  sx={{
                    fontWeight: 500,
                    fontSize: "1rem",
                    fontFamily: "Poppins, sans-serif",
                    letterSpacing: 1,
                    color: "#333",
                    textTransform: "none",
                    "&:hover": { color: "#aa4466", background: "transparent" },
                  }}
                  href={item.link}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          ) : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon sx={{ color: "#aa4466", fontSize: 32 }} />
            </IconButton>
          )}

          {/* Centered Logo */}
          <Box
            sx={{
              left: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            {/* <Typography
              variant="h3"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "2.7rem" },
                color: "#333",
                letterSpacing: "0.16em",
                pointerEvents: "auto",
                userSelect: "none",
                textShadow: "0 2px 24px #ffe5ed80",
              }}
            >
              DevYogam
            </Typography> */}
            <img src={logo} loading="lazy" style={{width:'320px'}} />
          </Box>

          {/* Right Navs + More or empty (on Mobile) */}
          {!isMobile ? (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {navItemsRight.map((item) => (
                <Button
                  key={item.label}
                  color="inherit"
                  sx={{
                    fontWeight: 500,
                    fontSize: "1rem",
                    fontFamily: "Poppins, sans-serif",
                    letterSpacing: 1,
                    color: "#333",
                    textTransform: "none",
                    "&:hover": { color: "#aa4466", background: "transparent" },
                  }}
                  href={item.link}
                >
                  {item.label}
                </Button>
              ))}
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <MoreVertIcon sx={{ color: "#333" }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {moreOptions.map((option) => (
                  <MenuItem key={option.label} onClick={handleMenuClose}>
                    {option.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : null}
        </Toolbar>
        {/* Drawer for tablet/mobile */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          {drawerList}
        </Drawer>
      </AppBar>
    </HideOnScroll>
  );
}
