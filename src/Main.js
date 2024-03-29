//import ContentCard from "./components/cards/ContentCard";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import NavigationCard from "./components/Content/NavigationCard";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { Button, CircularProgress, Grid, Pagination } from "@mui/material";
import MobileCategorySelection from "./components/Category/MobileCategorySelection";
import ErrorPage from "./components/ErrorPage";

const ResponsiveBox = styled("div")(({ theme }) => ({
	[theme.breakpoints.down("md")]: {
		display: "none",
	},
}));

const ResponsiveGridContainer = styled("div")(({ theme }) => ({
	[theme.breakpoints.down("md")]: {
		width: "92%",
		margin: "auto",
	},
}));

const MobileCategory = styled("div")(({ theme }) => ({
	[theme.breakpoints.up("md")]: {
		display: "none",
	},
}));

function Main({ data }) {
	const allCategories = [
		"Her şey",
		"Aşk",
		"Hayal",
		"Deneyim",
		"Suçluluk",
		"Acı",
		"Yalan",
		"Rastlantı",
		"Geyik",
		"Aile",
		"Okul",
		"Gerçekler",
		"Diğer",
	];

	const categoryColors = {
		"Her şey": "#A59891",
		Hayal: "#727B79",
		Deneyim: "#879EA3",
		Suçluluk: "#908984",
		Acı: "#928A8B",
		Yalan: "#938369",
		Rastlantı: "#C2B9A8",
		Geyik: "#BFB6AA",
		Aile: "#A29283",
		Okul: "#B1A097",
		Gerçekler: "#807972",
		Diğer: "#B7B1AF",
		Aşk: "#f54542",
	};

	const [categoryFilter, setCategoryFilter] = useState([]);
	const [info, setInfo] = useState();
	const [currentPage, setCurrentPage] = useState(1);
	const [numberOfPages, setNumberOfPages] = useState(0);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [currentPosts, setCurrentPosts] = useState([]);

	const postsPerPage = useState(12)[0];

	const lastPostIndex = currentPage * postsPerPage;
	const firstPostIndex = lastPostIndex - postsPerPage;

	useEffect(() => {
		if (data?.data) {
			setInfo(data?.data);
			setNumberOfPages(Math.ceil(filteredPosts?.length / postsPerPage));
      
		}
	}, [data, info?.length, postsPerPage, filteredPosts]);

	useEffect(() => {
		setCurrentPage(1);
	}, [categoryFilter]);

	useEffect(() => {
		const filteredPosts = info?.filter(
			(item) =>
				categoryFilter.includes(item.category.toUpperCase()) ||
				categoryFilter.length === 0 // if no filtering is made show everything
		);
		setFilteredPosts(filteredPosts);
		setCurrentPosts(filteredPosts?.slice(firstPostIndex, lastPostIndex));
	}, [info, categoryFilter, firstPostIndex, lastPostIndex]);

	const mobileCategoryChangeHandler = (categories) => {
		setCategoryFilter(categories.map((category) => category.toUpperCase()));
	};

	return (
		<>
			<Navbar />
			<MobileCategory
				sx={{ marginLeft: "4%", width: "92%", paddingTop: "2%" }}
			>
				<MobileCategorySelection
					mobileCategoryChangeHandler={mobileCategoryChangeHandler}
				/>
			</MobileCategory>
			{!data ? (
				<CircularProgress
					sx={{
						position: "absolute",
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						margin: "auto",
					}}
				/>
			) : (
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<Box sx={{ display: "flex" }}>
						<Box>
							<ResponsiveBox
								sx={{
									display: "flex",
									position: "static",
									width: "200px",
									height: "80vh",
									backgroundColor: "white",
									flexDirection: "column",
									alignItems: "flex-start",
									paddingTop: "55px",
									gap: "10px",
									textTransform: "lowercase",
									paddingLeft: "10px",
								}}
							>
								{allCategories.map((item, id) => (
									<Button
										sx={{
											fontFamily:
												"Rubik Mono One , sans-serif",
											color: "#414141",
											display: "flex",
											justifyContent: "start",
										}}
										key={id}
										onClick={(e) => {
											if (
												e.target.innerText.toUpperCase() ===
												"HER ŞEY"
											) {
												setCategoryFilter([]);
											} else {
												setCategoryFilter(
													e.target.innerText
												);
											}
										}}
									>
										{item}
									</Button>
								))}
							</ResponsiveBox>
						</Box>
						<ResponsiveGridContainer
							sx={{
								marginLeft: "2%",
								marginRight: "2%",
								width: "92%",
								display: "flex",
								flexDirection: "column",
							}}
						>
							{!currentPosts?.length ? (
								<ErrorPage />
							) : (
								<>
									<Grid
										container
										spacing={2}
										sx={{
											marginTop: "10px",
										}}
									>
										{currentPosts?.map((item, id) => (
											<Grid
												key={id}
												item
												xs={12}
												sm={4}
												md={4}
												l={3}
												xl={3}
												sx={{
													height: "250px",
													width: "400px",
													paddingRight: "2px",
												}}
											>
												<NavigationCard
													key={item.content}
													nickname={item.nickname}
													header={item.header}
													content={item.content}
													category={item.category}
													date={item.date}
													postid={item.postid}
													categoryColor={
														categoryColors[
															item.category
														]
													}
													instagramProfileUrl={
														item.instagramProfileUrl
													}
												/>
											</Grid>
										))}
									</Grid>
									<Box
										sx={{
											alignSelf: "center",
											marginTop: "20px",
											marginBottom: "20px",
										}}
									>
										<Pagination
											count={numberOfPages || 0}
											shape="rounded"
											onChange={(e, p) => {
												setCurrentPage(p);
											}}
										/>
									</Box>
								</>
							)}
						</ResponsiveGridContainer>
					</Box>
				</Box>
			)}
		</>
	);
}

export default Main;
