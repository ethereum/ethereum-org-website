---
title: Аутентификация в Эфириуме
description: Узнайте, как работает аутентификация пользователей в приложениях Эфириума — никаких паролей, только кошельки и подписи.
lang: ru
---

Если вы пришли из традиционной веб-разработки, вы привыкли к входу по имени пользователя и паролю, потокам OAuth и сессионным файлам cookie. Аутентификация в Эфириуме работает иначе — и во многом проще.

В Эфириуме пользователь подтверждает свою личность путем **подписания сообщения с помощью своего кошелька**. Не нужно хранить пароли. Нет базы данных учетных данных, которая может утечь. Только криптография.

## Чем это отличается от Веб2? {#how-is-it-different}

| Веб2                              | Эфириум                                         |
| --------------------------------- | ------------------------------------------------ |
| Имя пользователя + пароль               | Адрес кошелька + подпись                       |
| Сервер хранит учетные данные         | Пользователь владеет приватным ключом                           |
| Сессии управляются через cookies / JWT | Сессии начинаются с офчейн-подписи кошелька |
| «Войти через Google»             | «Войти через Эфириум»                          |
| Процедуры сброса пароля              | Восстановление через сид-фразу                             |

Фундаментальный сдвиг: в Веб2 вас аутентифицирует централизованный сервер. В Эфириуме **вы аутентифицируете себя сами**, доказывая, что контролируете определенный адрес — и любой может проверить это независимо.

## Предварительные требования {#prerequisites}

Убедитесь, что вы понимаете:

- [Аккаунты Эфириума и как они работают](/developers/docs/accounts/)
- [Что такое кошелек и как его подключить](/wallets/)
- [Основы криптографии с открытым и приватным ключами](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## Как работает аутентификация на основе кошелька {#how-wallet-auth-works}

Основной процесс прост:

1. **Ваше децентрализованное приложение (dapp) просит пользователя подключить свой кошелек** (через МетаМаск, Rainbow, WalletConnect и т. д.)
2. **Кошелек передает адрес Эфириума пользователя** — это его публичный идентификатор
3. **Ваше dapp генерирует уникальное сообщение** (нонс или запрос)
4. **Пользователь подписывает сообщение** своим приватным ключом (это происходит внутри кошелька)
5. **Ваш бэкенд проверяет подпись** на соответствие заявленному адресу
6. **Если подпись действительна, пользователь аутентифицирован**

Никакой пароль не вводился, не сохранялся и не передавался.

## Вход через Эфириум (EIP-4361) {#sign-in-with-ethereum}

[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) определяет стандартный формат сообщения для входа через Эфириум, обычно называемый **SIWE** (Sign-In with Ethereum). Он заменяет произвольное подписание сообщений структурированным и безопасным стандартом.

Сообщение SIWE выглядит так:

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

Ключевые особенности SIWE:

- **Привязка к домену** — сообщение включает домен, что предотвращает фишинг
- **ID цепи** — указывает, для какой сети действительна подпись
- **Нонс** — предотвращает атаки повторного воспроизведения
- **Срок действия** — необязательная временная метка, ограничивающая окно действия
- **Ресурсы** — необязательные URI для ограниченного доступа

### Библиотеки SIWE {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** — официальная реализация на TypeScript от Spruce
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** — реализация на Rust
- **[siwe-go](https://github.com/spruceid/siwe-go)** — реализация на Go

### Пример: вход на стороне клиента с помощью siwe {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. Получите нонс от вашего бэкенда
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. Создайте и подпишите сообщение SIWE
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

  // 3. Отправьте на бэкенд для проверки
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### Пример: проверка на стороне сервера (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// Выдайте нонс и сохраните его в сессии, чтобы /verify мог проверить его позже
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
      // data.address — это проверенный адрес Эфириума
      // Создайте сессию или JWT для пользователя
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## Библиотеки для подключения кошелька {#wallet-connection-libraries}

Перед аутентификацией необходимо, чтобы пользователь подключил свой кошелек. Эти библиотеки упрощают задачу:

- **[RainbowKit](https://www.rainbowkit.com/)** — готовый к использованию компонент React с красивым пользовательским интерфейсом
- **[ConnectKit](https://docs.family.co/connectkit)** — готовое модальное окно для подключения кошелька
- **[AppKit (WalletConnect)](https://reown.com/appkit)** — мультичейн-подключение кошелька со встроенным SIWE
- **[Wagmi](https://wagmi.sh)** — библиотека хуков React с `useAccount`, `useConnect`

## Проверка подписей вручную {#verifying-manually}

Если вы предпочитаете не использовать SIWE, вы можете проверять подписи напрямую:

```ts
import { verifyMessage } from 'ethers'

// Сообщение, которое подписал пользователь
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// Восстановите адрес подписанта из подписи
const recoveredAddress = verifyMessage(message, signature)

// Сравните с заявленным адресом
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // Аутентификация прошла успешно
}
```

### Важные замечания по безопасности {#security-notes}

- **Всегда используйте нонс** — это предотвращает атаки повторного воспроизведения, при которых повторно используется старая подпись
- **Включайте домен** — это не позволяет подписям быть действительными на разных сайтах
- **Проверяйте срок действия** — подписи должны иметь ограниченное окно действия
- **Используйте SIWE (EIP-4361), когда это возможно** — он обрабатывает все вышеперечисленное за вас
- **Никогда не раскрывайте приватные ключи** — подписание происходит внутри кошелька; ваше приложение видит только результат

## Управление сессиями {#session-management}

После аутентификации вам все еще нужны сессии — так же, как и в Веб2. Распространенные паттерны:

- **Токены JWT** — выдавайте JWT после проверки подписи, используйте для запросов к API
- **Сессии на стороне сервера** — сохраняйте проверенный адрес в сессионном файле cookie
- **SIWE с ресурсами** — определяйте токены доступа с ограниченной областью действия, привязанные к конкретным URI

Ключевое отличие от Веб2: адрес Эфириума пользователя является его постоянной идентичностью. Он может использовать его в любом dapp без создания нового аккаунта.

## Децентрализованная идентичность {#decentralized-identity}

Аутентификация в Эфириуме является частью более широкого движения к **суверенной идентичности** (self-sovereign identity). Стандарты и проекты в этой области включают:

- **[Служба имен Эфириума (ENS)](https://ens.domains/)** — удобочитаемые имена (например, `vitalik.eth`), которые разрешаются в адреса
- **[Служба аттестации Эфириума (EAS)](https://attest.org/)** — ончейн-аттестации о личности и учетных данных
- **[Децентрализованные идентификаторы W3C (DIDs)](https://www.w3.org/TR/did-core/)** — глобальный стандарт для проверяемой децентрализованной идентичности
- **[Ceramic Network](https://ceramic.network/)** — децентрализованные потоки данных, привязанные к DID

## Дополнительная литература {#further-reading}

- [EIP-4361: Вход через Эфириум](https://eips.ethereum.org/EIPS/eip-4361)
- [Документация SIWE](https://docs.login.xyz/)
- [Вход через Эфириум на Auth0](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Документация по аутентификации Reown AppKit](https://docs.reown.com/appkit/authentication)
- [Документация ENS](https://docs.ens.domains/)

## Связанные темы {#related-topics}

- [Аккаунты Эфириума](/developers/docs/accounts/)
- [Библиотеки JavaScript API](/developers/docs/apis/javascript/)
- [Библиотеки Backend API](/developers/docs/apis/backend/)
- [Кошельки](/wallets/)