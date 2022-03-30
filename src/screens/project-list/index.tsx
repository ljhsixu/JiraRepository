import React from "react";
import { SearchPanel } from "./Search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce } from "../../utils";
import * as qs from "qs";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import { useAsync } from "../../utils/use-async";
import { Typography } from "antd";
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 2000);

  const client = useHttp();
  const { run, isLoading, error, data: list } = useAsync();
  useEffect(() => {
    run(client("projects", { params: cleanObject(debouncedParam) }));
  }, [debouncedParam]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    client("users").then(setUsers);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={"danger"}>{error.message} </Typography.Text>
      ) : null}
      <List users={users}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
