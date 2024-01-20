from flask import jsonify, request
from main import app, db, Itinerary

# CREATE ITINERARY
@app.route('/itinerary', methods=['POST'])
def create_itinerary():
    data = request.json
    new_itinerary = Itinerary(country_id=data['country_id'], user_id=data['user_id'], budget=data['budget'], title=data['title'])
    db.session.add(new_itinerary)
    db.session.commit()
    return jsonify(new_itinerary.json()), 201

# GET ALL ITINERARIES
@app.route('/itinerary', methods=['GET'])
def get_itineraries():
    itineraries = Itinerary.query.all()
    return jsonify([itinerary.json() for itinerary in itineraries])

# GET 1 ITINERARY BASED ON ITINERARY_ID
@app.route('/itinerary/<itinerary_id>', methods=['GET'])
def get_itinerary(itinerary_id):
    itinerary = Itinerary.query.get(itinerary_id)
    if itinerary:
        return jsonify(itinerary.json())
    else:
        return jsonify({"message": "Itinerary not found"}), 404

# UPDATE ITINERARY BASED ON ITINERARY_ID
@app.route('/itinerary/<itinerary_id>', methods=['PUT'])
def update_itinerary(itinerary_id):
    itinerary = Itinerary.query.get(itinerary_id)
    if itinerary:
        data = request.json
        itinerary.country_id = data['country_id']
        itinerary.user_id = data['user_id']
        itinerary.budget = data['budget']
        itinerary.title = data['title']
        db.session.commit()
        return jsonify(itinerary.json())
    else:
        return jsonify({"message": "Itinerary not found"}), 404

# DELETE ITINERARY BASED ON ITINERARY_ID
@app.route('/itinerary/<itinerary_id>', methods=['DELETE'])
def delete_itinerary(itinerary_id):
    itinerary = Itinerary.query.get(itinerary_id)
    if itinerary:
        db.session.delete(itinerary)
        db.session.commit()
        return jsonify({"message": "Itinerary deleted successfully"})
    else:
        return jsonify({"message": "Itinerary not found"}), 404
