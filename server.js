import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

app.get("/health", (req, res) => res.json({ ok: true }));

// Placeholder chat endpoint (we’ll wire OpenAI in next step)
app.post("/api/chat", async (req, res) => {
  const { message } = req.body || {};
  res.json({
    reply: `Got it: "${message ?? ""}". Next we’ll connect this to the LLM + voice.`
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
