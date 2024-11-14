import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // Function to handle form submission
  const handleSendEmail = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    console.log("Sending email with data:", { email, subject, message });  // Log email data

    try {
      // Sending data to the backend
      const response = await axios.post("http://127.0.0.1:5000/send-email", {
        email,
        subject,
        message,
      });

      console.log("Response from backend:", response);  // Log the response from the backend

      // Check response and update status
      if (response.data.success) {
        setStatus("Email sent successfully!");
      } else {
        setStatus("Failed to send email.");
      }
    } catch (error) {
      setStatus("Error sending email.");
      console.error("Error during email sending:", error);  // Log any errors during the request
    }
  };

  return (
    <div className="App">
      <h1>Email Sender</h1>

      <form onSubmit={handleSendEmail}>
        <div className="form-group">
          <label htmlFor="email">Recipient Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit">Send Email</button>
      </form>

      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default App;
