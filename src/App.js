//import ContentCard from "./components/cards/ContentCard";
import { Box } from "@mui/system";
import StoryBar from "./components/stories/StoryBar";
import NavigationCard from "./components/cards/NavigationCard";
import { TextField } from "@mui/material";

function App() {
  return (
    <Box
      className="App"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <StoryBar />

      <Box
        sx={{
          display: "flex",
          justifyContent: "top",
          alignItems: "left",
          width: "80%",
          height: "100vh",
          flexDirection: "column",
          gap: "70px",
        }}
      >
        <TextField sx= {{width:"45%", marginTop:"25px"}} id="outlined-basic" label="Search" variant="outlined"/>
        <NavigationCard />
        <NavigationCard />
        <NavigationCard />
        <NavigationCard />



      </Box>
    </Box>
  );
}

export default App;
