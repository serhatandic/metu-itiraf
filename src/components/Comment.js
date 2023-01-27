import { Box } from "@mui/system";
import TimeAgo from "javascript-time-ago";
import tr from "javascript-time-ago/locale/tr";
TimeAgo.addLocale(tr);
const timeAgo = new TimeAgo("tr-TR");

const Comment = ({ comment, nickname,date }) => {
  return (
    <Box
      sx={{
        width: "92%",
        border: "solid",
        borderColor: "#192b33",
        marginTop: "2%",
        marginLeft: "4%",
        color: "#192b33",
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", right: "5px", top: "2px" }}>{date && timeAgo.format(new Date(Date.parse(date)))}</Box>
      <Box sx={{ paddingBottom: "50px" }}> {comment}</Box>
      <Box sx={{ position: "absolute", right: "5px", bottom: "2px" }}>
        Yazar: {nickname}
      </Box>
    </Box>
  );
};

export default Comment;
