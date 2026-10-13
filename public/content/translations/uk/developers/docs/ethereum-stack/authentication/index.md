---
title: Аутентифікація в Етеріумі
description: Дізнайтеся, як працює аутентифікація користувачів у застосунках Етеріуму — жодних паролів, лише гаманці та підписи.
lang: uk
---

Якщо ви перейшли з традиційної веброзробки, ви звикли до входу за допомогою імені користувача та пароля, потоків OAuth і сесійних файлів cookie. Аутентифікація в Етеріумі працює інакше — і багато в чому простіше.

В Етеріумі користувач підтверджує свою особу шляхом **підписання повідомлення за допомогою свого гаманця**. Немає паролів, які потрібно зберігати. Немає бази даних облікових даних, яка може витекти. Лише криптографія.

## Чим це відрізняється від Веб2? {#how-is-it-different}

| Веб2                              | Етеріум                                         |
| --------------------------------- | ------------------------------------------------ |
| Ім'я користувача + пароль         | Адреса гаманця + підпис                          |
| Сервер зберігає облікові дані     | Користувач володіє приватним ключем              |
| Сесії керуються через cookie / JWT| Сесії починаються з позамережевого підпису гаманця |
| «Увійти через Google»             | «Увійти через Етеріум»                           |
| Процеси скидання пароля           | Відновлення через сід-фразу                      |

Фундаментальна зміна: у Веб2 вас аутентифікує централізований сервер. В Етеріумі **ви аутентифікуєте себе самі**, доводячи, що контролюєте певну адресу — і будь-хто може перевірити це незалежно.

## Передумови {#prerequisites}

Переконайтеся, що ви розумієте:

- [Акаунти Етеріуму та як вони працюють](/developers/docs/accounts/)
- [Що таке гаманець і як його підключити](/wallets/)
- [Основи криптографії з відкритим і приватним ключами](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## Як працює аутентифікація на основі гаманця {#how-wallet-auth-works}

Основний процес простий:

1. **Ваш децентралізований застосунок (dapp) просить користувача підключити свій гаманець** (через МетаМаск, Rainbow, WalletConnect тощо)
2. **Гаманець ділиться адресою Етеріуму користувача** — це його публічний ідентифікатор
3. **Ваш dapp генерує унікальне повідомлення** (нонс або виклик)
4. **Користувач підписує повідомлення** своїм приватним ключем (це відбувається всередині гаманця)
5. **Ваш бекенд перевіряє підпис** на відповідність заявленій адресі
6. **Якщо підпис дійсний, користувач проходить аутентифікацію**

Жоден пароль не вводився, не зберігався і не передавався.

## Вхід через Етеріум (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) визначає стандартний формат повідомлення для входу через Етеріум, який зазвичай називають **SIWE** (Sign-In with Ethereum). Він замінює несистемне підписання повідомлень на структурований, безпечний стандарт.

Повідомлення SIWE виглядає так:

```yaml
example.com wants you to sign in with your Ethereum account:
0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B

I accept the Terms of Service: https://example.com/tos

URI: https://example.com/login
Version: 1
Chain ID: 1
Nonce: 32891757
Issued At: 2024-06-12T14:30:00Z
```

Ключові особливості SIWE:

- **Прив'язка до домену** — повідомлення містить домен, що запобігає фішингу
- **ID ланцюга (Chain ID)** — вказує, для якої мережі дійсний підпис
- **Нонс** — запобігає атакам повторного відтворення (replay attacks)
- **Термін дії** — необов'язкова часова мітка, що обмежує вікно дійсності
- **Ресурси** — необов'язкові URI для доступу з обмеженою областю дії

### Бібліотеки SIWE {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** — офіційна реалізація на TypeScript від Spruce
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** — реалізація на Rust
- **[siwe-go](https://github.com/spruceid/siwe-go)** — реалізація на Go

### Приклад: вхід на стороні клієнта за допомогою siwe {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. Отримайте нонс з вашого бекенду
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. Створіть та підпишіть SIWE повідомлення
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign in to My Dapp',
    uri: window.location.origin,
    version: '1',
    chainId: 1,
    nonce,
  })

  const signature = await signer.signMessage(message.prepareMessage())

  // 3. Відправте на бекенд для перевірки
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### Приклад: перевірка на стороні сервера (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// Видайте нонс та збережіть його в сесії, щоб /verify міг перевірити його пізніше
app.get('/api/auth/nonce', (req, res) => {
  req.session.nonce = generateNonce()
  res.json({ nonce: req.session.nonce })
})

