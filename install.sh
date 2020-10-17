# Install the required dependencies
sudo apt-get install -y python3-pip python3-dev
sudo pip3 install -r ./requirements.txt
sudo npm install

# Create the service
sudo cp princepicante.service /etc/systemd/system/princepicante.service
sudo systemctl enable princepicante.service
sudo systemctl start princepicante.service
