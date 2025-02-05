import { buildFeedbackPath, extractFeedback } from "./feedback.js";

function handler(req, res) {
  if (req.method === "DELETE") {
  }
  const feedbackId = req.query.feedbackId;
  const filePatch = buildFeedbackPath();
  const feedbackDate = extractFeedback(filePatch);
  const selectedFeedback = feedbackDate.find(
    (feedback) => feedback.id === feedbackId
  );
  res.status(200).json({
    feedback: selectedFeedback,
  });
}

export default handler;
