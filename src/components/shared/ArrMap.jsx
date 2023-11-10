import React from 'react'

//객체 모음을 배열로 가진 변수를 맵으로 펼쳐주는 컴포넌트
//이게 필요한가?

function ArrMap( arr ) {

  const length = arr.length;
  const firstArr = arr[0];
  console.log("어레이길이 : " + length + "개"+ "첫번째 어레이로 구조확인 : " + firstArr)


  return (
    <div>
      {/* {arr.map(item, idx) => (
        <div></div>
      )} */}
    </div>
  )
}

export default ArrMap