import TicketPurchaseSummary from "../src/pairtest/lib/TicketPurchaseSummary";
describe("TicketPurchaseSummary", () => {
  describe("generatePurchaseSummary", () => {
    test("returns a summary string from a single parsed ticket request", () => {
      const ticketTypes = { ADULT: 1, CHILD: 0, INFANT: 0 };
      const totalSeats = 1;
      const totalCost = 20;

      const output = TicketPurchaseSummary.generatePurchaseSummary(
        ticketTypes,
        totalSeats,
        totalCost
      );

      expect(output).toBe(
        "Thank you for your purchase. \n Order summary: \n tickets: 1 ADULT \n total seats: 1 \n total payment: £20.00"
      );
    });
    test("returns a summary string from multiple parsed ticket requests of two types", () => {
      const ticketTypes = { ADULT: 2, CHILD: 1, INFANT: 0 };
      const totalSeats = 3;
      const totalCost = 50;

      const output = TicketPurchaseSummary.generatePurchaseSummary(
        ticketTypes,
        totalSeats,
        totalCost
      );

      expect(output).toBe(
        "Thank you for your purchase. \n Order summary: \n tickets: 2 ADULT, 1 CHILD \n total seats: 3 \n total payment: £50.00"
      );
    });
    test("returns a summary string from multiple parsed ticket requests of three types", () => {
      const ticketTypes = { ADULT: 4, CHILD: 3, INFANT: 2 };
      const totalSeats = 7;
      const totalCost = 110;

      const output = TicketPurchaseSummary.generatePurchaseSummary(
        ticketTypes,
        totalSeats,
        totalCost
      );

      expect(output).toBe(
        "Thank you for your purchase. \n Order summary: \n tickets: 4 ADULT, 3 CHILD, 2 INFANT \n total seats: 7 \n total payment: £110.00"
      );
    });
  });
});
