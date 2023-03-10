import React, { useState } from "react";
import { StyledPage } from "../../components/styles/Page.styled";
import Aside from "./Aside";
import Main from "./Main";

const Home = () => {
  // Save the value in setGenreID to fetch/filter the type of movie.
  const [genreID, setGenreID] = useState(0);

  return (
    <StyledPage>
      <Aside
        genreID={genreID}
        setGenreID={(int) => {
          setGenreID(int);
        }}
      />
      <Main genreID={genreID} />
    </StyledPage>
  );
};

export default Home;
