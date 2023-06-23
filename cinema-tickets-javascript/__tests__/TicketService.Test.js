import TicketService from "../src/pairtest/TicketService";

describe("Ticket Service", () => {
  test("is a class", () => {
    expect(new TicketService()).toBeInstanceOf(TicketService);
  });
});
