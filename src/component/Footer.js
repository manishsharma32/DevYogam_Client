import * as React from "react";
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import demologo from "../assests/demo-logo.png"
// You can substitute this with your logo
const Logo = () => (
  <Box sx={{ mb: 1 }}>
    <img src={demologo} alt="Dev Yogam Logo" style={{ width: 50 }} />
  </Box>
);

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background:
          "linear-gradient(90deg, #F69B36 0%, #FF8C42 60%, #FFC682 100%)",
        color: "#392504",
        mt: 8,
        py: { xs: 4, sm: 6 },
        px: 2,
        position:'fixed',
        // width:'100%',    
        bottom:0,
        width:'100%'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
              <Logo />
              {/* <Typography variant="h5" sx={{ color: "#C23F00", ml: 1, fontWeight: 700 }}>
                सेवा
              </Typography> */}
            </Box>
            {/* <Typography variant="body2" sx={{ lineHeight: 1.7, mb: 2 }}>
              Dev Yogam is a leading online platform for puja booking, temple tours, and astrological services.
              We offer a wide range of rituals and ceremonies to help you connect with the divine and achieve spiritual growth.
              <br />
              <br />
              Our team of experienced priests and astrologers ensures that every service is performed with utmost care and devotion.
            </Typography> */}
          </Grid>

          {/* Useful Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ color: "#C23F00", fontWeight: 700, mb: 1 }}>
              Useful Links
            </Typography>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Temple Tours
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Astrology Help
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Pujas
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Chadawa
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Temples
            </Link>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ color: "#C23F00", fontWeight: 700, mb: 1 }}>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              About
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact
            </Link>
            {/* <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Refund and Cancellation Policy
            </Link> */}
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Terms and Conditions
            </Link>
            <Link href="#" color="inherit" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
          </Grid>

          {/* Social Section */}
          <Grid item xs={12} md={2}>
            <Typography variant="h6" sx={{ color: "#C23F00", fontWeight: 700, mb: 1 }}>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                aria-label="Facebook"
                sx={{
                  color: "#C23F00",
                  backgroundColor: "#fff5e0",
                  "&:hover": { backgroundColor: "#fff" },
                  mr: 1,
                }}
                href="#"
                target="_blank"
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                aria-label="YouTube"
                sx={{
                  color: "#C23F00",
                  backgroundColor: "#fff5e0",
                  "&:hover": { backgroundColor: "#fff" },
                  mr: 1,
                }}
                href="#"
                target="_blank"
              >
                <YouTubeIcon />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                sx={{
                  color: "#C23F00",
                  backgroundColor: "#fff5e0",
                  "&:hover": { backgroundColor: "#fff" },
                  mr: 1,
                }}
                href="#"
                target="_blank"
              >
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: { xs: 2, sm: 3 }, borderColor: "#FFC682" }} />

        <Typography variant="body2" align="center" sx={{ color: "#392504", fontWeight: 500, pt: 1 }}>
          © {new Date().getFullYear()} Dev Yogam. All Rights Reserved by
          <Box component="span" sx={{ ml: 1, color: "#C23F00" }}>
            Dev Yogam
          </Box>
        </Typography>
      </Container>
    </Box>
  );
}
