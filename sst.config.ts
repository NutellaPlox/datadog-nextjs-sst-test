import { SSTConfig } from "sst"
import { NextjsSite, Stack } from "sst/constructs"
import { Datadog } from "datadog-cdk-constructs-v2"
import { Effect, PolicyStatement } from "aws-cdk-lib/aws-iam"
import * as lambda from "aws-cdk-lib/aws-lambda"
export default {
  config(_input) {
    return {
      name: "datadog-test",
      region: "us-east-1",
    }
  },
  stacks(app) {
    const datadogApiKeySecretArn =
      "arn:aws:secretsmanager:us-west-2:732593675237:secret:DdApiKeySecret-uSj4JZz7eIZK-qeOXjT"

    const enableDatadog = true

    let siteServerFunction: lambda.Function | undefined
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        buildCommand:
          "pnpm open-next build --node-externals dd-trace,datadog-lambda-js",
        openNextVersion: "3.1.3",
      })

      site.attachPermissions([
        new PolicyStatement({
          effect: Effect.ALLOW,
          resources: [datadogApiKeySecretArn],
          actions: ["secretsmanager:GetSecretValue"],
        }),
      ])
      siteServerFunction = site.cdk?.function as lambda.Function

      stack.addOutputs({
        SiteUrl: site.url,
      })
    })

    if (enableDatadog) {
      // Attach the Datadog contruct to each stack
      app.node.children.forEach((stack) => {
        if (stack instanceof Stack) {
          const datadog = new Datadog(stack, "datadog", {
            // Get the latest version from
            // https://github.com/Datadog/datadog-lambda-js/releases
            nodeLayerVersion: 117,
            // Get the latest version from
            // https://github.com/Datadog/datadog-lambda-extension/releases
            extensionLayerVersion: 67,
            site: "datadoghq.com",
            // apiKey: "e5976f1ab9d3a7066d9318a6042d1f45",
            apiKeySecretArn: datadogApiKeySecretArn,
            env: "dev",
            service: "datadog-test",
            // Just a recommendation, feel free to change the version per your CI/CD
            version: "1.0.0",
            enableDatadogTracing: true,
            enableDatadogLogs: true,
            enableProfiling: true,
            // logLevel: "debug",
          })

          datadog.addLambdaFunctions([siteServerFunction as any])
        }
      })
    }
  },
} satisfies SSTConfig
