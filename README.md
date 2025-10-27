# django-rest-with-react-shadcn-ui



## docker for development

#### Frontend - React with shadcn/ui
docker build -t react-shadcn-ui-dev -f react-shadcn-ui/Dockerfile react-shadcn-ui
docker run -it --rm -p 3000:3000 -e VITE_API_URL="http://localhost:8000" react-shadcn-ui-dev

#### Backend - Django REST API
docker build -t django-rest-api-dev -f django-rest-api/Dockerfile django-rest-api
docker run -it --rm -p 8000:8000 django-rest-api-dev




#### Notes
prompt pentru ai sa dea set de categori de produse care se gasesc in Altex
Training Categorys:
    -Televizoare, Casnice, IT


produs
    - titlu
    - descriere