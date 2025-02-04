import React, { useContext, useEffect, useState } from "react";
import CommentList from "./comment-list";
import classes from "./comments.module.css";
import NewComment from "./new-comment";
import NotificationContext from "@/store/notification-context";

const Comments = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const notificationCtx = useContext(NotificationContext);
  useEffect(() => {
    if (showComments) {
      setRefetch(true);
      notificationCtx.showNotification({
        title: "Sending comments",
        message: "Please wait, comments are being loaded",
        status: "pending",
      });
      fetch(`/api/comments/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          //   console.log(data);
          notificationCtx.showNotification({
            title: "Comments loaded",
            message: "Comments have been loaded",
            status: "success",
          });

          setComments(data.comment);
          setRefetch(false);
        })
        .catch((error) => {
          notificationCtx.showNotification({
            title: "Error",
            message: "Failed to load comments",
            status: "error",
          });
        });
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShowComments(true);
      });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !refetch && <CommentList items={comments} />}
      {showComments && refetch && <p>Loading....</p>}
    </section>
  );
};

export default Comments;
