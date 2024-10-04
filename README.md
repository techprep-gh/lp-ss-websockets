# Long Polling - Server-Sent Events (SSE) - WebSockets

## Long Polling 

1. Install dependencies:
    ```shell
    npm install
    ```

2. Run the server: 
    ```shell
    node server.js
    ```

3. Open the HTML page in a browser to start polling: [http://localhost:3000](http://localhost:3000/)

4. Send a message to clients via a POST request to `/update`:
    ```shell
    curl -X POST -H "Content-Type: application/json" -d '{"message": "Hello, client!"}' http://localhost:3000/update
    ```

## Server-Senr Events (SSE)

1. Install dependencies:
    ```shell
    npm install
    ```

2. Run the server: 
    ```shell
    node server.js
    ```

3. Open the HTML page to display a new timestamp every second as it receives events from the server: [http://localhost:3000](http://localhost:3000/)


## WebSockets

1. Install dependencies:
    ```shell
    npm install
    ```

2. Run the server: 
    ```shell
    node server.js
    ```

3. Open the HTML page to display messages from the server and to send messages to the server: [http://localhost:3000](http://localhost:3000/)