import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { Box } from "@mui/system";
import Comment from "./Comment";
import { useRef, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import ReCAPTCHA from "react-google-recaptcha";
import { styled } from "@mui/material/styles";

const Hosts = require("../../Tools/Hosts");

const ResponsiveBoxButtonSection = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    width: "100%",
  },
}));

const ResponsiveBoxInputSection = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "15px",
    width: "96%",
  },
}));

const ResponsiveBoxCommentArea = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: "15px",
    width: "100%",
  },
}));

const CommentSection = ({ comments, postid, setComments }) => {
  const [comment, setComment] = useState("");
  const [nickName, setNickName] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const [notifyUser, setNotifyUser] = useState({ text: "", severity: "" });
  const [recaptchaChecked, setRecaptchaChecked] = useState(false);

  const recaptchaRef = useRef(null);

  const submitCommentHandler = async (e) => {
    e.preventDefault();
    setButtonPressed(true);
    if (nickName && comment) {
      if (recaptchaChecked) {
        const commentid = nanoid();

        await axios.post(Hosts.host + "/newcomment", {
          comment,
          nickname: nickName,
          postid,
          commentid,
        });
        setNotifyUser({ text: "Yorumunuz eklendi!", severity: "success" });
        setComments({
          comment,
          nickname: nickName,
          postid,
          commentid,
          date: new Date(Date.now()).toISOString(),
        });

        setButtonPressed(false);
        recaptchaRef.current.reset();
      } else {
        setNotifyUser({
          text: "Captcha doğrulaması gerekli!",
          severity: "warning",
        });
      }
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          marginLeft: "4%",
        }}
      >
        <ResponsiveBoxInputSection
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <ResponsiveBoxCommentArea
            sx={{ backgroundColor: "white", width: "65%" }}
          >
            <TextField
              sx={{ backgroundColor: "white", width: "100%" }}
              variant="filled"
              label="Ne düşünüyorsun ?"
              multiline
              rows={4}
              value={comment}
              inputProps={{ maxLength: 450 }}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              error={buttonPressed && comment === ""}
            ></TextField>
          </ResponsiveBoxCommentArea>

          <ResponsiveBoxButtonSection
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
          </ResponsiveBoxButtonSection>
        </ResponsiveBoxInputSection>
        <Box sx={{ alignSelf: "end", marginRight: "4%" }}>
          <ReCAPTCHA
            ref={recaptchaRef}
            size="compact"
            sitekey="6LcYvzMkAAAAAPscZQLd4hucGbgOWwBjKYsz1LWb"
            onChange={(e) => {
              setRecaptchaChecked(true);
            }}
          />
        </Box>
      </Box>
      {comments?.map((item, id) => (
        <Comment
          key={id}
          comment={item.comment}
          nickname={item.nickname}
          date={item.date}
        />
      ))}
      {notifyUser.text && (
        <Snackbar
          open={notifyUser.text !== ""}
          autoHideDuration={6000}
          onClose={() => {
            setNotifyUser({ text: "", severity: "" });
          }}
        >
          <Alert
            onClose={() => {
              setNotifyUser({ text: "", severity: "" });
            }}
            severity={notifyUser?.severity}
            sx={{ width: "100%" }}
          >
            {notifyUser?.text}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default CommentSection;
