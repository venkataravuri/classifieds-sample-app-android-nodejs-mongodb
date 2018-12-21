spider-classifieds-db
=====================

Spider Classifieds MongoDB


Run MongoDB Container
sudo docker run -d -p 27017:27017 -p 28017:28017 --name mongodb dockerfile/mongodb:latest mongod --noprealloc --smallfiles --replSet rs0 --rest --httpinterface

# List running docker images
sudo docker ps -a

# Connect to running mongodb contrainer
sudo docker exec -i -t mongodb bash

Stop mongodb container
sudo docker stop mongodb
