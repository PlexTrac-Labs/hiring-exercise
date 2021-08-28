import * as Hapi from "@hapi/hapi";
const Path = require("path");

export default function getRoutes(server: Hapi.Server): void {
  server.route({
    method: "GET",
    path: "/{path*}",
    options: {
      auth: false
    },
    handler: {
      directory: {
        path: Path.join(__dirname, "../../../client/build/"),
        listing: false,
        index: true
      }
    }
  });
}
