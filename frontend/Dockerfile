# # Stage 1
# FROM node:14 as build-stage

# WORKDIR /douvies-frontend
# COPY package.json .
# RUN npm install
# COPY . .

# # ARG REACT_APP_API_BASE_URL
# # ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

# RUN npm run build

# # Stage 2
# FROM nginx:1.17.0-alpine

# COPY --from=build-stage /douvies-frontend/build /usr/share/nginx/html
# EXPOSE 3000

# CMD nginx -g 'daemon off;'


FROM node:10

WORKDIR /frontend

COPY package.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]