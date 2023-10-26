import axios from "axios";
import React, { useState, useEffect } from "react";

// 임시 이미지파일 불러오는곳

// 픽사베이 API키
// 13113157-b5ac5e3c3e3d3a0bc3c018098

//https://pixabay.com/api/

//아래 api를 임시로 사용한 뒤 우리 서버에서 이미지를 불러오면 될것같습니다
//도자기이미지 api

//그림 이미지 api
//혼합 이미지 api
//인테리어 이미지 api

import React from "react";

function dummy() {
  async function getData() {
    const url = "https://pixabay.com/api/";
    const ceramic_key = "?key=13113157-b5ac5e3c3e3d3a0bc3c018098&q=yellow+flowers&image_type=photo";

    try {
      const response = await axios.get(`${url}${ceramic_key}`, {
        params: {
          largeImageURL
        },
      });
    } catch (error) {
      alert("서버정보에러발생");
    }
  }

  return <div></div>;
}

export default dummy;
