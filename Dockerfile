# The FROM instruction sets the Base Image for subsequent instructions.
# Using Nginx as Base Image
FROM node:7-alpine
MAINTAINER Zem Zheng <zemzheng@gmail.com>

# The RUN instruction will execute any commands
# Adding HelloWorld page into Nginx server
ADD /src /src
WORKDIR /src
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm i hexo-cli -g
RUN cnpm install

# The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime
EXPOSE 80

# The CMD instruction provides default execution command for an container
# Start Nginx and keep it from running background
CMD ["hexo", "server" "-p", "80"]
