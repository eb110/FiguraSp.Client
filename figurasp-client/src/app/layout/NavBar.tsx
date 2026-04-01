import { AppBar, List, ListItem, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";

const leftLinks = [
  { title: "figura.sp", path: "/" },
  { title: "seasons", path: "/seasons" },
];

const midLinks = [
  { title: "riders", path: "/riders" },
  { title: "teams", path: "/teams" },
];

const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  typography: "h6",
  "&:hover": { color: "grey.500" },
  "&.active": { color: "#baecf9" },
};

export default function NavBar() {
  return (
    //fixed -> stay a the top of the screen
    <AppBar position="fixed">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <List sx={{ display: "flex" }}>
          {leftLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <List sx={{ display: "flex" }}>
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <List sx={{ display: "flex" }}>
          {rightLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
      </Toolbar>
    </AppBar>
  );
}
