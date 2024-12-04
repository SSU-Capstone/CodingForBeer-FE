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
      <LoginButton />
    </Box>
  );
}