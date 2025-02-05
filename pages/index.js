import { useRef, useState } from "react";

export default function Home() {
  const [feedback, setFeedback] = useState([]);
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitHandler(e) {
    e.preventDefault();
    const enterdEmail = emailInputRef.current.value;
    const enterdFeedback = feedbackInputRef.current.value;

    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: enterdEmail, text: enterdFeedback }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }

  function loadFeedbackHandler() {
    fetch("/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        setFeedback(data.feedback);
      });
  }

  return (
    <>
      <h1>Home page</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <br />
        <div>
          <label htmlFor="feedback">Your feedback Address</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} />
        </div>
        <br />
        <button>Send Feedback</button>
      </form>
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <hr />
      <ul>
        {feedback.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </>
  );
}
