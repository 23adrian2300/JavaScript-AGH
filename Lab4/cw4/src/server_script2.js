import http from "node:http";
import { URL } from "node:url";
import { exec } from "node:child_process";
import fs from "node:fs/promises";
const file = "counter.txt";
/**
 * Handles incoming requests.
 *
 * @param {IncomingMessage} request - Input stream — contains data received from the browser, e.g,. encoded contents of HTML form fields.
 * @param {ServerResponse} response - Output stream — put in it data that you want to send back to the browser.
 * @author Adrian Żerebiec <zerebiec@student.agh.edu.pl>
 */

function handleRequest(request, response) {
    console.log("--------------------------------------");
    console.log(`The relative URL of the current request: ${request.url}`);
    console.log(`Access method: ${request.method}`);
    console.log("--------------------------------------");
    const url = new URL(request.url, `http://${request.headers.host}`);

    switch (url.pathname) {
        case "/":
            if (request.method === "GET") {
                response.write(`
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Server_script2</title>
              </head>
              <body>
                <main>
                  <h1>Server_script2</h1>
                  <form method="GET" action="/submit">
                    <label for="action">Choose</label>
                    <select name="action" id="action">
                      <option value="">—</option>
                      <option value="sync">sync</option>
                      <option value="async">async</option>
                    </select>
                    <br>
                    <label for="command">Enter system command:</label>
                    <input type ="text" name="command" id="command"></input>
                    <br>
                    <input type="submit" value="Submit">
                  </form>
                </main>
              </body>
            </html>
          `);
                response.end();
            }
            break;

        case "/submit":
            if (request.method === "GET") {
                const action = url.searchParams.get("action");
                const command = url.searchParams.get("command");
                if (action === "sync" || action === "async") {
                    const updateCounter = async () => {
                        try {
                            let counter;

                            try {
                                await fs.access(file);
                            } catch (err) {
                                await fs.writeFile(file, "0");
                            }

                            counter = await fs.readFile(file);
                            counter = parseInt(counter, 10) + 1;

                            await fs.writeFile(file, counter.toString());
                            return counter;
                        } catch (err) {
                            console.error(`Error: ${err}`);
                            return -1;
                        }
                    };

                    const count = async () => {
                        const value = await updateCounter();
                        response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                        response.write(
                            `<html><body><p>Liczba uruchomień: ${value}</p></body></html>`
                        );
                        response.end();
                    };

                    if (action === "sync") {
                        count();
                    } else {
                        setTimeout(() => {
                            count();
                        }, 0);
                    }
                } else if (command) {
                    exec(command, (error, stdout, stderr) => {
                        if (error) {
                            console.error(`Error: ${error}`);
                            response.writeHead(500, {
                                "Content-Type": "text/html; charset=utf-8",
                            });
                            response.write(`<html><body><pre>${error}</pre></body></html>`);
                            response.end();
                        }
                        else {
                            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8", });
                            response.write(`<html><body><pre>${stdout}${stderr}</pre></body></html> `);
                            response.end();
                        }
                    });
                }
            }
            break;
        default:
            response.writeHead(501, { "Content-Type": "text/plain; charset=utf-8" });
            response.write("Error 501: Not implemented");
            response.end();
    }
}

const server = http.createServer(handleRequest);
server.listen(8000);
console.log("The server was started on port 8000");
console.log('To stop the server, press "CTRL + C"');