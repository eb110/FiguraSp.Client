import { AppBar, Toolbar, Typography } from "@mui/material";

export default function NavBar() {
  return (
    //fixed -> stay a the top of the screen
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6">FIGURA.SP</Typography>
      </Toolbar>
    </AppBar>
  );
}
