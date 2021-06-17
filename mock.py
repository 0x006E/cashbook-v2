from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Resource, Api
from flask_cors import CORS


app = Flask(__name__)
api = Api(app)
cors = CORS(app, resources={
            r"/api/records": {"origins": "*"}, r"/api/particulars": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)


class Income(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(32))
    particulars = db.Column(db.Integer)
    cash = db.Column(db.Integer)
    bank = db.Column(db.Integer)
    _type = db.Column(db.String(32))

    def __init__(self, date, particulars, cash, bank, _type):
        self.date = date
        self.particulars = particulars
        self.cash = cash
        self.bank = bank
        self._type = _type


class IncomeSchema(ma.Schema):
    class Meta:
        fields = ('id', 'date', 'particulars', 'cash', 'bank', '_type')


income_schema = IncomeSchema()
incomes_schema = IncomeSchema(many=True)


class IncomeManager(Resource):
    @staticmethod
    def get():
        try:
            id = request.args['id']
        except Exception as _:
            id = None

        if not id:
            incomes = Income.query.all()
            return jsonify(incomes_schema.dump(incomes))
        income = Income.query.get(id)
        return jsonify(income_schema.dump(income))

    @staticmethod
    def post():
        date = request.json['date']
        particulars = request.json['particulars']
        cash = request.json['cash']
        bank = request.json['bank']
        _type = request.json['_type']

        income = Income(date, particulars, cash, bank, _type)
        db.session.add(income)
        db.session.commit()
        return jsonify({
            'Message': f'Record inserted.'
        })

    @staticmethod
    def put():
        try:
            id = request.args['id']
        except Exception as _:
            id = None
        if not id:
            return jsonify({'Message': 'Must provide the user ID'})
        income = Income.query.get(id)

        date = request.json['date']
        particulars = request.json['particulars']
        cash = request.json['cash']
        bank = request.json['bank']
        _type = request.json['_type']

        income.date = date
        income.particulars = particulars
        income.cash = cash
        income.bank = bank
        income._type = _type

        db.session.commit()
        return jsonify({
            'Message': f'Record Altered'
        })

    @staticmethod
    def delete():
        try:
            id = request.args['id']
        except Exception as _:
            id = None
        if not id:
            return jsonify({'Message': 'Must provide the user ID'})
        income = Income.query.get(id)

        db.session.delete(income)
        db.session.commit()

        return jsonify({
            'Message': f'Record {str(id)} deleted.'
        })


class Particular(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    particular = db.Column(db.String(32))
    _type = db.Column(db.String(32))

    def __init__(self, particular, _type):
        self.particular = particular
        self._type = _type


class ParticularSchema(ma.Schema):
    class Meta:
        fields = ('id', 'particular', '_type')


particular_schema = ParticularSchema()
particulars_schema = ParticularSchema(many=True)


class ParticularManager(Resource):
    @staticmethod
    def get():
        try:
            id = request.args['id']
        except Exception as _:
            id = None

        if not id:
            particulars = Particular.query.all()
            return jsonify(particulars_schema.dump(particulars))
        particular = Particular.query.get(id)
        return jsonify(particular_schema.dump(particular))

    @staticmethod
    def post():
        particular = request.json['particular']
        _type = request.json['_type']

        particulars = Particular(particular, _type)
        db.session.add(particulars)
        db.session.commit()
        return jsonify({
            'Message': f'Record inserted.'
        })

    @staticmethod
    def put():
        try:
            id = request.args['id']
        except Exception as _:
            id = None
        if not id:
            return jsonify({'Message': 'Must provide the ID'})
        particulars = Particular.query.get(id)

        particular = request.json['particular']
        _type = request.json['_type']

        particulars.particular = particular
        particulars._type = _type

        db.session.commit()
        return jsonify({
            'Message': f'Record Altered'
        })

    @staticmethod
    def delete():
        try:
            id = request.args['id']
        except Exception as _:
            id = None
        if not id:
            return jsonify({'Message': 'Must provide the user ID'})
        particular = Particular.query.get(id)

        db.session.delete(particular)
        db.session.commit()

        return jsonify({
            'Message': f'Record {str(id)} deleted.'
        })


api.add_resource(IncomeManager, '/api/records')
api.add_resource(ParticularManager, '/api/particulars')

if __name__ == '__main__':
    app.run(debug=True)
