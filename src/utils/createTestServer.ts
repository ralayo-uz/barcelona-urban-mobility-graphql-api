import { ApolloServer } from "apollo-server-lambda";
import schema from "../schema";
import MetroDataSource from "../datasources/MetroDataSource";
import BusDataSource from "../datasources/BusDataSource";

interface TestServer {
  server: ApolloServer;
  metro: MetroDataSource;
  bus: BusDataSource;
}

const createTestServer = (): TestServer => {
  const metro = new MetroDataSource();
  const bus = new BusDataSource();

  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      metro,
      bus,
    }),
  });

  return { server, metro, bus };
};

export default createTestServer;
