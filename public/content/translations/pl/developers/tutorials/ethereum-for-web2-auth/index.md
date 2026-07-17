---
title: "Używanie Ethereum do uwierzytelniania w Web2"
description: "Po przeczytaniu tego samouczka programista będzie w stanie zintegrować logowanie Ethereum (web3) z logowaniem SAML, standardem używanym w Web2 do zapewnienia jednokrotnego logowania (SSO) i innych powiązanych usług. Pozwala to na uwierzytelnianie dostępu do zasobów Web2 za pomocą podpisów Ethereum, przy czym atrybuty użytkownika pochodzą z poświadczeń."
author: Ori Pomerantz
tags:
  - Web2
  - uwierzytelnianie
  - eas
skill: beginner
breadcrumb: Ethereum do uwierzytelniania w Web2
lang: pl
published: 2025-04-30
---

## Wprowadzenie {#introduction}

[SAML](https://www.onelogin.com/learn/saml) to standard używany w Web2, który pozwala [dostawcy tożsamości (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) na dostarczanie informacji o użytkowniku dla [dostawców usług (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML).

W tym samouczku dowiesz się, jak zintegrować podpisy Ethereum z SAML, aby umożliwić użytkownikom korzystanie z ich portfeli Ethereum do uwierzytelniania się w usługach Web2, które nie obsługują jeszcze natywnie Ethereum.

Zauważ, że ten samouczek jest napisany dla dwóch różnych grup odbiorców:

- Osób ze świata Ethereum, które rozumieją Ethereum i muszą nauczyć się SAML
- Osób ze świata Web2, które rozumieją SAML i uwierzytelnianie Web2, a muszą nauczyć się Ethereum

W rezultacie będzie on zawierał wiele materiałów wprowadzających, które możesz już znać. Śmiało możesz je pominąć.

### SAML dla osób ze świata Ethereum {#saml-for-ethereum-people}

SAML to scentralizowany protokół. Dostawca usług (SP) akceptuje asercje (takie jak „to jest mój użytkownik Jan, powinien mieć uprawnienia do robienia A, B i C”) od dostawcy tożsamości (IdP) tylko wtedy, gdy ma z nim wcześniej nawiązaną relację zaufania lub z [urzędem certyfikacji](https://www.ssl.com/article/what-is-a-certificate-authority-ca/), który podpisał certyfikat tego IdP.

Na przykład SP może być biurem podróży świadczącym usługi turystyczne dla firm, a IdP może być wewnętrzną stroną internetową firmy. Kiedy pracownicy muszą zarezerwować podróż służbową, biuro podróży odsyła ich do uwierzytelnienia przez firmę, zanim pozwoli im na faktyczną rezerwację podróży.

![Step by step SAML process](./fig-01-saml.png)

W ten sposób trzy podmioty: przeglądarka, SP i IdP, negocjują dostęp. SP nie musi z góry wiedzieć niczego o użytkowniku korzystającym z przeglądarki, musi jedynie ufać IdP.

### Ethereum dla osób ze świata SAML {#ethereum-for-saml-people}

Ethereum to zdecentralizowany system. 

![Ethereum logon](./fig-02-eth-logon.png)

Użytkownicy posiadają klucz prywatny (zazwyczaj przechowywany w rozszerzeniu przeglądarki). Z klucza prywatnego można wyprowadzić klucz publiczny, a z niego 20-bajtowy adres. Kiedy użytkownicy muszą zalogować się do systemu, są proszeni o podpisanie wiadomości z wartością nonce (wartością jednorazowego użytku). Serwer może zweryfikować, czy podpis został utworzony przez ten adres.

![Getting extra data from attestations](./fig-03-eas-data.png)

Podpis weryfikuje jedynie adres Ethereum. Aby uzyskać inne atrybuty użytkownika, zazwyczaj używa się [poświadczeń](https://attest.org/). Poświadczenie zazwyczaj posiada następujące pola:

- **Attestor** (poświadczający), adres, który złożył poświadczenie
- **Recipient** (odbiorca), adres, którego dotyczy poświadczenie
- **Data** (dane), poświadczane dane, takie jak imię, uprawnienia itp.
- **Schema** (schemat), identyfikator schematu używanego do interpretacji danych.

Ze względu na zdecentralizowany charakter Ethereum, każdy użytkownik może składać poświadczenia. Tożsamość poświadczającego jest ważna, aby określić, które poświadczenia uważamy za wiarygodne.

## Konfiguracja {#setup}

Pierwszym krokiem jest nawiązanie komunikacji między SAML SP a SAML IdP.

1. Pobierz oprogramowanie. Przykładowe oprogramowanie do tego artykułu znajduje się [na GitHubie](https://github.com/qbzzt/250420-saml-ethereum). Różne etapy są przechowywane w różnych gałęziach, dla tego etapu potrzebujesz `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Utwórz klucze z certyfikatami z podpisem własnym (self-signed). Oznacza to, że klucz jest swoim własnym urzędem certyfikacji i musi zostać zaimportowany ręcznie do dostawcy usług. Zobacz [dokumentację OpenSSL](https://docs.openssl.org/master/man1/openssl-req/), aby uzyskać więcej informacji. 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. Uruchom serwery (zarówno SP, jak i IdP)

    ```sh
    pnpm start
    ```

4. Przejdź do SP pod adresem URL [http://localhost:3000/](http://localhost:3000/) i kliknij przycisk, aby zostać przekierowanym do IdP (port 3001).

5. Podaj IdP swój adres e-mail i kliknij **Login to the service provider** (Zaloguj się do dostawcy usług). Zobaczysz, że zostaniesz przekierowany z powrotem do dostawcy usług (port 3000) i że rozpozna Cię on po Twoim adresie e-mail.

### Szczegółowe wyjaśnienie {#detailed-explanation}

Oto co się dzieje, krok po kroku:

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

Ten plik zawiera konfigurację zarówno dla dostawcy tożsamości, jak i dostawcy usług. Zazwyczaj te dwa podmioty byłyby różnymi jednostkami, ale tutaj możemy współdzielić kod dla uproszczenia.

```typescript
const fs = await import("fs")

const protocol="http"
```

Na razie tylko testujemy, więc użycie HTTP jest w porządku.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Odczytaj klucze publiczne, które są zazwyczaj dostępne dla obu komponentów (i albo zaufane bezpośrednio, albo podpisane przez zaufany urząd certyfikacji).

```typescript
export const spPort = 3000
export const spHostname = "localhost"
export const spDir = "sp"

export const idpPort = 3001
export const idpHostname = "localhost"
export const idpDir = "idp"

export const spUrl = `${protocol}://${spHostname}:${spPort}/${spDir}`
export const idpUrl = `${protocol}://${idpHostname}:${idpPort}/${idpDir}`
```

Adresy URL dla obu komponentów.

```typescript
export const spPublicData = {
```

Dane publiczne dla dostawcy usług.

```typescript
    entityID: `${spUrl}/metadata`,
```

Zgodnie z konwencją, w SAML `entityID` to adres URL, pod którym dostępne są metadane podmiotu. Te metadane odpowiadają tutejszym danym publicznym, z tą różnicą, że są w formacie XML.

```typescript
    wantAssertionsSigned: true,
    authnRequestsSigned: false,
    signingCert: spCert,
    allowCreate: true,
    assertionConsumerService: [{
        Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        Location: `${spUrl}/assertion`,
    }]
  }
```

Najważniejszą definicją dla naszych celów jest `assertionConsumerServer`. Oznacza to, że aby przekazać asercję (na przykład „użytkownik, który wysyła ci te informacje, to somebody@example.com”) do dostawcy usług, musimy użyć [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) na adres URL `http://localhost:3000/sp/assertion`.

```typescript
export const idpPublicData = {
    entityID: `${idpUrl}/metadata`,
    signingCert: idpCert,
    wantAuthnRequestsSigned: false,
    singleSignOnService: [{
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
      Location: `${idpUrl}/login`
    }],
    singleLogoutService: [{
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
      Location: `${idpUrl}/logout`
    }],
  }
```

Dane publiczne dla dostawcy tożsamości są podobne. Określają one, że aby zalogować użytkownika, wysyłasz żądanie POST na `http://localhost:3001/idp/login`, a aby wylogować użytkownika, wysyłasz żądanie POST na `http://localhost:3001/idp/logout`.

#### src/sp.mts {#srcspmts}

To jest kod implementujący dostawcę usług.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

Używamy biblioteki [`samlify`](https://www.npmjs.com/package/samlify) do implementacji SAML.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

Biblioteka `samlify` oczekuje pakietu sprawdzającego, czy XML jest poprawny, podpisany oczekiwanym kluczem publicznym itp. W tym celu używamy [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint).

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`Router`](https://expressjs.com/en/5x/api.html#router) w [`express`](https://expressjs.com/) to „mini strona internetowa”, którą można zamontować wewnątrz innej strony. W tym przypadku używamy go do zgrupowania wszystkich definicji dostawcy usług.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

Własna reprezentacja dostawcy usług to wszystkie dane publiczne oraz klucz prywatny, którego używa do podpisywania informacji.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Dane publiczne zawierają wszystko, co dostawca usług musi wiedzieć o dostawcy tożsamości.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Aby umożliwić interoperacyjność z innymi komponentami SAML, dostawcy usług i tożsamości powinni udostępniać swoje dane publiczne (zwane metadanymi) w formacie XML pod adresem `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

To jest strona, do której przeglądarka uzyskuje dostęp w celu identyfikacji. Asercja zawiera identyfikator użytkownika (tutaj używamy adresu e-mail) i może zawierać dodatkowe atrybuty. Jest to handler dla kroku 7 na powyższym diagramie sekwencji.

```typescript
  async (req, res) => {
    // console.log(`Odpowiedź SAML:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Możesz użyć zakomentowanego polecenia, aby zobaczyć dane XML dostarczone w asercji. Są one [zakodowane w base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Przeanalizuj żądanie logowania z serwera tożsamości.

```typescript
      res.send(`
        <html>
          <body>
            <h2>Hello ${loginResponse.extract.nameID}</h2>
          </body>
        </html>
      `)
      res.send();
```

Wyślij odpowiedź HTML, tylko po to, aby pokazać użytkownikowi, że otrzymaliśmy logowanie.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Poinformuj użytkownika w przypadku niepowodzenia.

```typescript
spRouter.get('/login',
```

Utwórz żądanie logowania, gdy przeglądarka próbuje pobrać tę stronę. Jest to handler dla kroku 1 na powyższym diagramie sekwencji.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Pobierz informacje, aby wysłać żądanie logowania.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Ta strona automatycznie przesyła formularz (patrz poniżej). W ten sposób użytkownik nie musi nic robić, aby zostać przekierowanym. Jest to krok 2 na powyższym diagramie sekwencji.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Wyślij żądanie POST na `loginRequest.entityEndpoint` (adres URL punktu końcowego dostawcy tożsamości).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Nazwa pola wejściowego to `loginRequest.type` (`SAMLRequest`). Zawartość tego pola to `loginRequest.context`, co ponownie jest kodem XML zakodowanym w base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[To oprogramowanie pośredniczące (middleware)](https://expressjs.com/en/5x/api.html#express.urlencoded) odczytuje treść [żądania HTTP](https://www.tutorialspoint.com/http/http_requests.htm). Domyślnie express je ignoruje, ponieważ większość żądań tego nie wymaga. My tego potrzebujemy, ponieważ POST używa treści (body).

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Zamontuj router w katalogu dostawcy usług (`/sp`).

```typescript
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <button onClick="document.location.href='${config.spUrl}/login'">
           Click here to log on
        </button>
      </body>
    </html>
  `)
})
```

Jeśli przeglądarka próbuje pobrać katalog główny, podaj jej link do strony logowania.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Nasłuchuj na `spPort` za pomocą tej aplikacji express.

#### src/idp.mts {#srcidpmts}

To jest dostawca tożsamości. Jest bardzo podobny do dostawcy usług, poniższe wyjaśnienia dotyczą części, które się różnią.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Zachowaj atrybuty
    attributeNamePrefix: "@_", // Prefiks dla atrybutów
  }
)
```

Musimy odczytać i zrozumieć żądanie XML, które otrzymujemy od dostawcy usług.

```typescript
const getLoginPage = requestId => `
```

Ta funkcja tworzy stronę z automatycznie przesyłanym formularzem, która jest zwracana w kroku 4 na powyższym diagramie sekwencji.

```typescript
<html>
  <head>
    <title>Login page</title>
  </head>
  <body>
    <h2>Login page</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      Email address: <input name="email" />
      <br />
      <button type="Submit">
        Login to the service provider
      </button>
```

Są dwa pola, które wysyłamy do dostawcy usług:

1. `requestId`, na które odpowiadamy.
2. Identyfikator użytkownika (na razie używamy adresu e-mail podanego przez użytkownika).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Jest to handler dla kroku 5 na powyższym diagramie sekwencji. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) tworzy odpowiedź logowania. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Odbiorcą (audience) jest dostawca usług.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Informacje wyodrębnione z żądania. Jedynym parametrem, na którym nam zależy w żądaniu, jest requestId, który pozwala dostawcy usług dopasować żądania do ich odpowiedzi.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Zapewnij podpisywanie
```

Potrzebujemy `signingKey`, aby mieć dane do podpisania odpowiedzi. Dostawca usług nie ufa niepodpisanym żądaniom.

```typescript
    },
    "post",
    {
      email: req.body.email
```

To jest pole z informacjami o użytkowniku, które odsyłamy do dostawcy usług.

```typescript      
    }
  );

  res.send(`
    <html>
      <body>
        <script>
          window.onload = function () { document.forms[0].submit(); }
        </script>
        
        <form method="post" action="${loginResponse.entityEndpoint}">
          <input type="hidden" name="${loginResponse.type}" value="${loginResponse.context}" />
        </form>
      </body>
    </html>
  `)
})
```

Ponownie użyj automatycznie przesyłanego formularza. Jest to krok 6 na powyższym diagramie sekwencji.

```typescript

// Punkt końcowy IdP dla żądań logowania
idpRouter.post(`/login`,
```

To jest punkt końcowy, który odbiera żądanie logowania od dostawcy usług. Jest to handler dla kroku 3 na powyższym diagramie sekwencji.

```typescript
  async (req, res) => {
    try {
      // Obejście, ponieważ nie udało mi się uruchomić parseLoginRequest.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Powinniśmy móc użyć [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) do odczytania identyfikatora żądania uwierzytelnienia. Jednak nie udało mi się tego uruchomić i nie było warto poświęcać na to dużo czasu, więc po prostu używam [parsera XML ogólnego przeznaczenia](https://www.npmjs.com/package/fast-xml-parser). Informacją, której potrzebujemy, jest atrybut `ID` wewnątrz tagu `<samlp:AuthnRequest>`, który znajduje się na najwyższym poziomie XML.

## Używanie podpisów Ethereum {#using-ethereum-signatures}

Teraz, gdy możemy wysłać tożsamość użytkownika do dostawcy usług, następnym krokiem jest uzyskanie tożsamości użytkownika w zaufany sposób. Viem pozwala nam po prostu zapytać portfel o adres użytkownika, ale oznacza to zapytanie przeglądarki o te informacje. Nie kontrolujemy przeglądarki, więc nie możemy automatycznie ufać odpowiedzi, którą od niej otrzymujemy.

Zamiast tego IdP wyśle przeglądarce ciąg znaków do podpisania. Jeśli portfel w przeglądarce podpisze ten ciąg, oznacza to, że naprawdę jest to ten adres (to znaczy, że zna klucz prywatny odpowiadający temu adresowi).

Aby zobaczyć to w akcji, zatrzymaj istniejące IdP i SP i uruchom te polecenia:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Następnie przejdź [do SP](http://localhost:3000) i postępuj zgodnie ze wskazówkami.

Zauważ, że w tym momencie nie wiemy, jak uzyskać adres e-mail z adresu Ethereum, więc zamiast tego zgłaszamy `<ethereum address>@bad.email.address` do SP.

### Szczegółowe wyjaśnienie {#detailed-explanation-2}

Zmiany znajdują się w krokach 4-5 na poprzednim diagramie.

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

Jedynym plikiem, który zmieniliśmy, jest `idp.mts`. Oto zmienione części.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Potrzebujemy tych dwóch dodatkowych bibliotek. Używamy [`uuid`](https://www.npmjs.com/package/uuid) do utworzenia wartości [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Sama wartość nie ma znaczenia, liczy się tylko fakt, że jest używana tylko raz.

Biblioteka [`viem`](https://viem.sh/) pozwala nam korzystać z definicji Ethereum. Tutaj potrzebujemy jej, aby zweryfikować, czy podpis jest rzeczywiście ważny.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

Portfel prosi użytkownika o pozwolenie na podpisanie wiadomości. Wiadomość, która jest tylko wartością nonce, mogłaby zdezorientować użytkowników, więc dołączamy ten monit.

```typescript
// Przechowuj tutaj requestIDs
let nonces = {}
```

Potrzebujemy informacji o żądaniu, aby móc na nie odpowiedzieć. Moglibyśmy wysłać je z żądaniem (krok 4) i otrzymać z powrotem (krok 5). Jednak nie możemy ufać informacjom, które otrzymujemy z przeglądarki, która jest pod kontrolą potencjalnie wrogiego użytkownika. Lepiej więc przechowywać je tutaj, z wartością nonce jako kluczem.

Zauważ, że robimy to tutaj jako zmienną dla uproszczenia. Ma to jednak kilka wad:

- Jesteśmy podatni na atak typu odmowa usługi (DoS). Złośliwy użytkownik mógłby próbować zalogować się wielokrotnie, zapełniając naszą pamięć.
- Jeśli proces IdP musi zostać zrestartowany, tracimy istniejące wartości.
- Nie możemy równoważyć obciążenia (load balance) między wieloma procesami, ponieważ każdy z nich miałby własną zmienną.

W systemie produkcyjnym użylibyśmy bazy danych i zaimplementowali jakiś mechanizm wygasania.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Utwórz wartość nonce i zapisz `requestId` do wykorzystania w przyszłości.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

Ten kod JavaScript jest wykonywany automatycznie po załadowaniu strony.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

Potrzebujemy kilku funkcji z `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

Możemy działać tylko wtedy, gdy w przeglądarce znajduje się portfel.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Zażądaj listy kont z portfela (`window.ethereum`). Zakładamy, że jest co najmniej jedno, i przechowujemy tylko pierwsze. 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Utwórz [klienta portfela](https://viem.sh/docs/clients/wallet), aby wchodzić w interakcje z portfelem w przeglądarce.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Poproś użytkownika o podpisanie wiadomości. Ponieważ cały ten kod HTML znajduje się w [ciągu szablonu (template string)](https://viem.sh/docs/clients/wallet), możemy użyć zmiennych zdefiniowanych w procesie idp. Jest to krok 4.5 na diagramie sekwencji.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Przekieruj do `/idp/signature/<nonce>/<address>/<signature>`. Jest to krok 5 na diagramie sekwencji.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

Podpis jest odsyłany przez przeglądarkę, która jest potencjalnie złośliwa (nic nie stoi na przeszkodzie, aby po prostu otworzyć `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` w przeglądarce). Dlatego ważne jest, aby zweryfikować, czy proces IdP poprawnie obsługuje nieprawidłowe podpisy.

```typescript
    </script>
  </head>
  <body>
    <h2>Please sign</h2>
    <button onClick="window.goodSignature()">
      Submit a good (valid) signature
    </button>
    <br/>
    <button onClick="window.badSignature()">
      Submit a bad (invalid) signature
    </button>
  </body>
</html>  
`
}
```

Reszta to po prostu standardowy HTML.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

Jest to handler dla kroku 5 na diagramie sekwencji.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Pobierz identyfikator żądania i usuń wartość nonce z `nonces`, aby upewnić się, że nie można jej użyć ponownie.

```typescript
  try {
```

Ponieważ istnieje tak wiele sposobów, w jakie podpis może być nieważny, opakowujemy to w blok `try ... catch`, aby przechwycić wszelkie zgłoszone błędy.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Użyj [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage), aby zaimplementować krok 5.5 na diagramie sekwencji.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

Reszta handlera jest równoważna temu, co zrobiliśmy wcześniej w handlerze `/loginSubmitted`, z wyjątkiem jednej małej zmiany.

```typescript
  const loginResponse = await idp.createLoginResponse(
      .
      .
      .
    {
      email: req.params.account + "@bad.email.address"
    }
  );
```

Nie mamy rzeczywistego adresu e-mail (uzyskamy go w następnej sekcji), więc na razie zwracamy adres Ethereum i wyraźnie oznaczamy go jako niebędący adresem e-mail.


```typescript
// Punkt końcowy IdP dla żądań logowania
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Obejście, ponieważ nie udało mi się uruchomić parseLoginRequest.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getSignaturePage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Zamiast `getLoginPage`, użyj teraz `getSignaturePage` w handlerze kroku 3.

## Pobieranie adresu e-mail {#getting-the-email-address}

Następnym krokiem jest uzyskanie adresu e-mail, identyfikatora żądanego przez dostawcę usług. Aby to zrobić, używamy [Ethereum Attestation Service (EAS)](https://attest.org/).

Najprostszym sposobem na uzyskanie poświadczeń jest użycie [API GraphQL](https://docs.attest.org/docs/developer-tools/api). Używamy tego zapytania:

```
query GetAttestationsByRecipient {
  attestations(
    where: { 
      recipient: { equals: "${getAddress(ethAddr)}" }
      schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
    }
    take: 1
  ) { 
    data
    id
    attester
  }
}
```

Ten [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) zawiera tylko adres e-mail. To zapytanie prosi o poświadczenia tego schematu. Podmiot poświadczenia nazywa się `recipient`. Jest to zawsze adres Ethereum.

Ostrzeżenie: Sposób, w jaki uzyskujemy tutaj poświadczenia, ma dwa problemy z bezpieczeństwem.

- Odwołujemy się do punktu końcowego API, `https://optimism.easscan.org/graphql`, który jest scentralizowanym komponentem. Możemy pobrać atrybut `id`, a następnie wykonać wyszukiwanie onchain, aby zweryfikować, czy poświadczenie jest prawdziwe, ale punkt końcowy API nadal może cenzurować poświadczenia, nie informując nas o nich. 

  Ten problem nie jest niemożliwy do rozwiązania, moglibyśmy uruchomić własny punkt końcowy GraphQL i pobierać poświadczenia z logów łańcucha, ale jest to przesada dla naszych celów.

- Nie sprawdzamy tożsamości poświadczającego. Każdy może podać nam fałszywe informacje. W rzeczywistej implementacji mielibyśmy zestaw zaufanych poświadczających i bralibyśmy pod uwagę tylko ich poświadczenia.

Aby zobaczyć to w akcji, zatrzymaj istniejące IdP i SP i uruchom te polecenia:

```sh
git checkout email-address
pnpm install
pnpm start
```

Następnie podaj swój adres e-mail. Masz na to dwa sposoby:

- Zaimportuj portfel za pomocą klucza prywatnego i użyj testowego klucza prywatnego `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Dodaj poświadczenie dla własnego adresu e-mail:

  1. Przejdź do [schematu w eksploratorze poświadczeń](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Kliknij **Attest with Schema** (Poświadcz za pomocą schematu).

  3. Wprowadź swój adres Ethereum jako odbiorcę (recipient), swój adres e-mail jako email address i wybierz **Onchain**. Następnie kliknij **Make Attestation** (Utwórz poświadczenie).

  4. Zatwierdź transakcję w swoim portfelu. Będziesz potrzebować trochę ETH na [blockchainie Optimism](https://app.optimism.io/bridge/deposit), aby zapłacić za gaz.

Tak czy inaczej, po wykonaniu tych czynności przejdź do [http://localhost:3000](http://localhost:3000) i postępuj zgodnie ze wskazówkami. Jeśli zaimportowałeś testowy klucz prywatny, otrzymany e-mail to `test_addr_0@example.com`. Jeśli użyłeś własnego adresu, powinno to być to, co poświadczyłeś.

### Szczegółowe wyjaśnienie {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

Nowe kroki to komunikacja GraphQL, kroki 5.6 i 5.7.

Ponownie, oto zmienione części `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Zaimportuj potrzebne nam biblioteki.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Istnieje [oddzielny punkt końcowy dla każdego blockchaina](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Utwórz nowego klienta `GraphQLClient`, którego możemy użyć do odpytywania punktu końcowego.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL daje nam tylko nieprzezroczysty obiekt danych z bajtami. Aby go zrozumieć, potrzebujemy schematu. 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Funkcja do uzyskania adresu e-mail z adresu Ethereum.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

To jest zapytanie GraphQL.

```typescript
      attestations(
```

Szukamy poświadczeń.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Poświadczenia, których szukamy, to te w naszym schemacie, gdzie odbiorcą jest `getAddress(ethAddr)`. Funkcja [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) upewnia się, że nasz adres ma poprawną [sumę kontrolną (checksum)](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md). Jest to konieczne, ponieważ w GraphQL wielkość liter ma znaczenie. „0xBAD060A7”, „0xBad060A7” i „0xbad060a7” to różne wartości.

```typescript
        take: 1
```

Niezależnie od tego, ile poświadczeń znajdziemy, chcemy tylko pierwsze z nich.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Pola, które chcemy otrzymać.

- `attester`: Adres, który przesłał poświadczenie. Zazwyczaj służy to do podjęcia decyzji, czy ufać poświadczeniu, czy nie.
- `id`: Identyfikator poświadczenia. Możesz użyć tej wartości, aby [odczytać poświadczenie onchain](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) w celu zweryfikowania, czy informacje z zapytania GraphQL są poprawne.
- `data`: Dane schematu (w tym przypadku adres e-mail).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Jeśli nie ma poświadczenia, zwróć wartość, która jest oczywiście niepoprawna, ale która wydawałaby się ważna dla dostawcy usług.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Jeśli istnieje wartość, użyj `decodeData` do zdekodowania danych. Nie potrzebujemy metadanych, które dostarcza, tylko samej wartości.

```typescript
  const loginResponse = await idp.createLoginResponse(
    sp, 
    {
      .
      .
      .
    },
    "post",
    {
      email: await ethereumAddressToEmail(req.params.account)
    }
  );
```

Użyj nowej funkcji, aby uzyskać adres e-mail.

## Co z decentralizacją? {#what-about-decentralization}

W tej konfiguracji użytkownicy nie mogą udawać kogoś, kim nie są, o ile polegamy na godnych zaufania poświadczających w kwestii mapowania adresu Ethereum na adres e-mail. Jednak nasz dostawca tożsamości nadal jest scentralizowanym komponentem. Ktokolwiek posiada klucz prywatny dostawcy tożsamości, może wysyłać fałszywe informacje do dostawcy usług.

Może istnieć rozwiązanie wykorzystujące [obliczenia wielostronne (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Mam nadzieję napisać o tym w przyszłym samouczku.

## Wnioski {#conclusion}

Przyjęcie standardu logowania, takiego jak podpisy Ethereum, napotyka na problem jajka i kury. Dostawcy usług chcą dotrzeć do jak najszerszego rynku. Użytkownicy chcą mieć dostęp do usług bez konieczności martwienia się o obsługę ich standardu logowania.
Tworzenie adapterów, takich jak Ethereum IdP, może pomóc nam pokonać tę przeszkodę.

[Zobacz tutaj więcej moich prac](https://cryptodocguy.pro/).