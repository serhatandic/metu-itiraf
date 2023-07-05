import { Box, Typography } from "@mui/material";

const ErrorPage = () => {
	return (
		<Box
			sx={{
				width: "90%",
                height:"60vh",
                alignItems:"center",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<Typography>Burada hiçbir şey yok :(</Typography>
		</Box>
	);
};

export default ErrorPage;
