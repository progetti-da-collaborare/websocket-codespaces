import { createServer } from 'http';
import { WebSocketServer } from 'ws';

const server = createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.writeHead(200);
    res.end(`
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>WebSocket Test</title>
        </head>
        <body>
            <pre id="log"></pre>
            <script>
                const log = document.getElementById('log')
                const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
                const ws = new WebSocket(protocol + '//' + window.location.host)
                ws.addEventListener('message', message => {
                    log.textContent += message.data + '\\n'
                })
                ws.addEventListener('open', () => {
                    ws.send('Connection opened')
                    setInterval(() => {
                        ws.send('Ping')
                    }, 5_000)
                })
                ws.addEventListener('close', event => {
                    console.log('WebSocket closed unexpectedly:', event)
                })
                ws.addEventListener('error', event => {
                    console.log('WebSocket error:', event)
                })
            </script>
        </body>
        </html>
    `);
});

const ws = new WebSocketServer({ server: server });

ws.addListener('connection', connection => {
    connection.addEventListener('message', message => {
        const response = `Roundtrip via server: '${message.data}' (${new Date()})`;
        console.log(response);
        connection.send(response);
    })
    connection.addEventListener('close', event => {
        console.log('WebSocket closed:', event)
    });
    connection.addEventListener('error', event => {
        console.log('WebSocket error:', event)
    });
})

console.log(`Listening on http://localhost:8080`)
server.listen(8080);
