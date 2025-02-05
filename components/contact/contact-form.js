import { useEffect, useState } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";

async function sendContactData(contactDetail) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contactDetail),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "something went wrong!");
  }
}

const ContactForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [reqStatus, setRequestStatus] = useState(); // pending, success, error
  const [reqError, setReqError] = useState();

  useEffect(() => {
    if (reqStatus === "success" || reqStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setReqError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [reqStatus]);
  async function sendMessageHandler(e) {
    e.preventDefault();

    setRequestStatus("pending");

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus("success");
      setEnteredEmail("");
      setEnteredName("");
      setEnteredMessage("");
    } catch (error) {
      setReqError(error.message);
      setRequestStatus("error");
    }
  }

  let notificationData;

  if (reqStatus === "pending") {
    notificationData = {
      status: "pending",
      title: "Sending message...",
      message: "Please wait while we send your message!",
    };
  }

  if (reqStatus === "success") {
    notificationData = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!",
    };
  }

  if (reqStatus === "error") {
    notificationData = {
      status: "error",
      title: "Error!",
      message: reqError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows={5}
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          />
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notificationData && <Notification {...notificationData} />}
    </section>
  );
};

export default ContactForm;
