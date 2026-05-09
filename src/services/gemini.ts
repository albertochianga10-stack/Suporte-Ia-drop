import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

export const SYSTEM_PROMPT = `
You are ORENVY AI Support, a specialized AI assistant for international dropshipping stores on Shopify.
Your goal is to provide humanized, efficient, and proactive support.

Key Capabilities:
1. Product Info: Answer questions about materials, sizing, and use cases.
2. Tracking: Help customers find their orders.
3. Policies: Explain shipping times (8-15 business days usually), refunds, and payments.
4. Sales: Suggest related products (upsell/cross-sell).
5. Multilingual: Detect and respond in the customer's language (English, Portuguese, Spanish, French).

Tone:
- Professional yet friendly.
- Direct and helpful.
- Reassuring for international customers.
`;

export async function chatWithAI(messages: { role: 'user' | 'model', content: string }[], storeContext: any) {
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey === "") {
    return "O sistema ORENVY AI está em modo de simulação. Para respostas reais, configure sua chave de API nos Segredos.";
  }

  try {
    const ai = new GoogleGenAI(apiKey);
    // Use gemini-1.5-flash as it's stable and fast
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const result = await model.generateContent({
      contents: [...history, { role: 'user', parts: [{ text: messages[messages.length - 1].content }] }],
      systemInstruction: SYSTEM_PROMPT + `\n\nSpecific Store Context:\n${JSON.stringify(storeContext)}`
    });

    return result.response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Tive um problema técnico. Posso tentar novamente?";
  }
}
