import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Comment from "./Comment";
import { useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";

const CommentSection = ({ comments, postid }) => {
  const [comment, setComment] = useState("");
  const [nickName, setNickName] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const commentid = nanoid();

  const submitCommentHandler = (e) => {
    e.preventDefault();
    setButtonPressed(true);
    if (nickName && comment) {
      axios.post("/newcomment", {
        comment,
        nickname: nickName,
        postid,
        commentid,
      });
      setButtonPressed(false);
    }
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          sx={{ backgroundColor: "white", marginLeft: "4%", width: "65%" }}
          variant="filled"
          label="Ne düşünüyorsun ?"
          multiline
          rows={4}
          value={comment}
          inputProps={{ maxLength: 250 }}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          error={buttonPressed && comment === ""}
        ></TextField>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "26%",
            marginRight: "4%",
            gap: "15px",
            justifyContent: "space-between",
          }}
        >
          <TextField
            sx={{ backgroundColor: "white" }}
            variant="filled"
            label="Rumuz"
            multiline
            value={nickName}
            onChange={(e) => {
              setNickName(e.target.value);
            }}
            error={buttonPressed && nickName === ""}
            inputProps={{ maxLength: 20 }}
          ></TextField>
          <Button
            sx={{
              backgroundColor: "#192b33",
              color: "white",
              ":hover": { backgroundColor: "lightgray" },
              height: "65%",
            }}
            onClick={submitCommentHandler}
          >
            Gönder
          </Button>
        </Box>
      </Box>
      {comments?.map((item) => (
        <Comment
          key={commentid}
          comment={item.comment}
          nickname={item.nickname}
          date={item.date}
        />
      ))}
    </>
  );
};

export default CommentSection;
