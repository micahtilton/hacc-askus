import { Meteor } from 'meteor/meteor';
import { EmbeddingCollection } from '../imports/api/collections/EmbeddingCollection';
import OpenAI from 'openai';
import apikey from './apikey.json';
import { dot } from 'mathjs';

const openai = new OpenAI({
  apiKey: apikey.key
});

Meteor.methods({
  async askHoku(question) {
    const embeddingResponse = await openai.embeddings.create(
      {
        input: question,
        model: "text-embedding-ada-002",
        encoding_format: "float"
      }
    )

    if (embeddingResponse === null) {
      return "could not embed";
    }

    const questionEmbedding = embeddingResponse.data[0].embedding;

    let [maxSimilarity, mostSimilar] = [0, null];
    for (let e of EmbeddingCollection.find({}).fetch()) {
      const currentSim = dot(questionEmbedding, e.embedding);
      if (currentSim > maxSimilarity) {
        maxSimilarity = currentSim;
        mostSimilar = e;
      }
    }

    if (maxSimilarity < 0.75) {
      return "Sorry, I don't quite understand the question";
    }

    const chatCompletion= await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "user",
          "content": `you are a chatbot that only speaks hawaiian pigeon, only gives answers from the data provided, and gives answers in 100 words or less. data: ${mostSimilar.data.answer}\nquestion: ${question}`
        },
        // {
        //   "role": "user",
        //   "content": `data: ${mostSimilar.data.answer}\nquestion: ${question}`
        // },
      ]
    })

    return chatCompletion.choices[0].message.content;
  }
});

Meteor.startup(() => {
  if (EmbeddingCollection.find().count() === 0) {
    import embedding_data from './embedding-data.json'
    for (let e of embedding_data["embedding-data"]){
      EmbeddingCollection.insert(e);
    }
  } else {
    console.log("populated");
  }
});
