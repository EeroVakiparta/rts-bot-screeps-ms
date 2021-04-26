# rts-bot-screeps-ms

## JS bot for MMO RTS https://docs.screeps.com/api/

# bot v0.2

Can gather 
- building materials
- upgrade room controller
- builds what it's told to build
- can claim other rooms
- defends well agains 50body attackers
- harvests all hourly energy without overflow
- can gather minerals
- has versatile attacking capabilities 

Major TODOS:

- Refactoring
- Implementing order structure: Instead of every creep figuring out independently what it is doing, there would be an order generator and distributor.
- Much more autonomous code. At the moment needs a lot of babysitting.

---

Update:
All close competition has been eliminated. The major factor is the efficiency of turning energy into control points which in turn allowed stronger army.
![image](https://user-images.githubusercontent.com/41569318/116146116-cdc71f80-a6e6-11eb-8979-a63797ca1ecf.png)

## Starting own server (Ubuntu20.04LTS)

    1 sudo apt update
    2 sudo apt install nodejs
    3 sudo apt install npm
    4 sudo apt install python2
    5 apt install build-essential
    6 sudo apt-get update
    7 sudo apt-get install apt-transport-https ca-certificates curl gnupg lsb-release
    8 curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    9 sudo apt-get install docker-ce docker-ce-cli containerd.io
    10 echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
    $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    11 sudo apt-get update
    12 sudo apt-get install docker-ce docker-ce-cli containerd.io
    13 docker run -d --name screeps-server -v $PWD:/screeps -p 21025:21025 quay.io/ags131/screeps-server
    14 docker run -it --rm -v $PWD:/screeps quay.io/ags131/screeps-server init
    15 docker start screeps-server
