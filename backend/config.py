import os

port = 5432
root_path = '/api'

INVITE_CODES = os.environ.get('INVITE_CODES', '123456').split(';')

RATE_LIMIT = os.environ.get("API_RATE_LIMIT", "30/minute")

SECRET_KEY = os.environ.get("API_SECRET_KEY", "d65ee93418681ef24a23065bb7e7bab7e790c32b79e375cb883334b48180b272")

HUB_CLIENT_ID = os.environ.get("API_HUB_CLIENT_ID", "EXAMPLE-HUB-CLIENT-ID")
HUB_CLIENT_SECRET = os.environ.get("API_HUB_CLIENT_SECRET", "SUPER-secret-JUPYTERHUB")

APP_PROFILE = os.environ.get("APP_PROFILE", "dev")

DOMAIN_NAME = os.environ.get("APP_DOMAIN_NAME", "localhost")
