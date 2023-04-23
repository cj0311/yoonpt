FROM python:3.10


# Update package lists and install Git
RUN apt-get update && apt-get install -y git

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt
 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt
 
#COPY ./app /code/app
 
#CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]