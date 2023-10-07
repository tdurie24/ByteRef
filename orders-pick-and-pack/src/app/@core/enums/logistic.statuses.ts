export enum LogisticStatuses {

    // Order Received
    OrderReceived = 1,

    // Account Request Payment
    Account_Request_Payment = 2,

    // Received Pending Account Payment
    ReceivedPendingAccountPayment = 3,

    //  Account Payment Completed
    AccountPaymentCompleted = 4,

    // statusId: 5
    OptimalLocationVerified = 5,//"Optimal Location Verified",

    // statusId: 6,
    AgrinetOrderReceived = 6,//"Agrinet Order Received",

    // statusId: 7
    PendingPickupLocationSelection = 7,//"Pending Pickup Location Selection",

    // statusId: 8
    PickupLocationSelected = 8,//"Pickup Location Selected",

    // statusId: 9
    OrderReadyForPackaging = 9,//"Order Ready For Packaging",

    // statusId: 10
    OrderInProcessed = 10,//"Order in Processed",

    // statusId: 11
    OrderReadyForCollection = 11,//"Order Ready for Collection",

    // statusId: 12
    OrderCollected = 12,//"Order Collected",

    // statusId: 13
    AccountPaidPendingShopifyUpdate = 13,//"Account Paid Pending Shopify Update",

    // statusId: 14
    PendingSAPPayment = 14,//"Pending SAP Payment",

    // statusId: 15
    PackagingInProgress = 15,//"Packaging In Progress",

    // statusId: 16
    CourierCollected = 16,//"Courier Collected",

    // statusId: 17
    ClientCollected = 17,//"Client Collected",

    // statusId: 18
    AwaitingCourier = 18,//"Awaiting Courier",

    // statusId: 19
    AwaitingClient = 19,//"Awaiting Client",

    // statusId: 20
    OrderCanceled = 20,//"Order Cancelled"
}
