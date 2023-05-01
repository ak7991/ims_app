import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import { useCookies, Cookies } from "react-cookie";
// import { useHistory } from "react-router";

// Components
import Home from "./pages/Home";

const StyledMenu = styled.ul`
  position: fixed;
  top: 0;
  right: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 1em;
  align-items: center;
  justify-content: center;
  transition: all 300ms ease;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  opacity: ${({ open }) => (open ? "1" : "0")};
  
  background-color: rgb(20, 26, 31);
  z-index: 9;
  }

  li {
      padding: 2em 0
  }
`;

// const StyledLink = styled(Link)`
//   color: white;
//   text-decoration: none;
//   font-size: 4rem;
//   transition: all 200ms linear;

//   &:hover {
//     color: burlywood;
//   }

//   @media screen and (max-width: 600px) {
//     font-size: 3rem;
//   }
// `;

// const Menu = ({ open, toggle }) => {
//   return (
//     <Router>


//       <Switch>
//         <Route path="/home">
//           <Home />
//         </Route>
//       </Switch>
//     </Router>
//   );
// };

const Nav = () => {
  const [open, setOpen] = React.useState(false);

  // const toggle = () => {
  //   setOpen(!open);
  // };

  return (
    <div>
      {/* <Nav /> */}
      <Home />
    </div>
  );
};

// export default Nav;
