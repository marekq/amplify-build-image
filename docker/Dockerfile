FROM ubuntu:latest

RUN apt-get update
RUN apt-get install curl openssh-client git -y
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - 
RUN apt-get install -y nodejs
RUN curl https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
RUN npm install --global yarn gatsby-cli amplify-cli