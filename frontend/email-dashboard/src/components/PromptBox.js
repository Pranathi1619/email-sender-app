import React, { useState } from 'react';

function PromptBox({ onSubmit }) {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = () => {
        onSubmit(prompt);
    };

    return (
        <div>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your email template with placeholders like {Company Name}"
            />
            <button onClick={handleSubmit}>Save Prompt</button>
        </div>
    );
}

export default PromptBox;
