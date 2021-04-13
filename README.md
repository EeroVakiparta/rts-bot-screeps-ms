# rts-bot-screeps-ms

## JS bot for MMO RTS https://docs.screeps.com/api/

# bot v0.1

Can gather building materials, upgrade room controller, has potential to build something

---

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
