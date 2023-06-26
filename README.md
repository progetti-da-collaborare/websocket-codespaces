# WebSocket server on Codespaces

## Reproduction

1. Create a Codespace with this repository
1. Run the server using `npm ci && node server.mjs`
1. Open the link in the console via the Codespace tunnel
1. Open Chrome DevTools to see the client side WS close/error events
1. Wait between 5-10 minutes

Expected: Connection not terminate

Actual: Connection terminates, 1006, wasClean=false
