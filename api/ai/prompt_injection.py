from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import pandas as pd
import os

absolute_path = os.path.dirname(__file__)

# Load data
test = pd.read_parquet(os.path.join(absolute_path, "../data/test.parquet"))
train = pd.read_parquet(os.path.join(absolute_path, "../data/train.parquet"))

# Parse data
X_train, y_train = train["text"], train["label"]
X_test, y_test = test["text"], test["label"]

# Create TF-IDF Vectorizer
vectorizer = TfidfVectorizer()
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# Create and fit naive bayes prompt injection classifier
classifier = MultinomialNB()
classifier.fit(X_train_tfidf, y_train)

print("Created naive bayes prompt injection classifier")


def is_prompt_injection(text):
    text_tf_idf = vectorizer.transform([text])
    return True if classifier.predict(text_tf_idf)[0] else False