import { Typography, Box, Modal } from "@mui/material";
import CommentSection from "../CommentSection";
import { useEffect, useState } from "react";
import axios from "axios";

const ContentCard = (props) => {
  const [comments, setComments] = useState("");
  useEffect(() => {
    const fetchComments = async () => {
      setComments(await axios.get("/comments/"+props.postid, {data: {postid:props.postid}}));
    };

    fetchComments();
  }, [props]);

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
          color:"black",
          borderStyle: "solid",
          borderColor: "#192b33",
          borderRadius:"1rem",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          width: "70%",
          height: "60%",
          paddingBottom: "60px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            color: "#192b33" ,
            padding: "4%",
            paddingTop: "2rem",
            wordBreak: "break-word",
          }}
        >
          {props.content}
        </Typography>
        <hr style={{ color: "white", width: "92%", marginBottom: "50px" }} />
        <CommentSection comments = {comments?.data}sx={{}} postid={props.postid}/>
      </Box>
    </Modal>
  );
};

export default ContentCard;
