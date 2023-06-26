import TicketService from "../src/pairtest/TicketService";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";

describe("Ticket Service", () => {
  test("instantiates the TicketService class", () => {
    expect(new TicketService()).toBeInstanceOf(TicketService);
  });
  test("instance exposes a single public method", () => {
    const testTicketService = new TicketService();
    const ticketServicePublicMethods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(testTicketService)
    );
    expect(ticketServicePublicMethods).toHaveLength(2);
    expect(ticketServicePublicMethods).toEqual([
      "constructor",
      "purchaseTickets",
    ]);
  });

  describe("purchaseTickets method", () => {
    test("returns a purchase summary string for one ticket request of a single adult ticket", () => {
      const testTicketService = new TicketService();
      const singleAdultTicket = new TicketTypeRequest("ADULT", 1);

      const output = testTicketService.purchaseTickets("1", singleAdultTicket);

      expect(output).toBe(
        "Thank you for your purchase. \n Order summary: \n tickets: 1 ADULT, \n total seats: 1 \n total payment: £20.00"
      );
    });
    test("returns a purchase summary string for one ticket request of multiple adult tickets", () => {
      const testTicketService = new TicketService();
      const multipleAdultTickets = new TicketTypeRequest("ADULT", 3);

      const output = testTicketService.purchaseTickets(
        "1",
        multipleAdultTickets
      );

      expect(output).toBe(
        "Thank you for your purchase. \n Order summary: \n tickets: 3 ADULT, \n total seats: 3 \n total payment: £60.00"
      );
    });
  });
});
