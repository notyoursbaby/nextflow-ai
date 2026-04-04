export async function runLLM(inputText: string) {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: inputText }],
            },
          ],
        }),
      }
    );

    const data = await res.json();

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response"
    );
  } catch (err) {
    console.error(err);
    return "Error";
  }
}