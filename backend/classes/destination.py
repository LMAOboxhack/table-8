# from flask import jsonify, request
# from main import app, db, Destination


# def create_destination(request):
#     data = request.get_json()
#     destination = Destination(
#         country_id=data["country_id"],
#         cost=data["cost"],
#         name=data["name"],
#         notes=data["notes"],
#     )
#     try:
#         db.session.add(destination)
#         db.session.commit()
#     except:
#         return jsonify({"message": "An error occurred creating the destination."}), 500
#     return jsonify(destination.json()), 201


# def update_destination(destination_id):
#     destination = Destination.query.filter_by(destination_id=destination_id).first()
#     if destination:
#         data = request.get_json()
#         destination.country_id = data["country_id"]
#         destination.cost = data["cost"]
#         destination.name = data["name"]
#         destination.notes = data["notes"]
#         try:
#             db.session.commit()
#         except:
#             return (
#                 jsonify({"message": "An error occurred updating the destination."}),
#                 500,
#             )
#         return jsonify(destination.json()), 200
#     return jsonify({"message": "destination not found."}), 404


# def delete_destination(destination_id):
#     destination = Destination.query.filter_by(destination_id=destination_id).first()
#     if destination:
#         try:
#             db.session.delete(destination)
#             db.session.commit()
#         except:
#             return (
#                 jsonify({"message": "An error occurred deleting the destination."}),
#                 500,
#             )
#         return jsonify({"message": "destination deleted."}), 200
#     return jsonify({"message": "destination not found."}), 404
