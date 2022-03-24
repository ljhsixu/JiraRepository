import { useEffect, useState } from "react";

export const cleanObject = (object: any) => {
  console.log(object);
  const result = { ...object };
  Object.keys(object).forEach((v) => {
    if (!object[v] && object[v] !== 0) {
      delete result[v];
    }
  });
  return result;
};

export const useDebounce = <V>(value: V, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect 处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
