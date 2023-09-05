from db import db

class ProductModel(db.Model):
    __tablename__ = "products"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    price = db.Column(db.Float(precision=2), unique=False, nullable=False)
    
    shop_id = db.Column(db.Integer, db.ForeignKey('shops.id'), unique=False, nullable=False)
    shop = db.relationship("ShopModel", back_populates="products")