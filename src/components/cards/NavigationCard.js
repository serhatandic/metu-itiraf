import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import ContentCard from "./ContentCard";
import CategoryCorner from "../CategoryCorner";
import TimeAgo from "javascript-time-ago";
import tr from "javascript-time-ago/locale/tr";
import CommentIcon from "@mui/icons-material/Comment";

TimeAgo.addLocale(tr);
const timeAgo = new TimeAgo("tr-TR");

const NavigationCard = ({ nickname, header, content, category, date, postid }) => {
  const [showContent, setShowContent] = useState(false);
  const navigateToContent = (e) => {
    e.preventDefault();
    setShowContent((prevState) => !prevState);
    console.log("hmmm");
  };
  return (
    <>
      {showContent && (
        <ContentCard
          setShowContent={setShowContent}
          showContent={showContent}
          content={content}
          postid={postid}
        />
      )}
      <Box
        sx={{
          backgroundColor: "white",
          display: "block",
          height: "100%",
          width: "100%",
          position: "relative",
          fontSize: "14px",
        }}
        onClick={navigateToContent}
      >
        <Box sx={{ display: "flex", gap: "10px" }}>
          <CategoryCorner category={category} sx={{ position: "absolute", left: 0, top: 0 }} />
          <Typography
            sx={{ fontSize: "12px", fontWeight: "400", color: "#bebebe" }}
          >
            {date && timeAgo.format(new Date(Date.parse(date)))}
          </Typography>
        </Box>

        <Typography
          sx={{
            marginLeft: "25px",
            marginTop: "20px",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          {header.substring(0, 18)} {header.length >= 18 ? "..." : ""}
        </Typography>
        <Typography
          sx={{
            marginLeft: "25px",
            width: "80%",
            wordWrap: "break-word",
            fontSize: "14px",
          }}
        >
          {content && content.substring(0, 100) + "..."}
        </Typography>
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            bottom: "10px",
            width: "80%",
            left: "25px",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{}}>{nickname}</Typography>

          <CommentIcon sx={{}} />
        </Box>
      </Box>
    </>
  );
};

export default NavigationCard;
