from flask import Flask, request
from flask_restful import Resource, Api
from NLP.mining import *
from NLP.preprocess import *
from flask_cors import CORS
from NLP.vocabularies import Vocabularies

app = Flask(__name__)
CORS(app)
api = Api(app)

DATA = {}


class ExtractArticle(Resource):
    def post(self):
        url = request.form['url']
        n = int(request.form['n'])
        article = extract_article_from_wiki(url)
        article = remove_non_alphanumeric(article)
        article = remove_stop_words(article)
        article = keep_top_n_vocabularies(article, n)

        DATA["article"] = article

        return {"article": article}


class WordEmbedding(Resource):

    def get(self):
        word = request.form['vocabulary']
        return DATA["vocabularies"].get_most_similar_words(word, 10)

    def post(self):
        vocabs = Vocabularies(DATA["article"])
        vocabs.fit_vector(DATA["article"], window_size=3, epoch=1000)
        DATA["vocabularies"] = vocabs


# api.add_resource(WordEmbedding, '/<string:article>')
api.add_resource(ExtractArticle, '/article')
api.add_resource(WordEmbedding, '/words')

if __name__ == '__main__':
    app.run(debug=True)