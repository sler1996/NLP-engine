from flask import Flask, request
from flask_restful import Resource, Api
from NLP.mining import *
from NLP.preprocess import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)


class WordEmbedding(Resource):
    def post(self):
        url = request.form['url']
        n = int(request.form['n'])
        print(url)
        print(n)
        article = extract_article_from_wiki(url)
        article = remove_non_alphanumeric(article)
        article = remove_stop_words(article)
        article = keep_top_n_vocabularies(article, n)

        return {"article": article}


# api.add_resource(WordEmbedding, '/<string:article>')
api.add_resource(WordEmbedding, '/article')

if __name__ == '__main__':
    app.run(debug=True)