# Wprowadzenie:

Celem aplikacji jest "Przeanalizowanie platformy SoftwareSupp po kontem zarządzania projektem oraz stworzenie serwisu który umożliwiałby taką synchronizację. Istnieje narzędzie, które znacząco ułatwia tego typu rozwiązania - Zapier(https://zapier.com/), pozwala ono na tworzenie różnego typu triggerów, i działa jako pośrednik pomiędzy dwoma encjami, w Naszym przypadku, pomiędzy platformą SoftwareSupp, oraz narzędziem klienta.
W głównej mierze chodzi aby umożliwić wysłanie informacji o wszelkich zmianach w project board do Zapier (REST API), oraz obsługa tych zapytań w tym toolu tak aby klient miał możliwość podłączenia się".

## Technologie:

-React: 17.0.2,
-Node: 12.16.1,

## Konstrukcja:

Serwer node.js udostępnia jeden endpoint -project board. Celem endpointa jest integracja
z aplikacją Software Supp project board, zapier (Web Hook). Aby zintegrować się, Software Supp,
używamy endpointa logowania, po to aby uzyskać access token. Następnie pobieramy dane przez
endpoint, który umożliwia nam pobranie pozycji z project board. Jako ostatni krok, wysyłamy uzyskane dane do Zapier Web Hook.

## Ogólny flow:

Klient wysyła żądanie do naszej aplikacji Node.js. Następnie aplikacja Node.js pobiera dane z aplikacji Softwaresupp a następnie wysyła te dane do Zapier Web Hook.
Zapier Web Hook zaczyna wykonywanie kroków skonfigurowanych przez użytkownika. Poszczególne kroki takie jak zapis danych do Word i Excel. Na sam koniec pliki zostają edytowane
na dysku google lub są zapisane jako nowe.
W rezultacie po przejściu całego procesu, klient może wejść na dysk google i pobrać sobie pliki wypełnione danymi z aplikacji SoftwareSupp.

## Konfigurowanie środowiska

### Dane do gmaila (dysk google)

email: recruitment.appzapier@gmail.com
hasło: appzapier100

### Link do Zapiera z gotowym flow: 

ogólny: https://zapier.com/shared/c2a75e7577764aefcffe2e687ad56f662c3fa039

do flow: https://zapier.com/app/editor/130640598/nodes/130640598/sample

### Żądanie jakie musi wysłać na serwer Node.js:

url: localhost:80/api/project-board,
method: post,
headers:
Content-Type: application/json
Accept: application/json

body:
{
"username": "kamil.gronek@gmail.com",
"password": "test123456"
}

## Uruchomienie aplikacji:

Po pobraniu pliku do instalacji środowiska node.modules, w terminalu należy wpisać:

```bash
npm install
```

Do uruchomienia aplikacji w terminalu w głównej ścieżce projektu, należy wpisać:

```bash
node server.js
```

## Uwaga:

Po wysłaniu żadania na endpoint project board, w celu sprawdzenia poprawnej integracji ze wszystkimi aplikacjami należy zalogować się na gmaila, wejśc na dysk Google i sprawdzić
zawartość wypełnionych plików:
excel - "recruitment app zapier test excel",
word - "recruitment app zapier test word".
Będą one zawierały dane z Software Supp.
