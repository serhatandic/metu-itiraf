import { Typography, Box, Modal } from "@mui/material";
import CommentSection from "../Comments/CommentSection";
import { useEffect, useState } from "react";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import tr from "javascript-time-ago/locale/tr";
const Hosts = require("../../Tools/Hosts");

TimeAgo.addLocale(tr);
const timeAgo = new TimeAgo("tr-TR");

const ContentCard = (props) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      const data = await axios.get(Hosts.host + "/comments/" + props.postid);
      setComments(data.data);
    };

    fetchComments();
  }, [props]);

  const updateLocalCommentsHandler = (newComment) => {
    setComments((prevcomments) => [newComment, ...prevcomments]);

    props.setNumberOfComments([...comments, newComment].length);
  };
  return (
    <Modal
      open={props.showContent}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      onClose={() => {
        props.setShowContent(false);
      }}
    >
      <Box
        sx={{
          marginLeft: "1rem",
          overflowY: "scroll",
          backgroundColor: "white",
          color: "black",
          borderStyle: "solid",
          borderColor: "#192b33",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "70%",
          height: "60%",
          paddingBottom: "60px",
          WebkitOverflowScrolling: "touch",
          "::-webkit-scrollbar": {
            width: "0.4em",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "#192b33",
          },
          overflow: "auto",
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Typography
            sx={{
              fontSize: "24px",
              color: "#192b33",
              padding: "4%",
              paddingTop: "2rem",
              wordBreak: "break-word",
              fontWeight: "700",
            }}
          >
            {props.header}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#192b33",
              paddingLeft: "4%",
              paddingBottom: "1%",
              wordBreak: "break-word",
              paddingRight: "4%",
            }}
          >
            {props.content}
          </Typography>
          <Box
            sx={{
              position: "relative",
              right: "4%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "400",
                color: "#bebebe",
              }}
            >
              {timeAgo.format(new Date(Date.parse(props.date)))}
            </Typography>
            <Typography
              sx={{
                color: "#192b33",
                fontWeight: "600",
                fontFamily: "Montserrat",
                fontSize: "14px",
              }}
            >
              {props.nickname}
            </Typography>
          </Box>
        </Box>
        <hr
          style={{
            display: "block",
            color: "white",
            width: "92%",
            marginBottom: "50px",
          }}
        />

        <CommentSection
          comments={comments}
          setComments={updateLocalCommentsHandler}
          postid={props.postid}
        />
      </Box>
    </Modal>
  );
};

export default ContentCard;
