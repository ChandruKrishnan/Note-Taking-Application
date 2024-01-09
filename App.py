from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postres:notesApp?@localhost/notesdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)

@app.route('/api/notes', methods=['GET'])
def get_notes():
    notes = Note.query.all()
    notes_data = [{'id': note.id, 'title': note.title, 'content': note.content} for note in notes]
    return jsonify(notes_data)

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
