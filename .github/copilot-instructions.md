# Project Overview

This is a monolithic repository containing both backend and frontend codebases.

## Application Description

The application is a training management system with the following features:

- **Training Modules**: Users complete training modules to earn points
- **Reward System**: Users can spend earned points to bid on products/rewards provided by their company
- **Point-based Economy**: Completion of training translates to tangible rewards through a bidding system

## Architecture

- **Repository Type**: Monolithic (backend + frontend)
- **Core Functionality**: Training completion → Points → Reward bidding


## Deployment and development via docker-compose

Deployment in production is done via [Dokploy](https://dokploy.com/), using the provided `docker-compose.prod.yml` file.
For local development and testing, use the `docker-compose.yml` file.

The docker compose files are building and running two main services:
- `backend`: [Django](https://www.django-rest-framework.org/) REST API backend
- `frontend`: [React](https://react.dev/) [Shadcn](https://ui.shadcn.com/) UI frontend

#### development localy without docker
To run the application locally without Docker, follow these steps:
For backend setup:
~~~shell
# backend
cd django-rest-api && \
# Create a Python virtual environment
python3 -m venv .venv && \
# Activate the virtual environment
source .venv/bin/activate && \
# Install Python dependencies
pip install -r requirements.txt && \
# Navigate to the backend directory
cd backend && \
# Create database migration files
python3 manage.py makemigrations && \
# Apply database migrations
python3 manage.py migrate && \
# Start the Django development server
python3 manage.py runserver
~~~

For frontend setup:
~~~shell
# frontend
cd react-shadcn-ui && \
# Install Node.js dependencies
npm install && \
# Start the React development server
npm run dev
~~~