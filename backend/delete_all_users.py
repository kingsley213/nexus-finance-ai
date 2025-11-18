from models.database import SessionLocal
from models.user_models import User

def delete_all_users():
    db = SessionLocal()
    db.query(User).delete()
    db.commit()
    db.close()

if __name__ == "__main__":
    delete_all_users()
    print("All users deleted.")
