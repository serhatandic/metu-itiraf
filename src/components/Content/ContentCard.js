import { Typography, Box, Modal } from "@mui/material";
import CommentSection from "../Comments/CommentSection";
import { useEffect, useState } from "react";
import axios from "axios";
const Hosts = require("../../Tools/Hosts");

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
    setComments([newComment, ...comments]);
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
          borderRadius: "10px",
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
            borderRadius: "20px",
            backgroundColor: "#192b33",
          },
          overflow: "auto",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            color: "#192b33",
            padding: "4%",
            paddingTop: "2rem",
            wordBreak: "break-word",
            fontWeight:"700"
          }}
        >{props.header}</Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#192b33",
            paddingLeft: "4%",
            paddingBottom: "1%",
            wordBreak: "break-word",
          }}
        >
          {props.content}
        </Typography>
        <hr style={{ color: "white", width: "92%", marginBottom: "50px" }} />
        <CommentSection
          comments={comments}
          setComments={updateLocalCommentsHandler}
          sx={{}}
          postid={props.postid}
        />
      </Box>
    </Modal>
  );
};

export default ContentCard;
