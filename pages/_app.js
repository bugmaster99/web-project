import Script from "next/script";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Fragment } from "react";
//GOOGLE ANALYTICS EVENT
import ReactG4 from "react-ga4";
import * as gtag from "../lib/gtag";
import * as fbq from "../lib/fPixel";
import * as esk from "../lib/eskPixel";

import "../styles/globals.css";
import Image from "next/image";

// ReactG4.initialize(gtag.GA_TRACKING_ID);

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    let currentUrl = router.asPath;
    if (currentUrl.includes("?")) {
      currentUrl = currentUrl.split("?")[0];
    }
    if (pageProps?.landingPageData?.facebookAnalytics) {
      fbq.pageview();
    }

    const handleRouteChange = (url) => {
      if (pageProps?.landingPageData?.googleAnalytics) {
        gtag.pageview(url);
      }
      if (pageProps?.landingPageData?.facebookAnalytics) {
        fbq.pageview();
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, pageProps, router.asPath]);
  return (
    <Fragment>
      <Head>
        <noscript>
          <Image
            alt={"pixel id img"}
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${fbq.FB_PIXEL_ID_1}&ev=PageView&noscript=1`}
          />
          <Image
            alt={"pixel id img"}
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${fbq.FB_PIXEL_ID_2}&ev=PageView&noscript=1`}
          />
        </noscript>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* <link rel="preconnect" href="https://dev-ops.virohan.com" /> */}
        <link rel="preconnect" href="https://web-cms.virohan.com" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      {/* google analytics code starts*/}
      {pageProps?.landingPageData?.googleAnalytics && (
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
      )}
      {pageProps?.landingPageData?.googleAnalytics && (
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      )}
      {pageProps?.landingPageData?.googleAnalytics && (
        <Script
          id="tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TRXLDVG');`,
          }}
        />
      )}
      {/* google analytics code ends*/}
      {pageProps?.landingPageData?.facebookAnalytics && (
        <>
          <Script
            id="fb-pixel-1"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
             !(function (e, t, n, o, a, c, r, l, s, u, f) { e.fbq || (((l = e.dhPixel = function () { l.callMethod ? l.callMethod.apply(l, arguments) : l.queue.push(arguments); }).push = l), (l.queue = []), (a = e.fbq = function () { for (var t = new Array(arguments.length), n = 0; n < t.length; ++n)t[n] = arguments[n]; var o = Math.floor(1e14 * Math.random()); if (!(("track"!==t[0].toLowerCase()&& "trackcustom"!==t[0].toLowerCase())||(t[3]&&t[3].eventID))){t[2]||(t[2]=void 0),"object"==typeof t[3]?(t[3].eventID=o):(t[3]={eventID:o});}if(!(("tracksingle"!==t[0].toLowerCase() && "tracksinglecustom"!==t[0].toLowerCase())||(t[3]&&t[3].eventID)||(t[4]&&t[4].eventID))){t[3]||(t[3]=void 0),t[4]||(t[4]=void 0),"object"==typeof t[4]?(t[4].eventID=o):(t[4]={eventID:o});}a.callMethod?a.callMethod.apply(a,t):a.queue.push(t),e.dhPixel(t);}),e._fbq||(e._fbq=a),(a.push=a),(a.loaded=!0),(a.version="2.0"),(a.queue=[]),((c=t.createElement(n)).async=!0),(c.src="https://connect.facebook.net/en_US/fbevents.js"),(r=t.getElementsByTagName(n)[0]).parentNode.insertBefore(c,r),((s=t.createElement(n)).async=!0),(s.src="https://s2s.virohan.com/static/DhPixel.js"),r.parentNode.insertBefore(s,r));})(window,document,"script");
fbq('init', ${fbq.FB_PIXEL_ID_1});
          `,
            }}
          />
          <Script
            id="fb-pixel-2"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
             !(function (e, t, n, o, a, c, r, l, s, u, f) { e.fbq || (((l = e.dhPixel = function () { l.callMethod ? l.callMethod.apply(l, arguments) : l.queue.push(arguments); }).push = l), (l.queue = []), (a = e.fbq = function () { for (var t = new Array(arguments.length), n = 0; n < t.length; ++n)t[n] = arguments[n]; var o = Math.floor(1e14 * Math.random()); if (!(("track"!==t[0].toLowerCase()&& "trackcustom"!==t[0].toLowerCase())||(t[3]&&t[3].eventID))){t[2]||(t[2]=void 0),"object"==typeof t[3]?(t[3].eventID=o):(t[3]={eventID:o});}if(!(("tracksingle"!==t[0].toLowerCase() && "tracksinglecustom"!==t[0].toLowerCase())||(t[3]&&t[3].eventID)||(t[4]&&t[4].eventID))){t[3]||(t[3]=void 0),t[4]||(t[4]=void 0),"object"==typeof t[4]?(t[4].eventID=o):(t[4]={eventID:o});}a.callMethod?a.callMethod.apply(a,t):a.queue.push(t),e.dhPixel(t);}),e._fbq||(e._fbq=a),(a.push=a),(a.loaded=!0),(a.version="2.0"),(a.queue=[]),((c=t.createElement(n)).async=!0),(c.src="https://connect.facebook.net/en_US/fbevents.js"),(r=t.getElementsByTagName(n)[0]).parentNode.insertBefore(c,r),((s=t.createElement(n)).async=!0),(s.src="https://s2s.virohan.com/static/DhPixel.js"),r.parentNode.insertBefore(s,r));})(window,document,"script");
fbq('init', ${fbq.FB_PIXEL_ID_2});
          `,
            }}
          />
        </>
      )}

      {pageProps?.landingPageData?.eskimiAnalytics && (
        <Script
          id="eskimi-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,e,t,u,n,s,p) {if(f.esk)return;n=f.esk=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f.___esk)f.___esk=n;n.push=n;n.loaded=!0;n.queue=[];s=e.createElement(t);s.async=!0;s.src=u;p=e.getElementsByTagName(t)[0];p.parentNode.insertBefore(s,p)}(window,document,'script', 'https://dsp-media.eskimi.com/assets/js/e/gtr.min.js?_=0.0.0.3');
            esk('init', ${esk.ESKIMI_PIXEL_ID});
          `,
          }}
        />
      )}
      {/* TESTING FOR MICROSOFT CLARITY */}
      {(router.asPath.split("?")[0] === "/paramedical-courses/lp-experiment1" ||
        router.asPath.split("?")[0] === "/healthcare-courses/old-lp" ||
        router.asPath.split("?")[0] ===
          "/paramedical-courses/bachelors-old") && (
        <Script
          id="microsoft-calarity-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "lh0zrx52t4");
          `,
          }}
        />
      )}
      <Component {...pageProps} />
    </Fragment>
  );
}

export default MyApp;
