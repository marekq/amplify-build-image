FROM ubuntu:latest

# Install OS packages
RUN apt-get update
RUN apt-get install curl openssh-client git -y

# Install Node.js
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install nodejs -y