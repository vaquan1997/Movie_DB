import React from "react";
import styled from "styled-components";

const StyledPopup = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: brightness(20%) blur(5px);
  cursor: pointer;
  z-index: 997;
`;

const PopupBackground = ({ setSelectedMovieID }) => {
  // Ngăn chặn cuộn.
  document.body.style.overflow = "hidden";

  // Tắt tính năng ngăn cuộn khi nhấp vào nền.
  const onClickHandler = () => {
    document.body.style.overflow = "auto";

    // Đóng Content.jsx bằng cách đặt selectedMovieID thành Null
    setSelectedMovieID(null);
  };
  return <StyledPopup onClick={onClickHandler}>PopupBackground</StyledPopup>;
};

export default PopupBackground;
