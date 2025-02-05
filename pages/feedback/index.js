import { useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

function feedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState({});
  function loadFeedbackHandler(id) {
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log();

        setFeedbackData(data.feedback);
      });
  }
  return (
    <>
      {feedbackData ? <p>{feedbackData.email}</p> : <p>loading...</p>}
      <ul>
        {props.feedback.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedback: data,
    },
  };
}

export default feedbackPage;
