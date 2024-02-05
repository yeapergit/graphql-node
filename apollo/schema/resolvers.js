const { accessRequests, shops } = require("../dummyDb");

const _ = require("lodash");

const resolvers = {
  AccessType: {
    Influencer: 1,
    Merchant: 2,
    Brand: 3,
  },
  Query: {
    // Access Requests
    accessRequests: () => {
      const accessReqWithShop = accessRequests.map((accessReq) => {
          const shopsByUser = shops.filter((shop) => shop.accessRequestId === accessReq.id);
          accessReq.shops = shopsByUser;
          return accessReq;
      })
      return accessReqWithShop;
    },
    accessRequest: (parent, args) => {
      const id = args.id;
      const accessRequest = accessRequests.find(
        (accessRequest) => accessRequest.id === id
      );
      return accessRequest;
    },
    accessRequestByName: (parent, {name}) => {
        const accessReqs = dummy.filter(
          (accessRequest) => accessRequest.name === name
        );
        return accessReqs;
      },
    // shops
    shops: () => {
      return shops;
    },
    shop: (parent, args) => {
      const id = args.id;
      const shop = shops.find((shop) => shop.id === id);
      return shop;
    },
  },

  Mutation: {
    createAccessRequest: (parent, args) => {
      const newAccessRequest = args.input;
      const newId = Math.floor(Math.random() * 100);
      newAccessRequest.id = newId;
      accessRequests.push(newAccessRequest);
      return newAccessRequest;
    },
  },
};

module.exports = { resolvers };
