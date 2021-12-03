import { ApolloServer } from "apollo-server-lambda";
import schema from "./schema";
import MetroDataSource from "./datasources/MetroDataSource";
import formatError from "./utils/formatError";
import responseCachePlugin from "apollo-server-plugin-response-cache";
import BusDataSource from "./datasources/BusDataSource";

const exampleQuery = `# Welcome to the Barcelona urban mobility GraphQL API
#
# Here is an example query to get you started,
# which gets the first seven metro stations from the L4,
# simply press play to fetch the information, or refer to the docs tab on the left
# to create your own queries ✨

{
  stations: metroStations(
    filterBy: { lineId: 4 }
    first: 7
  ) {
    edges {
      node {
        id
        name
      }
    }
  }
}
`;

export const server: ApolloServer = new ApolloServer({
  schema,
  playground: {
    settings: {
      "editor.theme": "light",
    },
    tabs: [
      {
        endpoint: "/graphql",
        name: "Example Query",
        query: exampleQuery,
      },
    ],
  },
  cacheControl: {
    defaultMaxAge: 3400,
  },
  formatError,
  introspection: true,
  dataSources: () => ({
    metro: new MetroDataSource(),
    bus: new BusDataSource(),
  }),
  plugins: [responseCachePlugin()],
});

exports.handler = server.createHandler();
