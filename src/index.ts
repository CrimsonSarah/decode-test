import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { validatorCompiler, serializerCompiler, type ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

await app.setValidatorCompiler(validatorCompiler);
await app.setSerializerCompiler(serializerCompiler);

await app.register(fastifyCors), {
  origin: "*", // Permite todas as origens
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
}

await app.register(fastifySwagger, {
  openapi: {
    info: { 
      title: "API Rest",
      version: "1.0.0",
    },
  },
  // transform: jsonSchemaTransform,
});

await app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

await app.register(require('./interfaces/users.ts'), { prefix: "/users" });
await app.register(require('./interfaces/tasks.ts'), { prefix: "/tasks" });

const start = async () => {
  try {
    await app.listen({ port: 3333, host: "0.0.0.0" });
    console.log("🚀 Server ready at http://localhost:3333");
  } catch (err) {
    app.log.error(err);
    console.log(err);
    process.exit(1);
  }
};

start();