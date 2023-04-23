#!/usr/bin/python

import sys
import time
import math
import numpy as np

sys.path.append('../lib/python/amd64')
import robot_interface as sdk

def func0():
    cmd.mode = 0    # 0:idle, default stand      1:forced stand     2:walk continuously
    cmd.gaitType = 0
    cmd.speedLevel = 0
    cmd.footRaiseHeight = 0
    cmd.bodyHeight = 0
    cmd.euler = [0, 0, 0]
    cmd.velocity = [0, 0]
    cmd.yawSpeed = 0.0
    cmd.reserve = 0
    cmd.position = [0, 0]
    print(0)

# define the 20 functions
# bowing down
def func1():
     for i in range(10):
        time.sleep(0.1)
        cmd.mode = 1
        cmd.euler = [0, 0.9, 0]
        udp.SetSend(cmd)
        udp.Send()
    
# left head node 
def func3():
    for i in range(10):
        time.sleep(0.1)
        cmd.mode = 1
        cmd.euler = [2, 0, 0]
        udp.SetSend(cmd)
        udp.Send()

# right head node 
def func4():
    for i in range(10):
        time.sleep(0.1)
        cmd.mode = 1
        cmd.euler = [-2, 0, 0]
        udp.SetSend(cmd)
        udp.Send()

# bowing up
def func5():
    for i in range(10):
        time.sleep(0.1)
        cmd.mode = 1
        cmd.euler = [0, -1, 0]
        udp.SetSend(cmd)
        udp.Send()

# open left leg
def func6():
    for i in range(10):
        time.sleep(0.1)
        cmd.mode = 1
        cmd.euler = [0, 0, 0.3]
        udp.SetSend(cmd)
        udp.Send()

    for i in range(3):
        time.sleep(0.1)
        cmd.mode = 2
        cmd.velocity = [0,0] 
        cmd.yawSpeed = -0.15
        cmd.footRaiseHeight = -1
        udp.SetSend(cmd)
        udp.Send()

# open right leg
def func7():
    for i in range(10):
        time.sleep(0.1)
        cmd.mode = 1
        cmd.euler = [0, 0, -0.3]
        udp.SetSend(cmd)
        udp.Send()

    for i in range(3):
        time.sleep(0.1)
        cmd.mode = 2
        cmd.velocity = [0,0] 
        cmd.yawSpeed = -0.15
        cmd.footRaiseHeight = -1
        udp.SetSend(cmd)
        udp.Send()

# # very low with jump
# def func8():
#      for i in range(10):
#         time.sleep(0.1)
#         cmd.mode = 1
#         cmd.bodyHeight = -0.8
#         udp.SetSend(cmd)
#         udp.Send()

# low with jump
def func9():
    for i in range(10):
        time.sleep(0.1)
        cmd.mode = 1
        cmd.bodyHeight = -0.1
        udp.SetSend(cmd)
        udp.Send()

# lay on the ground
def func10():
    for i in range(10):
        time.sleep(0.1)
        cmd.mode = 5
        cmd.gaitType = 1
        cmd.euler = [0, 0, 0]
        cmd.velocity = [0,0]
        udp.SetSend(cmd)
        udp.Send()

    for i in range(10):
        time.sleep(0.1)
        cmd.mode = 6
        cmd.gaitType = 1
        cmd.euler = [0, 0, 0]
        cmd.velocity = [0,0]
        udp.SetSend(cmd)
        udp.Send()

# walking forward and backword
def func11():
    for i in range(10):
        time.sleep(0.1)
        cmd.mode = 2
        cmd.gaitType = 1
        cmd.footRaiseHeight = -1
        cmd.velocity = [0.15,0]
        udp.SetSend(cmd)
        udp.Send()

    for i in range(2):
        time.sleep(0.1)
        cmd.mode = 2
        cmd.gaitType = 2
        cmd.footRaiseHeight = -1
        cmd.velocity = [-0.15,0]
        udp.SetSend(cmd)
        udp.Send()

