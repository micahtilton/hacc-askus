import OpenAI from "openai";
import { Meteor } from "meteor/meteor";

// Load OpenAI with API key from Meteor Settings
const openai = new OpenAI({
  apiKey: Meteor.settings.private["openai-api-key"],
});

// Async wrapper for text embedding
const getEmbedding = async (text) => {
  const response = await openai.embeddings.create({
    input: text,
    model: "text-embedding-ada-002",
    encoding_format: "float",
  });

  if (response === null) {
    return null;
  }

  return response.data[0].embedding;
};

export { openai, getEmbedding };
