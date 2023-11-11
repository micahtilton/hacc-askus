import openai
import os
import json
import numpy as np
import tiktoken

openai.api_key = os.getenv("OPENAI_API_KEY")

def get_embedding(text):
    response = openai.Embedding.create(
        input=text,
        model="text-embedding-ada-002",
        encoding_format="float"
    )

    return response["data"][0]["embedding"]


def create_ai_context(question, embedding_fp):
    with open(embedding_fp) as f:
        embeddings = json.load(f)

    question_embedding = get_embedding(question)

    embeddings.sort(key=lambda x: np.dot(question_embedding, x['embedding']), reverse=True)

    context = []
    data = []
    for e in embeddings[0:2]:
        context.append(e["text"])
        data.append(e)

    return " ".join(context), data


def get_answer(question, embedding_fp):
    context, data = create_ai_context(question, embedding_fp)

    try:
        prompt = f"Context: {context}\n\nyou are hoku, a ai chat assistant to help users. you give at most 3 sentence answers in the form of a text message based only on the context given. do not mention any external sources. if the question can't be answered based on the context, say \"I'm sorry, I don't have the answer to that question\"\n\nQuestion:{question}\nAnswer: "

        chat_response = openai.Completion.create(
            model="gpt-3.5-turbo-instruct",
            prompt=prompt,
            temperature=0,
            top_p=1,
            max_tokens=250,
            frequency_penalty=0,
            presence_penalty=0
        )

    except Exception as e:
        print(e)
        return "Sorry, Hoku is not available at the moment."

    return chat_response["choices"][0]["text"].strip(), data


def split_by_tokens(text, max_tokes=500):
    enc = tiktoken.get_encoding("cl100k_base")
    tokens = enc.encode(text)
    n_tokens = len(tokens)
    n_splits = (n_tokens // max_tokes) + 1
    return list(map(lambda x: enc.decode(x), np.array_split(tokens, n_splits)))