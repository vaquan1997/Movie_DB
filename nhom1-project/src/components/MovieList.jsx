import React, { useEffect } from "react";
import {
  StyledListByImage,
  StyledListByText,
  StyledListByTextRanking,
  StyledListByTextInfo,
} from "./styles/MovieList.styled";
import PosterNull from "./PosterNull";
import ImageLoading from "../hooks/ImageLoading";

const MovieList = ({ datas, idx, setSelectedMovieID, viewBy }) => {
  const { ImageLoad, isImageLoading } = ImageLoading();
  useEffect(() => {
    if (datas.poster_path !== null) {
      ImageLoad("https://image.tmdb.org/t/p/w500/" + datas.poster_path);
    }
  }, [datas]);

  // Chuyển giá trị đến setSelectedMovieID làm props để gửi dữ liệu phim đến Contact.jsx.
  // Nếu selectedMovieID không Null, Contact.jsx sẽ hiển thị thông tin phim dưới dạng vị trí: cố định trên màn hình.
  const onClickHandler = () => {
    setSelectedMovieID(datas);
  };

  // Quyết định cách hiển thị phim.
  return viewBy ? (
    <StyledListByImage>
      {datas.poster_path !== null ? (
        <img
          className={isImageLoading ? "loading" : "loading--completed"}
          src={"https://image.tmdb.org/t/p/w500/" + datas.poster_path}
          alt={datas.title}
          onClick={onClickHandler}
        />
      ) : (
        <div onClick={onClickHandler}>
          <PosterNull title={datas.title} />
        </div>
      )}
    </StyledListByImage>
  ) : (
    <StyledListByText onClick={onClickHandler}>
      <StyledListByTextRanking>{idx}</StyledListByTextRanking>
      {datas.poster_path !== null ? (
        <img
          src={"https://image.tmdb.org/t/p/w500/" + datas.poster_path}
          alt={datas.title}
        />
      ) : (
        ""
      )}
      <StyledListByTextInfo>
        <h4>{datas.title}</h4>
        <p>
          <span>Average</span> {datas.vote_average}
        </p>
        <p>
          <span>Release Date</span>{" "}
          {datas.release_date && datas.release_date.replace(/-/g, "/")}
        </p>
      </StyledListByTextInfo>
    </StyledListByText>
  );
};

export default MovieList;