app.post('/api/auth/verify', async (req, res) => {
  try {
    const { message, signature } = req.body
    const siweMessage = new SiweMessage(message)

    const { success, data } = await siweMessage.verify({
      signature,
      nonce: req.session.nonce,
    })

    if (success) {
      // data.address — це перевірена адреса Етеріум
      // Створіть сесію або JWT для користувача
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## Бібліотеки для підключення гаманця {#wallet-connection-libraries}

Перед аутентифікацією потрібно, щоб користувач підключив свій гаманець. Ці бібліотеки полегшують цей процес:

- **[RainbowKit](https://www.rainbowkit.com/)** — готовий до використання компонент React із гарним інтерфейсом
- **[ConnectKit](https://docs.family.co/connectkit)** — готове модальне вікно для підключення гаманця
- **[AppKit (WalletConnect)](https://reown.com/appkit)** — підключення мультиланцюгових гаманців із вбудованим SIWE
- **[Wagmi](https://wagmi.sh)** — бібліотека хуків React із `useAccount`, `useConnect`

## Перевірка підписів вручну {#verifying-manually}

Якщо ви не бажаєте використовувати SIWE, ви можете перевіряти підписи безпосередньо:

```ts
import { verifyMessage } from 'ethers'

// Повідомлення, яке підписав користувач
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// Відновіть адресу підписанта з підпису
const recoveredAddress = verifyMessage(message, signature)

// Порівняйте із заявленою адресою
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // Автентифікація успішна
}
```

### Важливі зауваження щодо безпеки {#security-notes}

- **Завжди використовуйте нонс** — це запобігає атакам повторного відтворення, коли використовується старий підпис
- **Включайте домен** — це запобігає використанню підписів на інших сайтах
- **Перевіряйте термін дії** — підписи повинні мати обмежене вікно дійсності
- **Використовуйте SIWE (EIP-4361), коли це можливо** — він автоматично обробляє все вищезазначене
- **Ніколи не розкривайте приватні ключі** — підписання відбувається всередині гаманця; ваш застосунок бачить лише результат

## Керування сесіями {#session-management}

Після аутентифікації вам усе ще потрібні сесії — так само, як і у Веб2. Поширені патерни:

- **Токени JWT** — випускайте JWT після перевірки підпису, використовуйте для запитів до API
- **Сесії на стороні сервера** — зберігайте перевірену адресу в сесійному файлі cookie
- **SIWE з ресурсами** — визначайте токени доступу з обмеженою областю дії, прив'язані до конкретних URI

Ключова відмінність від Веб2: адреса Етеріуму користувача є його постійною ідентифікацією. Він може використовувати її в будь-якому dapp без створення нового акаунта.

## Децентралізована ідентифікація {#decentralized-identity}

Аутентифікація в Етеріумі є частиною ширшого руху до **суверенної ідентифікації (self-sovereign identity)**. Стандарти та проєкти в цій сфері включають:

- **[Служба імен Етеріуму (ENS)](https://ens.domains/)** — зрозумілі для людини імена (наприклад, `vitalik.eth`), які перетворюються на адреси
- **[Служба атестації Етеріуму (EAS)](https://attest.org/)** — ончейн-атестації щодо ідентифікації та облікових даних
- **[Децентралізовані ідентифікатори W3C (DIDs)](https://www.w3.org/TR/did-core/)** — глобальний стандарт для верифікованої децентралізованої ідентифікації
- **[Ceramic Network](https://ceramic.network/)** — децентралізовані потоки даних, прив'язані до DID

## Додаткові матеріали {#further-reading}

- [EIP-4361: Вхід через Етеріум](https://eips.ethereum.org/EIPS/eip-4361)
- [Документація SIWE](https://docs.login.xyz/)
- [Вхід через Етеріум на Auth0](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Документація з аутентифікації Reown AppKit](https://docs.reown.com/appkit/authentication)
- [Документація ENS](https://docs.ens.domains/)

## Пов'язані теми {#related-topics}

- [Акаунти Етеріуму](/developers/docs/accounts/)
- [Бібліотеки JavaScript API](/developers/docs/apis/javascript/)
- [Бібліотеки бекенд API](/developers/docs/apis/backend/)
- [Гаманці](/wallets/)