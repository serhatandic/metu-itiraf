import { useEffect, useState } from "react";
import Main from "./Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hosts from "./Tools/Hosts";
import axios from "axios";
import PostDetails from "./components/Content/PostDetails";

function App() {
  const [data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      setData(await axios.get(Hosts.host + "/"));
    };
    fetch();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main data={data} />} />
        <Route
          path="/post/:postid"
          element={
            <>
              <Main data={data} />
              <PostDetails posts={data?.data} />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
