import { Box } from "@mui/system";
import TimeAgo from "javascript-time-ago";
import tr from "javascript-time-ago/locale/tr";

TimeAgo.addLocale(tr);
const timeAgo = new TimeAgo("tr-TR");

const Comment = ({ comment, nickname, date }) => {
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
          fontFamily:"Montserrat",
          fontSize:"14px"
        }}
      >
        {nickname}
      </Box>

    </Box>
  );
};

export default Comment;
