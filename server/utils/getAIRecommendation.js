export async function getAIRecommendation(req, res, userPrompt, products) {
  const API_KEY = process.env.GEMINI_API_KEY;
  const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;

  try {
    if (!products || products.length === 0)
      return { success: true, products: [] };

    const simplifiedProducts = products.map((p) => ({
      id: p.id || p._id,
      name: p.name,
      category: p.category,
      description: p.description?.substring(0, 80),
    }));

    const geminiPrompt = `
        Match products to this request: "${userPrompt}"
        Products: ${JSON.stringify(simplifiedProducts)}
        Return ONLY a JSON array of matching product IDs. Example: [1, 2]
        If no match, return []. No text or markdown.
    `;

    const response = await fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: geminiPrompt }] }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Gemini Error:", data.error.message);
      res.status(data.error.code === 429 ? 429 : 500).json({
        success: false,
        message:
          data.error.code === 429
            ? "API Limit reached. Wait 1 min."
            : data.error.message,
      });
      return;
    }

    const aiResponseText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
    const cleanedText = aiResponseText.replace(/```json|```/g, "").trim();

    if (!cleanedText) {
      res.status(500).json({ success: false, message: "Empty AI response." });
      return;
    }

    try {
      const matchedIds = JSON.parse(cleanedText);

      const finalProducts = products.filter(
        (p) => matchedIds.includes(p.id) || matchedIds.includes(p._id),
      );
      return { success: true, products: finalProducts };
    } catch (e) {
      res
        .status(500)
        .json({ success: false, message: "Invalid JSON from AI." });
      return;
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "AI helper error." });
    return;
  }
}
