import axios from "axios";
import Conversion from "../models/conversionModel.js";

// Convert currency and save history
export const convertCurrency = async (req, res) => {
  const { fromCurrency, toCurrency, amount } = req.body;

  try {
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );
    const data = response.data;

    const rate = data.rates[toCurrency];
    if (!rate) {
      return res.status(400).json({ error: "Invalid currency selection" });
    }

    const convertedAmount = (amount * rate).toFixed(2);

    // Save to database
    const newConversion = new Conversion({
      fromCurrency,
      toCurrency,
      amount,
      convertedAmount,
      rate,
    });

    await newConversion.save();

    res.status(200).json({
      success: true,
      convertedAmount,
      rate,
      historyId: newConversion._id,
    });
  } catch (error) {
    console.error("Error converting currency:", error);
    res.status(500).json({ error: "Currency conversion failed" });
  }
};

// Get conversion history
export const getHistory = async (req, res) => {
  try {
    const history = await Conversion.find().sort({ date: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: "Failed to fetch conversion history" });
  }
};

// Clear history
export const clearHistory = async (req, res) => {
  try {
    await Conversion.deleteMany();
    res.status(200).json({ success: true, message: "History cleared successfully" });
  } catch (error) {
    console.error("Error clearing history:", error);
    res.status(500).json({ error: "Failed to clear history" });
  }
};