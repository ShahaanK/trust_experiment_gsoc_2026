import { getEvents, getDecisionEvents, exportJSON, exportCSV } from "../logger";
import { SCENARIOS } from "../data/scenarios";

function CompletionScreen({ participantId, condition, conditionConfig }) {
    const events = getEvents();
    const allDecisions = getDecisionEvents();

    const finalByScenario = new Map();
    for (const d of allDecisions) {
        finalByScenario.set(d.scenario_id, d);
    }
    const finalDecisions = Array.from(finalByScenario.values());

    const accepts = finalDecisions.filter((d) => d.decision === "accept").length;

    const overrides = finalDecisions.filter((d) => d.decision === "override").length;
    const avgLatency = finalDecisions.length > 0 ? Math.round(finalDecisions.reduce((sum, d) => sum + d.latency_ms, 0) / finalDecisions.length) : 0;

    // How many times did they change their mind?
    const mindChanges = allDecisions.length - finalDecisions.length;

    function handleExportBoth() {
        exportJSON();
        setTimeout(exportCSV, 300);
    }

    return (
        <div className="screen">
            <div className="card">
                <div className="complete-header">
                    <div className="checkmark">&#10003;</div>
                    <h2>Study Complete</h2>
                    <p className="subtitle">
                        Thank you for participating. Here's a summary of your session.
                    </p>
                </div>

                {/* Stats */}
                <div className="stats-grid">
                    <div className="stat-box">
                        <span className="stat-label">Accepted</span>
                        <span className="stat-value">{accepts}</span>
                        <span className="stat-sub">{finalDecisions.length > 0 ? Math.round((accepts / finalDecisions.length) * 100) + "%" : "0%"}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">Overridden</span>
                        <span className="stat-value">{overrides}</span>
                        <span className="stat-sub">{finalDecisions.length > 0 ? Math.round((overrides / finalDecisions.length) * 100) + "%" : "0%"}</span>
                    </div>
                    <div className="stat-box">
                        <span className="stat-label">Avg Latency</span>
                        <span className="stat-value">{(avgLatency / 1000).toFixed(1)}s</span>
                        <span className="stat-sub">{avgLatency}ms</span>
                    </div>
                </div>

                {mindChanges > 0 && (
                    <p className="footnote">
                        {mindChanges} decision change{mindChanges > 1 ? "s" : ""} recorded.
                        Stats reflect final selections.
                    </p>
                )}

                {/* Event log preview */}
                <div className="section">
                    <span className="section-label">Event Log ({events.length} events)</span>
                    <div className="event-log">
                        {events.slice(-8).map((e, i) => (
                            <div key={i} className="log-line">
                                <span className="log-time">
                                    {e.timestamp.split("T")[1]?.slice(0, 12)}
                                </span>{" "}
                                <span className="log-type">{e.event_type}</span>
                                {e.decision && (
                                    <span className={e.decision === "accept" ? "log-accept" : "log-override"}>
                                        {" "} → {e.decision}
                                    </span>
                                )}
                                {e.latency_ms && (
                                    <span className="log-latency"> ({e.latency_ms}ms)</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Export buttons */}
                <div className="export-buttons">
                    <button className="btn-primary full-width" onClick={handleExportBoth}>
                        Download Both (JSON + CSV)
                    </button>
                    <div className="export-row">
                        <button className="btn-outline" onClick={() => exportJSON()}>JSON Only</button>
                        <button className="btn-outline" onClick={() => exportCSV()}>CSV Only</button>
                    </div>
                </div>

                <p className="footnote">
                    {participantId} · Condition {condition} · {events.length} events · {finalDecisions.length} scenarios
                </p>
            </div>
        </div>
    );
}

export default CompletionScreen;