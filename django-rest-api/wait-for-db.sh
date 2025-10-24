#!/bin/bash
# wait-for-db.sh

set -e

host="$DB_HOST"
port="$DB_PORT"
user="$DB_USER"

until PGPASSWORD="$DB_PASSWORD" psql -h "$host" -p "$port" -U "$user" -d "$DB_NAME" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec "$@"