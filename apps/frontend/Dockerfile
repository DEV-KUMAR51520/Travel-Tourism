FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 5173

# Important: Run Vite in "host" mode to expose to your machine
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
