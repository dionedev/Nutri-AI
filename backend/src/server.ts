import Fastify from "fastify";
import { appRoutes } from "./routes/route";

const app = Fastify({ logger: true });

app.get("/test", (req, res) => {
  res.send("Hello Node");
});

app.register(appRoutes);

app
  .listen({ port: Number(process.env.PORT) || 3333, host: "0.0.0.0" })
  .then(() => {
    console.log("Server is running on port 3333");
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
