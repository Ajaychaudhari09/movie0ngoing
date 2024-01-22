from flask import flask, render_template

app = flask(__name__)


@app.route('/')
def home():
    print("Welcome ")
    return render_template("index.html", page_name="what2watch.html")


@app.route("/search/<string:movieName>")
def search_movie(MovieName):
    url = f"https://www.omdbapi.com/?s{MovieName}=my%20demon&apikey=cf423da3"


return render_template("index.html", page_name="search result")

