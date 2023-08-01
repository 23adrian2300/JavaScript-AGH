const http = require('http');
const url = require('url');
const fs = require('fs');
// Dane klienta
const customers = [
    {
        imie: 'Jan',
        nazwisko: 'Kowalski',
        konta: [
            {
                rodzaj: 'oszczędnościowe',
                subkonta: [
                    {
                        typ: 'standardowe',
                        saldo: 1000
                    }
                ]
            }
        ],
        zdjecie: 'JK.jpg'
    },
    {
        imie: 'Anna',
        nazwisko: 'Nowak',
        konta: [
            {
                rodzaj: 'osobiste',
                subkonta: [
                    {
                        typ: 'standardowe',
                        saldo: 500
                    },
                    {
                        typ: 'premium',
                        saldo: 10000
                    }
                ]
            }
        ],
        zdjecie: 'JK.jpg'
    },
    {
        imie: 'Katarzyna',
        nazwisko: 'Wiśniewska',
        konta: [
            {
                rodzaj: 'biznesowe',
                subkonta: [
                    {
                        typ: 'standardowe',
                        saldo: 20000
                    },
                    {
                        typ: 'VIP',
                        saldo: 50000
                    }
                ]
            },
            {
                rodzaj: 'osobiste',
                subkonta: [
                    {
                        typ: 'premium',
                        saldo: 15000
                    }
                ]
            }
        ],
        zdjecie: 'JK.jpg'
    },
    {
        imie: 'Michał',
        nazwisko: 'Kwiatkowski',
        konta: [
            {
                rodzaj: 'osobiste',
                subkonta: [
                    {
                        typ: 'standardowe',
                        saldo: 800
                    },
                    {
                        typ: 'premium',
                        saldo: 5000
                    }
                ]
            }
        ],
        zdjecie: 'JK.jpg'
    },
    {
        imie: 'Agata',
        nazwisko: 'Lis',
        konta: [
            {
                rodzaj: 'oszczędnościowe',
                subkonta: [
                    {
                        typ: 'standardowe',
                        saldo: 5000
                    }
                ]
            },
            {
                rodzaj: 'osobiste',
                subkonta: [
                    {
                        typ: 'premium',
                        saldo: 10000
                    }
                ]
            }
        ],
        zdjecie: 'JK.jpg'
    }
];

// Funkcja obsługująca żądania
const handleRequest = (req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if (parsedUrl.pathname === '/') {
        if (req.method === 'GET') {
            // Generowanie strony głównej
            const html = `<html lang="pl">

      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
              integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
          <!-- Icons -->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
          <link rel="stylesheet" href="style.css">
          <title>
              Bank Apollo
          </title>
      </head>
      
      <body>
          <div class="p">
              <i class="fa fa-phone"></i>
              Telefon <a href="#">+123456789</a>
              </a>
      
              <i class="bi bi-person-fill"></i>
              Email <a href="#">email@.com</a>
          </div>
          <p>Nazwa klienta: <span id="nazwaKlienta"></span></p>
          <p>Saldo: <span id="saldoKlienta"></span> PLN</p>
          <nav class="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
              <div class="container-fluid">
                  <a class="navbar-brand" href="#">
                      <canvas id="canvas"></canvas>
                  </a>
                  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                      <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="collapsibleNavbar">
                      <ul class="navbar-nav">
                          <li class="nav-item">
                              <a class="nav-link" id="login-link" href="#">Login</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="#">Link</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="#">Link</a>
                          </li>
                          <li class="nav-item dropdown">
                              <a class="nav-link dropdown-toggle" href="#" role="button"
                                  data-bs-toggle="dropdown">Dropdown</a>
                              <ul class="dropdown-menu">
                                  <li><a class="dropdown-item" href="#">Link</a></li>
                                  <li><a class="dropdown-item" href="#">Another link</a></li>
                                  <li><a class="dropdown-item" href="#">A third link</a></li>
                              </ul>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
      
          <div class="container">
              <div class="row">
                  <div class="col-lg-4 col-md-6 col-sm-12">
                      <div id='first' class="card"><img src="assets/bank.jpg" style="width:100%">
                          <h1>Bank Apollo</h1>
                          <p class="title">Lokalizacja</p>
                          <p>ul. Lwowska 45</p>
                          <p> Kraków 21-241</p>
                      </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-12">
                      <div class="card2">
                          <img src="assets/biznes.jpg" style="width:100%">
                          <h1>Klient biznesowy</h1>
                          <p>Prowadzisz firmę?</p>
                          <p><button>Załóż konto firmowe</button></p>
                      </div>
                  </div>
                  <div class="col-lg-4 col-md-12 col-sm-12">
                      <div class="card3">
                          <img class="card-img-top" src="assets/special.jpg" width="600" height="280">
                          <div class="card-body">
                              <h5 class="card-title">Oferta specjalna</h5>
                              <p class="card-text">Jeśli skończyłeś Informatykę na AGH-u, to oferta dla Ciebie</p>
                              <p><button>Przeczytaj więcej</button></p>
                          </div>
                      </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                      <div class="card4"><img src="assets/skarbonka.jpg" height="220" style="width:100%">
                          <h1>Lokata</h1>
                          <p>Bardzo opłacalna oferta</p>
                      </div>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-6 col-6">
                      <div class="card5"><img src="assets/money.jpg" style="width:100%">
                          <h1>Kredyt</h1>
                          <p class="title">Niski procent</p>
                          <button>Sprawdź warunki już teraz</button>
                      </div>
                  </div>
              </div>
          </div>
          <form action="/wplata" method="get">
          <label for="kwota">Kwota:</label>
          <input type="number" id="kwota" name="kwota" required>
          <label for="rodzajKonta">Rodzaj konta:</label>
          <select id="rodzajKonta" name="rodzajKonta">
            <option value="osobiste">Konto osobiste</option>
            <option value="biznesowe">Konto biznesowe</option>
          </select>
          <label for="rodzajSubkonta">Rodzaj subkonta:</label>
          <select id="rodzajSubkonta" name="rodzajSubkonta">
            <option value="oszczednosciowe">Konto oszczędnościowe</option>
            <option value="rozliczeniowe">Konto rozliczeniowe</option>
          </select>
          <button type="submit">Wpłata</button>
        </form>
        <form action="/wyplata" method="get">
          <label for="kwota">Kwota:</label>
          <input type="number" id="kwota" name="kwota" required>
          <label for="rodzajKonta">Rodzaj konta:</label>
          <select id="rodzajKonta" name="rodzajKonta">
            <option value="osobiste">Konto osobiste</option>
            <option value="biznesowe">Konto biznesowe</option>
          </select>
          <label for="rodzajSubkonta">Rodzaj subkonta:</label>
          <select id="rodzajSubkonta" name="rodzajSubkonta">
            <option value="oszczednosciowe">Konto oszczędnościowe</option>
            <option value="rozliczeniowe">Konto rozliczeniowe</option>
          </select>
          <button type="submit">Wypłata</button>
        </form>
            <form class="login-form">
              <label for="username">Username:</label>
              <input type="text" id="username" name="username"><br>
      
              <label for="password">Password:</label>
              <input type="password" id="password" name="password"><br>
      
              <input type="submit" value="Login">
            </form>
      
          <script>
              const nazwaKlientaElement = document.getElementById('nazwaKlienta');
              const saldoKlientaElement = document.getElementById('saldoKlienta');
            
              // Funkcja do pobierania danych klienta
              const pobierzDaneKlienta = () => {
                // Wykonaj żądanie GET do serwera
                fetch('/')
                  .then(response => response.text())
                  .then(html => {
                    // Parsowanie odpowiedzi HTML, aby pobrać dane klienta
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const nazwaKlienta = doc.querySelector('#nazwaKlienta').textContent;
                    const saldoKlienta = doc.querySelector('#saldoKlienta').textContent;
            
                    // Aktualizuj elementy HTML danymi klienta
                    nazwaKlientaElement.textContent = nazwaKlienta;
                    saldoKlientaElement.textContent = saldoKlienta;
                  })
                  .catch(error => {
                    console.error('Błąd podczas pobierania danych klienta:', error);
                  });
              };
            
              // Wywołaj funkcję pobierania danych klienta na starcie
              pobierzDaneKlienta();
            </script>
      
          <nav class="navbar2 navbar-inverse fixed-bottom">
              <div class="container-fluid">
                  <div class="navbar-header">
                      <a class="navbar-brand" href="#">Bank Apollo</a>
                  </div>
              </div>
          </nav>
          <script src="script.js"></script>
          <!-- Umieść tutaj treść elementu 'body' z zadania 1 -->
          <!-- Put here the contents of the 'body' element from exercise 1 -->
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"
              integrity="sha384-w76AqPfDkMBDXo30jS1Sgez6pr3x5MlQ1ZAGC+nuZB+EYdgRZgiwxhTBTkF7CXvN"
              crossorigin="anonymous"></script>
          <script src="script2.js"></script>
          <script src="script3.js"></script>
      </body>
      
      </html>`;

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(html);
            res.end();
        }
        else {
            // Obsługa żądania innego niż GET
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.write('Metoda nieobsługiwana');
            res.end();
        }
    } else if (parsedUrl.pathname === '/style.css') {
        if (req.method === 'GET') {
            fs.readFile('style.css', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.write('Błąd odczytu pliku CSS');
                    res.end();
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                }
            });
        } else {
            // Obsługa żądania innego niż GET
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.write('Metoda nieobsługiwana');
            res.end();
        }
    } else if (parsedUrl.pathname.startsWith('/assets/')) {
        if (req.method === 'GET') {
            const assetPath = parsedUrl.pathname.slice(1); // Usunięcie początkowego znaku '/'
            fs.readFile(assetPath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.write('Błąd odczytu pliku assetu');
                    res.end();
                } else {
                    const extension = assetPath.split('.').pop();
                    const contentType = getContentType(extension);
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.write(data);
                    res.end();
                }
            });
        } else {
            // Obsługa żądania innego niż GET
            res.writeHead(405, { 'Content-Type': 'text/plain' });
            res.write('Metoda nieobsługiwana');
            res.end();
        }
    } else if (parsedUrl.pathname === '/wplata' && req.method === 'GET') {
        const { kwota, rodzajKonta, rodzajSubkonta } = parsedUrl.query;

        // Wykonaj operację wpłaty
        const kwotaWplaty = parseFloat(kwota);
        if (!isNaN(kwotaWplaty) && kwotaWplaty > 0) {
            // Aktualizuj saldo klienta
            customers.saldo += kwotaWplaty;

            // Zapisz informacje o operacji do pliku
            const operacja = {
                typ: 'Wpłata',
                kwota: kwotaWplaty,
                rodzajKonta,
                rodzajSubkonta
            };
            fs.appendFileSync('operacje.txt', JSON.stringify(operacja) + '\n');

            // Przekierowanie na stronę główną
            res.writeHead(302, { Location: '/' });
            res.end();
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.write('Nieprawidłowa kwota wpłaty');
            res.end();
        }
    } else if (parsedUrl.pathname === '/wyplata' && req.method === 'GET') {
        const { kwota, rodzajKonta, rodzajSubkonta } = parsedUrl.query;

        // Wykonaj operację wypłaty
        const kwotaWyplaty = parseFloat(kwota);
        if (!isNaN(kwotaWyplaty) && kwotaWyplaty > 0 && kwotaWyplaty <= customers.saldo) {
            // Aktualizuj saldo klienta
            customers.saldo -= kwotaWyplaty;

            // Zapisz informacje o operacji do pliku
            const operacja = {
                typ: 'Wypłata',
                kwota: kwotaWyplaty,
                rodzajKonta,
                rodzajSubkonta
            };
            fs.appendFileSync('operacje.txt', JSON.stringify(operacja) + '\n');

            // Przekierowanie na stronę główną
            res.writeHead(302, { Location: '/' });
            res.end();
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.write('Nieprawidłowa kwota wypłaty');
            res.end();
        }
    }
    else if (parsedUrl.pathname === '/login' && req.method === 'POST') {
        // Kod obsługujący żądanie logowania
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const { username, password } = JSON.parse(body);

            // Sprawdzenie poprawności danych logowania
            const customers = klienci.find(customers => customers.nazwa === username);
            if (customers && password === 'password') {
                // Pomyślne uwierzytelnienie
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write('Zalogowano');
                res.end();
            } else {
                // Nieprawidłowe dane logowania
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.write('Błędne dane logowania');
                res.end();
            }
        });
    } else {
        // Obsługa innych żądań
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Nie znaleziono strony');
        res.end();
    }
};

// Funkcja pomocnicza do określania typu zawartości na podstawie rozszerzenia pliku
const getContentType = (extension) => {
    switch (extension) {
        case 'html':
            return 'text/html';
        case 'css':
            return 'text/css';
        case 'js':
            return 'application/javascript';
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        default:
            return 'application/octet-stream';
    }
};

// Tworzenie serwera HTTP
const server = http.createServer(handleRequest);

// Nasłuchiwanie na określonym porcie
const port = 3000;
server.listen(port, () => {
    console.log(`Serwer nasłuchuje na porcie ${port}`);
});