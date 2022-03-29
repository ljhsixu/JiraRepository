import React from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <div>
      <Header>
        <HeaderLeft>
          <h3>111</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>退出</button>
        </HeaderRight>
      </Header>

      <Main>
        <ProjectListScreen></ProjectListScreen>
      </Main>

      <Footer>FOOTER</Footer>
    </div>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 5rem calc(100vh - 6rem);
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header header"
    "nav main aside"
    "footer footer footer ";
  height: 100vh;
`;
const Header = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Main = styled.header`
  grid-area: main;
`;
const Nav = styled.header`
  grid-area: nav;
`;
const Aside = styled.header`
  grid-area: aside;
`;
const Footer = styled.header`
  grid-area: footer;
`;
