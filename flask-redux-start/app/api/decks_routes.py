from flask import Blueprint, request
from app.models import db, Deck, User, Character
from flask_login import current_user
from app.forms import NewDeckForm, AddToDeck

decks_routes = Blueprint('decks', __name__, url_prefix="/api/decks")

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field}: {error}")
    return errorMessages


############? GET ALL DECKS ##########
@decks_routes.route("/") #"/api/messages/"
def decks():
    decks = Deck.query.all()
    # print("     TEST", decks[0].user)
    return {"decks": [deck.to_dict() for deck in decks]}

############? GET ONE ##########
@decks_routes.route("/<int:id>")
def deck(id):
    deck = Deck.query.get(id)
    return deck.to_dict()

############? POST NEW DECK ##########
@decks_routes.route("/", methods=["POST"])
def create_new_deck():
        form = NewDeckForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            data = form.data
            new_deck = Deck (
                deckName=data['deckName'],
                category=data['category'],
                userId=data["userId"]
                # userId=current_user.id
            )
            db.session.add(new_deck)

            db.session.commit()

            return new_deck.to_dict()
        return {"errors": validation_errors_to_error_messages(form.errors)}, 401

######? ADD CHARACTER TO DECK ######
@decks_routes.route("/<int:id>", methods=["POST"])
def post_to_deck(id):
    form = AddToDeck()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
            data = form.data
            characterId = data["characterId"]
            character = Character.query.get(characterId)
            deck = Deck.query.get(id)

            deck.characters.append(character)

            db.session.commit()

            return deck.to_dict_users()
    return {"errors": validation_errors_to_error_messages(form.errors)}, 401
