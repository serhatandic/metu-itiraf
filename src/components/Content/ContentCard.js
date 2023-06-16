import { Typography, Box, Modal, Link, Snackbar, Alert } from "@mui/material";
import CommentSection from "../Comments/CommentSection";
import { useEffect, useState } from "react";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import tr from "javascript-time-ago/locale/tr";
import { styled } from "@mui/material/styles";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";

const Hosts = require("../../Tools/Hosts");

TimeAgo.addLocale(tr);
const timeAgo = new TimeAgo("tr-TR");

const ResponsiveContentCard = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    width: "90%",
  },
}));

const ContentCard = ({
  setShowContent = () => {},
  showContent,
  header,
  content,
  instagramProfileUrl,
  date,
  nickname,
  postid,
  closePost,
}) => {
  const [comments, setComments] = useState([]);
  const [snackbarDetails, setSnackbarDetails] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  useEffect(() => {
    const fetchComments = async () => {
      const data = await axios.get(Hosts.host + "/comments/" + postid);
      setComments(data.data);
    };

    fetchComments();
  }, [postid]);

  const updateLocalCommentsHandler = (newComment) => {
    setComments((prevcomments) => [newComment, ...prevcomments]);
  };

  const shareHandler = () => {
    navigator.clipboard.writeText(window.location.href);
    setSnackbarDetails({
      open: true,
      message: "Link kopyalandı!",
      severity: "success",
    });
  };

  return (
    <>
      <Modal
        open={showContent}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        onClose={() => {
          setShowContent(false);
          closePost();
        }}
      >
        <ResponsiveContentCard
          sx={{
            overflowY: "scroll",
            backgroundColor: "white",
            color: "black",
            borderStyle: "solid",
            borderColor: "#192b33",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            width: "40%",
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
              {header}
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
              {content}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <IconButton
                onClick={shareHandler}
                sx={{
                  position: "relative",
                  marginLeft: "2.7%",
                  marginTop: "1%",
                }}
              >
                <ShareIcon />
              </IconButton>
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
                  {timeAgo.format(new Date(Date.parse(date)))}
                </Typography>

                {instagramProfileUrl ? (
                  <Link
                    href={instagramProfileUrl}
                    target={"_blank"}
                    sx={{
                      textDecoration: "none",
                      background:
                        "linear-gradient(135deg, #833ab4 0%, #fd1d1d 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                      fontWeight: "600",
                      fontFamily: "Montserrat",
                      fontSize: "14px",
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
                    }}
                  >
                    {nickname}
                  </Typography>
                )}
              </Box>
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
            postid={postid}
            instagramProfile={instagramProfileUrl}
          />
        </ResponsiveContentCard>
      </Modal>
      <Snackbar
        open={snackbarDetails.open}
        autoHideDuration={6000}
        onClose={() => setSnackbarDetails({ ...snackbarDetails, open: false })}
      >
        <Alert severity={snackbarDetails.severity} sx={{ width: "100%" }}>
          {snackbarDetails.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ContentCard;
