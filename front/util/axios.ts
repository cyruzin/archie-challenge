import axios, { AxiosRequestConfig } from "axios";

type methods =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE"
  | "PATCH";

export interface IHTTPRequest {
  url?: string;
  method?: methods;
  headers?: any;
  params?: any;
  data?: any;
  external?: boolean;
}

export interface IHTTPRequestError {
  default?: string;
  noResponse?: string;
  network?: string;
}

export interface IHTTP {
  fetch({
    url,
    method,
    headers,
    data,
    params,
    external,
  }: IHTTPRequest): Promise<any>;
}

/* Default error messages for failing requests. */
const errorMessages: IHTTPRequestError = {
  default: "Something went wrong",
  noResponse: "No response from server",
  network: "Network error",
};

/* This function handles three types of errors relationed to requests. */
function errorHandler(error: any): void {
  if (error.response) {
    /* The server responded with a status code
    that falls out of the range of 2xx.  */
    throw (
      `${error.response.data.code} - ${error.response.data.message}` ||
      errorMessages.default
    );
  } else if (error.request) {
    /* The request was made but no response was received. */
    throw error.request.response || errorMessages.noResponse;
  } else {
    /* Something went wrong in setting up the request. */
    throw error.message || errorMessages.network;
  }
}

/* Generic instance. For generic requests. */
const genericRequest = axios.create({
  baseURL: "http://localhost:3000",
});

async function fetch({
  url,
  method,
  headers,
  data,
  params,
}: IHTTPRequest): Promise<any> {
  try {
    const response = await genericRequest({
      url,
      headers,
      method,
      data,
      params,
    } as AxiosRequestConfig);
    return response.data;
  } catch (error) {
    errorHandler(error);
  }
}

export const AxiosAdapter: IHTTP = {
  fetch,
};
