import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { LockOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <Container maxWidth="sm" sx={{ borderRadius: 3 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop={8}
      >
        <LockOutline sx={{ mt: 3, color: "secondary.main", fontSize: 40 }} />
        <Typography variant="h5">Sign In</Typography>
        <Box
          component="form"
          width="100%"
          display="flex"
          flexDirection="column"
          gap={3}
          marginY={3}
        >
          <TextField fullWidth label="Email" autoFocus />
          <TextField fullWidth label="Password" type="password" />
          <TextField fullWidth label="Username" type="text" />
          <Button variant="outlined" type="submit">
            Sign In
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don't have an account?
            <Typography
              component={Link}
              to="/register"
              sx={{ ml: 2 }}
              color="primary"
            >
              Sign up
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
