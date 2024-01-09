from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:notesApp?@localhost/notesdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class User(db.Model):
    id = db.Column(db.String(50), primary_key=True, unique = True, nullable = False)

    def __repr__(self):
        return f'<User {self.id}>'


class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)

@app.route('/api/notes', methods=['GET'])
def get_notes():
    notes = Note.query.all()
    notes_data = [{'id': note.id, 'title': note.title, 'content': note.content} for note in notes]
    return jsonify(notes_data)

@app.route('/api/notes/<int:note_id>', methods=['GET'])
def get_note(note_id):
    note = Note.query.get_or_404(note_id)
    return jsonify({'id': note.id, 'title': note.title, 'content': note.content})

@app.route('/api/notes', methods=['POST'])
def create_note():
    data = request.json
    if 'title' not in data or 'content' not in data:
        return jsonify({'error': 'title and content are required'}), 400
    new_note = Note(title=data['title'], content=data['content'])
    db.session.add(new_note)
    db.session.commit()

    return jsonify({'id': new_note.id, 'title': new_note.title, 'content': new_note.content}), 201

@app.route('/api/notes/<int:note_id>', methods=['PUT'])
def update_note(note_id):
    note = Note.query.get_or_404(note_id)
    data = request.json

    if 'title' in data:
        note.title = data['title']

    if 'content' in data:
        note.content = data['content']

    db.session.commit()

    return jsonify({'id': note.id, 'title': note.title, 'content': note.content})

@app.route('/api/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    note = Note.query.get_or_404(note_id)
    db.session.delete(note)
    db.session.commit()

    return jsonify({'message': 'Note deleted successfully'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)
