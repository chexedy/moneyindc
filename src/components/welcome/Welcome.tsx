import { useState } from 'react';
import './Welcome.css';

export default function Welcome({ onHide }: { onHide: () => void }) {
    const [dontShowAgain, setDontShowAgain] = useState(false);

    const handleEnter = () => {
        if (dontShowAgain) {
            localStorage.setItem("showWelcomeScreen", "false");
        }
        onHide();
    };

    return (
        <div className="welcome-overlay">
            <div className="welcome-modal">
                <h1>Welcome!</h1>
                <p>
                    This site allows you to track the billions of dollars spent each year
                    on lobbying in Congress. Click on a state to select a senator,
                    or zoom in and select a district to view their representative.
                </p>

                <div className="welcome-controls">
                    <label className="checkbox-container">
                        <input
                            type="checkbox"
                            checked={dontShowAgain}
                            onChange={(e) => setDontShowAgain(e.target.checked)}
                        />
                        Don't show this again.
                    </label>

                    <button onClick={handleEnter} className="enter-button">
                        Enter
                    </button>
                </div>
            </div>
        </div>
    );
}