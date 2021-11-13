from output import lilypond_output, note_output
from fileManager import return_pdf_name
import yaml

# https://wim.vree.org/js3/xmlplay_readme.html


stream = open("config.yaml", 'r')
config = yaml.load(stream, Loader=yaml.FullLoader)

from flask import (Flask, abort, flash, Markup, redirect, render_template,
                   request, Response, session, url_for)

app = Flask(__name__,
            static_url_path='',
            static_folder='static',
            template_folder='templates'
            )


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        tonic = request.form['tonic']
        print(tonic)
        lilypond_output(tonic, mode='ascending_descending_major', mypath=config["file"]['lilypond_output_file'])
        return tonic
    return render_template("index.html",
                           )


@app.route('/sheet')
def timeline():
    return render_template("test.html",
                           notes= note_output('c', 'major')
                           )


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()
