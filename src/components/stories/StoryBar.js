import { Box } from "@mui/material";
import StoryCircle from "./StoryCircle";

const StoryBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "15px",
        overflowX: "scroll",
        overflowY:"hidden",
        width:"79.4vw",
        marginTop:"20px",
        marginBottom:"20px"
      }}
    >
      <StoryCircle />
      <StoryCircle />


    </Box>
  );
};

export default StoryBar;
