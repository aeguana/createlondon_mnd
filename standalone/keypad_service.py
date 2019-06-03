#!/usr/bin/env python3
import os
import sys
import struct
import time
import serial
import json
import requests
import threading

import binascii
from enum import Enum

FRONTEND_DOMAIN="http://localhost:8000"

class SerialConnector(object):
    def __init__(self, ser):
        self.ser = ser

        super(SerialConnector, self).__init__()

    def read_from_serial(self):
        line = bytearray()
        while True:
            c = self.ser.read(1)
            if c:
                line += c

            elif not c and len(line) > 0:
                self.parse_response(line)
                line = bytearray()

    def parse_response(self, command):

        if command != b'':
            if len(command) == 3:
                #TODO logic here.  
               print(command)

               r = requests.post(FRONTEND_DOMAIN + '/api/1.0/receive-service-signal/',
                data={
                "json": json.dumps({
                'type': 'ALERT',
                'value': command[0]
                })
            })

            else:
                print("Invalid data received: ")
                print(command)
                return False
        else:
            print("No data received.")
            return False



    def send (self, command):
       
        self.serial_port.flushInput()

        #debug_print(print_bytes(message))
        self.ser.write(command.encode("ascii"))



    # def throw_me(self, e):
    #     print("Received exception in child thread, killing process")
    #     self.error = True
    #     raise e


    # def listen_socket(self, throw_me):
    #     # create TCP/IP socket
    #     sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    #     # bind the socket to the port 9100
    #     server_address = ('127.0.0.1', 9100)
    #     print(format('starting up on %s port %s' % server_address))

    #     sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    #     sock.bind(server_address)

    #     # listen for incoming connections (server mode) with one connection at a time
    #     sock.listen(1)

    #     # Start main loop to listen for commands
    #     while True:

    #         #If we get an error (eg: in a child thread through the throw_me func arg) exit
    #         if self.error:
    #             raise Exception

    #         # wait for a connection
    #         my_logger.info('waiting for a connection')
    #         connection, client_address = sock.accept()

    #         try:
    #             # show who connected to us
    #             my_logger.info('connection from {}'.format(client_address))

    #             # receive the data in small chunks and print it
    #             while True:
    #                 data = connection.recv(64)
    #                 if data:
    #                     # output received data
    #                     try:
    #                         json_data = json.loads(data.decode())
    #                         action = json_data["action"]
    #                         my_logger.info("Data: %s" % json_data)

    #                     except:
    #                         my_logger.error("unable to convert message to json")
    #                         continue

    #                     #Whatever action we receive, we want to ack it if we're good to go
    #                     result = self.construct_result("SUCCESS")
    #                     connection.send(result.encode())

    #                     # Handling of different action codes
    #                     if action == "START_POUR":

    #                         #Set state to pouring
    #                         volume_to_pour = json_data.get("volume", 20)
    #                         fragrance_type = json_data.get("type", 1) #default to first

    #                         # For now, structure is "COMMAND CHANNEL VOLUME"
    #                         command = "VEND {} {}\n".format(FRAGRANCE_CHANNEL_MAP[fragrance_type], volume_to_pour)
    #                         self.write_serial_cmd(command)

    #                         continue

    #                     elif action == "STOP_POUR":

    #                         #TODO!!! Pambo needs to not make it a blocking command innit
    #                         # command = "STOP"
    #                         # self.write_serial_cmd(command)

    #                         continue


    #                 else:
    #                     # no more data -- quit the loop
    #                     break
    #         finally:
    #             # Clean up the connection
    #             connection.close()





if __name__ == '__main__':

    # Initialise Serial
    ser = serial.Serial(
        port='/dev/serial/by-id/usb-1a86_USB2.0-Serial-if00-port0',#'/dev/ttyAMA0', 
        baudrate=9600,
        timeout=0.5
        )


    serial_connector = SerialConnector(ser)
    
    serial_read_thread = threading.Thread(target=serial_connector.read_from_serial)
    serial_read_thread.start()

    # listen_socket_thread = threading.Thread(target=serial_connector.listen_socket, args=(serial_connector.throw_me,))
    # listen_socket_thread.start()



    print("Serial opened.")

    while True:
       print ("tick.")
       time.sleep(1)


  



