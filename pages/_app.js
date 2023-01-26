import config from "@config/config.json";
import theme from "@config/theme.json";
import Head from "next/head";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import Header from "@partials/Header";
import "styles/style.scss";
import "public/fonts/style.css";

const App = ({ Component, pageProps }) => {
  // default theme setup

  // import google font css
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const [fontcss, setFontcss] = useState();
  const [nameCity, setNameCity] = useState();

  // useEffect(() => {
  //   fetch(
  //     `https://fonts.googleapis.com/css2?family=${pf}${
  //       sf ? "&family=" + sf : ""
  //     }&display=swap`
  //   ).then((res) => res.text().then((css) => setFontcss(css)));
  // }, [pf, sf]);

  // google tag manager (gtm)
  const tagManagerArgs = {
    gtmId: config.params.tag_manager_id,
  };
  useEffect(() => {
    setTimeout(() => {
      process.env.NODE_ENV === "production" &&
        config.params.tag_manager_id &&
        TagManager.initialize(tagManagerArgs);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      // const item = localStorage.getItem('key')
      setNameCity(localStorage.getItem("city") === "Находка" || localStorage.getItem("city") === null ? "Находка" : localStorage.getItem("city"));
    }
  }, []);

  return (
    <>
      <Head>
        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `${fontcss}`,
          }}
        />
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </Head>
      <Header nameCity={nameCity} setNameCity={setNameCity} />
      <Component {...pageProps} nameCity={nameCity} setNameCity={setNameCity} />
    </>
  );
};

export default App;
