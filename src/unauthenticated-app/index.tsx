import React, { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
import { Card } from "antd";
// import styled from ''
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegister ? (
          <RegisterScreen></RegisterScreen>
        ) : (
          <LoginScreen></LoginScreen>
        )}
        <button onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? "注册" : "登录"}
        </button>
      </Card>
    </div>
  );
};
