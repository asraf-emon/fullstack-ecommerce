import axios from "axios";

export const getBdtToUsdRate = async () => {
  try {
    const response = await axios.get("https://open.er-api.com/v6/latest/USD", {
      timeout: 5000,
    });

    if (response.data && response.data.rates && response.data.rates.BDT) {
      return response.data.rates.BDT;
    }

    throw new Error("Invalid API response structure");
  } catch (error) {
    console.error(
      "Exchange Rate API error, using default fallback (122.87). Error:",
      error.message,
    );

    return 122.87;
  }
};
