import React from "react";

import "./App.css";
import { useAuth } from "./context/auth-context";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";

function App() {
  console.log("111");
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? (
        <AuthenticatedApp></AuthenticatedApp>
      ) : (
        <UnauthenticatedApp></UnauthenticatedApp>
      )}
      {/*<ProjectListScreen></ProjectListScreen>*/}
    </div>
  );
}

export default App;
