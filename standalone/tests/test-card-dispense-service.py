import socket
import json

data = {
	"action": "DISPENSE"
}

json_data = json.dumps(data)

mySocket = socket.socket()
mySocket.connect(('127.0.0.1', int(9100)))
mySocket.send(json_data.encode())

data = mySocket.recv(1024)

json_data = json.loads(data.decode())

try:
	result = json_data["result"]
	if result == "SUCCESS":
		print ("SUCCESS!")

	else:
		print ("FAILED")

except Exception as e:
	print("Exception received: {0}".format(e))
