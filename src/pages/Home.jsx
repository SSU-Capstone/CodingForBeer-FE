import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import SocialGoogle from "../components/SocialGoogle";

const LoginButton = () => {
  return (
    <button
      className="flex items-center justify-center w-full max-w-xs p-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-100 focus:ring-2 focus:ring-blue-400 focus:outline-none"
    >
      <img
        src="/google_icon.jpg"
        alt="Google Logo"
        className="w-5 h-5 mr-3"
      />
      <span className="text-gray-700 font-medium">Sign in with Google</span>
    </button>
  );
};

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
        <LoginButton />
      </CardContent>
    </Card>
  );
};

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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