import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Snackbar,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { GetPoojaByID } from "../../services/GetPoojaByID";
import { useNavigate, useParams } from "react-router-dom";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import RazorpayCheckout from "../../component/RazorpayCheckout";

// const poojaData = {
//   title: "Pitradosh Shanti Puja",
//   location: "Siddhvat Mandir, Ram Ghat, Ujjain",
//   capDate: "2025-09-30T18:30:00.000Z",
//   images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
//   packages: [
//     {
//       key: "single",
//       title: "Single Person Package",
//       price: 901,
//       subtitle: "For 1 person",
//       benefits: [
//         "Puja with Name & Gotra",
//         "Video sent on phone",
//         "Good results on Shubh Muhurat",
//       ],
//     },
//     {
//       key: "couple",
//       title: "Couple Package",
//       price: 1401,
//       subtitle: "Up to 2 people",
//       benefits: [
//         "Puja with Name & Gotra of both",
//         "Video sent on phone",
//         "Good results on Shubh Muhurat",
//       ],
//       recommended: true,
//     },
//     {
//       key: "family",
//       title: "Family + Bhog",
//       price: 2101,
//       subtitle: "Up to 4 people",
//       benefits: [
//         "Puja with Name & Gotra of family",
//         "Bhog offered",
//         "Video & Prasad delivery",
//       ],
//     },
//   ],
// };

