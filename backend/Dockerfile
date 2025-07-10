FROM python:3.11-slim

#set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

#set work directory
WORKDIR /app

#install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gcc \
        postgresql-client \
    && rm -rf /var/lib/apt/lists/*

#install python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

#copy project
COPY . .

#collect static files
RUN python manage.py collectstatic --noinput

#expose port
EXPOSE 80000

#run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
