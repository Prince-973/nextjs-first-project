import Document, { Html, Main, Head, NextScript } from "next/document";
class MyDocumnet extends Document {
  render() {
    return (
      <Html lang="eg">
        <Head />
        <body>
          <div id="overlays" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocumnet;
