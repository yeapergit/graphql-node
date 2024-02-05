const AccessType = {
    Influencer: 1,
    Merchant: 2,
    Brand: 3
}

const accessRequests = [
  { id: 1, name: "Pedro", eligibleForPartnership: true, accessType: AccessType.Influencer },
  { id: 2, name: "Filipe",  eligibleForPartnership: true, accessType: AccessType.Brand },
  { id: 3, name: "Luciano", eligibleForPartnership: false, accessType: AccessType.Merchant },
  { id: 4, name: "Jose", eligibleForPartnership: false, accessType: AccessType.Brand },
  { id: 5, name: "Lara",  eligibleForPartnership: true, accessType: AccessType.Influencer },
];

const shops = [
  { id: 1, shopName: "Pedro Shop #1", accessRequestId: 1 },
  { id: 2, shopName: "Pedro Shop #2", accessRequestId: 1 },
  { id: 3, shopName: "Filipe Shop #1", accessRequestId: 2 },
  { id: 4, shopName: "Luciano Shop #1", accessRequestId: 3 },
  { id: 5, shopName: "Luciano Shop #2", accessRequestId: 3 },
  { id: 6, shopName: "Jose Shop #1", accessRequestId: 4 },
  { id: 7, shopName: "Lara Shop #1", accessRequestId: 5 },
];

module.exports = {
  shops,
  accessRequests,
};
