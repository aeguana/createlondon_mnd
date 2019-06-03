web: PYTHONUNBUFFERED=1 ./manage.py runserver 0.0.0.0:8000

#REMEMBER TO START rabbitmq-server before running this!
mq: sleep 3; PYTHONUNBUFFERED=1 python ../venv/src/digitalvendcore/digitalvendcore/mq_consumer.py
mq_publish: sleep 3; PYTHONUNBUFFERED=1 python ../venv/src/digitalvendcore/digitalvendcore/mq_publisher.py
