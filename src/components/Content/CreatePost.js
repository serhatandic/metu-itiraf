import {
	Alert,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Modal,
	Select,
	Snackbar,
	TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { nanoid } from "nanoid";
import { styled } from "@mui/material/styles";
import ReCAPTCHA from "react-google-recaptcha";
import Recaptcha from "../../Tools/Recaptcha";

const Hosts = require("../../Tools/Hosts");

const ResponsiveBox = styled("div")(({ theme }) => ({
	[theme.breakpoints.up("md")]: {
		width: "60%",
	},
}));

const CreatePost = ({ showCreatePost, setShowCreatePost }) => {
	const [nickname, setNickname] = useState("");
	const [header, setHeader] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [buttonPressed, setButtonPressed] = useState(false);
	const [notifyUser, setNotifyUser] = useState({ text: "", severity: "" });
	const [recaptchaChecked, setRecaptchaChecked] = useState(false);
	const [instagramProfileUrl, setInstagramProfileUrl] = useState("");

	const instagramUrlRegex = new RegExp(
		"^(https://www.instagram.com/[a-zA-Z0-9._-]+)/?$"
	);

	const isGivenProfileUrlValid =
		instagramProfileUrl && instagramUrlRegex.test(instagramProfileUrl);

	const submitHandler = async (e) => {
		e.preventDefault();
		setButtonPressed(true);

		if (nickname && header && content && category) {
			if (recaptchaChecked) {
				if (instagramProfileUrl && isGivenProfileUrlValid) {
					await axios.post(Hosts.host + "/newpost", {
						nickname,
						header,
						content,
						category,
						postid: nanoid(),
						instagramProfileUrl,
					});
				} else {
					if (instagramProfileUrl && !isGivenProfileUrlValid) {
						setNotifyUser({
							text: "Instagram url geçerli değil!",
							severity: "warning",
						});
						return;
					} else if (!instagramProfileUrl) {
						await axios.post(Hosts.host + "/newpost", {
							nickname,
							header,
							content,
							category,
							postid: nanoid(),
						});
					}
				}

				setButtonPressed(false);
				setNotifyUser({
					text: "İtirafınız paylaşıldı ! Yönlendiriliyorsunuz",
					severity: "success",
				});
				setRecaptchaChecked(false);

				setTimeout(() => {
					window.location.reload();
				}, 2000);
			} else {
				setNotifyUser({
					text: "Captcha doğrulaması gerekli!",
					severity: "warning",
				});
			}
		}
	};
	return (
		<Modal
			open={showCreatePost}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
			onClose={() => {
				setShowCreatePost(false);
			}}
		>
			<Box
				sx={{
					backgroundColor: "white",
					borderStyle: "solid",
					borderColor: "#192b33",
					position: "relative",
					width: "40%",
					height: "60%",
					overflowY: "scroll",
					overflowX: "hidden",
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
				<ResponsiveBox
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "40px",
						top: "25px",
						position: "absolute",
						width: "80%",
						paddingBottom: "50px",
						paddingLeft: "20px",
						paddingRight: "20px",
					}}
				>
					<TextField
						variant="outlined"
						label="Başlık"
						required={true}
						value={header}
						onChange={(e) => {
							setHeader(e.target.value);
						}}
						inputProps={{ maxLength: 60 }}
						error={buttonPressed && !header}
					/>
					<TextField
						variant="outlined"
						label="Rumuz"
						value={nickname}
						required={true}
						onChange={(e) => {
							setNickname(e.target.value);
						}}
						inputProps={{ maxLength: 20 }}
						error={buttonPressed && !nickname}
					/>

					<TextField
						variant="outlined"
						label="Instagram profil id (isteğe bağlı)"
						onChange={(e) => {
							setInstagramProfileUrl(
								e.target.value
									? `https://www.instagram.com/${e.target.value}`
									: ""
							);
						}}
					/>
					<FormControl required={true}>
						<InputLabel id="demo-simple-select-label">
							Kategori
						</InputLabel>

						<Select
							variant="outlined"
							label="Kategori"
							value={category}
							onChange={(e) => {
								setCategory(e.target.value);
							}}
							error={buttonPressed && !category}
						>
							<MenuItem value={"Hayal"}>Hayal</MenuItem>
							<MenuItem value={"Aşk"}>Aşk</MenuItem>
							<MenuItem value={"Deneyim"}>Deneyim</MenuItem>
							<MenuItem value={"Suçluluk"}>Suçluluk</MenuItem>
							<MenuItem value={"Acı"}>Acı</MenuItem>
							<MenuItem value={"Yalan"}>Yalan</MenuItem>
							<MenuItem value={"Rastlantı"}>Rastlantı</MenuItem>
							<MenuItem value={"Geyik"}>Geyik</MenuItem>
							<MenuItem value={"Aile"}>Aile</MenuItem>
							<MenuItem value={"Okul"}>Okul</MenuItem>
							<MenuItem value={"Gerçekler"}>Gerçekler</MenuItem>
							<MenuItem value={"Diğer"}>Diğer</MenuItem>
						</Select>
					</FormControl>

					<TextField
						variant="outlined"
						label="İçerik"
						multiline
						rows={5}
						value={content}
						required={true}
						onChange={(e) => {
							setContent(e.target.value);
						}}
						error={buttonPressed && !content}
					/>
					<ReCAPTCHA
						size="compact"
						sitekey={Recaptcha.token}
						onChange={(e) => {
							setRecaptchaChecked(true);
						}}
					/>
					<Button
						variant="contained"
						sx={{
							backgroundColor: "#192b33",
							color: "white ",
							":hover": { backgroundColor: "#192b33" },
							fontSize: "25px",
						}}
						onClick={submitHandler}
					>
						Gönder
					</Button>
				</ResponsiveBox>
				{notifyUser.text && (
					<Snackbar
						open={notifyUser !== ""}
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
							{notifyUser.text}
						</Alert>
					</Snackbar>
				)}
			</Box>
		</Modal>
	);
};

export default CreatePost;
