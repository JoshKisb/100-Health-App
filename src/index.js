import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "@dhis2/app-runtime";

const dynamicBaseUrl = window.location.origin.includes("local")
  ? process.env.REACT_APP_DHIS2_BASE_URL
  : `${window.location.origin}/`;

let pathname;
if (window.location.pathname) {
  pathname = `${window.location.pathname.split("/")[1]}`;
  if (pathname === "api") pathname = false;
}

const actualBaseUrl = pathname
  ? `${dynamicBaseUrl}${pathname}/`
  : dynamicBaseUrl;

console.log("actualBaseUrl is ", actualBaseUrl);

const appConfig = {
  // baseUrl: process.env.REACT_APP_DHIS2_BASE_URL,
  // baseUrl: "https://qihmisug.org/dhis/",
  baseUrl: actualBaseUrl,
  apiVersion: 32,
};

const MyApp = () => {
  return (
    <Provider config={appConfig}>
      <App />
    </Provider>
  );
};

export default MyApp;