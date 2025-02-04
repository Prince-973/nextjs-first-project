import classes from "./notification.module.css";
// import { useNotification } from '../../store/notification-context';
import React from "react";

const Notification = ({ title, message, status }) => {
  //   const { hideNotification } = useNotification();

  let statusClasses = "";

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    statusClasses = classes.error;
  }

  if (status === "pending") {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
