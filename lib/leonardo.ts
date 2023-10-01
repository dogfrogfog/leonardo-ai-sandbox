'use client';
import { formSchema } from '@/components/PromptForm/schema';
import { Leonardo } from '@leonardo-ai/sdk';
import {
  CreateGeneration200ApplicationJSONSDGenerationOutput,
  GetGenerationById200ApplicationJSONGenerations,
} from '@leonardo-ai/sdk/dist/sdk/models/operations';
import * as z from 'zod';
import { Generations, User, UserID } from './types';

const authToken = process.env.NEXT_PUBLIC_LEONARDO_API_KEY;

const sdk = new Leonardo({
  security: {
    bearerAuth: authToken as string,
  },
});

export async function createGeneration(
  params: z.infer<typeof formSchema>,
): Promise<CreateGeneration200ApplicationJSONSDGenerationOutput | null> {
  try {
    if (params.photoReal) {
      params.modelId = undefined;
    }


    const generationResponse = await sdk.generation.createGeneration(params);

    const generationId =
      generationResponse.createGeneration200ApplicationJSONObject
        ?.sdGenerationJob || null;

    return generationId;
  } catch (e) {
    console.error(e);
  }

  return null;
}

export async function getGeneration(
  generationId: string,
): Promise<GetGenerationById200ApplicationJSONGenerations | null> {
  try {
    const generationImagesResponse = await sdk.generation.getGenerationById(
      generationId,
    );

    const generation =
      generationImagesResponse.getGenerationById200ApplicationJSONObject
        ?.generationsByPk || null;

    return generation;
  } catch (e) {
    console.error(e);
  }

  return null;
}

export async function getUser(): Promise<User> {
  const resp = await fetch('https://cloud.leonardo.ai/api/rest/v1/me', {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${authToken}`,
    },
  }).then((response) => response.json());

  const userObj = resp.user_details[0];

  return {
    name: userObj.user.username,
    id: userObj.user.id,
    tokenRenewalDate: userObj.tokenRenewalDate,
    subscriptionTokens: userObj.subscriptionTokens,
    subscriptionGptTokens: userObj.subscriptionGptTokens,
    subscriptionModelTokens: userObj.subscriptionModelTokens,
    apiCredit: userObj.apiCredit / 100_000,
  };
}

type GetUserGenerationsProps = {
  userId: UserID;
  offset?: number;
  limit?: number;
};

export async function getUserGenerations({
  userId,
  offset = 0,
  limit = 16,
}: GetUserGenerationsProps): Promise<Generations> {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${authToken}`,
      },
    };

    const resp: { generations: Generations } = await fetch(
      `https://cloud.leonardo.ai/api/rest/v1/generations/user/${userId}?offset=${offset}&limit=${limit}`,
      options,
    )
      .then((response) => response.json())
      .catch((err) => console.error(err));

    if (!resp?.generations) {
      return [];
    }
    return resp.generations;
  } catch (err) {
    console.error(err);
    return [];
  }
}
