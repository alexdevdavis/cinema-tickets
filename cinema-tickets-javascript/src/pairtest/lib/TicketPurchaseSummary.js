export default class TicketPurchaseSummary {
  static generatePurchaseSummary(totalByTicketType, totalSeats, totalCost) {
    let purchaseSummary = `Thank you for your purchase. \n Order summary: \n tickets: ${totalByTicketType.ADULT} ADULT`;

    const ticketTypes = ["CHILD", "INFANT"];
    for (const ticketType of ticketTypes) {
      if (totalByTicketType[ticketType]) {
        purchaseSummary += `, ${totalByTicketType[ticketType]} ${ticketType}`;
      }
    }

    purchaseSummary += ` \n total seats: ${totalSeats} \n total payment: £${totalCost.toFixed(
      2
    )}`;

    return purchaseSummary;
  }
}
