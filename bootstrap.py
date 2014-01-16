import os
import sys

# required to load libraries under server/lib that Flask depends on
app_root_dir = os.path.dirname(__file__)
server_lib_dir = os.path.join(app_root_dir, 'server/lib')

if server_lib_dir not in sys.path:
  sys.path.insert(0, server_lib_dir)

from flask import Flask, render_template, request, g
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///testdb.db'

db = SQLAlchemy(app)

