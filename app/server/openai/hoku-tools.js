import { dot } from "mathjs";
import { _ } from "underscore";
import { FAQCollection } from "../../imports/api/FAQCollection";
import { EmbeddingCollection } from "../../imports/api/EmbeddingCollection";
import { getEmbedding, openai } from "./openai-tools";

const createContextFrom = (collection, embedding, contextAmount = 1, similarityThreshold = 1) => {
  let embeddings = collection.find({}).fetch();

  // add similarity value to embedding object
  embeddings.map((e) => {
    e.similarity = dot(e.embedding, embedding);
    return e;
  });

  // filter out low similarity embeddings
  embeddings = embeddings.filter((e) => e.similarity > similarityThreshold);
  embeddings = _.sortBy(embeddings, "similarity").reverse();

  embeddings.map((e) => {
    delete e.embedding;
    return e;
  });

  if (embeddings.length < contextAmount) {
    return embeddings;
  }

  // return the first "contextAmount" closest embeddings
  return embeddings.slice(0, contextAmount);
};

const createContext = (embedding, contextAmount = 2) => {
  const faqContext = createContextFrom(FAQCollection, embedding, 2, 0.8);

  // Prioritize context from the FAQ database
  if (faqContext.length > 0) {
    return faqContext;
  }

  // Get context from scraped data
  const archiveContext = createContextFrom(EmbeddingCollection, embedding, contextAmount, 0.75);

  if (archiveContext.length < contextAmount) {
    return archiveContext;
  }

  return archiveContext.slice(0, contextAmount);
};

// Used to simulate a chat response from Hoku
const hokuRepeat = async (toRepeat, delayMS) => {
  await new Promise((r) => setTimeout(r, delayMS));
  return {
    answer: toRepeat,
    context: [],
    question: "",
  };
};

//
const askHoku = async (question) => {
  const defaultAnswer = {
    answer: "",
    context: [],
    question: question,
  };

  // Uncomment to block logged-out users from using Hoku
  // if (!Meteor.call("isAdmin")) {
  //   defaultAnswer.answer = "Login for me to answer your questions :)";
  //   return defaultAnswer;
  // }

  const questionEmbedding = await getEmbedding(question);

  // Error checking
  if (questionEmbedding === null) {
    defaultAnswer.answer = "could not embed";
    return defaultAnswer;
  }

  // Error checking
  const context = createContext(questionEmbedding);
  defaultAnswer.context = context;
  if (context.length === 0) {
    defaultAnswer.answer = "Sorry, I don't have the answer to that.";
    return defaultAnswer;
  }

  // Concat the text from the context
  const contextText = context.reduce((a, b) => a + " " + b.text, "");

  // Hoku's prompt
  const prompt = `Context: ${contextText}\n\nYou are Hoku, an AI chat assistant to UH Manoa students. you give at most 3 sentence answers in the form of a text message. DO NOT mention the context or any external sources. You MUST ONLY give information based on the context above. if the question cant be answered based ONLY on the context above, say \"I'm sorry, I don't have the answer to that. question\".\n\nQuestion:${question}\nAnswer: `;

  const chatCompletion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: prompt,
    temperature: 0,
    max_tokens: 250,
  });

  // Error checking
  if (chatCompletion === null) {
    defaultAnswer.answer = "Hoku is unavailable at the moment. Sorry for the inconvenience.";
    return defaultAnswer;
  }

  // Return GPT response
  defaultAnswer.answer = chatCompletion.choices[0].text;
  return defaultAnswer;
};

export { askHoku, createContext, createContextFrom, hokuRepeat };
