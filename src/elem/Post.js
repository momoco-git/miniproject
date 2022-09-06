// import React from "react";
// import styled, { css } from "styled-components";

// const Post = ({ children, ...rest }) => {
//   return (
//     <BtnBx
//       {...rest}
//       onClick={rest._onClick}
//       type={rest.type}
//       onMouseDown={rest._onMouseDown}
//     >
//       {children}
//     </BtnBx>
//   );
// };

// Button.defaultProps = {
//   width: "120px;",
//   height: "40px;",
//   backgroundColor: "#fff",
//   color: "#000",
// };

// const BtnBx = styled.button`
//   ${props =>
//     props.disabled &&
//     css`
//       background-color: #ddd !important;
//       cursor: not-allowed !important;
//     `}
//   ${props =>
//     props.full
//       ? css`
//           width: 100%;
//         `
//       : `width: ${props.width}`};
//   ${props =>
//     props.large
//       ? css`
//           width: 200px;
//           height: 50px;
//         `
//       : `width: ${props.width}`};
//   ${props =>
//     props.small
//       ? css`
//           width: 100px;
//         `
//       : `width: ${props.width}`};
//   ${props =>
//     props.outline &&
//     css`
//       border: 2px solid #54bab9 !important;
//       background-color: #fff;
//       color: #333;
//       transition: transform ease-in-out 200ms;
//       &:hover {
//         transform: scale(1.05);
//       }
//     `};
//   ${props =>
//     props.primary &&
//     css`
//       background-color: #ff6b6b;
//       color: #fff;
//       &:hover {
//         opacity: 80%;
//       }
//     `}
//   ${props =>
//     props.yellow &&
//     css`
//       background-color: #f2c94c;
//       color: #fff;
//       &:hover {
//         opacity: 80%;
//       }
//     `}
// 	border: none;
//   padding: 10px 20px;
//   border-radius: 8px;
//   cursor: pointer;
//   font-weight: 700;
//   font-size: 14px;
//   background-color: ${props => props.bg};
//   margin: ${props => props.mg};
// `;
// export default Post;





//     const CoverImg = styled.img`
//     width: 250px;
//     height: 250px;
//     margin: 20px auto 0;
//     object-fit: cover;
//   `;
//   const Nick = styled.h2`
//     font-size: 17px;
//   `;
//   const Body = styled.h1`
//     font-size: 25px;
//   `;
//   const Like = styled.div`
//     position: absolute;
//     background-color: white;
//     height: 30px;
//     width: 30px;
//     font-size: 24px;
//     transform: translate(30%, 770%);
//     border-radius: 50%;
//     color: #fa1e2d;
//     box-shadow: 3px 3px 10px black;
//   `;

// export default Post;