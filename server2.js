const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLEnumType,
} = require("graphql");

const { shops, accessRequests } = require("./dummyDb");

const AccessTypeEnumType = new GraphQLEnumType({
  name: 'AccessTypeEnum',
  values: {
    Influencer: {
      value: 1
    },
    Merchant: {
      value: 2
    },
    Brand: {
      value: 3
    }
  }
})

const app = express();

const AccessRequestType = new GraphQLObjectType({
  name: "AccessRequest",
  description: "access request do cenas",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: { type: new GraphQLNonNull(GraphQLString) },
    eligibleForPartnership: { type: GraphQLBoolean },
    accessType: { type: AccessTypeEnumType },
    shops: {
      type: new GraphQLList(ShopType),
      description: "lista de shops dum accessRequest",
      resolve: (accessRequest) => {
        return shops.filter(
          (shop) => shop.accessRequestId === accessRequest.id
        );
      },
    },
  }),
});

const ShopType = new GraphQLObjectType({
  name: "Shop",
  description: "uma shop",
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    shopName: { type: new GraphQLNonNull(GraphQLString) },
    accessRequestId: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    accessRequest: {
      type: AccessRequestType,
      resolve: (shop) => {
        return accessRequests.find(
          (accessRequest) => shop.accessRequestId === accessRequest.id
        );
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    shop: {
      type: ShopType,
      description: "uma shop",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, { id }) => shops.find((shop) => shop.id === id),
      //resolve: (parent, args) => shops.find(shop => shop.id === id),
    },
    shops: {
      type: new GraphQLList(ShopType),
      description: "List of shops",
      resolve: () => shops,
    },
    accessRequests: {
      type: new GraphQLList(AccessRequestType),
      description: "List of accessRequests",
      resolve: () => accessRequests,
    },
    accessRequest: {
      type: AccessRequestType,
      description: "um accessRequest",
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, { id }) =>
        accessRequests.find((accessRequest) => accessRequest.id === id),
      //resolve: (parent, args) => shops.find(shop => shop.id === id),
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addShop: {
      type: ShopType,
      description: "Add a shop",
      args: {
        shopName: { type: new GraphQLNonNull(GraphQLString) },
        accessRequestId: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve: (parent, { shopName, accessRequestId }) => {
        const shop = {
          id: Math.floor(Math.random() * 100),
          shopName,
          accessRequestId,
        };
        shops.push(shop);
        return shop;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(5000, () => console.log("Server running"));
