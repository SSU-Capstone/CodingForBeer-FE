import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import SocialGoogle from "../components/SocialGoogle";
import { useRecoilState } from "recoil";
import { loginState } from "../recoilState";
import { useNavigate } from "react-router-dom";

const LoginCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        marginTop: 8,
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          align="center"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
        >
          Welcome Back!
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ marginBottom: 3 }}
        >
          Please log in to continue.
        </Typography>
        <SocialGoogle />
      </CardContent>
    </Card>
  );
};

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isLogin, setIsLogin] = useRecoilState(loginState);
  const navigate = useNavigate(); // useNavigate hook
  const API_ADDR = import.meta.env.VITE_API_ADDR;

  React.useEffect(() => {
    // Fetch login status from backend
    fetch(API_ADDR + "/auth/status")
      .then((response) => response.json())
      .then((data) => {
        console.log("Login status from server:", data.loggedIn);
        setIsLogin(data.loggedIn); // Update Recoil state
      })
      .catch((error) => console.error("Error fetching login status:", error));
  }, []); // Empty dependency array means it runs once on component mount

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <LoginCard />
    </Box>
  );
}