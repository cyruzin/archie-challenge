import Head from "next/head";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Archie Front-End</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <h1>Test</h1>
      </Layout>
    </div>
  );
}
