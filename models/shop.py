from db import db

class ShopModel(db.Model):
    __tablename__ = "shops"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    products = db.relationship('ProductModel', back_populates='shop', 
                               lazy='dynamic', cascade='all, delete')
