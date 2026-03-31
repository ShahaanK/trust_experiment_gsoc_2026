const CONDITIONS = {
    A : {
        id: 'A',
        label: "Neutral/Formal",
        agentName: "System Assistant",
        agentRole: "Automated System",
        recommend: (reasoning, optionName) => {
            return "Based on specification analysis, the optimal selection is the " + optionName + ". " + reasoning;
        },
        confidence: "Confidence estimate: 78%", 
    },
    B : {
        id: 'B',
        label: "Humanlike/Conversational",
        agentName: "Alex",
        agentRole: "AI Assistant",
        recommend: (reasoning, optionName) => {
            return "I'd definitely go with the " + optionName + "! " + reasoning;
        },
        confidence: "I'm about 82% sure this is the right pick for you!", 
    },
};

function assignCondition() {
    return Math.random() < 0.5 ? "A" : "B";
}

export { CONDITIONS, assignCondition };