import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "api_key=b0a4d245d5b20ec7da2f1eb0a7b47d89";
const BASE_URL = "https://api.themoviedb.org/3";

const APIUtils = () => {
  // Khi URL được duyệt thì props, fetch sẽ bắt đầu.
  const [URL, setURL] = useState();

  // Tất cả dữ liệu được lưu trữ ở trạng thái dữ liệu.
  const [datas, setDatas] = useState();

  // Đặt Boolean để hiển thị components khác trong thời gian loadding.
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    let cancelToken = axios.CancelToken.source();
    if (URL) {
      const fetchItems = async () => {
        try {
          await axios
            .get(URL, {
              cancelToken: cancelToken.token,
            })
            .then((res) => {
              setDatas(res.data);
              setLoading(false);
            });
        } catch (err) {
          throw err;
        }
      };
      fetchItems();
    }
    return () => {
      cancelToken.cancel();
      setLoading(true);
    };
  }, [URL]);

  const requestMovie = (query, path) => {
    const requestURL = BASE_URL + path + query + API_KEY;
    setURL(requestURL);
  };

  return { datas, isLoading, requestMovie };
};

export default APIUtils;