# walking left and right
def func12():
    for i in range(10):
        time.sleep(0.1)
        cmd.mode = 2
        cmd.gaitType = 2
        cmd.footRaiseHeight = -1
        cmd.velocity = [0, 0.15]
        udp.SetSend(cmd)
        udp.Send()

    for i in range(3):
        time.sleep(0.1)
        cmd.mode = 2
        cmd.gaitType = 2
        cmd.footRaiseHeight = -1
        cmd.velocity = [0, -0.15]
        udp.SetSend(cmd)
        udp.Send()

# funny walking forward and backward
def func13():
    for i in range(10):
        time.sleep(0.1)
        cmd.mode = 2
        cmd.gaitType = 3
        cmd.footRaiseHeight = -1
        cmd.velocity = [0.15,0]
        udp.SetSend(cmd)
        udp.Send()

    for i in range(3):
        time.sleep(0.1)
        cmd.mode = 2
        cmd.gaitType = 1
        cmd.footRaiseHeight = -1
        cmd.velocity = [-0.15,0]
        udp.SetSend(cmd)
        udp.Send()

# funny walking left and right
def func14():
    for i in range(10):
        time.sleep(0.1)
        cmd.mode = 2
        cmd.gaitType = 3
        cmd.footRaiseHeight = 1
        cmd.velocity = [0, 0.2]
        udp.SetSend(cmd)
        udp.Send()

    for i in range(3):
        time.sleep(0.1)
        cmd.mode = 2
        cmd.gaitType = 3
        cmd.footRaiseHeight = 1
        cmd.velocity = [0, -0.2]
        udp.SetSend(cmd)
        udp.Send()

# turn around - left
def func15():
    for i in range(100):
        time.sleep(0.01)
        cmd.mode = 2
        cmd.yawSpeed = 4
        udp.SetSend(cmd)
        udp.Send()
    time.sleep(2)

# turn around - right
def func16():
    for i in range(100):
        time.sleep(0.01)
        cmd.mode = 2
        cmd.yawSpeed = -4
        udp.SetSend(cmd)
        udp.Send()
    time.sleep(2)

# walking in place
def func17():
    for i in range(10):
        time.sleep(0.1)
        cmd.mode = 2
        cmd.velocity = [0,0] 
        cmd.yawSpeed = -0.15
        udp.SetSend(cmd)
        udp.Send()

# # begging
# def func18():
#     for i in range(10):
#         time.sleep(0.1)
#         cmd.mode = 1
#         cmd.euler = [0.7, 0.3, 0]
#         cmd.bodyHeight = -0.3
#         udp.SetSend(cmd)
#         udp.Send()

# threatning
def func19():
    for i in range(10):
        time.sleep(0.1)
        cmd.mode = 1
        cmd.euler = [-0.7, -0.3, 0]
        cmd.bodyHeight = -0.7
        udp.SetSend(cmd)
        udp.Send()

# begging v2 right
def func20():
     for i in range(10):
        time.sleep(0.1)
        cmd.mode = 1
        cmd.bodyHeight = -0.3
        cmd.euler = [0.9, 0, 0]
        udp.SetSend(cmd)
        udp.Send()

# # begging v2 left 
# def func21():
#     for i in range(10):
#         time.sleep(0.1)
#         cmd.mode = 1
#         cmd.bodyHeight = -0.3
#         cmd.euler = [-0.9, 0, 0]
#         udp.SetSend(cmd)
#         udp.Send()

# create a dictionary of functions with IDs
function_dict = {
    0: func0,
    1: func1,
    3: func3,
    4: func4,
    5: func5,
    6: func6,
    7: func7,
    9: func9,
    10: func10,
    11: func11,
    12: func12,
    13: func13,
    14: func14,
    15: func15,
    16: func16,
    17: func17,
    19: func19,
    20: func20
}

if __name__ == '__main__':

    #initialize the parameters
    HIGHLEVEL = 0xee
    LOWLEVEL  = 0xff
    udp = sdk.UDP(LOWLEVEL, 8080, "192.168.123.161", 8082)
    cmd = sdk.HighCmd()
    state = sdk.HighState()
    udp.InitCmdData(cmd)

    func0()

    # get the IDs from command-line arguments
    input_ids = []
    for i in range(1, len(sys.argv)):
        input_ids.append(int(sys.argv[i]))
        
    # execute the functions in the order specified by the user
    for id in input_ids:
        if id in function_dict:
            print(id)
            function_dict[id]()
            time.sleep(0.2)
        func0()
   
