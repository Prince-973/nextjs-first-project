import Head from "next/head";
import StartingPageContent from "../components/starting-page/starting-page";

function HomePage() {
  return (
    <>
      <Head>
        <title>Not Home Page</title>
        <meta name="description" content="this is the home page" />
      </Head>
      <StartingPageContent />;
    </>
  );
}

export default HomePage;
