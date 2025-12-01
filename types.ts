
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export interface MethodologyStep {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  day: string;
  genre: string;
}

export enum Section {
  HERO = 'hero',
  SOBRE_MI = 'sobre-mi',
  METODOLOGIA = 'metodologia',
  DECODIFICADOR = 'decodificador',
  TESTIMONIOS = 'testimonios',
  CONTACTO = 'contacto',
}
