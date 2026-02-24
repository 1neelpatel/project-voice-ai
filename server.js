import express from "express";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body || {};
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful voice-first assistant." },
        { role: "user", content: message || "" }
      ]
    });

    res.json({ reply: completion.choices?.[0]?.message?.content ?? "" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ reply: "Server error calling the AI." });
  }
});

app.listen(port, () => console.log(`Listening on ${port}`));
