import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "../context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  params?: object;
}
export const request = async (
  url: string,
  { params, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": params ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    url += `?${qs.stringify(params)}`;
  } else {
    config.body = JSON.stringify(params || {});
  }
  // axios 和 fetch 表现不一样 fetch 报错不会抛出异常
  return window.fetch(`${apiUrl}/${url}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      //  如果失败了 就执行logout 然后页面刷新
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  // TODO: 讲解ts操作符
  return (...[url, config]: Parameters<typeof request>) =>
    request(url, { ...config, token: user?.token });
};

// 联合类型

// 类型别名
