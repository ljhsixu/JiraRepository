import React from "react";
import { SearchPanel } from "./Search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce } from "../../utils";
import * as qs from "qs";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 2000);
  const [list, setList] = useState([]);
  const client = useHttp();
  useEffect(() => {
    client("projects", { params: cleanObject(debouncedParam) }).then(setList);
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
      <List list={list} users={users}></List>
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
