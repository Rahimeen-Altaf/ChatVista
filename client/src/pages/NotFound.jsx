import { Error as ErrorIcon } from "@mui/icons-material";
import { Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container maxWidth="lg" sx={{ height: "100vh" }}>
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        spacing={"2rem"}
        height="100%"
      >
        <ErrorIcon sx={{ fontSize: "10rem" }} />
        <Typography variant="h1">404</Typography>
        <Typography variant="h3">Page Not Found</Typography>
        <Link to="/">Go back to the home page</Link>
      </Stack>
    </Container>
  );
};

export default NotFound;
