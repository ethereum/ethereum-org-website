---
title: "Wysyłanie tokenów przy użyciu ethers.js"
description: "Przewodnik dla początkujących dotyczący wysyłania tokenów przy użyciu ethers.js."
author: Kim YongJun
tags: [ "ETHERS.JS", "ERC-20", "TOKENY" ]
skill: beginner
lang: pl
published: 2021-04-06
---

## Wyślij token przy użyciu ethers.js(5.0) {#send-token}

### W tym samouczku dowiesz się, jak {#you-learn-about}

- Importować ethers.js
- Przesłać token
- Ustawić cenę gazu zgodnie z natężeniem ruchu w sieci

### Na początek {#to-get-started}

Na początek musimy najpierw zaimportować bibliotekę ethers.js do naszego javascript
Dołącz ethers.js(5.0)

### Instalacja {#install-ethersjs}

```shell
/home/ricmoo> npm install --save ethers
```

ES6 w przeglądarce

```html
<script type="module">
  import { ethers } from "https://cdn.ethers.io/lib/ethers-5.0.esm.min.js"
  // Twój kod tutaj...
</script>
```

ES3(UMD) w przeglądarce

```html
<script
  src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"
  type="application/javascript"
></script>
```

### Parametry {#param}

1. **`contract_address`**: Adres kontraktu tokena (adres kontraktu jest potrzebny, gdy token, który chcesz przesłać, nie jest etherem)
2. **`send_token_amount`**: Kwota, którą chcesz wysłać do odbiorcy
3. **`to_address`**: Adres odbiorcy
4. **`send_account`**: Adres nadawcy
5. **`private_key`**: Klucz prywatny nadawcy do podpisania transakcji i faktycznego przesłania tokenów

## Uwaga {#notice}

Funkcja `signTransaction(tx)` została usunięta, ponieważ `sendTransaction()` wykonuje tę czynność wewnętrznie.

## Procedury wysyłania {#procedure}

### 1. Połącz z siecią (sieć testowa) {#connect-to-network}

#### Ustaw dostawcę (Infura) {#set-provider}

Połącz z siecią testową Ropsten

```javascript
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")
```

### 2. Utwórz portfel {#create-wallet}

```javascript
let wallet = new ethers.Wallet(private_key)
```

### 3. Połącz portfel z siecią {#connect-wallet-to-net}

```javascript
let walletSigner = wallet.connect(window.ethersProvider)
```

### 4. Pobierz aktualną cenę gazu {#get-gas}

```javascript
window.ethersProvider.getGasPrice() // cena gazu
```

### 5. Zdefiniuj transakcję {#define-transaction}

Zmienne zdefiniowane poniżej są zależne od `send_token()`

### Parametry transakcji {#transaction-params}

1. **`send_account`**: adres nadawcy tokena
2. **`to_address`**: adres odbiorcy tokena
3. **`send_token_amount`**: ilość tokenów do wysłania
4. **`gas_limit`**: limit gazu
5. **`gas_price`**: cena gazu

[Zobacz poniżej, jak używać](#how-to-use)

```javascript
const tx = {
  from: send_account,
  to: to_address,
  value: ethers.utils.parseEther(send_token_amount),
  nonce: window.ethersProvider.getTransactionCount(send_account, "latest"),
  gasLimit: ethers.utils.hexlify(gas_limit), // 100000
  gasPrice: gas_price,
}
```

### 6. Przesłanie {#transfer}

```javascript
walletSigner.sendTransaction(tx).then((transaction) => {
  console.dir(transaction)
  alert("Wysyłanie zakończone!")
})
```

## Jak tego używać {#how-to-use}

```javascript
let private_key =
  "41559d28e936dc92104ff30691519693fc753ffbee6251a611b9aa1878f12a4d"
let send_token_amount = "1"
let to_address = "0x4c10D2734Fb76D3236E522509181CC3Ba8DE0e80"
let send_address = "0xda27a282B5B6c5229699891CfA6b900A716539E6"
let gas_limit = "0x100000"
let wallet = new ethers.Wallet(private_key)
let walletSigner = wallet.connect(window.ethersProvider)
let contract_address = ""
window.ethersProvider = new ethers.providers.InfuraProvider("ropsten")

send_token(
  contract_address,
  send_token_amount,
  to_address,
  send_address,
  private_key
)
```

### Sukces! {#success}

![obraz transakcji zakończonej pomyślnie](./successful-transaction.png)

## send_token() {#send-token-method}

```javascript
function send_token(
  contract_address,
  send_token_amount,
  to_address,
  send_account,
  private_key
) {
  let wallet = new ethers.Wallet(private_key)
  let walletSigner = wallet.connect(window.ethersProvider)

  window.ethersProvider.getGasPrice().then((currentGasPrice) => {
    let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice))
    console.log(`gas_price: ${gas_price}`)

    if (contract_address) {
      // ogólne wysyłanie tokenów
      let contract = new ethers.Contract(
        contract_address,
        send_abi,
        walletSigner
      )

      // Ile tokenów?
      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18)
      console.log(`numberOfTokens: ${numberOfTokens}`)

      // Wyślij tokeny
      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult)
        alert("wysłano token")
      })
    } // wysyłanie etheru
    else {
      const tx = {
        from: send_account,
        to: to_address,
        value: ethers.utils.parseEther(send_token_amount),
        nonce: window.ethersProvider.getTransactionCount(
          send_account,
          "latest"
        ),
        gasLimit: ethers.utils.hexlify(gas_limit), // 100000
        gasPrice: gas_price,
      }
      console.dir(tx)
      try {
        walletSigner.sendTransaction(tx).then((transaction) => {
          console.dir(transaction)
          alert("Wysyłanie zakończone!")
        })
      } catch (error) {
        alert("wysyłanie nie powiodło się!!")
      }
    }
  })
}
```
