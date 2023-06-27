import InvalidPurchaseException from "./InvalidPurchaseException";

export default class PurchaseHandler {
  static validatePurchase(adultTickets, totalTickets) {
    if (!adultTickets) {
      throw new InvalidPurchaseException(
        "Purchase must include at least 1 ADULT ticket request."
      );
    }

    if (totalTickets > 20) {
      throw new InvalidPurchaseException(
        "Purchase must not exceed the maximum of 20 tickets."
      );
    }

    return true;
  }
}
