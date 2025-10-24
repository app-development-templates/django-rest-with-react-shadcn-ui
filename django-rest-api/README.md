# django-rest-api

## Feutures
- User Authentication






python3 -m venv .venv
source ./.venv/bin/activate
pip freeze > test_requirements.txt
pip install -r backend/requirements.txt
django-admin startproject backend
python3 manage.py startapp api


python3 manage.py makemigrations
python3 manage.py migrate

python3 manage.py runserver
