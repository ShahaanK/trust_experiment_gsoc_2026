function InstructionsScreen({ onBegin }) {
    return (
        <div className="screen">
            <div className="card">
                <span className="badge">Instructions</span>
                <h2>How This Works</h2>
                <div className="steps-list">
                    <div className="step-item">
                        <span className="step-num">01</span>
                        <div>
                            <p className="step-title">Read the scenario</p>
                            <p className="step-desc">You will be presented with a real-world situation and asked to make a decision.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <span className="step-num">02</span>
                        <div>
                            <p className="step-title">Review the AI recommendation</p>
                            <p className="step-desc">An AI assistant will provide its recommendation and reasoning for the scenario.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <span className="step-num">03</span>
                        <div>
                            <p className="step-title">Make your decision</p>
                            <p className="step-desc">Based on the scenario and AI recommendation, you will make a decision.</p>
                        </div>
                    </div>
                    <div className="step-item">
                        <span className="step-num">04</span>
                        <div>
                            <p className="step-title">Rate your confidence</p>
                            <p className="step-desc">You will be asked to rate your confidence in the decision you made.</p>
                        </div>
                    </div>

                </div>
                <div className="notice">
                    There are no right or wrong answers. We're interested in how you interact with AI recommendations, not testing your knowledge.
                </div>
                <button className="btn-primary" onClick={onBegin}>Begin the Task</button>

            </div>
        </div>
    );
}

export default InstructionsScreen;