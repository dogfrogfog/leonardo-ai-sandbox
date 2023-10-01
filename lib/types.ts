export type UserID = string;
export type ImageID = string;
export type GenerationID = string;

export type ModelID = string;
export enum GenerationStatus {
  COMPLETE = 'COMPLETE',
  PENDING = 'PENDING'
}

export type GeneratedImage = {
  id: ImageID;
  likeCount: number;
  nsfw: boolean;
  url: string;
  generated_image_variation_generics: Array<Object>;
};

export type Generation = {
  guidanceScale: number;
  id: GenerationID;
  imageHeight: number;
  imageWidth: number;
  inferenceSteps: number;
  initStrength: null;
  modelId: ModelID;
  negativePrompt: string;
  presetStyle: null;
  prompt: string;
  public: false;
  scheduler: string;
  sdVersion: string;
  seed: number;
  status: GenerationStatus;
  generated_images: Array<GeneratedImage>;
};

export type Generations = Array<Generation>;

export type User = {
  name: string;
  id: UserID;
  tokenRenewalDate: string;
  subscriptionTokens: number;
  subscriptionGptTokens: number;
  subscriptionModelTokens: number;
  apiCredit: number;
};
