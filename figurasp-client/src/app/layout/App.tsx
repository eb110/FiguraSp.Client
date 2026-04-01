import "./App.css";
import { Container, Typography } from "@mui/material";
import NavBar from "./NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Container sx={{ marginTop: 10 }} maxWidth="xl">
        <Typography variant="h4">APP BODY</Typography>
      </Container>
    </>
  );
}

export default App;
