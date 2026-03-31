// Module-level state
let _participantId = null;
let _condition = null;
const eventLog = [];

// Called once at experiment start to store session info
function initLogger(participantId, condition) {
    _participantId = participantId;
    _condition = condition;
}

function logEvent(eventType, data = {}) {
    const event = {
        participant_id: _participantId,
        condition: _condition,
        event_type: eventType,
        timestamp: new Date().toISOString(),
        ...data,
    };
    eventLog.push(event);
    console.log("[LOG]", event);
    return event;
}

// Returns a copy of all events
function getEvents() {
    return [...eventLog];
}

// Returns only decision events
function getDecisionEvents() {
    return eventLog.filter(function (e) {
        return e.event_type === "decision";
    });
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = filename;

    a.click();

    URL.revokeObjectURL(url);
}

function exportJSON(filename) {
    if (!filename) filename = "trust_experiment_" + _participantId + ".json";
        const data = {
        metadata: {
            participant_id: _participantId,
            condition: _condition,
            exported_at: new Date().toISOString(),
        },
        events: [...eventLog],
    };
    downloadFile(JSON.stringify(data, null, 2), filename, "application/json");
}

function exportCSV(filename) {
    if (!filename) filename = "trust_experiment_" + _participantId + ".csv";

    const decisionEvents = getDecisionEvents();

    if (decisionEvents.length === 0) {
        console.warn("No decision events to export.");
        return;
    }

    const headers = [
        "participant_id", "condition", "scenario_id", "decision",
        "selected_option", "recommended_option", "latency_ms", "timestamp"
    ];

    const csvRows = [
        headers.join(","),
        ...decisionEvents.map(event =>
            headers.map(key => JSON.stringify(event[key] ?? "")).join(",")
        )
    ];

    downloadFile(csvRows.join("\n"), filename, "text/csv");
}

export { initLogger, logEvent, getEvents, getDecisionEvents, exportJSON, exportCSV };