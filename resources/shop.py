from flask import request
import uuid
from flask_jwt_extended import jwt_required
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from db import db
from schemas import ShopSchema
from models import ShopModel

blueprint = Blueprint("shops", __name__, description="Operations on Shops")

@blueprint.route("/shop/<shop_id>")
class Shop(MethodView):
    @jwt_required()
    @blueprint.response(200, ShopSchema)
    def get(self, shop_id):
        shop = ShopModel.query.get_or_404(shop_id)
        return shop

    @jwt_required()
    def delete(self, shop_id):
        shop = ShopModel.query.get_or_404(shop_id)
        db.session.delete(shop)
        db.session.commit()
        return {"message": "Shop deleted"}

@blueprint.route("/shop")
class ShopList(MethodView):
    @jwt_required()
    @blueprint.response(200, ShopSchema(many=True))
    def get(self):
        return ShopModel.query.all()

    @jwt_required(fresh=True)
    @blueprint.arguments(ShopSchema)
    @blueprint.response(201, ShopSchema)
    def post(self, shop_data):
        shop = ShopModel(**shop_data)
        try:
            db.session.add(shop)
            db.session.commit()
        except IntegrityError:
            abort(400, message="A shop with that name already exists.")  
        except SQLAlchemyError:
            abort(500, message="An error occured while inserting the Shop.")
        return shop