const { initTracer } = require("./lib/tracer");
const tracer = initTracer("hello-world");

const span = tracer.startSpan("EXAMPLE");

span.setTag("hello", "world");
span.log({ foo: "bar" });

console.log("do stuff...");

span.finish();
