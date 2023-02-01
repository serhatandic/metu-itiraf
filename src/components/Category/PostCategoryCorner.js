import { Box } from "@mui/system";

const PostCategoryCorner = ({category, backgroundColor}) => {
  return (
    <Box
      sx={{
        width: "55px",
        height: "25px",
        color: "white",
        backgroundColor: {backgroundColor},
        fontSize: "11px",
        fontWeight: "500",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        fontFamily:"Montserrat, sans-serif",
        borderBottomRightRadius:"3px"
      }}
    >
      {category}
    </Box>
  );
};

export default PostCategoryCorner;
