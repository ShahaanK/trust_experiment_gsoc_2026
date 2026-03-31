function WelcomeScreen({ participantId, condition, conditionLabel, onStart }) {
    return (
        <div className="screen welcome-screen">
            <p className="lab-header">HumanAI Research Lab</p>
            <h1>AI-Assisted Decision Study</h1>
            <p className="subtitle">Welcome! In this study, you'll be helping to evaluate an AI assistant by making a series of decisions with its recommendations. Your feedback will help us understand how people interact with AI and how to design better systems in the future.</p>  

            <div className="card metadata-card">
                <div className="metadata-row">
                    <div>
                        <span className="meta-label">Participant ID</span>
                        <span className="meta-value">{participantId}</span>
                    </div>
                    <div>
                        <span className="meta-label">Assigned Condition</span>
                        <span className="meta-value">{condition + " - " + conditionLabel}</span>
                    </div>
                </div>
            </div>
            <button className="btn-primary" onClick={onStart}>Start the Study</button>
            <p className="footnote">Estimated duration: 5-8 minutes · 6 scenarios</p>
        </div>
    );
}

export default WelcomeScreen;