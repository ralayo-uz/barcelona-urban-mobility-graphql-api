import {
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLString,
} from "graphql";

export const FilterByInputTmb = new GraphQLInputObjectType({
  name: "FilterByInputTmb",
  description:
    "Input for the filterBy argument of the metro and bus queries, which allows filtering a connection by some parameters (e.g. lineName or lineId)",
  fields: {
    lineId: {
      type: GraphQLInt,
    },
    lineName: {
      type: GraphQLString,
    },
  },
});
