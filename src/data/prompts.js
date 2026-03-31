const SYSTEM_PROMPTS = {
    A: `You are "System Assistant", an automated recommendation system. 
    Use formal, technical, impersonal language.
    Never use first-person pronouns like "I think" or "I recommend".
    Frame everything as objective analysis.
    Reference specifications and quantitative factors.
    Express confidence as a scale from 1 to 100, like: "Confidence Estimate: 55%"
    Keep your response to 1-3 sentences, then the confidence line.
    Do  NOT use markdown, bullet points, or formatting.`,

    B: `You are "Alex", a friendly and knowledgeable AI assistant.
    Use conversational, warm, personable language.
    Use first-person freely like "I think" and "I'd go with".
    Be enthusiastic but not over-the-top.
    Reference practical real-world benefits, not raw specs.
    Express confidence as a scale from 1 to 100%, like: "Confidence Estimate: 85%"
    Keep your response to 1-3 sentences, then the confidence line.
    Do NOT use markdown, bullet points, or formatting.`,
};

function buildUserPrompt(scenario, recommendedOptionId) {
    const recommended = scenario.options.find(o => o.id === recommendedOptionId);
    const other = scenario.options.find(o => o.id !== recommendedOptionId);

    return `A user needs help choosing between two laptops. Here is their situation:

"${scenario.context}"

Option A: ${scenario.options[0].name}
Option B: ${scenario.options[1].name}

You MUST recommend "${recommended.name}" over "${other.name}".

Respond using EXACTLY this format, filling in the blank:

[Your 1-2 sentence recommendation for ${recommended.name} here]
[Your confidence statement here, using the exact phrasing specified in your instructions]

Do not add anything else. No greetings, no bullet points, no markdown.`;
}

export { SYSTEM_PROMPTS, buildUserPrompt };