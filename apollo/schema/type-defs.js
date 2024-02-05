const { gql } = require("apollo-server");

const typeDefs = gql`
  type AccessRequest {
    id: Int!
    name: String!
    eligibleForPartnership: Boolean
    accessType: AccessType
    shops: [Shop]
  }

  type Shop {
    id: Int!
    shopName: String!
    accessRequest: AccessRequest
  }

  type Query {
    accessRequests: [AccessRequest!]!
    accessRequest(id: Int!): AccessRequest
    accessRequestByName(name: String!): [AccessRequest]
    shops: [Shop!]!
    shop(id: Int!): Shop!
  }

  input CreateAccessRequestInput {
    name: String!
    eligibleForPartnership: Boolean = false
    accessType: AccessType
  }

  type Mutation {
    createAccessRequest(input: CreateAccessRequestInput!): AccessRequest
  }

  enum AccessType {
      Influencer
      Merchant
      Brand
  }
`;

module.exports = { typeDefs };