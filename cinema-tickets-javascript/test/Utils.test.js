import Utils from "../src/pairtest/utils/Utils";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";

describe("Utility Functions", () => {
  describe("handleRequests", () => {
    test("returns a parsed request object for single request for 1 adult ticket", () => {
      const adultRequest = new TicketTypeRequest("ADULT", 1);
      const parsedRequest = Utils.handleRequests(adultRequest);
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
      const adultRequest = new TicketTypeRequest("ADULT", 10);
      const parsedRequest = Utils.handleRequests(adultRequest);
      expect(parsedRequest).toMatchObject(
        expect.objectContaining({
          type: "ADULT",
          ticketCount: 10,
          seats: 10,
          cost: 200,
        })
      );
    });
  });
});
