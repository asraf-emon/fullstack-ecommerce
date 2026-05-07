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

    // সরাসরি res.status না লিখে এরর থ্রো করুন
    if (data.error) {
      console.error("Gemini API Error:", data.error.message);
      throw new Error(data.error.message);
    }

    const aiResponseText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "[]";
    const cleanedText = aiResponseText.replace(/```json|```/g, "").trim();

    if (!cleanedText) {
      throw new Error("Empty AI response.");
    }

    const matchedIds = JSON.parse(cleanedText);

    const finalProducts = products.filter(
      (p) => matchedIds.includes(p.id) || matchedIds.includes(p._id),
    );

    return { success: true, products: finalProducts };
  } catch (error) {
    // এখানে আমরা কোনো res.json পাঠাবো না, শুধু এররটি মেইন কন্ট্রোলারে পাস করে দেবো
    console.error("AI Helper Error Log:", error.message);
    throw error;
  }
}
