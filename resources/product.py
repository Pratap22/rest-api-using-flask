from flask import request
import uuid
from flask_jwt_extended import jwt_required
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from flask.views import MethodView
from flask_smorest import Blueprint, abort
from db import db
from schemas import ProductSchema, ProductUpdateSchema
from models import ProductModel


blueprint = Blueprint("products", __name__, description="Operations on products")

@blueprint.route("/product/<product_id>")
class Product(MethodView):
    @jwt_required()
    @blueprint.response(200, ProductSchema)
    def get(self, product_id):
        product = ProductModel.query.get_or_404(product_id)
        return product
    
    @jwt_required(fresh=True)
    @blueprint.arguments(ProductUpdateSchema)
    @blueprint.response(200, ProductSchema)
    def put(self, product_data, product_id):
        product = ProductModel.query.get_or_404(product_id)
        if product:
            product.price = product_data.get("price", product.price)
            product.name = product_data.get("name", product.name)
        else:
            product = ProductModel(id=product_id, **product_data)
        try:
            db.session.add(product)
            db.session.commit()
        except IntegrityError:
            abort(400, message="A product with that name already exists.")
        except SQLAlchemyError:
            abort(500, "Error while updating product")
        return product
        
    @jwt_required(fresh=True)
    def delete(self, product_id):
        product = ProductModel.query.get_or_404(product_id)
        db.session.delete(product)
        db.session.commit()
        return {"message": "Product deleted"}

@blueprint.route("/product")
class ProductList(MethodView):
    @jwt_required()
    @blueprint.response(200, ProductSchema(many=True))
    def get(self):
        return ProductModel.query.all()
    
    @jwt_required(fresh=True)
    @blueprint.arguments(ProductSchema)
    @blueprint.response(201, ProductSchema)
    def post(self, new_product):
        product = ProductModel(**new_product)
        try:
            db.session.add(product)
            db.session.commit()
        except IntegrityError:
            abort(400, message="A product with that name already exists.")    
        except SQLAlchemyError:
            abort(500, message="An error occured while inserting the product")

        return product