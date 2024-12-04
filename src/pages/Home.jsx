import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import SocialGoogle from "../components/SocialGoogle";

export default function BasicCard() {
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
      <Card
        sx={{
          width: isMobile ? "90%" : "400px",
          borderRadius: 2,
          boxShadow:
            "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow:
              "0 6px 12px rgba(0, 0, 0, 0.15), 0 3px 6px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h4"
            component="div"
            sx={{
              textAlign: "center",
              mb: 3,
              fontWeight: 700,
              color: "#1a73e8",
            }}
          >
            Welcome to CRDT
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mb: 3,
              fontWeight: 600,
              color: "#34a853",
            }}
          >
            Coding for Beer!
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4, // 2에서 4로 변경
            }}
          >
            <SocialGoogle />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}