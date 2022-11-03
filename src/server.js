import Hapi from "@hapi/hapi";
import routes from "./routes.js";

const host = "localhost";
const port = 8000;

const init = async () => {
  const server = Hapi.server({
    host: host,
    port: port,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan di http://${host}:${port}/`);
};

init();
