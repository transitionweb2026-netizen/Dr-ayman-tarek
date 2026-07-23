import Script from "next/script";

interface AnalyticsScriptsProps {
  gaMeasurementId: string | null;
  googleAdsId: string | null;
  gtmContainerId: string | null;
  metaPixelId: string | null;
}

/** Renders only the tracking scripts an admin has actually configured in
 * Site Settings → Analytics — nothing hardcoded, nothing loaded until an ID
 * is set. `next/script` with `afterInteractive` keeps these off the
 * critical rendering path. */
export function AnalyticsScripts({ gaMeasurementId, googleAdsId, gtmContainerId, metaPixelId }: AnalyticsScriptsProps) {
  return (
    <>
      {gtmContainerId && (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmContainerId}');`}
        </Script>
      )}

      {(gaMeasurementId || googleAdsId) && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId || googleAdsId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${gaMeasurementId ? `gtag('config', '${gaMeasurementId}');` : ""}
              ${googleAdsId ? `gtag('config', '${googleAdsId}');` : ""}`}
          </Script>
        </>
      )}

      {metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '${metaPixelId}');fbq('track', 'PageView');`}
        </Script>
      )}
    </>
  );
}
