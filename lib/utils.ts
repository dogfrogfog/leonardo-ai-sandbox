import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ModelID } from './types';
import { MODELS_MAP } from '@/consts';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getModelByID(modelId: ModelID): string {
  const entries = Object.entries(MODELS_MAP);
  const model = entries.find(([name, id]) => id === modelId) || [
    `Model<${modelId}>`,
  ];
  return model[0];
}
