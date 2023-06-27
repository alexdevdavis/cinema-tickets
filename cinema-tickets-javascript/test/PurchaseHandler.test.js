import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException";
import PurchaseHandler from "../src/pairtest/lib/PurchaseHandler";

describe("PurchaseHandler", () => {
  describe("validatePurchase", () => {
    test("returns true if passed valid credentials", () => {
      const output = PurchaseHandler.validatePurchase(1, 10);
      expect(output).toBe(true);
    });
    test("throws an error if passed 0 ADULT tickets, or if total tickets exceeds 20", () => {
      expect(() => {
        PurchaseHandler.validatePurchase(0, 10);
      }).toThrow(InvalidPurchaseException);
      expect(() => {
        PurchaseHandler.validatePurchase(1, 21);
      }).toThrow(InvalidPurchaseException);
    });
  });
});
