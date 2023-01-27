//import ContentCard from "./components/cards/ContentCard";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import NavigationCard from "./components/cards/NavigationCard";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import CategorySelectItem from "./components/CategorySelectItem";

function App() {
  const allCategories = [
    "Hayal",
    "Deneyim",
    "Suçluluk",
    "Acı",
    "Yalan",
    "Rastgele",
    "Gerçekler",
    "Diğer",
  ];
  const [data, setData] = useState();
  const [info, setInfo] = useState();

  useEffect(() => {
    const fetch = async () => {
      setData(await axios.get("http://localhost:4000/"));
    };
    fetch();
  }, []);

  useEffect(() => {
    if (data?.data) {
      setInfo(data?.data);
    }
  }, [data]);

  const ResponsiveBox = styled("div")(({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  return (
    <>
      <Navbar />
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
            <CategorySelectItem category={item} key={id} />
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
          {info?.map((item, id) => (
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
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default App;
