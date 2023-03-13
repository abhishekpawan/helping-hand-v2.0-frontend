const fastify = require("fastify")();
//swagger setup
fastify.register(require("@fastify/swagger"));

fastify.register(require("@fastify/swagger-ui"), {
  routePrefix: "/documentation",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next();
    },
    preHandler: function (request, reply, next) {
      next();
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject, request, reply) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});
const cors = require("@fastify/cors");
const multer = require("fastify-multer");
const connectDB = require("./config/db");
const PORT = 3001;
require("dotenv").config();

connectDB();

// cors setup
fastify.register(cors, {
  origin: ["http://localhost:3000"],
  credentials: true,
});

// register fastify content parser
fastify.register(multer.contentParser);

fastify.register(require("@fastify/cookie"), {
  secret: "my-secret", // for cookies signature
  hook: "onRequest", // set to false to disable cookie autoparsing or set autoparsing on any of the following hooks: 'onRequest', 'preParsing', 'preHandler', 'preValidation'. default: 'onRequest'
  parseOptions: {}, // options for parsing cookies
});
fastify.register(require("./routes/defaultCRUDRoutes"), { prefix: "/api" });
fastify.register(require("./routes/userRoutes"));
fastify.register(require("./routes/dealerRoutes"));
fastify.register(require("./routes/creditPassRoutes"));
fastify.get("/", async (request, reply) => {
  return { hello: "world" };
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
