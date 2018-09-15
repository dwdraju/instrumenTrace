const initTracer = require("jaeger-client").initTracer;
module.exports.initTracer = serviceName => {
  const config = {
    serviceName: "express-jaeger-tracer",
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
      "nodejs-jaeger-tracer.version": "1.1.2"
    },
  };

  return initTracer(config, options);
  }
