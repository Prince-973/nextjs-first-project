import NotificationContext from "@/store/notification-context";
import classes from "./newsletter-registration.module.css";
import React, { useContext, useRef } from "react";

const NewsletterRegistration = () => {
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  const registrationHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;

    notificationCtx.showNotification({
      title: "Signing up...",
      message: "Registering for newsletter",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || "something went Wrong");
          });
        }
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success!",
          message: "Registered for newsletter!",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: "Failed to register for newsletter!",
          status: "error",
        });
      });
  };

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};
export default NewsletterRegistration;
