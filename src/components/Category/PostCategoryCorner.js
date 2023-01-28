import { Box } from "@mui/system";

const PostCategoryCorner = ({category, backgroundColor}) => {
  return (
    <Box
      sx={{
        width: "40px",
        height: "18px",
        color: "white",
        backgroundColor: {backgroundColor},
        fontSize: "8px",
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
