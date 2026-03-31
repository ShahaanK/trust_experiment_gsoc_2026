import { useState, useEffect } from "react";
import { logEvent } from "../logger";
import { generateRecommendation } from "../ai";
import { SYSTEM_PROMPTS, buildUserPrompt } from "../data/prompts";

function TaskScreen({ participantId, condition, conditionConfig, scenarios, onComplete }) {
    console.log("[DEBUG] TaskScreen rendered");
    console.log("[DEBUG] API key:", import.meta.env.VITE_OPENROUTER_API_KEY);
    
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [confidence, setConfidence] = useState(null);
    const [startTime, setStartTime] = useState(Date.now());
    const scenario = scenarios[scenarioIndex];
    const [recommendationText, setRecommendationText] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    // Reset state when scenario changes
    console.log("[DEBUG] API key:", import.meta.env.VITE_OPENROUTER_API_KEY);
    useEffect(() => {
        setSelectedOption(null);
        setConfidence(null);
        setIsLoading(true);

        // Build the fallback text (same as before)
        const reasoning = condition === "A" ? scenario.reasoningFormal : scenario.reasoningCasual;
        const recName = scenario.options.find(o => o.id === scenario.aiRecommends)?.name;
        const fallbackText = conditionConfig.recommend(reasoning, recName)
            + "\n" + conditionConfig.confidence;

        // Try the API, fall back to hardcoded
        async function fetchRecommendation() {
            const systemPrompt = SYSTEM_PROMPTS[condition];
            const userPrompt = buildUserPrompt(scenario, scenario.aiRecommends);
            const aiText = await generateRecommendation(systemPrompt, userPrompt);

            if (aiText) {
                setRecommendationText(aiText);
            } else {
                setRecommendationText(fallbackText);
            }

            setIsLoading(false);
            setStartTime(Date.now()); // Latency clock starts AFTER loading

            logEvent("recommendation_shown", {
            scenario_id: scenario.id,
            recommended_option: scenario.aiRecommends,
        });
    }

    fetchRecommendation();
}, [scenarioIndex]);

    function handleOptionClick(optionId) {
        if (isLoading) return;
        if (optionId === selectedOption) return;

        const latency = Date.now() - startTime;
        const decision = optionId === scenario.aiRecommends ? "accept" : "override";

        setSelectedOption(optionId);
        setConfidence(null);
        logEvent("decision", {
            scenario_id: scenario.id,
            decision: decision,
            selected_option: optionId,
            recommended_option: scenario.aiRecommends,
            latency_ms: latency
        });

    }

    function handleConfidence(rating) {
        setConfidence(rating);
        logEvent("confidence_rating", {
            scenario_id: scenario.id,
            confidence: rating,
        });
    }

    function handleNext() {
        if (scenarioIndex < scenarios.length - 1) {
            setScenarioIndex(scenarioIndex + 1);
        } else {
            onComplete();
        }
    }

    const progress = ((scenarioIndex + 1) / scenarios.length) * 100;

    return (
        <div className="screen">
            {/* Progress bar */}
            <div className="progress-container">
                <div className="progress-header">
                    <span className="progress-label">
                        Scenario {scenarioIndex + 1} of {scenarios.length}
                    </span>
                    <span className={"badge condition-badge-" + condition.toLowerCase()}>
                        Condition {condition}
                    </span>
                </div>
                <div className="progress-track">
                    <div className="progress-fill" style={{ width: progress + "%" }} />
                </div>
            </div>

            <div className="card task-card">
                {/* Scenario context */}
                <div className="section">
                    <span className="section-label">Scenario</span>
                    <p className="scenario-text">{scenario.context}</p>
                </div>

                {/* AI Recommendation */}
                <div className={"recommendation-box condition-bg-" + condition.toLowerCase()}>
                    <div className="agent-header">
                        <div className={"agent-avatar condition-avatar-" + condition.toLowerCase()}>
                            {condition === "A" ? "SA" : "A"}
                        </div>
                        <div>
                            <p className={"agent-name condition-text-" + condition.toLowerCase()}>
                                {conditionConfig.agentName}
                            </p>
                            <p className="agent-role">{conditionConfig.agentRole}</p>
                        </div>
                    </div>
                    {isLoading ? (
                        <p className="recommendation-text">Generating recommendation...</p>
                    ) : (
                        <p className="recommendation-text" style={{ whiteSpace: "pre-line" }}>
                            {recommendationText}
                        </p>
                    )}
                </div>

                {/* Options */}
                <div className="section">
                    <span className="section-label">Your Decision</span>
                    <div className="options-list">
                        {scenario.options.map((opt, i) => (
                            <div
                                key={opt.id}
                                className={
                                    "option-card"
                                    + (selectedOption === opt.id ? " option-selected" : "")
                                    + (scenario.aiRecommends === opt.id && !selectedOption ? " option-recommended" : "")
                                }
                                onClick={() => handleOptionClick(opt.id)}
                            >
                                <span className={"option-letter" + (selectedOption === opt.id ? " option-letter-selected" : "")}>
                                    {selectedOption === opt.id ? "\u2713" : String.fromCharCode(65 + i)}
                                </span>
                                <span className="option-name">{opt.name}</span>
                            </div>
                        ))}
                    </div>
                    {!selectedOption && (
                        <p className="hint">Select an option above. You may accept or override the recommendation.</p>
                    )}
                    {selectedOption && (
                        <p className="hint">You can change your selection before moving on.</p>
                    )}
                </div>

                {/* Confidence rating — only shows after selecting an option */}
                {selectedOption && (
                    <div className="section confidence-section">
                        <span className="section-label">How confident are you in your choice?</span>
                        <div className="confidence-buttons">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <button
                                    key={n}
                                    className={"confidence-btn" + (confidence === n ? " confidence-btn-active" : "")}
                                    onClick={() => handleConfidence(n)}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                        <div className="confidence-labels">
                            <span>Not confident</span>
                            <span>Very confident</span>
                        </div>

                        <button
                            className="btn-primary full-width"
                            disabled={!confidence}
                            onClick={handleNext}
                        >
                            {scenarioIndex < scenarios.length - 1 ? "Next Scenario" : "Complete Study"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskScreen;