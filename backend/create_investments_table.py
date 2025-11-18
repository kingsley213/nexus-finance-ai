"""
Create Investments Table
========================
Run this script to create the investments table if it doesn't exist
"""
from models import create_tables, engine
from models.advanced_models import Investment
from sqlalchemy import inspect

def check_and_create_investments_table():
    """Check if investments table exists and create if needed"""
    inspector = inspect(engine)
    existing_tables = inspector.get_table_names()
    
    print("Existing tables:", existing_tables)
    
    if 'investments' not in existing_tables:
        print("\n❌ Investments table does not exist!")
        print("Creating investments table...")
        Investment.__table__.create(engine, checkfirst=True)
        print("✅ Investments table created successfully!")
    else:
        print("\n✅ Investments table already exists!")
    
    # Verify columns
    if 'investments' in existing_tables:
        columns = inspector.get_columns('investments')
        print(f"\nInvestments table has {len(columns)} columns:")
        for col in columns:
            print(f"  - {col['name']}: {col['type']}")

if __name__ == "__main__":
    check_and_create_investments_table()
