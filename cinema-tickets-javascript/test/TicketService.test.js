import TicketService from "../src/pairtest/TicketService";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";

describe("Ticket Service", () => {
  let testTicketService;
  beforeEach(() => {
    testTicketService = new TicketService();
  });
  test("instantiates the TicketService class", () => {
    expect(testTicketService).toBeInstanceOf(TicketService);
  });
  test("instance exposes a single public method", () => {
    const ticketServicePublicMethods = Object.getOwnPropertyNames(
      Object.getPrototypeOf(testTicketService)
    ).filter((method) => method !== "constructor");

    expect(ticketServicePublicMethods).toHaveLength(1);
    expect(ticketServicePublicMethods).toEqual(["purchaseTickets"]);
  });

  describe("purchaseTickets method", () => {
    test("returns a purchase summary for one ticket request of a single adult ticket", () => {
      const singleAdultTicket = new TicketTypeRequest("ADULT", 1);

      const output = testTicketService.purchaseTickets(1, singleAdultTicket);

      expect(output).toBe(
        "Thank you for your purchase. \n Order summary: \n tickets: 1 ADULT \n total seats: 1 \n total payment: £20.00"
      );
    });
    test("returns a purchase summary for one ticket request of multiple adult tickets", () => {
      const multipleAdultTickets = new TicketTypeRequest("ADULT", 3);

      const output = testTicketService.purchaseTickets(1, multipleAdultTickets);

      expect(output).toBe(
        "Thank you for your purchase. \n Order summary: \n tickets: 3 ADULT \n total seats: 3 \n total payment: £60.00"
      );
    });
    test("returns a purchase summary for 2 ticket requests of the same type", () => {
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

    describe("Exception Handling", () => {
      test("throws an InvalidPurchaseException if no ADULT tickets requested", () => {
        const threeChildTickets = new TicketTypeRequest("CHILD", 3);
        const twoInfantTickets = new TicketTypeRequest("INFANT", 2);

        expect(() => {
          testTicketService.purchaseTickets(
            1,
            threeChildTickets,
            twoInfantTickets
          );
        }).toThrow("Purchase must include at least 1 ADULT ticket request.");

        try {
          testTicketService.purchaseTickets(
            1,
            threeChildTickets,
            twoInfantTickets
          );
        } catch (error) {
          expect(error).toBeInstanceOf(InvalidPurchaseException);
        }
      });
      test("throws an InvalidPurchaseException if total tickets exceeds 20", () => {
        const tenAdultTickets = new TicketTypeRequest("ADULT", 10);
        const tenChildTickets = new TicketTypeRequest("CHILD", 10);
        const oneInfantTicket = new TicketTypeRequest("INFANT", 1);

        expect(() => {
          testTicketService.purchaseTickets(
            1,
            tenAdultTickets,
            tenChildTickets,
            oneInfantTicket
          );
        }).toThrow("Purchase must not exceed the maximum of 20 tickets.");

        try {
          testTicketService.purchaseTickets(
            1,
            tenAdultTickets,
            tenChildTickets,
            oneInfantTicket
          );
        } catch (error) {
          expect(error).toBeInstanceOf(InvalidPurchaseException);
        }
      });
      test("throws a TypeError if accountId is invalid", () => {
        const oneAdultTicket = new TicketTypeRequest("ADULT", 1);
        expect(() => {
          testTicketService.purchaseTickets(0, oneAdultTicket);
        }).toThrow("accountId must be an integer");
        expect(() => {
          testTicketService.purchaseTickets(-1, oneAdultTicket);
        }).toThrow("accountId must be an integer");
        expect(() => {
          testTicketService.purchaseTickets(true, oneAdultTicket);
        }).toThrow("accountId must be an integer");
      });
    });
  });
});
