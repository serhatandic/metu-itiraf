import { Avatar, Box } from "@mui/material";
import gollum from "../../images/gollum.jpeg";

const StoryCircle = () => {
  return (
    <Box
      sx={{
        borderColor: "#FD8A8A",
        borderRadius: "100%",
        borderStyle: "solid",
        display: "inline-block",
        minWidth: "10rem",
        minHeight: "10rem",
      }}
    >
      <Avatar
        alt="Remy Sharp"
        src={gollum}
        sx={{ borderRadius: "100%", width: "100%", height: "100%" }}
      />
    </Box>
  );
};

export default StoryCircle;
