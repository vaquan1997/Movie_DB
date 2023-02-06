import React, { useState, useEffect } from "react";
import logo from "../../assets/main_logo.png";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  StyledAside,
  StyledAsideLogo,
  StyledAsideHistory,
  StyledAsideHistoryText,
} from "../../components/styles/Aside.styled";
import Input from "../../components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Aside = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [historyArray, setHistoryArray] = useState([]);

  useEffect(() => {
    if (id !== undefined) {
      setHistoryArray((oldArray) => {
        // Loại bỏ lịch sử nếu id đã tồn tại trong mảng
        oldArray.map((item, idx) => {
          if (oldArray[idx] === id) {
            // splice
            historyRemoveByIndex(idx + 1);
          }
        });

        // Lưu trữ title phim đã tìm kiếm cùng với mảng hiện có.
        if (oldArray.length >= 5) {
          // pop
          historyRemoveByIndex(oldArray.length);
        }

        // push
        return [id, ...oldArray];
      });
    }
  }, [id]);

  // Loại bỏ lịch sử index đã chọn khỏi mảng.
  const historyRemoveByIndex = (index) => {
    setHistoryArray((oldArray) => {
      return oldArray.filter((item, idx) => idx !== index);
    });
  };

  return (
    <StyledAside>
      <StyledAsideLogo>
        <img src={logo} alt="logo" />
      </StyledAsideLogo>
      <h3 className="searchpage">SEARCH</h3>
      <Input searchpage={true} />
      <span></span>
      {historyArray.length !== 0 && <h3 className="history">History</h3>}
      <StyledAsideHistory>
        {historyArray.map((item, idx) => {
          return (
            <StyledAsideHistoryText key={idx + item}>
              {/* Nếu nhấp vào lịch sử, hãy gửi giá trị movie title trong Params. */}
              <p onClick={() => navigate(item)}>{item}</p>
              <div onClick={() => historyRemoveByIndex(idx)}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </div>
            </StyledAsideHistoryText>
          );
        })}
      </StyledAsideHistory>
    </StyledAside>
  );
};

export default Aside;
