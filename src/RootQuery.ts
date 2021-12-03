import { GraphQLObjectType } from "graphql";

import metroStation from "./queries/MetroStationQuery";
import metroStations from "./queries/MetroStationsQuery";

import metroLine from "./queries/MetroLineQuery";
import metroLines from "./queries/MetroLinesQuery";

import busStop from "./queries/BusStopQuery";
import busStops from "./queries/BusStopsQuery";

import busLines from "./queries/BusLinesQuery";
import busLine from "./queries/BusLineQuery";

export default new GraphQLObjectType({
  name: "RootQuery",
  description: "Root Query",
  fields: {
    metroStations,
    metroStation,
    metroLine,
    metroLines,
    busStop,
    busStops,
    busLine,
    busLines,
  },
});
