import React from "react";
import { SearchPanel } from "./Search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce } from "../../utils";
import * as qs from "qs";
import { useHttp } from "../../utils/http";
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
  }, [debouncedParam]);
  useEffect(() => {
    client("users").then(setUsers);
  }, []);
  return (
    <div>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  );
};
