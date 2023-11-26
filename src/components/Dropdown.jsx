import React from 'react';

//드롭다운 애니메이션 처리용 컴포넌트
//드롭다운할 메뉴를 자식으로 받는다

const Dropdown = (props) => {
  // return <article>{props.visibility && props.children} </article>;
  return <article className="absolute flex justify-center text-center pt-8 ml-4">{props.children}</article>;

};

export default Dropdown;
