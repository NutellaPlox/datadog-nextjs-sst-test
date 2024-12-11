import "@/styles/globals.css"
import type { AppProps } from "next/app"
import { datadogRum } from "@datadog/browser-rum"

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

datadogRum.init({
  applicationId: "24666b2a-c0fb-43c3-8b16-3e6e1705db78",
  clientToken: "pub17eb6039a9ea73d5d538e16bf92e237a",
  // `site` refers to the Datadog site parameter of your organization
  // see https://docs.datadoghq.com/getting_started/site/
  site: "datadoghq.com",
  service: "datadog-test",
  env: `dev`,
  // Specify a version number to identify the deployed version of your application in Datadog
  version: "1.0.0",
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: "allow",
  allowedTracingUrls: [
    {
      match: `https://d2nk8is5k65d5z.cloudfront.net/api`,
      propagatorTypes: ["datadog", "tracecontext"],
    },
  ],
})
