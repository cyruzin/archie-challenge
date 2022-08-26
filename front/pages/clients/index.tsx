import Head from "next/head";
import React from "react";
import Layout from "../../components/Layout";

export default function Clients() {
  return (
    <div>
      <Head>
        <title>Archie Front-End</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Clients</h1>
      </Layout>
    </div>
  );
}
