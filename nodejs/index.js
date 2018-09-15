const initTracer = require("jaeger-client").initTracer;

const config = {
  serviceName: "nodejs-jaeger-tracing",
  reporter: {
    logSpans: true,
    agentHost: "jaeger",
    agentPort: 6832
  },
  sampler: {
    type: "probabilistic",
    param: 1.0
  }
};

const options = {
  tags: {
    "nodejs-jaeger-tracing.version": "1.1.2"
  },
};

const tracer = initTracer(config, options);

const span = tracer.startSpan("Index SPAN");

span.setTag("index", "first");
span.log({ foo: "bar" });

console.log("Yay !!! I am up. Trace me...");

span.finish();
