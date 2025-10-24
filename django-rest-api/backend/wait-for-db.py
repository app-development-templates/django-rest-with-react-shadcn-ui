#!/usr/bin/env python3
"""
Wait for PostgreSQL database to be ready before starting Django.
"""

import os
import sys
import time
import psycopg2
from psycopg2 import OperationalError

def wait_for_db():
    """Wait for database to be available."""
    db_settings = {
        'host': os.getenv('DB_HOST', 'localhost'),
        'port': os.getenv('DB_PORT', '5432'),
        'database': os.getenv('DB_NAME', 'postgres'),
        'user': os.getenv('DB_USER', 'postgres'),
        'password': os.getenv('DB_PASSWORD', 'postgres'),
    }
    
    max_retries = 30
    retry_interval = 1
    
    for attempt in range(max_retries):
        try:
            print(f"Attempting to connect to database (attempt {attempt + 1}/{max_retries})...")
            conn = psycopg2.connect(**db_settings)
            conn.close()
            print("✅ Database is ready!")
            return True
            
        except OperationalError as e:
            if attempt == max_retries - 1:
                print(f"❌ Failed to connect to database after {max_retries} attempts")
                print(f"Error: {e}")
                return False
            
            print(f"⏳ Database not ready, waiting {retry_interval}s...")
            time.sleep(retry_interval)
    
    return False

if __name__ == "__main__":
    if not wait_for_db():
        sys.exit(1)
    print("🚀 Starting Django application...")