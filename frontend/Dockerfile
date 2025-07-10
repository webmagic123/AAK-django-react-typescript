FROM node:18-alpine

#set work directory
WORKDIR /app

#copy package files
COPY package*.json ./

#install dependencies
RUN npm ci --only=production

#copy project files
COPY . .

#build the app
RUN npm run build

#install serve to run the app
RUN npm install -g serve

#expose port
EXPOSE 3000

#start the app
CMD ["serve", "-s", "build", "-l", "3000"]
