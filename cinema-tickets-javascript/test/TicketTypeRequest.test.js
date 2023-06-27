import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest";

describe("TicketTypeRequest", () => {
  test("throws an error for invalid ticket type", () => {
    expect(() => {
      new TicketTypeRequest("CONCESSION", 1);
    }).toThrow(TypeError, "type must be ADULT, CHILD, or INFANT");
  });
  test("throws an error for invalid noOfTickets value", () => {
    expect(() => {
      new TicketTypeRequest("ADULT", "1");
    }).toThrow(TypeError, "noOfTickets must be an integer");
  });
});
