import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import metuIcon from "../images/metuicon.png";
import { Avatar, Button } from "@mui/material";
import CreatePost from "./Content/CreatePost";
import { useState } from "react";
import { styled } from "@mui/material/styles";

function Navbar() {
  const [showCreatePost, setShowCreatePost] = useState(false);

  const ResponsiveNavbarButton = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      fontSize: "15px",
    },
  }));
  return (
    <>
      {setShowCreatePost && (
        <CreatePost
          showCreatePost={showCreatePost}
          setShowCreatePost={setShowCreatePost}
        />
      )}
      <AppBar position="static" sx={{ backgroundColor: "#192b33" }}>
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "25px",
              marginLeft: "10px",
            }}
          >
            <Box>
              <Avatar
                src={metuIcon}
                sx={{ height: "75px", width: "75px" }}
              ></Avatar>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: "75px",
              }}
            >
              Metu Itiraf
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            {/* <TextField
              sx={{ width: "45%", color: "white" }}
              id="outlined-basic"
              label="Search"
              variant="standard"
            /> */}
            <Button
              variant="contained"
              className="itiraf-button"
              sx={{
                backgroundColor: "white",
                height: "70%",
                color: "#192b33",
                ":hover": { backgroundColor: "lightgray" },
                fontSize: "35px",
                marginRight: "20px",
              }}
              onClick={() => {
                setShowCreatePost(true);
              }}
            >
              <ResponsiveNavbarButton> SEN DE İTİRAF ET</ResponsiveNavbarButton>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
export default Navbar;
