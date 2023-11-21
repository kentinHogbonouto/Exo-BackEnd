import server from "./app";
import EnvironmentConfigs from "./configs/environments";
import ServerConfigs from "./configs/server.configs";

/**
 * @function startServer
 * @description Start the API Server
 */
const startServer = () => {
  server.listen(EnvironmentConfigs.getServerPort());
  server.on("error", ServerConfigs.onError);
  server.on("listening", ServerConfigs.onListening);

  process.on("SIGINT", ServerConfigs.gracefulStopServer);
  process.on("SIGTERM", ServerConfigs.gracefulStopServer);
  process.on("uncaughtException", ServerConfigs.uncaughtException);
  process.on("unhandledRejection", ServerConfigs.unhandledRejection);
};

/**
 * @description Starting API Server after everythin is set up
 */
setImmediate(startServer);

export default server;
