import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { nanoid } from 'nanoid'

const CreatePost = ({ showCreatePost, setShowCreatePost }) => {
  const [nickname, setNickname] = useState("");
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const postid = nanoid();

  const submitHandler = (e) => {
    e.preventDefault();
    setButtonPressed(true);

    if (nickname && header && content && category && postid) {
      axios.post("/newpost", { nickname, header, content, category, postid });
      setButtonPressed(false);
    }
  };
  return (
    <Modal
      open={showCreatePost}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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
          width: "70%",
          height: "60%",
          borderRadius: "1rem",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "40px",
            left: "20px",
            top: "25px",
            position: "absolute",
            width: "100%",
            paddingBottom: "50px",
          }}
        >
          <TextField
            sx={{ width: "50%" }}
            variant="outlined"
            label="Başlık"
            required={true}
            onChange={(e) => {
              setHeader(e.target.value);
            }}
            error={buttonPressed && !header}
          />
          <TextField
            sx={{ width: "50%" }}
            variant="outlined"
            label="Rumuz"
            required={true}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            error={buttonPressed && !nickname}
          />
          <FormControl required={true}>
            <InputLabel id="demo-simple-select-label">Kategori</InputLabel>

            <Select
              sx={{ width: "50%" }}
              variant="outlined"
              label="Kategori"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              error={buttonPressed && !category}
            >
              <MenuItem value={"Aşk"}>Aşk</MenuItem>
              <MenuItem value={"Geyik"}>Geyik</MenuItem>
              <MenuItem value={"Aile"}>Aile</MenuItem>
              <MenuItem value={"Okul"}>Okul</MenuItem>
              <MenuItem value={"Diğer"}>Diğer</MenuItem>
            </Select>
          </FormControl>

          <TextField
            sx={{ width: "50%" }}
            variant="outlined"
            label="İçerik"
            multiline
            rows={5}
            required={true}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            error={buttonPressed && !content}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#192b33",
              width: "50%",
              color: "white ",
              ":hover": { backgroundColor: "#192b33" },
              fontSize: "35px",
            }}
            onClick={submitHandler}
          >
            Gönder
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreatePost;
