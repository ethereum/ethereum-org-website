---
title: Używanie Ethereum do uwierzytelniania web2
description: Po przeczytaniu tego samouczka deweloper będzie w stanie zintegrować logowanie Ethereum (web3) z logowaniem SAML, standardem używanym w web2 do zapewniania jednokrotnego logowania i innych powiązanych usług. Pozwala to na uwierzytelnianie dostępu do zasobów web2 poprzez podpisy Ethereum, z atrybutami użytkownika pochodzącymi z poświadczeń.
author: Ori Pomerantz
tags: [ "web2", "uwierzytelnianie", "eas" ]
skill: beginner
lang: pl
published: 2025-04-30
---

## Wprowadzenie

[SAML](https://www.onelogin.com/learn/saml) to standard używany w web2, który pozwala [dostawcy tożsamości (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) na dostarczanie informacji o użytkowniku [dostawcom usług (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)).

W tym samouczku dowiesz się, jak zintegrować podpisy Ethereum z SAML, aby umożliwić użytkownikom używanie ich portfeli Ethereum do uwierzytelniania się w usługach web2, które jeszcze nie obsługują natywnie Ethereum.

Pamiętaj, że ten samouczek został napisany dla dwóch różnych grup odbiorców:

- Ludzie z kręgu Ethereum, którzy rozumieją Ethereum i potrzebują nauczyć się SAML
- Osoby z Web2, które rozumieją SAML i uwierzytelnianie web2 i muszą nauczyć się Ethereum

W rezultacie będzie on zawierał wiele materiałów wprowadzających, które już znasz. Możesz je pominąć.

### SAML dla osób z kręgu Ethereum

SAML to scentralizowany protokół. Dostawca usług (SP) akceptuje asercje (takie jak "to jest mój użytkownik Jan, powinien mieć uprawnienia do wykonywania A, B i C") od dostawcy tożsamości (IdP) tylko wtedy, gdy ma z nim wcześniej ustaloną relację zaufania lub z [urzędem certyfikacji](https://www.ssl.com/article/what-is-a-certificate-authority-ca/), który podpisał certyfikat tegoż IdP.

Na przykład SP może być biurem podróży świadczącym usługi turystyczne dla firm, a IdP może być wewnętrzną stroną internetową firmy. Gdy pracownicy muszą zarezerwować podróż służbową, biuro podróży wysyła ich do uwierzytelnienia przez firmę, zanim pozwoli im faktycznie zarezerwować podróż.

![Proces SAML krok po kroku](./fig-01-saml.png)

W ten sposób trzy podmioty, przeglądarka, SP i IdP, negocjują dostęp. SP nie musi z góry wiedzieć nic o użytkowniku korzystającym z przeglądarki, wystarczy, że ufa IdP.

### Ethereum dla osób z kręgu SAML

Ethereum to system zdecentralizowany.

![Logowanie Ethereum](./fig-02-eth-logon.png)

Użytkownicy posiadają klucz prywatny (zazwyczaj przechowywany w rozszerzeniu przeglądarki). Z klucza prywatnego można wyprowadzić klucz publiczny, a z niego 20-bajtowy adres. Gdy użytkownicy muszą zalogować się do systemu, są proszeni o podpisanie wiadomości z nonce (wartością jednorazowego użytku). Serwer może zweryfikować, czy podpis został utworzony przez ten adres.

![Pobieranie dodatkowych danych z poświadczeń](./fig-03-eas-data.png)

Podpis weryfikuje tylko adres Ethereum. Aby uzyskać inne atrybuty użytkownika, zazwyczaj używa się [poświadczeń](https://attest.org/). Poświadczenie zazwyczaj zawiera następujące pola:

- **Poświadczający**, adres, który dokonał poświadczenia
- **Odbiorca**, adres, którego dotyczy poświadczenie
- **Dane**, czyli dane, które są poświadczane, takie jak imię, uprawnienia itp.
- **Schemat**, identyfikator schematu używanego do interpretacji danych.

Ze względu na zdecentralizowany charakter Ethereum każdy użytkownik może tworzyć poświadczenia. Tożsamość poświadczającego jest ważna, aby zidentyfikować, które poświadczenia uważamy za wiarygodne.

## Konfiguracja

Pierwszym krokiem jest zapewnienie komunikacji pomiędzy SAML SP i SAML IdP.

1. Pobierz oprogramowanie. Przykładowe oprogramowanie do tego artykułu znajduje się [na githubie](https://github.com/qbzzt/250420-saml-ethereum). Różne etapy są przechowywane w różnych gałęziach, na tym etapie potrzebujesz gałęzi `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Utwórz klucze z certyfikatami z podpisem własnym. Oznacza to, że klucz jest swoim własnym urzędem certyfikacji i musi zostać ręcznie zaimportowany do dostawcy usług. Więcej informacji można znaleźć w [dokumentacji OpenSSL](https://docs.openssl.org/master/man1/openssl-req/).

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

5. Podaj IdP swój adres e-mail i kliknij **Zaloguj się do dostawcy usług**. Zobaczysz, że zostaniesz przekierowany z powrotem do dostawcy usług (port 3000) i że zna Cię on po Twoim adresie e-mail.

### Szczegółowe wyjaśnienie

Oto co się dzieje, krok po kroku:

![Normalne logowanie SAML bez Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts

Ten plik zawiera konfigurację zarówno dla dostawcy tożsamości, jak i dostawcy usług. Zwykle byłyby to dwa różne podmioty, ale tutaj dla uproszczenia możemy współdzielić kod.

```typescript
const fs = await import("fs")

const protocol="http"
```

Na razie tylko testujemy, więc możemy używać HTTP.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Odczytaj klucze publiczne, które są normalnie dostępne dla obu komponentów (i są albo bezpośrednio zaufane, albo podpisane przez zaufany urząd certyfikacji).

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

Zgodnie z konwencją, w SAML `entityID` to adres URL, pod którym dostępne są metadane podmiotu. Te metadane odpowiadają danym publicznym tutaj, z tą różnicą, że są w formie XML.

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

Najważniejszą definicją dla naszych celów jest `assertionConsumerServer`. Oznacza to, że aby potwierdzić coś (na przykład, "użytkownik, który wysyła Ci te informacje, to somebody@example.com") dostawcy usług, musimy użyć metody [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) na adres URL `http://localhost:3000/sp/assertion`.

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

Dane publiczne dostawcy tożsamości są podobne. Określa on, że aby zalogować użytkownika, należy wysłać żądanie POST na adres `http://localhost:3001/idp/login`, a aby go wylogować, na adres `http://localhost:3001/idp/logout`.

#### src/sp.mts

To jest kod, który implementuje dostawcę usług.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

Do implementacji SAML używamy biblioteki [`samlify`](https://www.npmjs.com/package/samlify).

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

Biblioteka `samlify` oczekuje, że pakiet zweryfikuje, czy kod XML jest poprawny, podpisany oczekiwanym kluczem publicznym itp. Do tego celu używamy [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint).

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`Router`](https://expressjs.com/en/5x/api.html#router) z [`express`](https://expressjs.com/) to "mini strona internetowa", którą można zamontować wewnątrz strony internetowej. W tym przypadku używamy go do zgrupowania wszystkich definicji dostawcy usług.

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

Jest to strona, do której przeglądarka uzyskuje dostęp w celu identyfikacji. Asercja zawiera identyfikator użytkownika (tutaj używamy adresu e-mail) i może zawierać dodatkowe atrybuty. To jest procedura obsługi kroku 7 na powyższym diagramie sekwencji.

```typescript
  async (req, res) => {
    // console.log(`Odpowiedź SAML:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Możesz użyć polecenia w komentarzu, aby zobaczyć dane XML podane w asercji. Są one [zakodowane w base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Analizuj żądanie logowania z serwera tożsamości.

```typescript
      res.send(`
        <html>
          <body>
            <h2>Witaj ${loginResponse.extract.nameID}</h2>
          </body>
        </html>
      `)
      res.send();
```

Wyślij odpowiedź HTML, aby pokazać użytkownikowi, że otrzymaliśmy dane logowania.

```typescript
    } catch (err) {
      console.error('Błąd przetwarzania odpowiedzi SAML:', err);
      res.status(400).send('Uwierzytelnianie SAML nie powiodło się');
    }
  }
)
```

Poinformuj użytkownika w przypadku niepowodzenia.

```typescript
spRouter.get('/login',
```

Utwórz żądanie logowania, gdy przeglądarka spróbuje uzyskać dostęp do tej strony. To jest procedura obsługi kroku 1 na powyższym diagramie sekwencji.

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

Ta strona automatycznie przesyła formularz (patrz poniżej). W ten sposób użytkownik nie musi nic robić, aby zostać przekierowanym. To jest krok 2 na powyższym diagramie sekwencji.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Wyślij żądanie POST do `loginRequest.entityEndpoint` (adres URL punktu końcowego dostawcy tożsamości).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Nazwa danych wejściowych to `loginRequest.type` (`SAMLRequest`). Zawartością tego pola jest `loginRequest.context`, który jest ponownie kodem XML zakodowanym w base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Ten middleware](https://expressjs.com/en/5x/api.html#express.urlencoded) odczytuje treść [żądania HTTP](https://www.tutorialspoint.com/http/http_requests.htm). Domyślnie express je ignoruje, ponieważ większość żądań go nie wymaga. Potrzebujemy go, ponieważ POST używa treści.

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
           Kliknij tutaj, aby się zalogować
        </button>
      </body>
    </html>
  `)
})
```

Jeśli przeglądarka spróbuje uzyskać dostęp do katalogu głównego, udostępnij jej link do strony logowania.

```typescript
app.listen(config.spPort, () => {
  console.log(`dostawca usług działa na http://${config.spHostname}:${config.spPort}`)
})
```

Nasłuchuj na `spPort` za pomocą tej aplikacji express.

#### src/idp.mts

To jest dostawca tożsamości. Jest on bardzo podobny do dostawcy usług, poniższe wyjaśnienia dotyczą części, które się różnią.

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

Ta funkcja tworzy stronę z automatycznie przesyłanym formularzem, która jest zwracana w kroku 4 powyższego diagramu sekwencji.

```typescript
<html>
  <head>
    <title>Strona logowania</title>
  </head>
  <body>
    <h2>Strona logowania</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      Adres e-mail: <input name="email" />
      <br />
      <button type="Submit">
        Zaloguj się do dostawcy usług
      </button>
```

Są dwa pola, które wysyłamy do dostawcy usług:

1. `requestId`, na który odpowiadamy.
2. Identyfikator użytkownika (na razie używamy adresu e-mail podanego przez użytkownika).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

To jest procedura obsługi kroku 5 na powyższym diagramie sekwencji. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) tworzy odpowiedź na żądanie logowania.

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Odbiorcą jest dostawca usług.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Informacje wyodrębnione z żądania. Jedynym parametrem w żądaniu, który nas interesuje, jest requestId, który pozwala dostawcy usług dopasować żądania i ich odpowiedzi.

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

Ponownie, użyj automatycznie przesyłanego formularza. To jest krok 6 na powyższym diagramie sekwencji.

```typescript

// Punkt końcowy IdP dla żądań logowania
idpRouter.post(`/login`,
```

To jest punkt końcowy, który odbiera żądanie logowania od dostawcy usług. To jest procedura obsługi kroku 3 na powyższym diagramie sekwencji.

```typescript
  async (req, res) => {
    try {
      // Obejście, ponieważ nie mogłem sprawić, by parseLoginRequest zadziałało.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Powinniśmy być w stanie użyć [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144), aby odczytać ID żądania uwierzytelnienia. Jednak nie udało mi się go uruchomić i nie było warto poświęcać na to dużo czasu, więc użyłem [uniwersalnego parsera XML](https://www.npmjs.com/package/fast-xml-parser). Informacją, której potrzebujemy, jest atrybut `ID` wewnątrz tagu `<samlp:AuthnRequest>`, który znajduje się na najwyższym poziomie XML.

## Używanie podpisów Ethereum

Teraz, gdy możemy wysłać tożsamość użytkownika do dostawcy usług, następnym krokiem jest uzyskanie tożsamości użytkownika w zaufany sposób. Viem pozwala nam po prostu poprosić portfel o adres użytkownika, ale oznacza to proszenie przeglądarki o informacje. Nie kontrolujemy przeglądarki, więc nie możemy automatycznie ufać odpowiedzi, którą od niej otrzymujemy.

Zamiast tego IdP wyśle przeglądarce ciąg do podpisania. Jeśli portfel w przeglądarce podpisze ten ciąg, oznacza to, że to naprawdę ten adres (tzn. zna on klucz prywatny, który odpowiada temu adresowi).

Aby zobaczyć to w działaniu, zatrzymaj istniejące IdP i SP i uruchom te polecenia:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Następnie przejdź [do SP](http://localhost:3000) i postępuj zgodnie z instrukcjami.

Zauważ, że w tym momencie nie wiemy, jak uzyskać adres e-mail z adresu Ethereum, więc zamiast tego zgłaszamy `<adres ethereum>@bad.email.address` do SP.

### Szczegółowe wyjaśnienie

Zmiany dotyczą kroków 4–5 na poprzednim diagramie.

![SAML z podpisem Ethereum](./fig-05-saml-w-signature.png)

Jedynym plikiem, który zmieniliśmy, jest `idp.mts`. Oto zmienione części.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Potrzebujemy tych dwóch dodatkowych bibliotek. Używamy [`uuid`](https://www.npmjs.com/package/uuid) do tworzenia wartości [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Sama wartość nie ma znaczenia, tylko fakt, że jest używana tylko raz.

Biblioteka [`viem`](https://viem.sh/) pozwala nam używać definicji Ethereum. Tutaj potrzebujemy jej do zweryfikowania, czy podpis jest rzeczywiście ważny.

```typescript
const loginPrompt = "Aby uzyskać dostęp do dostawcy usług, podpisz ten nonce: "
```

Portfel prosi użytkownika o pozwolenie na podpisanie wiadomości. Wiadomość, która jest tylko nonce, może dezorientować użytkowników, dlatego dołączamy ten monit.

```typescript
// Trzymaj tutaj requestID
let nonces = {}
```

Potrzebujemy informacji o żądaniu, aby móc na nie odpowiedzieć. Moglibyśmy wysłać je z żądaniem (krok 4) i otrzymać je z powrotem (krok 5). Jednak nie możemy ufać informacjom, które otrzymujemy z przeglądarki, która jest pod kontrolą potencjalnie wrogiego użytkownika. Więc lepiej przechowywać je tutaj, z nonce jako kluczem.

Zauważ, że dla uproszczenia robimy to tutaj jako zmienną. Ma to jednak kilka wad:

- Jesteśmy podatni na atak typu „odmowa usługi”. Złośliwy użytkownik mógłby próbować logować się wielokrotnie, zapełniając naszą pamięć.
- Jeśli proces IdP musi zostać ponownie uruchomiony, tracimy istniejące wartości.
- Nie możemy równoważyć obciążenia między wieloma procesami, ponieważ każdy z nich miałby swoją własną zmienną.

W systemie produkcyjnym użylibyśmy bazy danych i zaimplementowali jakiś mechanizm wygasania.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Utwórz nonce i przechowaj `requestId` do przyszłego użytku.

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
          alert("Zainstaluj MetaMask lub kompatybilny portfel, a następnie odśwież stronę")
      }
```

Możemy pracować tylko wtedy, gdy w przeglądarce jest portfel.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Poproś o listę kont z portfela (`window.ethereum`). Załóż, że jest co najmniej jedno i przechowuj tylko pierwsze.

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Utwórz [klienta portfela](https://viem.sh/docs/clients/wallet) do interakcji z portfelem przeglądarki.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Poproś użytkownika o podpisanie wiadomości. Ponieważ cały ten kod HTML znajduje się w [ciągu szablonu](https://viem.sh/docs/clients/wallet), możemy używać zmiennych zdefiniowanych w procesie idp. To jest krok 4.5 na diagramie sekwencji.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Przekieruj do `/idp/signature/<nonce>/<adres>/<podpis>`. To jest krok 5 na diagramie sekwencji.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

Podpis jest odsyłany przez przeglądarkę, która jest potencjalnie złośliwa (nic nie stoi na przeszkodzie, aby po prostu otworzyć `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` w przeglądarce). Dlatego ważne jest, aby zweryfikować, czy proces IdP poprawnie obsługuje złe podpisy.

```typescript
    </script>
  </head>
  <body>
    <h2>Proszę podpisać</h2>
    <button onClick="window.goodSignature()">
      Prześlij dobry (ważny) podpis
    </button>
    <br/>
    <button onClick="window.badSignature()">
      Prześlij zły (nieważny) podpis
    </button>
  </body>
</html>  
`
}
```

Reszta to standardowy HTML.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

To jest procedura obsługi kroku 5 na diagramie sekwencji.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Zły nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Pobierz identyfikator żądania i usuń nonce z `nonces`, aby upewnić się, że nie można go ponownie użyć.

```typescript
  try {
```

Ponieważ istnieje tak wiele sposobów, w jakie podpis może być nieważny, opakowujemy to w `try...` blok `catch`, aby przechwycić wszelkie zgłoszone błędy.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Użyj [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) do zaimplementowania kroku 5.5 na diagramie sekwencji.

```typescript
    if (!validSignature)
      throw("Zły podpis")
  } catch (err) {
    res.send("Błąd:" + err)
    return ;
  }
```

Reszta procedury obsługi jest równoważna z tym, co zrobiliśmy wcześniej w procedurze obsługi `/loginSubmitted`, z wyjątkiem jednej małej zmiany.

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
      // Obejście, ponieważ nie mogłem sprawić, by parseLoginRequest zadziałało.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getSignaturePage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
    } catch (err) {
      console.error('Błąd przetwarzania odpowiedzi SAML:', err);
      res.status(400).send('Uwierzytelnianie SAML nie powiodło się');
    }
  }
)
```

Zamiast `getLoginPage`, użyj teraz `getSignaturePage` w procedurze obsługi kroku 3.

## Uzyskiwanie adresu e-mail

Następnym krokiem jest uzyskanie adresu e-mail, identyfikatora wymaganego przez dostawcę usług. Aby to zrobić, używamy [Ethereum Attestation Service (EAS)](https://attest.org/).

Najłatwiejszym sposobem na uzyskanie poświadczeń jest użycie [API GraphQL](https://docs.attest.org/docs/developer-tools/api). Używamy tego zapytania:

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

Ten [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) zawiera tylko adres e-mail. To zapytanie prosi o poświadczenia tego schematu. Temat poświadczenia nazywa się `recipient`. Jest to zawsze adres Ethereum.

Ostrzeżenie: Sposób, w jaki uzyskujemy tutaj poświadczenia, ma dwa problemy z bezpieczeństwem.

- Korzystamy z punktu końcowego API `https://optimism.easscan.org/graphql`, który jest scentralizowanym komponentem. Możemy pobrać atrybut `id`, a następnie sprawdzić on-chain, aby zweryfikować, czy poświadczenie jest prawdziwe, ale punkt końcowy API nadal może cenzurować poświadczenia, nie informując nas o nich.

  Ten problem nie jest niemożliwy do rozwiązania, moglibyśmy uruchomić własny punkt końcowy GraphQL i pobierać poświadczenia z logów łańcucha, ale jest to nadmierne dla naszych celów.

- Nie sprawdzamy tożsamości poświadczającego. Każdy może podać nam fałszywe informacje. W rzeczywistej implementacji mielibyśmy zestaw zaufanych poświadczających i sprawdzalibyśmy tylko ich poświadczenia.

Aby zobaczyć to w działaniu, zatrzymaj istniejące IdP i SP i uruchom te polecenia:

```sh
git checkout email-address
pnpm install
pnpm start
```

Następnie podaj swój adres e-mail. Masz na to dwa sposoby:

- Zaimportuj portfel za pomocą klucza prywatnego i użyj testowego klucza prywatnego `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Dodaj poświadczenie dla własnego adresu e-mail:

  1. Przejdź do [schematu w eksploratorze poświadczeń](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Kliknij **Poświadcz za pomocą schematu**.

  3. Wprowadź swój adres Ethereum jako odbiorcę, swój adres e-mail jako adres e-mail i wybierz **Onchain**. Następnie kliknij **Utwórz poświadczenie**.

  4. Zatwierdź transakcję w swoim portfelu. Będziesz potrzebować trochę ETH w [łańcuchu bloków Optimism](https://app.optimism.io/bridge/deposit), aby zapłacić za gaz.

Tak czy inaczej, po wykonaniu tej czynności przejdź do [http://localhost:3000](http://localhost:3000) i postępuj zgodnie z instrukcjami. Jeśli zaimportowałeś testowy klucz prywatny, otrzymany adres e-mail to `test_addr_0@example.com`. Jeśli użyłeś własnego adresu, powinien to być adres, który poświadczyłeś.

### Szczegółowe wyjaśnienie

![Przejście od adresu Ethereum do adresu e-mail](./fig-06-saml-sig-n-email.png)

Nowe kroki to komunikacja GraphQL, kroki 5.6 i 5.7.

Ponownie, oto zmienione części `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Zaimportuj biblioteki, których potrzebujemy.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Dla każdego łańcucha bloków istnieje [oddzielny punkt końcowy](https://docs.attest.org/docs/developer-tools/api).

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

Funkcja do konwersji adresu Ethereum na adres e-mail.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

To jest zapytanie GraphQL.

```typescript
      poświadczenia(
```

Szukamy poświadczeń.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Poświadczenia, których chcemy, to te w naszym schemacie, gdzie odbiorcą jest `getAddress(ethAddr)`. Funkcja [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) upewnia się, że nasz adres ma poprawną [sumę kontrolną](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md). Jest to konieczne, ponieważ w GraphQL wielkość liter ma znaczenie. "0xBAD060A7", "0xBad060A7" i "0xbad060a7" to różne wartości.

```typescript
        take: 1
```

Niezależnie od tego, ile poświadczeń znajdziemy, chcemy tylko pierwsze.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Pola, które chcemy otrzymać.

- `attester`: Adres, który przesłał poświadczenie. Zwykle służy to do decydowania, czy ufać poświadczeniu, czy nie.
- `id`: ID poświadczenia. Możesz użyć tej wartości, aby [odczytać poświadczenie on-chain](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64), aby zweryfikować, czy informacje z zapytania GraphQL są poprawne.
- `data`: Dane schematu (w tym przypadku adres e-mail).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Jeśli nie ma poświadczenia, zwróć wartość, która jest oczywiście nieprawidłowa, ale która wydawałaby się ważna dla dostawcy usług.

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

## A co z decentralizacją?

W tej konfiguracji użytkownicy nie mogą udawać kogoś, kim nie są, o ile polegamy na godnych zaufania poświadczających w mapowaniu adresów Ethereum na adresy e-mail. Jednak nasz dostawca tożsamości jest nadal scentralizowanym komponentem. Każdy, kto ma klucz prywatny dostawcy tożsamości, może wysyłać fałszywe informacje do dostawcy usług.

Może istnieć rozwiązanie wykorzystujące [obliczenia wielostronne (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Mam nadzieję napisać o tym w przyszłym samouczku.

## Podsumowanie

Przyjęcie standardu logowania, takiego jak podpisy Ethereum, stoi przed problemem jajka i kury. Dostawcy usług chcą dotrzeć do jak najszerszego rynku. Użytkownicy chcą mieć dostęp do usług bez martwienia się o obsługę ich standardu logowania.
Tworzenie adapterów, takich jak IdP Ethereum, może pomóc nam pokonać tę przeszkodę.

[Zobacz więcej mojej pracy tutaj](https://cryptodocguy.pro/).
