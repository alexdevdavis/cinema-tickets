export default class TicketPrices {
  #ticketPrices = { ADULT: 20, CHILD: 10, INFANT: 0 };

  static getTicketPriceByType(ticketType) {
    const currentTicketPrices = new TicketPrices();
    return currentTicketPrices.#ticketPrices[ticketType];
  }
}
