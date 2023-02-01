import { Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TimeAgo from "javascript-time-ago";
import tr from "javascript-time-ago/locale/tr";

TimeAgo.addLocale(tr);
const timeAgo = new TimeAgo("tr-TR");

const Comment = ({ comment, nickname, date, instagramProfileUrl }) => {
  return (
    <Box
      sx={{
        width: "92%",
        border: "solid",
        borderWidth: "1px",
        borderColor: "#192b33",
        marginTop: "2%",
        marginLeft: "4%",
        color: "#192b33",
        position: "relative",
        borderRadius: "5px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: "5px",
          bottom: "26px",
          fontSize: "12px",
          fontWeight: "400",
          color: "#bebebe",
        }}
      >
        {date && timeAgo.format(new Date(Date.parse(date)))}
      </Box>
      <Box
        sx={{
          paddingBottom: "50px",
          width: "96%",
          paddingLeft: "5px",
          paddingTop: "4px",
          wordBreak: "break-word  ",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        {comment}
      </Box>
      <Box
        sx={{
          position: "absolute",
          right: "5px",
          bottom: "8px",
          color: "#192b33",
          fontWeight: "600",
          fontFamily: "Montserrat",
          fontSize: "14px",
        }}
      >
        {instagramProfileUrl ? (
          <Link
            href={instagramProfileUrl}
            target={"_blank"}
            sx={{
              textDecoration: "none",
              background: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 100%)",
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
            }}
          >
            {nickname}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Comment;
