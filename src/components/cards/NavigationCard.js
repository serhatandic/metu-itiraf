import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ContentCard from "./ContentCard";

const NavigationCard = () => {
  const [showContent, setShowContent] = useState(false);

  const navigateToContent = (e) => {
    e.preventDefault();
    setShowContent((prevState) => !prevState);
    console.log("hmmm");
  };
  return (
    <>
      
      {showContent && <ContentCard setShowContent={setShowContent} showContent={showContent}/>}
      <Box
        sx={{
          backgroundColor: "#",
          borderStyle: "solid",
          borderColor: "#FD8A8A",
          display: "block",
          height: "15%",
          width: "100%",
          borderRadius: "1rem",
          position: "relative",
        }}
        onClick={navigateToContent}
      >
        <Typography
          sx={{
            fontSize: "50px",
            position: "absolute",
            left: "25px",
            top: "5px",
          }}
        >
          Heading
        </Typography>
        <Typography
          sx={{
            fontSize: "50px",
            position: "absolute",
            left: "25px",
            top: "50px",
            height: "60%",
            width: "90%",
          }}
        >
          Summary
        </Typography>
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            right: "50px",
            bottom: "10px",
            gap: "20px",
          }}
        >
          <Typography sx={{ fontSize: "20px" }}>Nick</Typography>
          <Typography sx={{ fontSize: "20px" }}>Subject</Typography>
          <Typography sx={{ fontSize: "20px" }}>Date</Typography>
        </Box>
      </Box>
    </>
  );
};

export default NavigationCard;
