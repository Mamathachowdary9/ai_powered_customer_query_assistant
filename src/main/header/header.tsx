import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Side from "../assets/sidebar-icon.png";
import { useState } from "react";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, height: "7%", position: "sticky" }}>
      <AppBar
        position="static"
        color="transparent"
        sx={{
          boxShadow:
            "0px 2px 4px -1px rgb(0 0 0 / 5%), 0px 4px 5px 0px rgb(0 0 0 / 5%), 0px 1px 10px 0px rgb(0 0 0 / 7%)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between !important" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={Side} alt="side-bar" />
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            // onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
