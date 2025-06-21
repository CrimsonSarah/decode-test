import Fastify from "fastify";

const app = Fastify();
app.register(require('./interfaces/routes.ts'), { prefix: "/users" });

app.get("/", async () => {
  return { message: "Hello world" };
});

const start = async () => {
  try {
    await app.listen({ port: 3333, host: "0.0.0.0" });
    console.log("🚀 Server ready at http://localhost:3333");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();