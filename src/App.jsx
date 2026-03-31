import { useState } from "react";
import { CONDITIONS, assignCondition } from "./data/conditions";
import { SCENARIOS } from "./data/scenarios";
import { initLogger, logEvent } from "./logger";
import WelcomeScreen from "./components/WelcomeScreen";
import InstructionsScreen from "./components/InstructionsScreen";
import TaskScreen from "./components/TaskScreen";
import CompletionScreen from "./components/CompletionScreen";
import "./App.css";

function generateParticipantId() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let id = "P-";
    for (let i = 0; i < 6; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }
    return id;
}

function App() {
    const [phase, setPhase] = useState("welcome");
    const [participantId] = useState(generateParticipantId);
    const [condition] = useState(assignCondition);

    initLogger(participantId, condition);
    
    const conditionConfig = CONDITIONS[condition];


    function handleStart() {
        logEvent("experiment_start");
        setPhase("instructions");
    }

    function handleBeginTask() {
        logEvent("instructions_complete");
        setPhase("task");
    }

    function handleTaskComplete() {
        logEvent("experiment_complete");
        setPhase("complete");
    }

    switch (phase) {
        case "welcome":
            return (
                <WelcomeScreen
                    participantId={participantId}
                    condition={condition}
                    conditionLabel={conditionConfig.label}
                    onStart={handleStart}
                />
            );

        case "instructions":
            return (
                <InstructionsScreen
                    onBegin={handleBeginTask}
                />
            );

        case "task":
            return (
                <TaskScreen
                    participantId={participantId}
                    condition={condition}
                    conditionConfig={conditionConfig}
                    scenarios={SCENARIOS}
                    onComplete={handleTaskComplete}
                />
            );

        case "complete":
            return (
                <CompletionScreen
                    participantId={participantId}
                    condition={condition}
                    conditionConfig={conditionConfig}
                />
            );

        default:
            return null;
    }
}

export default App;