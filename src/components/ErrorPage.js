import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const ResponsiveBox = styled("div")(({ theme }) => ({
	[theme.breakpoints.up("md")]: {
		width: "90%",
	},
}));


const ErrorPage = () => {
	return (
		<ResponsiveBox
			sx={{
				width: "100%",
                height:"60vh",
                alignItems:"center",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<Typography>Burada hiçbir şey yok :(</Typography>
		</ResponsiveBox>
	);
};

export default ErrorPage;
