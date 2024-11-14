// src/components/EmailForm.js
import React, { useState } from 'react';

const EmailForm = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('http://127.0.0.1:5000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipient, subject, content }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(data.message);
    } else {
      alert('Error: ' + data.message);
    }
  };

  return (
    <div>
      <h2>Send an Email</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          placeholder="Email content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default EmailForm;
