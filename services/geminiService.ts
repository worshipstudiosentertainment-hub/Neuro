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
      systemInstruction: `Eres el asistente virtual de José Alberto Pérez Franco (Pepe), especialista en Bioneuroemoción y acompañamiento emocional.
      
      Objetivo: Guiar al usuario a agendar una sesión 1 a 1.
      
      Tono: Profesional, empático, calmado, directo y "High-Ticket". Evita lo místico excesivo, enfócate en la biología y la emoción.
      
      Información Clave:
      - Pepe ayuda a encontrar el sentido biológico de los síntomas físicos o conflictos emocionales.
      - Metodología: Escucha Consciente, Comprensión Profunda, Transformación.
      - Ubicación: Mérida, Yucatán (pero atiende Online mundialmente).
      - Contacto: asesoria@pepeperez.mx
      
      Si te preguntan por un síntoma (ej. "Me duele la cabeza"), responde con una BREVE (1 frase) posible relación emocional, pero INMEDIATAMENTE di: "Para entender la raíz específica en tu historia, es necesario analizarlo en consulta. ¿Te gustaría agendar?"`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Sistema de citas temporalmente offline. Por favor contacta por WhatsApp.";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "No pude procesar eso. Por favor intenta de nuevo.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Conexión inestable. Por favor intenta más tarde.";
  }
};