export default function PujaBookingPage() {
  const [mobile, setMobile] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { id, type } = useParams();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [dontKnowGotra, setDontKnowGotra] = useState(false);
  const [poojaData, setPoojaData] = useState(null);

  const getInitialParticipants = () => {
    let count = 1;
    if (type === "couple") count = 2;
    else if (type === "family") count = 4;
    return Array(count)
      .fill()
      .map(() => ({
        fullName: "",
        gotra: "",
        noGotra: false,
      }));
  };
  const navigate = useNavigate();
  const [participants, setParticipants] = useState(getInitialParticipants());

  useEffect(() => {
    const getPooja = async () => {
      const res = await GetPoojaByID(id);
      setPoojaData(res);
    };
    getPooja();
  }, [id]);

  useEffect(() => {
    setParticipants(getInitialParticipants());
  }, [type]);

  const isMobileValid = /^\d{10}$/.test(mobile);

 
  const handleParticipantChange = (index, field, value) => {
    const newParticipants = [...participants];
    newParticipants[index][field] = value;
    if (field === "noGotra") {
      newParticipants[index].gotra = value ? "Kashyap" : "";
    }
    setParticipants(newParticipants);
  };

  const selectedPackageData = poojaData?.price?.[0]?.[type];
  const selectedAmount = selectedPackageData?.amaount;
 
  const handleLoginClick = () => {
    if (!isMobileValid || !termsAccepted) {
      setSnackbarOpen(true);
      return;
    }
  
    navigate("/razorpay", {
      state: {
        amount: selectedAmount,
        username: participants[0]?.fullName,
        userGotra: participants[0]?.gotra,
        mobile: mobile,
        id: poojaData?._id,
      },
    });
    // window.open("https://wa.me/917024542030", "_blank")
  };
  return (
    <Box sx={{ marginTop: "3%", width: "90%", mx: "auto" }}>
      <Grid container spacing={2}>
        <Grid item size={{ xs: 12, md: 12, lg: 8 }}>
          <Box
            sx={{
              display: "flex",
              gap: 4,
              border: "1px solid lightgrey",
              padding: "1%",
              borderRadius: "1rem",
            }}
          >
            <img
              style={{ height: "100%", width: "50%" }}
              src={poojaData?.images[0]}
              alt={`slide`}
            />
            <Box sx={{}}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  mb: 1,
                  fontSize: "1.7rem",
                  fontWeight: 600,
                  marginTop: "2%",
                  opacity: "70%",
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
                  opacity: "70%",
                }}
              >
                {type?.charAt(0)?.toUpperCase() + type?.slice(1)} Package
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "1rem",
                  fontWeight: 500,
                  marginTop: "2%",
                  opacity: "70%",
                }}
              >
                {poojaData?.subtitle}
              </Typography>
              <Typography
                sx={{
                  mb: 1,
                  fontFamily: "Poppins",
                  fontSize: "1rem",
                  fontWeight: 500,
                  marginTop: "2%",
                  opacity: "70%",
                }}
              >
                {poojaData?.location}
              </Typography>
              <Typography
                sx={{
                  mb: 3,
                  fontFamily: "Poppins",
                  fontSize: "1rem",
                  fontWeight: 500,
                  marginTop: "2%",
                  opacity: "70%",
                  display: "flex",
                  gap: 1,
                }}
              >
                <CalendarMonthOutlinedIcon /> Date:{" "}
                {new Date(poojaData?.capDate).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item size={{ xs: 12, md: 12, lg: 4 }}>
          <Box
            sx={{
              display: "flex",
              // width: "40%",
              // mx: "auto",
              gap: 4,
              border: "1px solid lightgrey",
              padding: "2%",
              borderRadius: "1rem",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  fontFamily: "Poppins",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  marginTop: "2%",
                  opacity: "90%",
                  width: "90%",
                }}
              >
                Billing Details
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "90%",
                  margin: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    fontWeight: 500,
                    marginTop: "2%",
                    opacity: "70%",
                  }}
                >
                  Puja Package
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    fontWeight: 500,
                    marginTop: "2%",
                    opacity: "70%",
                  }}
                >
                  {`₹${selectedAmount}`}
                </Typography>
              </Box>
              <hr style={{ opacity: "50%" }} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "90%",
                  margin: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    fontWeight: 500,
                    marginTop: "2%",
                    opacity: "70%",
                  }}
                >
                  Total
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    fontWeight: 500,
                    marginTop: "2%",
                    opacity: "70%",
                  }}
                >
                  {`₹${selectedAmount}`}
                </Typography>
              </Box>
              <Typography
                sx={{
                  mb: 1,
                  fontFamily: "Poppins",
                  fontSize: "1rem",
                  fontWeight: 500,
                  marginTop: "2%",
                  opacity: "70%",
                }}
              >
                {/* {poojaData?.location} */}
              </Typography>
              <Typography
                sx={{
                  mb: 3,
                  fontFamily: "Poppins",
                  fontSize: "1rem",
                  fontWeight: 500,
                  marginTop: "2%",
                  opacity: "70%",
                  display: "flex",
                  gap: 1,
                }}
              >
                {/* <CalendarMonthOutlinedIcon /> Date:{" "}
                {new Date(poojaData?.capDate).toLocaleDateString()} */}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item size={{ xs: 12, md: 12, lg: 8 }}>
          <Box
            sx={{
              mt: 4,
              p: 3,
              border: "1px solid lightgrey",
              borderRadius: "1rem",
              height: "50vh",
            }}
          >
            Add On Section
          </Box>
        </Grid>

        <Grid item size={{ xs: 12, md: 12, lg: 4 }}>
          <Box
            sx={{
              mt: 4,
              p: 3,
              border: "1px solid lightgrey",
              borderRadius: "1rem",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Poppins",
                mb: 1,
                fontSize: "1.7rem",
                fontWeight: 600,
                marginTop: "2%",
                opacity: "70%",
                mb: 2,
              }}
            >
              Participant Details
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={dontKnowGotra}
                  onChange={(e) => setDontKnowGotra(e.target.checked)}
                />
              }
              label="Don't Know Gotra?"
              sx={{ mb: 2, fontFamily: "Poppins" }}
            />
            <Grid container spacing={2}>
              {participants.map((p, idx) => (
                <React.Fragment key={idx}>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                      placeholder="Enter Name"
                      fullWidth
                      value={p.fullName}
                      onChange={(e) =>
                        handleParticipantChange(idx, "fullName", e.target.value)
                      }
                      sx={{ fontFamily: "Poppins" }}
                      inputProps={{ style: { fontFamily: "Poppins" } }}
                    />
                  </Grid>
                  <Grid item size={{ xs: 12, sm: 6 }}>
                    <TextField
                      placeholder="Add Gotra"
                      fullWidth
                      value={
                        dontKnowGotra && p.gotra === "" ? "Kashyap" : p.gotra
                      }
                      onChange={(e) => {
                        handleParticipantChange(idx, "gotra", e.target.value);
                        if (e.target.value?.length === 0) {
                          setDontKnowGotra(false);
                        }
                      }}
                      sx={{ fontFamily: "Poppins" }}
                      inputProps={{ style: { fontFamily: "Poppins" } }}
                    />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            fontFamily: "Poppins",
            mb: 1,
            mb: 2,
            fontSize: "1.7rem",
            fontWeight: 600,
            marginTop: "2%",
            opacity: "70%",
          }}
        >
          Book Puja
        </Typography>
        <TextField
          label="Mobile Number"
          fullWidth
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          error={mobile.length > 0 && !isMobileValid}
          helperText={
            mobile.length > 0 && !isMobileValid
              ? "Enter a valid 10-digit mobile number"
              : ""
          }
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
          }
          label="I agree to the Terms & Conditions and Privacy Policy"
          sx={{ mt: 2, fontFamily: "Popins" }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 2,
            textTransform: "none",
            background: "#7c3aed",
            color: "#fff",
            fontWeight: 600,
            borderRadius: 2,
            width: "100%",
            fontFamily: "Poppins",
            fontSize: 16,
            letterSpacing: 0.1,
            "&:hover": { background: "#cd5200" },
            "&:disabled": { background: "lightgrey" },
          }}
          disabled={!isMobileValid || !termsAccepted}
          onClick={handleLoginClick}
        >
          Book Puja
        </Button>
        {/* <RazorpayCheckout/> */}
        <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
          Puja booking updates, including photos, videos, and other details,
          will be sent to the WhatsApp number provided below.
        </Typography>
      </Box>
    </Box>
  );
}
// const openPaymentModal = () =>{
//   <Modal
//         open={open}
//         onClose={onClose}
//         BackdropProps={{ className: "blur-backdrop" }}
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "92vh",
//           marginTop: "8vh",
//           borderRadius: "20px",
//           width: "100%",
//         }}
//       >
//         <Sheet
//           variant="outlined"
//           style={{
//             padding: "2%",
//             border: "1px solid #01D9D1",
//             borderRadius: "20px",
//             backgroundColor: "white",
//             maxHeight: "90vh",
//             minHeight: '90vh',
//             overflowY: "auto",
//             width: "100%",
//           }}
//         >
//       </Sheet>
//       </Modal>
// }
