function handler(req, res) {
  const eventId = req.query.eventId;
  if (req.method === "POST") {
    const { email, text, name } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({
        message: "invalide input",
      });
      return;
    }
    console.log(email, name, text);

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };
    console.log(newComment);

    res.status(201).json({
      message: "new comment created",
      comment: newComment,
    });
  }

  if (req.method === "GET") {
    const dummyList = [
      { id: "c1", name: "Max", text: "A first comment!" },
      { id: "c2", name: "Anna", text: "A second comment!" },
    ];
    res.status(200).json({ comment: dummyList });
  }
}

export default handler;
