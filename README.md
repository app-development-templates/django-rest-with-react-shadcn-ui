# django-rest-with-react-shadcn-ui




# Local development with Docker Compose
docker compose -f compose/postgres.yml up -d



## docker for development
docker build -t react-shadcn-ui-dev -f react-shadcn-ui/Dockerfile react-shadcn-ui
docker run -it --rm -p 3000:3000 react-shadcn-ui-dev

docker build -t django-rest-api-dev -f django-rest-api/Dockerfile django-rest-api
docker run -it --rm -p 8000:8000 django-rest-api-dev