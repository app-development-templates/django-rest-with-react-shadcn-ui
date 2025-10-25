# Use Python 3.11 slim image
FROM python:3.11-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# Forward configuration so the runtime matches build-time defaults
ARG DEBUG=0
ARG DB_NAME=coursesapp
ARG DB_USER=postgres
ARG DB_PASSWORD=coursesapp123
ARG SECRET_KEY=change-me-in-production
ARG ALLOWED_HOSTS=*
ARG CORS_ALLOWED_ORIGINS=http://localhost:3000
ARG CSRF_TRUSTED_ORIGINS=http://localhost:8000

ENV DEBUG=${DEBUG} \
    DB_NAME=${DB_NAME} \
    DB_USER=${DB_USER} \
    DB_PASSWORD=${DB_PASSWORD} \
    SECRET_KEY=${SECRET_KEY} \
    ALLOWED_HOSTS=${ALLOWED_HOSTS} \
    CORS_ALLOWED_ORIGINS=${CORS_ALLOWED_ORIGINS} \
    CSRF_TRUSTED_ORIGINS=${CSRF_TRUSTED_ORIGINS}

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        postgresql-client \
        build-essential \
        libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY backend/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files (includes wait-for-db.py)
COPY backend/ /app/

# Expose port
EXPOSE 8000

# Run the application (this will be overridden by docker-compose command)
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]