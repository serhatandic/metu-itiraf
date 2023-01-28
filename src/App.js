//import ContentCard from "./components/cards/ContentCard";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import NavigationCard from "./components/Content/NavigationCard";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Grid, Pagination } from "@mui/material";

const Hosts = require("./Tools/Hosts");

const ResponsiveBox = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const ResponsivePagination = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("xl")]: {
    marginBottom: "0",
    marginTop: "20px",
  },
}));

function App() {
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

  const [categoryFilter, setCategoryFilter] = useState("HER ŞEY");
  const [data, setData] = useState();
  const [info, setInfo] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const postsPerPage = useState(16)[0];

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  useEffect(() => {
    const fetch = async () => {
      setData(await axios.get(Hosts.host + "/"));
    };
    fetch();
  }, []);

  useEffect(() => {
    if (data?.data) {
      setInfo(data?.data);
      setNumberOfPages(Math.ceil(info?.length / postsPerPage));
    }
  }, [data, info?.length, postsPerPage]);

  const filteredPosts = info?.filter(
    (item) =>
      item.category.toUpperCase() === categoryFilter ||
      categoryFilter === "HER ŞEY"
  );
  const currentPosts = filteredPosts?.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <Navbar />

      <Box sx={{ display: "flex", flexDirection: "column", }}>
        <Box sx={{ display: "flex" }}>
          <ResponsiveBox
            sx={{
              display: "flex",
              position: "block",
              width: "200px",
              height: "100vh",
              backgroundColor: "white",
              flexDirection: "column",
              alignItems: "flex-start",
              paddingTop: "55px",
              gap: "20px",
              textTransform: "lowercase",
              paddingLeft: "10px",
            }}
          >
            {allCategories.map((item, id) => (
              <Button
                sx={{
                  fontFamily: "Rubik Mono One , sans-serif",
                  color: "#414141",
                  display: "flex",
                  justifyContent: "start",
                }}
                key={id}
                onClick={(e) => {
                  setCategoryFilter(e.target.innerText);
                }}
              >
                {item}
              </Button>
            ))}
          </ResponsiveBox>
          <Grid
            container
            spacing={5}
            sx={{
              marginTop: "10px",
              width: "95vw",
              marginLeft: "1px",
              marginRight: "15px",
            }}
          >
            {currentPosts?.map((item, id) => (
              <Grid
                key={id}
                item
                xs={12}
                sm={4}
                md={3}
                l={2}
                xl={2}
                sx={{
                  height: "250px",
                  width: "400px",
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
                  categoryColor={categoryColors[item.category]}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <ResponsivePagination sx={{ alignSelf: "center", marginTop: "-45px" }}>
          <Pagination
            count={numberOfPages || 0}
            shape="rounded"
            onChange={(e) => {
              setCurrentPage(parseInt(e.target.textContent));
            }}
          />
        </ResponsivePagination>
      </Box>
    </>
  );
}

export default App;
