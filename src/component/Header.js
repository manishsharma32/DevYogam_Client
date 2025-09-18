import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import logo from "../assests/logo.png";
import LoginModal from "./LoginModal"; // Your login modal component

const navItemsLeft = [
  { label: "Home", link: "/" },
  { label: "Pooja", link: "/pooja" },
];
const navItemsRight = [
  { label: "Chadava", link: "/chadhava" },
  { label: "Temples", link: "/temple" },
];
const moreOptions = [
  { label: "Login" },
  { label: "Contact Us", link: "/contact" },
];

const NavButton = styled(Button)(({ theme }) => ({
  fontWeight: 500,
  fontSize: "1rem",
  fontFamily: "Poppins, sans-serif",
  letterSpacing: 1,
  color: "#333",
  textTransform: "none",
  position: "relative",
  "&:hover": {
    color: "#aa4466",
    background: "transparent",
    "&::after": {
      width: "100%",
    },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 2,
    width: 0,
    backgroundColor: "#aa4466",
    transition: "width 0.3s ease",
    borderRadius: 2,
  },
}));

export default function Header(props) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const trigger = useScrollTrigger({ threshold: 10 });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Drawer content without LoginModal inside it
  const drawerList = (
    <Box sx={{ width: 260, py: 2, bgcolor: "background.paper", height: "100%" }} role="presentation"
      onKeyDown={() => setDrawerOpen(false)}
    >
      <IconButton
        onClick={() => setDrawerOpen(false)}
        sx={{ color: "#aa4466", width: 40, height: 40, cursor: "pointer", float: "right", mr: 1 }}
        aria-label="close drawer"
      >
        <CloseIcon />
      </IconButton>

      <List sx={{ pt: 3 }}>
        {[...navItemsLeft, ...navItemsRight, ...moreOptions].map((item, idx) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component="a"
              href={item.link || "#"}
              onClick={(e) => {
                if (item.label.toLowerCase() === "login") {
                  e.preventDefault();
                  setDrawerOpen(false);
                  setLoginOpen(true);
                }
              }}
              sx={{
                "&.Mui-focusVisible, &:hover": {
                  bgcolor: alpha("#aa4466", 0.15),
                  color: "#aa4466",
                },
                transition: "background-color 0.25s ease, color 0.25s ease",
                ml: 1,
                borderRadius: 1,
              }}
            >
              <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "white",
          py: 1,
          boxShadow: trigger ? "0 2px 15px rgba(0,0,0,0.1)" : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: "45px", md: "64px", lg: "72px" },
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
                <NavButton key={item.label} href={item.link}>{item.label}</NavButton>
              ))}
            </Box>
          ) : (
            <IconButton
              size="large"
              edge="start"
              aria-label={drawerOpen ? "close menu" : "open menu"}
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{ color: "#aa4466" }}
            >
              {drawerOpen ? <CloseIcon sx={{ fontSize: 32 }} /> : <MenuIcon sx={{ fontSize: 32 }} />}
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
            <Box
              component="img"
              src={logo}
              loading="lazy"
              sx={{ width: { xs: 140, sm: 180, md: 220, lg: 240 }, height: "auto", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Box>

          {/* Right Navs + More */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              {navItemsRight.map((item) => (
                <NavButton key={item.label} href={item.link}>{item.label}</NavButton>
              ))}
              <IconButton color="inherit" onClick={handleMenuOpen} sx={{ color: "#333" }}>
                <MoreVertIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                {moreOptions.map((option) => (
                  <MenuItem
                    key={option.label}
                    onClick={() => {
                      handleMenuClose();
                      if (option.label.toLowerCase() === "login") {
                        setLoginOpen(true);
                      } else if (option.link) {
                        navigate(option.link);
                      }
                    }}
                    sx={{
                      transition: "background-color 0.3s, color 0.3s",
                      "&:hover": { backgroundColor: alpha("#aa4466", 0.1), color: "#aa4466" },
                    }}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{ sx: { maxWidth: 280 } }}
        >
          {drawerList}
        </Drawer>
      </AppBar>

      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={(values) => {
          console.log("Login form submitted with", values);
          // Add your login logic here
          setLoginOpen(false);
        }}
      />
    </>
  );
}
