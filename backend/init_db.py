# backend/init_db.py
from app import app  # or from your main app file (adjust if name is different)
from models import db

with app.app_context():
    db.create_all()
    print("✅ Database initialized.")
