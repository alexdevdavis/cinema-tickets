import RequestHandler from "../src/pairtest/lib/TicketRequestHandler";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";

describe("RequestHandler", () => {
  describe("handleRequests", () => {
    test("returns a parsed request object for single request for 1 adult ticket", () => {
      const adultRequest = new TicketTypeRequest("ADULT", 1);
      const parsedRequest = RequestHandler.handleRequest(adultRequest);
      expect(parsedRequest).toMatchObject(
        expect.objectContaining({
          type: "ADULT",
          ticketCount: 1,
          seats: 1,
          cost: 20,
        })
      );
    });
    test("returns a parsed request object for single request for multiple adult tickets", () => {
      const adultTicketRequest = new TicketTypeRequest("ADULT", 10);
      const parsedRequest = RequestHandler.handleRequest(adultTicketRequest);
      expect(parsedRequest).toMatchObject(
        expect.objectContaining({
          type: "ADULT",
          ticketCount: 10,
          seats: 10,
          cost: 200,
        })
      );
    });
    test("returns a parsed request object for single request for one child ticket", () => {
      const childTicketRequest = new TicketTypeRequest("CHILD", 1);
      const parsedRequest = RequestHandler.handleRequest(childTicketRequest);
      expect(parsedRequest).toMatchObject(
        expect.objectContaining({
          type: "CHILD",
          ticketCount: 1,
          seats: 1,
          cost: 10,
        })
      );
    });
  });
});
