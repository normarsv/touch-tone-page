import Document, { Head, Html, Main, NextScript } from "next/document";

import MetaTagsComp from "../components-base/MetaTagsComp";
import { baseMetaTags } from "../scripts/MainInfoData";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    let metaTags = [];
    let replaceMetaTags = baseMetaTags;
    return { ...initialProps, metaTags, replaceMetaTags };
  }

  render() {
    return (
      <Html lang="es-MX">
        <Head>
          <MetaTagsComp
            metaTags={this.props.metaTags}
            replaceMetaTags={this.props.replaceMetaTags}
          />
          <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
          <link
            rel="preload"
            as="font"
            href="/fonts/LatoLatin-Bold.woff"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="/fonts/LatoLatin-Regular.woff"
            type="font/woff"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="/fonts/LatoLatin-Bold.woff2"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="font"
            href="/fonts/LatoLatin-Regular.woff2"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <link rel="icon" type="image/x-icon" href="favicon.ico?v=5" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
