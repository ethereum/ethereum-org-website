---
title: "Використання Ethereum для автентифікації web2"
description: "Прочитавши цей посібник, розробник зможе інтегрувати вхід Ethereum (web3) з входом SAML, стандартом, що використовується у web2 для забезпечення єдиного входу та інших пов’язаних послуг. Це дає змогу автентифікувати доступ до ресурсів web2 за допомогою підписів Ethereum, причому атрибути користувача надходять із атестацій."
author: Ori Pomerantz
tags: [ "web2", "автентифікація", "eas" ]
skill: beginner
lang: uk
published: 2025-04-30
---

## Вступ

[SAML](https://www.onelogin.com/learn/saml) — це стандарт, що використовується у web2, щоб дозволити [постачальнику посвідчень (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) надавати інформацію про користувача для [постачальників послуг (SP)](https://en.wikipedia.org/wiki/Service_provider_\(SAML\)).

У цьому посібнику ви дізнаєтеся, як інтегрувати підписи Ethereum із SAML, щоб дозволити користувачам використовувати свої гаманці Ethereum для автентифікації у службах web2, які ще не підтримують Ethereum.

Зверніть увагу, що цей посібник написаний для двох окремих аудиторій:

- Люди з Ethereum, які розуміють Ethereum і потребують вивчення SAML
- Люди з Web2, які розуміють SAML і автентифікацію web2 і потребують вивчення Ethereum

У результаті він міститиме багато вступного матеріалу, який ви вже знаєте. Не соромтеся пропустити його.

### SAML для людей з Ethereum

SAML — це централізований протокол. Постачальник послуг (SP) приймає твердження (наприклад, "це мій користувач Іван, він повинен мати дозволи на виконання A, B та C") від постачальника посвідчень (IdP) лише якщо він має попередні довірчі відносини або з ним, або з [центром сертифікації](https://www.ssl.com/article/what-is-a-certificate-authority-ca/), який підписав сертифікат цього IdP.

Наприклад, SP може бути туристичною агенцією, що надає туристичні послуги компаніям, а IdP — внутрішнім вебсайтом компанії. Коли співробітникам потрібно забронювати ділову поїздку, туристична агенція відправляє їх для автентифікації компанією, перш ніж дозволити їм фактично забронювати поїздку.

![Покроковий процес SAML](./fig-01-saml.png)

Таким чином три сутності, браузер, SP та IdP, домовляються про доступ. SP не потрібно нічого знати про користувача, що використовує браузер, заздалегідь, лише довіряти IdP.

### Ethereum для людей з SAML

Ethereum — це децентралізована система.

![Вхід в Ethereum](./fig-02-eth-logon.png)

Користувачі мають приватний ключ (зазвичай зберігається в розширенні браузера). З приватного ключа ви можете отримати публічний ключ, а з нього — 20-байтну адресу. Коли користувачам потрібно увійти в систему, їм пропонується підписати повідомлення за допомогою nonce (одноразового значення). Сервер може перевірити, чи був підпис створений цією адресою.

![Отримання додаткових даних з атестацій](./fig-03-eas-data.png)

Підпис лише підтверджує адресу Ethereum. Щоб отримати інші атрибути користувача, зазвичай використовуються [атестації](https://attest.org/). Атестація зазвичай має такі поля:

- **Атестатор**, адреса, яка зробила атестацію
- **Одержувач**, адреса, до якої застосовується атестація
- **Дані**, дані, що засвідчуються, такі як ім'я, дозволи тощо.
- **Схема**, ідентифікатор схеми, що використовується для інтерпретації даних.

Через децентралізовану природу Ethereum будь-який користувач може робити атестації. Особа атестатора важлива для визначення, які атестації ми вважаємо надійними.

## Налаштування

Перший крок — це наявність SAML SP та SAML IdP, що взаємодіють між собою.

1. Завантажте програмне забезпечення. Приклад програмного забезпечення для цієї статті знаходиться [на GitHub](https://github.com/qbzzt/250420-saml-ethereum). Різні етапи зберігаються в різних гілках, для цього етапу вам потрібна `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Створіть ключі з самопідписаними сертифікатами. Це означає, що ключ є власним центром сертифікації, і його потрібно імпортувати вручну до постачальника послуг. Дивіться [документацію OpenSSL](https://docs.openssl.org/master/man1/openssl-req/) для отримання додаткової інформації.

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. Запустіть сервери (і SP, і IdP)

    ```sh
    pnpm start
    ```

4. Перейдіть до SP за URL-адресою [http://localhost:3000/](http://localhost:3000/) і натисніть кнопку, щоб бути перенаправленим до IdP (порт 3001).

5. Надайте IdP свою адресу електронної пошти та натисніть **Увійти до постачальника послуг**. Переконайтеся, що вас перенаправили назад до постачальника послуг (порт 3000) і що він розпізнає вас за вашою адресою електронної пошти.

### Детальне пояснення

Ось що відбувається крок за кроком:

![Звичайний вхід SAML без Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts

Цей файл містить конфігурацію як для постачальника посвідчень, так і для постачальника послуг. Зазвичай це дві різні сутності, але тут ми можемо спільно використовувати код для простоти.

```typescript
const fs = await import("fs")

const protocol="http"
```

Наразі ми просто тестуємо, тому використання HTTP є прийнятним.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Зчитайте публічні ключі, які зазвичай доступні для обох компонентів (і або довірені безпосередньо, або підписані довіреним центром сертифікації).

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

URL-адреси для обох компонентів.

```typescript
export const spPublicData = {
```

Публічні дані для постачальника послуг.

```typescript
    entityID: `${spUrl}/metadata`,
```

За домовленістю, в SAML `entityID` — це URL-адреса, за якою доступні метадані сутності. Ці метадані відповідають публічним даним тут, за винятком того, що вони у форматі XML.

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

Найважливішим визначенням для наших цілей є `assertionConsumerServer`. Це означає, що для того, щоб щось підтвердити (наприклад, "користувач, який надсилає вам цю інформацію, є someone@example.com") постачальнику послуг, нам потрібно використовувати [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) на URL-адресу `http://localhost:3000/sp/assertion`.

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

Публічні дані для постачальника посвідчень схожі. Він вказує, що для входу користувача ви робите POST-запит на `http://localhost:3001/idp/login`, а для виходу користувача — POST-запит на `http://localhost:3001/idp/logout`.

#### src/sp.mts

Це код, який реалізує постачальника послуг.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

Ми використовуємо бібліотеку [`samlify`](https://www.npmjs.com/package/samlify) для реалізації SAML.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

Бібліотека `samlify` очікує, що пакет перевірятиме правильність XML, підписаного очікуваним публічним ключем тощо. Для цієї мети ми використовуємо [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint).

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

[`Router`](https://expressjs.com/en/5x/api.html#router) з [`express`](https://expressjs.com/) — це "міні-вебсайт", який можна вмонтувати всередині вебсайту. У цьому випадку ми використовуємо його для групування всіх визначень постачальника послуг разом.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

Власне представлення постачальника послуг — це всі публічні дані та приватний ключ, який він використовує для підписання інформації.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Публічні дані містять усе, що постачальнику послуг потрібно знати про постачальника посвідчень.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Щоб забезпечити сумісність з іншими компонентами SAML, постачальники послуг та посвідчень повинні мати свої публічні дані (які називаються метаданими), доступні у форматі XML за адресою `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

Це сторінка, до якої звертається браузер для самоідентифікації. Твердження містить ідентифікатор користувача (тут ми використовуємо адресу електронної пошти) і може містити додаткові атрибути. Це обробник для кроку 7 у наведеній вище діаграмі послідовності.

```typescript
  async (req, res) => {
    // console.log(`SAML response:\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Ви можете використати закоментовану команду, щоб побачити XML-дані, надані в твердженні. Він [закодований у base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Розпарсіть запит на вхід від сервера посвідчень.

```typescript
      res.send(`
        <html>
          <body>
            <h2>Привіт ${loginResponse.extract.nameID}</h2>
          </body>
        </html>
      `)
      res.send();
```

Надішліть відповідь HTML, щоб просто показати користувачеві, що ми отримали дані для входу.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Повідомте користувача в разі збою.

```typescript
spRouter.get('/login',
```

Створіть запит на вхід, коли браузер намагається отримати доступ до цієї сторінки. Це обробник для кроку 1 у наведеній вище діаграмі послідовності.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Отримайте інформацію для надсилання запиту на вхід.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Ця сторінка автоматично надсилає форму (див. нижче). Таким чином, користувачеві не потрібно нічого робити, щоб бути перенаправленим. Це крок 2 у наведеній вище діаграмі послідовності.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Надішліть запит на `loginRequest.entityEndpoint` (URL-адреса кінцевої точки постачальника посвідчень).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Назва вводу — `loginRequest.type` (`SAMLRequest`). Вміст для цього поля — `loginRequest.context`, що знову є XML, закодованим у base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Це проміжне програмне забезпечення](https://expressjs.com/en/5x/api.html#express.urlencoded) зчитує тіло [HTTP-запиту](https://www.tutorialspoint.com/http/http_requests.htm). За замовчуванням express ігнорує його, оскільки більшість запитів не потребують цього. Нам це потрібно, оскільки POST використовує тіло.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Вмонтуйте маршрутизатор у директорію постачальника послуг (`/sp`).

```typescript
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <button onClick="document.location.href='${config.spUrl}/login'">
           Натисніть тут, щоб увійти
        </button>
      </body>
    </html>
  `)
})
```

Якщо браузер намагається отримати кореневу директорію, надайте йому посилання на сторінку входу.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Прослуховуйте `spPort` за допомогою цієї програми express.

#### src/idp.mts

Це постачальник посвідчень. Він дуже схожий на постачальника послуг, пояснення нижче стосуються тих частин, які відрізняються.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Зберегти атрибути
    attributeNamePrefix: "@_", // Префікс для атрибутів
  }
)
```

Нам потрібно зчитати та зрозуміти XML-запит, який ми отримуємо від постачальника послуг.

```typescript
const getLoginPage = requestId => `
```

Ця функція створює сторінку з автоматично надісланою формою, яка повертається на кроці 4 наведеної вище діаграми послідовності.

```typescript
<html>
  <head>
    <title>Сторінка входу</title>
  </head>
  <body>
    <h2>Сторінка входу</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      Адреса електронної пошти: <input name="email" />
      <br />
      <button type="Submit">
        Увійти до постачальника послуг
      </button>
```

Ми надсилаємо постачальнику послуг два поля:

1. `requestId`, на який ми відповідаємо.
2. Ідентифікатор користувача (зараз ми використовуємо адресу електронної пошти, яку надає користувач).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

Це обробник для кроку 5 у наведеній вище діаграмі послідовності. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) створює відповідь на вхід.

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

Аудиторія — це постачальник послуг.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Інформація, витягнута із запиту. Єдиний параметр, який нас цікавить у запиті, це requestId, який дозволяє постачальнику послуг зіставляти запити та їх відповіді.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Забезпечити підписання
```

Нам потрібен `signingKey`, щоб мати дані для підписання відповіді. Постачальник послуг не довіряє непідписаним запитам.

```typescript
    },
    "post",
    {
      email: req.body.email
```

Це поле з інформацією про користувача, яку ми надсилаємо назад постачальнику послуг.

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

Знову ж таки, використовуйте форму, що надсилається автоматично. Це крок 6 у наведеній вище діаграмі послідовності.

```typescript

// Кінцева точка IdP для запитів на вхід
idpRouter.post(`/login`,
```

Це кінцева точка, яка отримує запит на вхід від постачальника послуг. Це обробник для кроку 3 у наведеній вище діаграмі послідовності.

```typescript
  async (req, res) => {
    try {
      // Обхідний шлях, оскільки не вдалося змусити parseLoginRequest працювати.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Ми повинні мати можливість використовувати [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) для зчитування ідентифікатора запиту на автентифікацію. Однак мені не вдалося змусити його працювати, і не варто було витрачати на це багато часу, тому я просто використовую [XML-парсер загального призначення](https://www.npmjs.com/package/fast-xml-parser). Інформація, яка нам потрібна, це атрибут `ID` всередині тегу `<samlp:AuthnRequest>`, який знаходиться на верхньому рівні XML.

## Використання підписів Ethereum

Тепер, коли ми можемо надіслати посвідчення користувача постачальнику послуг, наступним кроком є отримання посвідчення користувача надійним способом. Viem дозволяє нам просто запитати у гаманця адресу користувача, але це означає запит інформації у браузера. Ми не контролюємо браузер, тому не можемо автоматично довіряти відповіді, яку отримуємо від нього.

Натомість IdP надсилатиме браузеру рядок для підписання. Якщо гаманець у браузері підписує цей рядок, це означає, що це дійсно та сама адреса (тобто, він знає приватний ключ, що відповідає цій адресі).

Щоб побачити це в дії, зупиніть існуючі IdP та SP і виконайте ці команди:

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Потім перейдіть [до SP](http://localhost:3000) і дотримуйтесь інструкцій.

Зверніть увагу, що на цьому етапі ми не знаємо, як отримати адресу електронної пошти з адреси Ethereum, тому замість цього ми повідомляємо `<ethereum address>@bad.email.address` до SP.

### Детальне пояснення

Зміни стосуються кроків 4-5 у попередній діаграмі.

![SAML з підписом Ethereum](./fig-05-saml-w-signature.png)

Єдиний файл, який ми змінили, це `idp.mts`. Ось змінені частини.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Нам потрібні ці дві додаткові бібліотеки. Ми використовуємо [`uuid`](https://www.npmjs.com/package/uuid) для створення значення [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Саме значення не має значення, важливий лише той факт, що воно використовується лише один раз.

Бібліотека [`viem`](https://viem.sh/) дозволяє нам використовувати визначення Ethereum. Тут нам це потрібно, щоб перевірити, чи дійсно підпис дійсний.

```typescript
const loginPrompt = "Щоб отримати доступ до постачальника послуг, підпишіть цей nonce: "
```

Гаманець запитує у користувача дозвіл на підписання повідомлення. Повідомлення, яке є просто nonce, може збити користувачів з пантелику, тому ми включаємо цей запит.

```typescript
// Зберігайте requestID тут
let nonces = {}
```

Нам потрібна інформація про запит, щоб мати можливість відповісти на нього. Ми могли б надіслати її разом із запитом (крок 4) і отримати назад (крок 5). Однак ми не можемо довіряти інформації, яку отримуємо від браузера, який перебуває під контролем потенційно ворожого користувача. Тому краще зберігати її тут, з nonce як ключем.

Зверніть увагу, що ми робимо це тут як змінну для простоти. Однак це має кілька недоліків:

- Ми вразливі до атаки типу «відмова в обслуговуванні». Зловмисний користувач може спробувати увійти кілька разів, заповнюючи нашу пам'ять.
- Якщо процес IdP потрібно перезапустити, ми втратимо існуючі значення.
- Ми не можемо балансувати навантаження між кількома процесами, оскільки кожен матиме власну змінну.

У виробничій системі ми б використовували базу даних і реалізували певний механізм закінчення терміну дії.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Створіть nonce і збережіть `requestId` для подальшого використання.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

Цей JavaScript виконується автоматично при завантаженні сторінки.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

Нам потрібні кілька функцій з `viem`.

```typescript
      if (!window.ethereum) {
          alert("Будь ласка, встановіть MetaMask або сумісний гаманець, а потім перезавантажте сторінку")
      }
```

Ми можемо працювати, тільки якщо в браузері є гаманець.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Запросіть список облікових записів із гаманця (`window.ethereum`). Припустимо, що є принаймні один, і зберігаємо лише перший.

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Створіть [клієнт гаманця](https://viem.sh/docs/clients/wallet) для взаємодії з гаманцем браузера.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Попросіть користувача підписати повідомлення. Оскільки весь цей HTML знаходиться в [шаблонному рядку](https://viem.sh/docs/clients/wallet), ми можемо використовувати змінні, визначені в процесі idp. Це крок 4.5 у діаграмі послідовності.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Перенаправлення на `/idp/signature/<nonce>/<address>/<signature>`. Це крок 5 у діаграмі послідовності.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

Підпис надсилається назад браузером, який є потенційно зловмисним (ніщо не заважає вам просто відкрити `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` у браузері). Тому важливо перевірити, чи процес IdP правильно обробляє погані підписи.

```typescript
    </script>
  </head>
  <body>
    <h2>Будь ласка, підпишіть</h2>
    <button onClick="window.goodSignature()">
      Надіслати правильний (дійсний) підпис
    </button>
    <br/>
    <button onClick="window.badSignature()">
      Надіслати неправильний (недійсний) підпис
    </button>
  </body>
</html>  
`
}
```

Решта — це просто стандартний HTML.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

Це обробник для кроку 5 у діаграмі послідовності.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Отримайте ID запиту та видаліть nonce з `nonces`, щоб переконатися, що його не можна використовувати повторно.

```typescript
  try {
```

Оскільки існує так багато способів, якими підпис може бути недійсним, ми обгортаємо це в `try ...` блок `catch`, щоб перехопити будь-які кинуті помилки.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Використовуйте [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage), щоб реалізувати крок 5.5 у діаграмі послідовності.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

Решта обробника еквівалентна тому, що ми робили в обробнику `/loginSubmitted` раніше, за винятком однієї невеликої зміни.

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

У нас немає фактичної адреси електронної пошти (ми отримаємо її в наступному розділі), тому поки що ми повертаємо адресу Ethereum і чітко позначаємо її як не адресу електронної пошти.

```typescript
// Кінцева точка IdP для запитів на вхід
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Обхідний шлях, оскільки не вдалося змусити parseLoginRequest працювати.
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

Замість `getLoginPage` тепер використовуйте `getSignaturePage` в обробнику кроку 3.

## Отримання адреси електронної пошти

Наступним кроком є отримання адреси електронної пошти, ідентифікатора, який запитує постачальник послуг. Для цього ми використовуємо [Ethereum Attestation Service (EAS)](https://attest.org/).

Найпростіший спосіб отримати атестації — це використовувати [GraphQL API](https://docs.attest.org/docs/developer-tools/api). Ми використовуємо цей запит:

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

Цей [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) включає лише адресу електронної пошти. Цей запит просить атестації цієї схеми. Суб'єкт атестації називається `одержувачем`. Це завжди адреса Ethereum.

Попередження: спосіб, яким ми отримуємо атестації, має дві проблеми з безпекою.

- Ми звертаємося до кінцевої точки API, `https://optimism.easscan.org/graphql`, яка є централізованим компонентом. Ми можемо отримати атрибут `id`, а потім виконати пошук ончейн, щоб перевірити, чи є атестація справжньою, але кінцева точка API все ще може цензурувати атестації, не повідомляючи нам про них.

  Цю проблему не неможливо вирішити, ми могли б запустити власну кінцеву точку GraphQL і отримати атестації з журналів ланцюга, але це надмірно для наших цілей.

- Ми не дивимося на особу атестатора. Будь-хто може надати нам неправдиву інформацію. У реальній реалізації ми б мали набір довірених атестаторів і дивилися б тільки на їхні атестації.

Щоб побачити це в дії, зупиніть існуючі IdP та SP і виконайте ці команди:

```sh
git checkout email-address
pnpm install
pnpm start
```

Потім надайте свою адресу електронної пошти. У вас є два способи зробити це:

- Імпортуйте гаманець за допомогою приватного ключа та використовуйте тестовий приватний ключ `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Додайте атестацію для вашої власної адреси електронної пошти:

  1. Перейдіть до [схеми в оглядачі атестацій](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Натисніть **Атестувати за схемою**.

  3. Введіть свою адресу Ethereum як одержувача, свою адресу електронної пошти як адресу електронної пошти та виберіть **Ончейн**. Потім натисніть **Зробити атестацію**.

  4. Підтвердьте транзакцію у своєму гаманці. Вам знадобиться трохи ETH на [блокчейні Optimism](https://app.optimism.io/bridge/deposit) для оплати газу.

У будь-якому випадку, після цього перейдіть за адресою [http://localhost:3000](http://localhost:3000) і дотримуйтесь інструкцій. Якщо ви імпортували тестовий приватний ключ, адреса електронної пошти, яку ви отримаєте, буде `test_addr_0@example.com`. Якщо ви використовували власну адресу, вона має бути такою, яку ви атестували.

### Детальне пояснення

![Перехід від адреси Ethereum до електронної пошти](./fig-06-saml-sig-n-email.png)

Нові кроки — це комунікація GraphQL, кроки 5.6 та 5.7.

Знову ж таки, ось змінені частини `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Імпортуйте бібліотеки, які нам потрібні.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Для кожного блокчейну є [окрема кінцева точка](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Створіть новий клієнт `GraphQLClient`, який ми можемо використовувати для запитів до кінцевої точки.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL надає нам лише непрозорий об'єкт даних з байтами. Щоб зрозуміти його, нам потрібна схема.

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Функція для переходу від адреси Ethereum до адреси електронної пошти.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Це запит GraphQL.

```typescript
      атестації(
```

Ми шукаємо атестації.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Атестації, які нам потрібні, — це ті, що відповідають нашій схемі, де одержувачем є `getAddress(ethAddr)`. Функція [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) переконується, що наша адреса має правильну [контрольну суму](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md). Це необхідно, оскільки GraphQL чутливий до регістру. "0xBAD060A7", "0xBad060A7", та "0xbad060a7" є різними значеннями.

```typescript
        take: 1
```

Незалежно від того, скільки атестацій ми знайдемо, нам потрібна лише перша.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Поля, які ми хочемо отримати.

- `attester`: Адреса, яка подала атестацію. Зазвичай це використовується для вирішення, чи довіряти атестації.
- `id`: Ідентифікатор атестації. Ви можете використовувати це значення для [читання атестації ончейн](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64), щоб перевірити, чи правильна інформація з запиту GraphQL.
- `data`: Дані схеми (у цьому випадку адреса електронної пошти).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

Якщо атестації немає, поверніть значення, яке є очевидно неправильним, але яке буде виглядати дійсним для постачальника послуг.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

Якщо є значення, використовуйте `decodeData` для декодування даних. Нам не потрібні метадані, які він надає, лише саме значення.

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

Використовуйте нову функцію для отримання адреси електронної пошти.

## А як щодо децентралізації?

У цій конфігурації користувачі не можуть видавати себе за когось іншого, доки ми покладаємося на надійних атестаторів для зіставлення адреси Ethereum з адресою електронної пошти. Однак наш постачальник посвідчень все ще є централізованим компонентом. Той, хто має приватний ключ постачальника посвідчень, може надсилати неправдиву інформацію постачальнику послуг.

Можливо, існує рішення з використанням [багатосторонніх обчислень (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). Сподіваюся написати про це в майбутньому посібнику.

## Висновок

Прийняття стандарту входу, такого як підписи Ethereum, стикається з проблемою курки та яйця. Постачальники послуг хочуть залучити якомога ширший ринок. Користувачі хочуть мати доступ до послуг, не турбуючись про підтримку свого стандарту входу.
Створення адаптерів, таких як Ethereum IdP, може допомогти нам подолати цю перешкоду.

[Більше моїх робіт дивіться тут](https://cryptodocguy.pro/).
