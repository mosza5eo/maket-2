import "@/styles/globals.css";
import Layout from "@/components/Layout";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "@/store/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
