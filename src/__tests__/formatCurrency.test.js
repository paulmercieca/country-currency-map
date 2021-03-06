import { formatLocaleCurrency, formatCurrency } from "../index";

describe("formatLocaleCurrency", () => {
  test("abbreviates thousands", () => {
    const result = formatLocaleCurrency(3000.54, "USD", {
      abbreviate: true
    });
    expect(result).toEqual("$3k");
  });

  test("abbreviates millions", () => {
    const result = formatLocaleCurrency(3430000.54, "USD", {
      abbreviate: true
    });
    expect(result).toEqual("$3m");
  });

  test("abbreviates billions", () => {
    const result = formatLocaleCurrency(8100000000.54, "USD", {
      abbreviate: true
    });
    expect(result).toEqual("$8b");
  });

  test("abbreviates without autoFixed", () => {
    const result = formatLocaleCurrency(8100000000.54, "USD", {
      abbreviate: true,
      autoFixed: false
    });
    expect(result).toEqual("$8.10b");
  });

  test("handles abbreviation when less than a thousand", () => {
    const result = formatLocaleCurrency(10.54, "USD", { abbreviate: true });
    expect(result).toEqual("$10.54");
  });

  test("handles fixed precision > 1000", () => {
    const result = formatLocaleCurrency(1054.54, "USD");
    expect(result).toEqual("$1,055");
  });

  test("handles disabled fixed precision > 1000", () => {
    const result = formatLocaleCurrency(1054.54, "USD", { autoFixed: false });
    expect(result).toEqual("$1,054.54");
  });

  test("handles fixed precision < 1000", () => {
    const result = formatLocaleCurrency(104.54, "USD");
    expect(result).toEqual("$104.54");
  });

  test("shows 2 decimal digits when ending in 0", () => {
    const result = formatLocaleCurrency(104.5, "USD");
    expect(result).toEqual("$104.50");
  });

  test("shows 0 decimal digits if 0 cents", () => {
    const result = formatLocaleCurrency("104.00", "USD");
    expect(result).toEqual("$104");
  });
});

describe("formatCurrency", () => {
  test("formatCurrency returns expected value", () => {
    const result = formatCurrency("100,000", "USD");
    expect(result).toEqual("$100,000");
  });

  test("formatCurrency with unknown currency", () => {
    const result = formatCurrency("100,000", "NONE");
    expect(result).toEqual("100,000 NONE");
  });

  test("formatCurrency returns expected value for EUR", () => {
    const result = formatCurrency("100,000", "EUR");
    expect(result).toEqual("€100,000");
  });

  test("formatCurrency returns expected value for JPY", () => {
    const result = formatCurrency("100,000", "JPY");
    expect(result).toEqual("¥100,000");
  });

  test("formatCurrency returns expected value for GBP", () => {
    const result = formatCurrency("100,000", "GBP");
    expect(result).toEqual("£100,000");
  });
});
