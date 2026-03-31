
async function generateRecommendation(systemPrompt, userPrompt) {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

    if (!apiKey) {
        console.log("[AI] No API key set, using fallback");
        return null;
    }

    const model = import.meta.env.VITE_OPENROUTER_MODEL || "meta-llama/llama-3.1-8b-instruct:free";

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + apiKey,
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                max_tokens: 200,
                temperature: 0.7,
            }),
        });

        if (!response.ok) {
            const errorBody = await response.text();
            console.warn("[AI] API error:", response.status, errorBody);
            return null;
        }

        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content?.trim();

        if (!text) {
            console.warn("[AI] Empty response from API");
            return null;
        }

        console.log("[AI] Generated:", text);
        return text;

    } catch (error) {
        console.warn("[AI] Request failed:", error.message);
        return null;
    }
}

export { generateRecommendation };