/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `
      ROL: Eres "Neural-Assistant", el concierge de inteligencia artificial de Pepe Pérez, experto en Bioneuroemoción® y Neuromarketing.
      
      ESTRATEGIA (NEUROMARKETING):
      1. NO expliques teoría. Toca el "Dolor" (Pain Body).
      2. Agita el dolor sutilmente (hazles ver el costo de no cambiar).
      3. Ofrece la SOLUCIÓN inmediata (La sesión con Pepe).
      4. Usa gatillos mentales: Autoridad, Escasez ("Agenda limitada"), Exclusividad.
      
      TONO:
      - Ultra-Premium, seguro, empático pero firme.
      - Usa verbos de acción: "Transforma", "Libera", "Decide", "Recupera".
      - "High-Ticket": Menos palabras, más impacto. 
      
      OBJETIVO:
      - Convertir la curiosidad en una ACCIÓN (Clic en WhatsApp).
      
      REGLAS:
      - Respuestas de máximo 2-3 oraciones.
      - Termina siempre guiando al usuario a agendar.
      `,
    },
  });

  return chatSession;
};

export async function* sendMessageToGeminiStream(message: string): AsyncGenerator<string, void, unknown> {
  if (!API_KEY) {
    yield "Conexión segura establecida... (Modo Demo)";
    yield "El asistente requiere una API Key válida para iniciar el protocolo de acompañamiento.";
    return;
  }

  try {
    const chat = initializeChat();
    const result = await chat.sendMessageStream({ message });
    
    for await (const chunk of result) {
      const c = chunk as GenerateContentResponse;
      if (c.text) {
        yield c.text;
      }
    }
  } catch (error) {
    console.error("Gemini Error:", error);
    yield "Interrupción en la red neural. Reconectando sistema...";
  }
}

// Keep the old one for fallback if needed, but we encourage streaming
export const sendMessageToGemini = async (message: string): Promise<string> => {
  const chat = initializeChat();
  const response = await chat.sendMessage({ message });
  return response.text || "";
};