
import { GoogleGenAI } from "@google/genai";

// Fix: Implement the editBurgerImage service using Gemini 2.5 Flash Image model
// This restores the module functionality required by AICustomizer.tsx
export const editBurgerImage = async (dataUrl: string, prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Extract base64 data and mime type from data URL provided by the frontend
  const matches = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!matches) {
    throw new Error('Formato de imagem inválido');
  }
  const mimeType = matches[1];
  const base64Data = matches[2];

  // Request image editing using gemini-2.5-flash-image
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        },
        {
          text: prompt,
        },
      ],
    },
  });

  // Find the image part in the response as per the latest SDK guidelines
  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        // Construct the base64 data URL from the response
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
  }

  throw new Error("O chef IA não conseguiu processar sua solicitação de imagem. Tente outro prompt.");
};
