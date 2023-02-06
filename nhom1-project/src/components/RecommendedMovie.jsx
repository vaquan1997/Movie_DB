import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import {
  StyledRecommendedMovie,
  StyledRecommendedText,
  StyledRecommendedButton,
  StyledRecommendedImage,
} from "./styles/RecommendedMovie.styled";

import ImageLoading from "../hooks/ImageLoading";
import PosterNull from "./PosterNull";

const RecommendedMovie = ({ datas, setSelectedMovieID }) => {
  const { ImageLoad, isImageLoading } = ImageLoading();

  // Khai báo ngẫu nhiên index sẽ được sử dụng trong mảng chứa dữ liệu phim trong randomNum.
  const [randomNum, setRandomNum] = useState(null);

  function getRandomInt(parentElement) {
    // Chọn số trang.
    let parentIndex = Math.floor(Math.random() * parentElement);

    // Chọn 1 trong các Children trong trang.
    let childIndex = Math.floor(
      Math.random() * (datas[parentIndex].length - 1)
    );
    return datas[parentIndex][childIndex];
  }

  // Một số ngẫu nhiên mới thu được mỗi khi components render.
  // Components thường hiển thị khi thể loại hoặc trang thay đổi.
  useEffect(() => {
    refreshOnclick();
  }, [datas]);

  useEffect(() => {
    if (randomNum !== null && randomNum.backdrop_path !== null) {
      ImageLoad(`https://image.tmdb.org/t/p/w500/${randomNum.backdrop_path}`);
    }
  }, [randomNum]);

  // Tất cả thông tin về bộ phim đã chọn được chuyển làm props.
  const contentOnClick = () => {
    setSelectedMovieID(randomNum);
  };

  const refreshOnclick = () => {
    setRandomNum(getRandomInt(datas.length - 1));
  };

  return (
    randomNum !== undefined &&
    randomNum !== null && (
      <StyledRecommendedMovie>
        <StyledRecommendedText>
          <h4>Recommended</h4>
          <h3>{randomNum.title}</h3>
          <StyledRecommendedButton>
            <button onClick={contentOnClick}>More Detail</button>
            <button onClick={refreshOnclick}>
              <FontAwesomeIcon icon={faRotateRight} />
            </button>
          </StyledRecommendedButton>
        </StyledRecommendedText>
        <StyledRecommendedImage
          className={
            randomNum.backdrop_path !== null && isImageLoading
              ? "loading"
              : "loading--completed"
          }
        >
          {randomNum.backdrop_path !== null ? (
            <img
              src={`https://image.tmdb.org/t/p/w500/${randomNum.backdrop_path}`}
              alt={randomNum.title}
            />
          ) : (
            <PosterNull title={randomNum.title} />
          )}
        </StyledRecommendedImage>
      </StyledRecommendedMovie>
    )
  );
};

export default RecommendedMovie;
