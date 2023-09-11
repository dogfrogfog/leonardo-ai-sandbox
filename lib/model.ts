/* Example request */
const temp = {
  prompt: 'winter forest',
  negative_prompt: '',
  nsfw: true,
  num_images: 4,
  width: 512,
  height: 768,
  num_inference_steps: 10,
  guidance_scale: 15,
  init_strength: 0.55,
  sd_version: 'v2',
  modelId: 'b820ea11-02bf-4652-97ae-9ac0cc00593d',
  presetStyle: 'PHOTOGRAPHY',
  scheduler: 'LEONARDO',
  public: false,
  tiling: false,
  leonardoMagic: true,
  imagePrompts: [],
  imagePromptWeight: 0.84,
  alchemy: true,
  highResolution: false,
  contrastRatio: 0.5,
  poseToImage: false,
  poseToImageType: 'POSE',
  weighting: 1,
  highContrast: true,
  expandedDomain: true,
  leonardoMagicVersion: 'v3',
  photoReal: false,
};

const temp2 = {
  prompt: 'winter forest',
  negative_prompt: '',
  nsfw: true,
  num_images: 4,
  width: 1024,
  height: 1024,
  num_inference_steps: 10,
  guidance_scale: 15,
  init_strength: 0.55,
  sd_version: 'v2',
  modelId: 'b820ea11-02bf-4652-97ae-9ac0cc00593d',
  presetStyle: 'ILLUSTRATION', // 'PHOTOGRAPHY', "ENVIRONMENT"
  scheduler: 'LEONARDO',
  public: false,
  tiling: false,
  leonardoMagic: true,
  imagePrompts: [],
  imagePromptWeight: 0.84,
  alchemy: true,
  highResolution: false,
  contrastRatio: 0.5,
  poseToImage: false,
  poseToImageType: 'POSE',
  weighting: 1,
  highContrast: true,
  expandedDomain: true,
  leonardoMagicVersion: 'v3',
  photoReal: false,
};

const defaultValues = {
  num_images: 4,
  photoReal: false,
  presetStyle: 'PHOTOGRAPHY',
};

export const processParams = (values) => {
  const params = { ...defaultValues, ...values };

  if (params.promptMagic) {
    params.leonardoMagicVersion = 'v3';
    params.alchemy = true;
    params.leonardoMagic = true;
  }

  return temp2;
};
