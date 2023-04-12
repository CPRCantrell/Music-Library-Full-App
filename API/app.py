from flask import Flask, request, Response
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from marshmallow import post_load, fields, ValidationError
from flask_migrate import Migrate
from flask_restful import Api, Resource
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
from os import environ

load_dotenv()

# Create App instance
app = Flask(__name__)

# Add DB URI from .env
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('SQLALCHEMY_DATABASE_URI')

# Registering App w/ Services
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)
CORS(app)
Migrate(app, db)

#junction table


# Models
class Song(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    run_time = db.Column(db.Integer(), nullable=False)
    favorites = db.Column(db.Integer(), nullable=False, default=0)
    album = db.Column(db.Integer(), db.ForeignKey('album.id'))

class Album(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    release_date = db.Column(db.Integer(), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    album_cover = db.Column(db.Integer(), db.ForeignKey('cover.id'))
    artist_id = db.Column(db.Integer(), db.ForeignKey('artist.id'))
    artist = db.relationship('Artist')
    cover = db.relationship('Cover')

class Artist(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(255), nullable=False)

class Cover(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    img = db.Column(db.LargeBinary(), nullable=False)
    file_name = db.Column(db.String(255), nullable=False)
    mimetype = db.Column(db.Text(), nullable=False)


# Schemas
class SongSchema(ma.Schema):
    class Meta:
        fields = ('id','title','run_time','favorites','album')
songs_schema = SongSchema(many=True)

class AlbumSchema(ma.Schema):
    class Meta:
        fields = ('id','name','release_date','genre','album_cover','artist_id')
albums_schema = AlbumSchema(many=True)

class AlbumWithSongSchema(ma.Schema):
    class Meta:
        fields = ('name','release_date','genre','album_cover')
albums_with_song_schema = AlbumWithSongSchema()

class CoverSchema(ma.Schema):
    class Meta:
        fields = ('id','img','mimetype')
cover_schema = CoverSchema()

class ArtistSchema(ma.Schema):
    class Meta:
        fields = ('id','name')
artists_schema = ArtistSchema(many=True)

# Resources
# Routes
@app.route('/api/song/delete/<int:song_id>', methods=['DELETE'])
def delete_song(song_id):
    song = Song.query.get_or_404(song_id)
    db.session.delete(song)
    db.session.commit()
    return f'{song.title} was deleted', 200

@app.route('/api/songs/all', methods=['GET'])
def send_all_data():
    all_songs = Song.query.all()
    all_albums = Album.query.all()
    all_artists = Artist.query.all()

    response = {
        'songs': songs_schema.dump(all_songs),
        'artists': artists_schema.dump(all_artists),
        'albums': albums_schema.dump(all_albums)
    }

    return response, 200

@app.route('/api/songs/detail', methods=['GET'])
def songs_with_detail():
    songs = Song.query.all()

    response = []
    for song in songs:
        album = Album.query.get_or_404(song.album)
        artist = Artist.query.get_or_404(album.artist_id)
        response.append({
            'id': song.id,
            'title': song.title,
            'run_time': song.run_time,
            'album': albums_with_song_schema.dump(album),
            'artist': artist.name
        })

    return response, 200

@app.route('/api/album_cover/<int:img_id>', methods=['GET'])
def send_cover(img_id):
    img = Cover.query.filter_by(id=img_id).first()
    if not img:
        return 'no img with that is', 404
    return Response(img.img, mimetype=img.mimetype)

@app.route('/api/album_cover/album/<int:album_id>', methods=['GET'])
def send_cover_with_album_id(album_id):
    album = Album.query.get_or_404(album_id)
    img = album.cover
    if not img:
        return 'no img with that is', 404
    return Response(img.img, mimetype=img.mimetype)


@app.route('/api/song/form/add/new_song', methods=['POST'])
def add_new_song():
    song_name = request.form.get('song_name')
    run_time = request.form.get('run_time')
    artist_id = request.form.get('artist_id')
    album_id = request.form.get('album_id')

    try:
        if not artist_id:
            artist_name = request.form.get('artist')
            artist_id = add_artist(artist_name)
        if not album_id:
            album_name = request.form.get('album')
            genre = request.form.get('genre')
            year = int(request.form.get('year'))
            album_art = request.files.get('album_art')
            cover_id = add_cover(album_art)
            album_json = {'name':album_name, 'release_date':year, 'genre':genre, 'album_cover':cover_id, 'artist_id':artist_id}
            album_id = add_album(album_json)

        run_time = [int(num) for num in run_time.split(':')]
        run_time_in_seconds = run_time[0]*60 + run_time[1]
        song_json = {'title':song_name, 'run_time': run_time_in_seconds, 'album':album_id}
        add_song(song_json)

        return f'Successfully Added: {song_name}', 200
    except Exception as err:
        print(err)
        return err

def add_cover(file):
    filename = secure_filename(file.filename)
    mimetype = file.mimetype

    cover = Cover(img= file.read(), mimetype=mimetype, file_name=filename)
    db.session.add(cover)
    db.session.commit()

    return Cover.query.filter_by(file_name=filename)[0].id

def add_artist(artist):
    artist_entry = Artist(name=artist)
    db.session.add(artist_entry)
    db.session.commit()

    return Artist.query.filter_by(name=artist)[0].id

def add_album(album):
    album_entry = Album(name=album['name'], release_date=album['release_date'], genre=album['genre'], album_cover=album['album_cover'],artist_id=album['artist_id'])
    db.session.add(album_entry)
    db.session.commit()

    return Album.query.filter_by(name=album['name'])[0].id

def add_song(song):
    song_entry = Song(title=song['title'], run_time=song['run_time'], album=song['album'])
    db.session.add(song_entry)
    db.session.commit()