import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import Box from "@mui/material/Box";
import Home from "./pages/home/Home";
import { styled, ThemeProvider } from "@mui/material/styles";
// import theme from "./style/Theme";
import PublicRoutes from "./routes/PublicRoutes";
import Footer from "./component/Footer";
import { GlobalCssStyles } from "./style/GlobalCSS";

function App() {
  const user = JSON?.parse(localStorage.getItem("user"))
  return (
    <div>
      {/* <ThemeProvider theme={theme}> */}
        <GlobalCssStyles />
        <Header />
        <Box
          sx={{
            position: "relative",
            top: "1%",  
          }}
        >
          <PublicRoutes user={user}   />
        </Box>
        {/* <Home /> */}
        {/* <Box sx={{minHeight:"190vh", overflowY:'auto'}}>

      </Box> */}
        <Footer />
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
