FROM node as react-build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i

COPY . ./
RUN npm run build

FROM leanhtuan/nginx-with-brotli:latest
COPY default.conf /etc/nginx/nginx.conf
COPY --from=react-build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# FROM node

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 5173

# CMD ["npm", "run", "dev"]