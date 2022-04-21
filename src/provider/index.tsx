/* eslint-disable import/no-anonymous-default-export */
import Axios from "axios";
import { ACCESS_TOKEN } from "../constants";
import { BASE_URL } from "../config/env";
interface DetailsTypes {
  type: "post" | "get" | "put" | "delete";
  url: string;
  fields?: object;
  fullUrl?: boolean;
  accessToken?: any;
  formData?: boolean;
  queryString?: any;
}
interface RetrunData {
  error?: boolean;
  result?: any;
  message?: any;
  errorType?: any;
}
export default async (details: DetailsTypes): Promise<RetrunData> => {
  const { type, fields, fullUrl, formData, queryString } = details;
  let { url } = details;
  let accessToken = await localStorage.getItem(ACCESS_TOKEN);
  accessToken = accessToken || "";
  let qs = "";
  if (queryString) {
    qs = "?";
    Object.keys(queryString).map((key) => {
      const keyValue = queryString[key];

      qs += `${key}=${keyValue}&`;
      return {};
    });
    qs = qs.slice(0, -1);
  }

  if (!fullUrl) {
    url = `${BASE_URL}${url}${qs}`;
  }
  let config: any = {
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  };
  if (formData) {
    // config.headers['Content-Type'] =
    //     'multipart/form-data; boundary=foo_bar_baz';
    config = {
      headers: {
        Authorization: `bearer ${accessToken}`,
      },
    };
  }

  let res: any;
  if (type == "get" || type == "delete") {
    res = await Axios[type](`${url}`, config).catch((error) => {
      return {
        status: error.response?.status,
        message: error.response?.message,
        errorType: error?.response?.data.error,
        error: true,
      };
    });
  } else {
    res = await Axios.post(`${url}`, fields, config).catch((error) => {
      const resData = error ? error.response?.data : {};
      return {
        status: error.response?.status,
        message: resData?.errors,
        errorType: error,
        error: true,
      };
    });
  }
  if (res.error) {
    return res;
  }
  if (res.status === 304 || res.status === 200 || res.status === 201) {
    return { error: false, result: res.data };
  }
  return { ...res, error: true, errorType: "connectionError" };
};
