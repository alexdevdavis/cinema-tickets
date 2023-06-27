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
    ).filter((method) => method !== "constructor");

    expect(ticketServicePublicMethods).toHaveLength(1);
    expect(ticketServicePublicMethods).toEqual(["purchaseTickets"]);
  });

  describe("purchaseTickets method", () => {
    test("returns a purchase summary for one ticket request of a single adult ticket", () => {
      const testTicketService = new TicketService();
      const singleAdultTicket = new TicketTypeRequest("ADULT", 1);

      const output = testTicketService.purchaseTickets("1", singleAdultTicket);

      expect(output).toBe(
        "Thank you for your purchase. \n Order summary: \n tickets: 1 ADULT \n total seats: 1 \n total payment: £20.00"
      );
    });
    test("returns a purchase summary for one ticket request of multiple adult tickets", () => {
      const testTicketService = new TicketService();
      const multipleAdultTickets = new TicketTypeRequest("ADULT", 3);

      const output = testTicketService.purchaseTickets(
        "1",
        multipleAdultTickets
      );

      expect(output).toBe(
        "Thank you for your purchase. \n Order summary: \n tickets: 3 ADULT \n total seats: 3 \n total payment: £60.00"
      );
    });
    test("returns a purchase summary for 2 ticket requests of the same type", () => {
      const testTicketService = new TicketService();
      const firstRequest = new TicketTypeRequest("ADULT", 3);
      const secondRequest = new TicketTypeRequest("ADULT", 5);

      const output = testTicketService.purchaseTickets(
        1,
        firstRequest,
        secondRequest
      );
      expect(output).toBe(
        "Thank you for your purchase. \n Order summary: \n tickets: 8 ADULT \n total seats: 8 \n total payment: £160.00"
      );
    });
    test("returns a purchase summary for multiple ticket requests of two different types", () => {
      const testTicketService = new TicketService();
      const multipleAdultTickets = new TicketTypeRequest("ADULT", 3);
      const oneChildTicket = new TicketTypeRequest("CHILD", 1);

      const output = testTicketService.purchaseTickets(
        1,
        multipleAdultTickets,
        oneChildTicket
      );

      expect(output).toBe(
        "Thank you for your purchase. \n Order summary: \n tickets: 3 ADULT, 1 CHILD \n total seats: 4 \n total payment: £70.00"
      );
    });
    test("returns a purchase summary for multiple ticket requests across three different ticket types", () => {
      const testTicketService = new TicketService();
      const sixAdultTickets = new TicketTypeRequest("ADULT", 6);
      const threeChildTickets = new TicketTypeRequest("CHILD", 3);
      const tenInfantTickets = new TicketTypeRequest("INFANT", 10);

      const output = testTicketService.purchaseTickets(
        1,
        sixAdultTickets,
        threeChildTickets,
        tenInfantTickets
      );

      expect(output).toBe(
        "Thank you for your purchase. \n Order summary: \n tickets: 6 ADULT, 3 CHILD, 10 INFANT \n total seats: 9 \n total payment: £150.00"
      );
    });
  });
});
