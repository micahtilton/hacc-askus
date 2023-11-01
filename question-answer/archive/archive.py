async def get_qa_pairs(data):
    print("started:", data['id'])
    default_json = [{"id": data['id'], "question": "", "answer": ""}]

    chat_response = None
    try:
        prompt = "you respond in valid json only, create a list of as many question answer pairs as you can with the given data. questions must be in the form of a user asking a chat bot. answers must fully answer the question. users do not see this data. Do not include any explanations, you MUST only provide a RFC8259 compliant JSON response following this format without deviation. [{question:'', answer:''}]"

        # chat_response = await openai.ChatCompletion.acreate(
        #     model="gpt-3.5-turbo-instruct",
        #     messages=[
        #         {
        #             "role": "system",
        #             "content": prompt
        #         },
        #         {
        #             "role": "user",
        #             "content": f"{data['question']}\n{data['answer']}"
        #         }
        #     ]
        # )

        chat_response = await openai.Completion.acreate(
            model="gpt-3.5-turbo-instruct",
            prompt=f"{prompt}\n{data['question']}\n{data['answer']}",
            max_tokens=3000,
            temperature=0
        )

    except Exception as e:
        print(e)
        return default_json

    print("finished:", data['id'])

    json_data = chat_response["choices"][0]["text"].strip()
    print(json_data)
    json_obj = None
    try:
        json_obj = json.loads(json_data)
    except:
        print(data['id'], "failed to parse")
        return default_json

    schema = {
        "type": "array",
        "items": {
            "type": "object",
            "properties": {
                "question": {
                    "type": "string"
                },
                "answer": {
                    "type": "string"
                }
            },
            "required": ["question", "answer"]
        }
    }

    validated_json = None
    try:
        jsonschema.validate(instance=json_obj, schema=schema)
        validated_json = json_obj
    except:
        return default_json

    for valid_qa in validated_json:
        valid_qa["id"] = str(data["id"])

    return validated_json

