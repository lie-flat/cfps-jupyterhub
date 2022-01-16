import pandas as pd
from os import environ
from sqlalchemy import create_engine

DATABASE_PORT = environ.get('DATABASE_PORT', '3306')
DATABASE_USER = environ.get('DATABASE_USER', 'jupyterhub')
DATABASE_PASSWORD = environ.get('DATABASE_PASSWORD', 'SUPER-secret_PlavsW0r1d')
DATABASE_NAME = environ.get('DATABASE_NAME', 'cfps')
DATABASE_HOST = environ.get('DATABASE_HOST', '172.17.0.1')

engine = create_engine(f"mysql+pymysql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_HOST}/{DATABASE_NAME}")
connection = engine.connect()


def sql(query, index_col=None, params=None):
    return pd.read_sql(query, connection, index_col=index_col, params=params)
