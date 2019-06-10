const hapi = require("hapi");
const mongoose = require("mongoose");
const Painting = require("./models/Painting");

mongoose.connect(
  "mongodb://dillydallyking:coconutbom0H@ds235197.mlab.com:35197/graphql",
  { useNewUrlParser: true }
);

mongoose.connection.once("open", () => {
  console.log("Connected to DB");
});

const server = hapi.server({
  port: 4000,
  host: "localhost"
});

const init = async () => {
  server.route([
    {
      method: "GET",
      path: "/",
      handler: function(request, reply) {
        return `<h1> GraphQL </h1>`;
      }
    },
    {
      method: "GET",
      path: "/api/v1/paintings",
      handler: function(request, reply) {
        return Painting.find();
      }
    },
    {
      method: "POST",
      path: "/api/v1/paintings",
      handler: function(request, reply) {
        const { name, url, techniques } = request.payload;
        const painting = new Painting({
          name,
          url,
          techniques
        });
        return painting.save();
      }
    }
  ]);

  await server.start();
  console.log(`Server Running On : ${server.info.uri}`);
};

init();
