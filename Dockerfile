FROM python:3.11-slim

WORKDIR /app

# Copy game files
COPY . /app

# Expose default port
ENV PORT=8080
EXPOSE 8080

CMD ["python", "server.py"]
