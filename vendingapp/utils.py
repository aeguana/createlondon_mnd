import socket
import json

from django.conf import settings


def send_service_socket_cmd(action):

	data = {
		"action": action
	}

	json_data = json.dumps(data)

	mySocket = socket.socket()
	mySocket.connect(('127.0.0.1', int(settings.CARD_SERVICE_SOCKET)))
	mySocket.send(json_data.encode())

	data = mySocket.recv(1024)

	json_data = json.loads(data.decode())

	try:
		result = json_data["result"]
		if result == "SUCCESS":
			return True

		else:
			return False

	except Exception as e:
		print("Exception received: {0}".format(e))
		return False
