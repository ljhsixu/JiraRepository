import React from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { ReactComponent as SoftWareLogo } from "assets/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";
export const AuthenticatedApp = () => {
  const { logout, user } = useAuth();
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <SoftWareLogo width={"18rem"}></SoftWareLogo>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <div>
                  <Menu.Item key={"logout"}>
                    <Button onClick={logout} type={"link"}>
                      登出
                    </Button>
                  </Menu.Item>
                </div>
              </Menu>
            }
          >
            <Button onClick={(e) => e.preventDefault()}>Hi,{user?.name}</Button>
          </Dropdown>
        </HeaderRight>
      </Header>

      <Main>
        <ProjectListScreen></ProjectListScreen>
      </Main>
    </Container>
  );
};

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
