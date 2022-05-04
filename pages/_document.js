import Document, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="msapplication-TileColor" content="#238551"/>
          <meta name="theme-color" content="#238551"/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument