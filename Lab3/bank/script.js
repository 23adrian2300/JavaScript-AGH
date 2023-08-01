const localStorageKey = 'bank-customers';
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

function getCustomers() {
  const customersJSON = window.localStorage.getItem(localStorageKey);
  return JSON.parse(customersJSON) || [];
}

// Funkcja do zapisywania danych w local storage
function saveCustomers(customers) {
  const customersJSON = JSON.stringify(customers);
  window.localStorage.setItem(localStorageKey, customersJSON);
}

// Początkowe dane pobierane z local storage lub inicjalizowane pustą tablicą
let customer = getCustomers();

function interpretujKomende(komenda) {
  const komendaTab = komenda.split(' ');

  switch (komendaTab[0]) {
    case 'załóż':
      if (komendaTab[1] === 'nowe' && komendaTab[2] === 'konto') {
        const nowyKlient = {
          imie: komendaTab[3],
          nazwisko: komendaTab[4],
          konta: [
            {
              rodzaj: komendaTab[5], subkonta: [{ typ: komendaTab[6], saldo: 0 }],
              zdjecie: komendaTab[6]
            }
          ]
        };
        customers.push(nowyKlient);
        console.log(`Dodano nowego klienta: ${komendaTab[3]} ${komendaTab[4]}`);
        saveCustomers(customers); // Zapisujemy dane w local storage
      } else if (komendaTab[1] === 'nowe' && komendaTab[2] === 'subkonto') {
        const klient = customers.find((k) => k.imie === komendaTab[3] && k.nazwisko === komendaTab[4]);
        const konto = klient.konta.find((k) => k.rodzaj === komendaTab[5]);
        if (konto !== undefined) {
          konto.subkonta.push({ typ: komendaTab[6], saldo: 0 });
          console.log(`Dodano nowe subkonto: ${komendaTab[6]} do konta ${komendaTab[5]} klienta ${komendaTab[3]} ${komendaTab[4]}`);
          saveCustomers(customers); // Zapisujemy dane w local storage
        } else {
          console.log(`Nie znaleziono konta ${komendaTab[5]} dla klienta ${komendaTab[3]} ${komendaTab[4]}`);
        }
      }
      break;
    case 'otwórz':
      if (komendaTab[1] === 'nowe' && komendaTab[2] === 'subkonto') {
        const klient = customers.find((k) => k.imie === komendaTab[3] && k.nazwisko === komendaTab[4]);
        const konto = klient.konta.find((k) => k.rodzaj === komendaTab[5]);
        const subkonto = konto.subkonta.find((s) => s.typ === komendaTab[6]);
        if (subkonto !== undefined) {
          console.log(`Subkonto ${komendaTab[6]} już istnieje w ramach konta ${komendaTab[5]} dla klienta ${komendaTab[3]} ${komendaTab[4]}`);
        } else {
          konto.subkonta.push({ typ: komendaTab[6], saldo: 0 });
          console.log(`Otworzono nowe subkonto: ${komendaTab[6]} w ramach konta ${komendaTab[5]} dla klienta ${komendaTab[3]} ${komendaTab[4]}`);
          saveCustomers(customers); // Zapisujemy dane w local storage
        }
      }
      break;
    case 'wyplata':
      const kwota = parseFloat(komendaTab[1]);
      const klient = customers.find((k) => k.imie === komendaTab[2] && k.nazwisko === komendaTab[3]);
      const konto = klient.konta.find((k) => k.rodzaj === komendaTab[4]);
      const subkonto = konto.subkonta.find((s) => s.typ === komendaTab[5]);
      if (subkonto !== undefined) {
        if (subkonto.saldo >= kwota) {
          subkonto.saldo -= kwota;
          console.log(`Wypłacono ${kwota.toFixed(2)} zł z subkonta ${komendaTab[5]} w ramach konta ${komendaTab[4]} dla klienta ${komendaTab[2]} ${komendaTab[3]}`);
          saveCustomers(customers); // Zapisujemy dane w local storage
        } else {
          console.log(`Nie można wypłacić ${kwota.toFixed(2)} zł z subkonta ${komendaTab[5]} w ramach konta ${komendaTab[4]} dla klienta ${komendaTab[2]} ${komendaTab[3]} - brak wystarczających środków`);
        }
      } else {
        console.log(`Nie znaleziono subkonta ${komendaTab[6]} w ramach konta ${komendaTab[4]} dla klienta ${komendaTab[2]} ${komendaTab[3]}`);
      }
      break;

    case 'wplata':
      const kwota1 = parseFloat(komendaTab[1]);
      const klient1 = customers.find((k) => k.imie === komendaTab[2] && k.nazwisko === komendaTab[3]);
      const konto1 = klient1.konta.find((k) => k.rodzaj === komendaTab[4]);
      const subkonto1 = konto1.subkonta.find((s) => s.typ === komendaTab[5]);
      if (subkonto1 !== undefined) {
        subkonto1.saldo += kwota1;
        console.log(`Wpłacono ${kwota1.toFixed(2)} zł na subkonto ${komendaTab[5]} w ramach konta ${komendaTab[4]} dla klienta ${komendaTab[2]} ${komendaTab[3]}`);
        saveCustomers(customers); // Zapisujemy dane w local storage
      } else {
        console.log(`Nie znaleziono subkonta ${komendaTab[5]} w ramach konta ${komendaTab[4]} dla klienta ${komendaTab[2]} ${komendaTab[3]}`);
      }
      break;
    case 'wykaz':
      const klient3 = customers.find(
        (k) => k.imie === komendaTab[1] && k.nazwisko === komendaTab[2]
      );
      klient3.konta.forEach((konto) => {
        console.log(`Konto ${konto.rodzaj}:`);
        konto.subkonta.forEach((subkonto) => {
          console.log(`- ${subkonto.typ}: ${subkonto.saldo} zł`);
        });
        console.log(`zdjecie: ${klient3.zdjecie}`)
      });
      break;
    default:
      console.log('Nieznana komenda: ${komenda}');
      break;
  }
}

// Funkcja wczytująca komendy
function wczytajKomendy() {
  const komendy = document.getElementById('komendy').value.split('\n');
  komendy.forEach((komenda) => {
    interpretujKomende(komenda);
  });
}

document.getElementById('uruchom').addEventListener('click', wczytajKomendy);