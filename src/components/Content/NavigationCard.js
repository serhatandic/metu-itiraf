import { Badge, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import CategoryCorner from "../Category/PostCategoryCorner";
import TimeAgo from "javascript-time-ago";
import tr from "javascript-time-ago/locale/tr";
import CommentIcon from "@mui/icons-material/Comment";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Hosts = require("../../Tools/Hosts");

TimeAgo.addLocale(tr);
const timeAgo = new TimeAgo("tr-TR");

const NavigationCard = ({
  nickname,
  header,
  content,
  category,
  date,
  postid,
  categoryColor,
  instagramProfileUrl,
}) => {
  const [commentNum, setCommentNum] = useState(0);

  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchComments = async () => {
      setCommentNum(
        (await axios.get(Hosts.host + "/comments/" + postid)).data.length
      );
    };

    fetchComments();
  }, [postid]);

  const navigateToContent = (e) => {
    e.preventDefault();
    navigate("/post/" + postid);
  };

  return (
    <>
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
          <CategoryCorner
            category={category}
            backgroundColor={categoryColor}
            sx={{ position: "absolute", left: 0, top: 0 }}
          />
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
          {content && content.substring(0, 100)}{" "}
          {content.length >= 100 ? "..." : ""}
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
          <Box
            sx={{
              color: "#192b33",
              fontWeight: "600",
              fontFamily: "Montserrat",
              fontSize: "14px",
            }}
          >
            {instagramProfileUrl ? (
              <Link
                onClick={(e) => {
                  e.stopPropagation();
                }}
                href={instagramProfileUrl}
                target={"_blank"}
                sx={{
                  textDecoration: "none",
                  background:
                    "linear-gradient(135deg, #833ab4 0%, #fd1d1d 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }}
              >
                {nickname}
              </Link>
            ) : (
              <Typography
                sx={{
                  fontWeight: "600",
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  zIndex: "99999",
                }}
              >
                {nickname}
              </Typography>
            )}
          </Box>
          <Badge badgeContent={commentNum} color="secondary" showZero>
            <CommentIcon />
          </Badge>
        </Box>
      </Box>
    </>
  );
};

export default NavigationCard;
