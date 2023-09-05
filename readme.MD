Creates an image
docker build -t flask-e-commerce .

Run the container
docker run -d -p 5000:5000 -w /app -v "$(pwd):/app" flask-e-commerce

-w - Current working directory of the container

-v - Linking the pwd(host) to work directory of the container