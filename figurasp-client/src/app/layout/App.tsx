import "./App.css";
import { Container } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Container sx={{ marginTop: 10 }} maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
}

export default App;
