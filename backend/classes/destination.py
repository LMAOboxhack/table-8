from flask import jsonify, request
from main import app, db, Destination


@app.route("/destination", methods=["POST"])
def create_destination():
    data = request.get_json()
    destination = destination(**data)

    try:
        db.session.add(destination)
        db.session.commit()
    except:
        return jsonify({"message": "An error occurred creating the destination."}), 500

    return jsonify(destination.json()), 201


@app.route("/destination/<string:destination_id>", methods=["PUT"])
def update_destination(destination_id):
    destination = destination.query.filter_by(destination_id=destination_id).first()
    if destination:
        data = request.get_json()
        for key, value in data.items():
            setattr(destination, key, value)
        try:
            db.session.commit()
        except:
            return (
                jsonify({"message": "An error occurred updating the destination."}),
                500,
            )
        return jsonify(destination.json()), 200
    return jsonify({"message": "destination not found."}), 404


@app.route("/destination/<string:destination_id>", methods=["DELETE"])
def delete_destination(destination_id):
    destination = destination.query.filter_by(destination_id=destination_id).first()
    if destination:
        try:
            db.session.delete(destination)
            db.session.commit()
        except:
            return (
                jsonify({"message": "An error occurred deleting the destination."}),
                500,
            )
        return jsonify({"message": "destination deleted."}), 200
    return jsonify({"message": "destination not found."}), 404
