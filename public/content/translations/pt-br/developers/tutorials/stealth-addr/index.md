---
title: "Usando endereços secretos"
description: "Endereços secretos permitem que os usuários transfiram ativos anonimamente. Após ler este artigo, você será capaz de: Explicar o que são endereços secretos e como eles funcionam, entender como usar endereços secretos de uma forma que preserve o anonimato e escrever uma aplicação web que use endereços secretos."
author: |
  Ori Pomerantz
tags:
  [
    "Endereço secreto",
    "privacidade",
    "criptografia",
    "rust",
    "wasm"
  ]
skill: intermediate
published: 2025-11-30
lang: pt-br
sidebarDepth: 3
---

Você é o Bill. Por razões que não vamos entrar em detalhes, você quer fazer uma doação para a campanha "Alice para Rainha do Mundo" e que a Alice saiba que você doou para que ela o recompense se ganhar. Infelizmente, a vitória dela não é garantida. Existe uma campanha concorrente, "Carol para Imperatriz do Sistema Solar". Se a Carol ganhar, e ela descobrir que você doou para a Alice, você terá problemas. Então você não pode simplesmente transferir 200 ETH da sua conta para a da Alice.

O [ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) tem a solução. Este ERC explica como usar [endereços secretos](https://nerolation.github.io/stealth-utils) para transferência anônima.

**Aviso**: A criptografia por trás dos endereços secretos é, até onde sabemos, sólida. No entanto, existem potenciais ataques de canal lateral. [Abaixo](#go-wrong), você verá o que pode fazer para reduzir este risco.

## Como os endereços secretos funcionam {#how}

Este artigo tentará explicar os endereços secretos de duas maneiras. A primeira é [como usá-los](#how-use). Esta parte é suficiente para entender o resto do artigo. Depois, há [uma explicação da matemática por trás disso](#how-math). Se você estiver interessado em criptografia, leia esta parte também.

### A versão simples (como usar endereços secretos) {#how-use}

Alice cria duas chaves privadas e publica as chaves públicas correspondentes (que podem ser combinadas em um único meta-endereço de comprimento duplo). Bill também cria uma chave privada e publica a chave pública correspondente.

Usando a chave pública de uma parte e a chave privada da outra, você pode derivar um segredo compartilhado conhecido apenas por Alice e Bill (ele não pode ser derivado apenas das chaves públicas). Usando este segredo compartilhado, Bill obtém o endereço secreto e pode enviar ativos para ele.

Alice também obtém o endereço a partir do segredo compartilhado, mas como ela conhece as chaves privadas para as chaves públicas que publicou, ela também pode obter a chave privada que lhe permite sacar desse endereço.

### A matemática (por que endereços secretos funcionam assim) {#how-math}

Endereços secretos padrão usam [criptografia de curva elíptica (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) para obter melhor desempenho com menos bits de chave, mantendo o mesmo nível de segurança. Mas, na maior parte, podemos ignorar isso e fingir que estamos usando aritmética regular.

Existe um número que todos conhecem, _G_. Você pode multiplicar por _G_. Mas, devido à natureza da ECC, é praticamente impossível dividir por _G_. A forma como a criptografia de chave pública geralmente funciona no Ethereum é que você pode usar uma chave privada, _P<sub>priv</sub>_, para assinar transações que são então verificadas por uma chave pública, _P<sub>pub</sub> = GP<sub>priv</sub>_.

Alice cria duas chaves privadas, _K<sub>priv</sub>_ e _V<sub>priv</sub>_. _K<sub>priv</sub>_ será usada para gastar dinheiro do endereço secreto, e _V<sub>priv</sub>_ para visualizar os endereços que pertencem a Alice. Alice então publica as chaves públicas: _K<sub>pub</sub> = GK<sub>priv</sub>_ e _V<sub>pub</sub> = GV<sub>priv</sub>_

Bill cria uma terceira chave privada, _R<sub>priv</sub>_, e publica _R<sub>pub</sub> = GR<sub>priv</sub>_ em um registro central (Bill também poderia tê-la enviado para Alice, mas assumimos que Carol está ouvindo).

Bill calcula _R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_, que ele espera que Alice também saiba (explicado abaixo). Este valor é chamado _S_, o segredo compartilhado. Isso dá a Bill uma chave pública, _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_. A partir desta chave pública, ele pode calcular um endereço e enviar quaisquer recursos que ele queira para ele. No futuro, se Alice ganhar, Bill pode dizer a ela _R<sub>priv</sub>_ para provar que os recursos vieram dele.

Alice calcula _R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_. Isso dá a ela o mesmo segredo compartilhado, _S_. Como ela conhece a chave privada, _K<sub>priv</sub>_, ela pode calcular _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_. Esta chave permite que ela acesse ativos no endereço que resulta de _P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)_.

Temos uma chave de visualização separada para permitir que Alice subcontrate os Serviços de Campanha de Dominação Mundial de Dave. Alice está disposta a deixar Dave saber os endereços públicos e informá-la quando mais dinheiro estiver disponível, mas ela não quer que ele gaste o dinheiro da campanha dela.

Como a visualização e o gasto usam chaves separadas, Alice pode dar a Dave _V<sub>priv</sub>_. Então Dave pode calcular _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ e dessa forma obter as chaves públicas (_P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_). Mas sem _K<sub>priv</sub>_ Dave não consegue obter a chave privada.

Para resumir, estes são os valores conhecidos pelos diferentes participantes.

| Alice                                                                     | Publicado         | Bill                                                                      | Dave                                                                        |                                                  |
| ------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------ |
| G                                                                         | G                 | G                                                                         | G                                                                           |                                                  |
| _K<sub>priv</sub>_                                                        | —                 | —                                                                         | —                                                                           |                                                  |
| _V<sub>priv</sub>_                                                        | —                 | —                                                                         | _V<sub>priv</sub>_                                                          |                                                  |
| _K<sub>pub</sub> = GK<sub>priv</sub>_                                     | _K<sub>pub</sub>_ | _K<sub>pub</sub>_                                                         | _K<sub>pub</sub>_                                                           |                                                  |
| _V<sub>pub</sub> = GV<sub>priv</sub>_                                     | _V<sub>pub</sub>_ | _V<sub>pub</sub>_                                                         | _V<sub>pub</sub>_                                                           |                                                  |
| —                                                                         | —                 | _R<sub>priv</sub>_                                                        | —                                                                           |                                                  |
| _R<sub>pub</sub>_                                                         | _R<sub>pub</sub>_ | _R<sub>pub</sub> = GR<sub>priv</sub>_                                     | _R<sub>pub</sub>_                                                           |                                                  |
| _S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | —                 | _S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>_ | _S = _R<sub>pub</sub>V<sub>priv</sub>_ = GR<sub>priv</sub>V<sub>priv</sub>_ |                                                  |
| _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | —                 | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_         | _P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)_           |                                                  |
| _Endereço=f(P<sub>pub</sub>)_                          | —                 | _Endereço=f(P<sub>pub</sub>)_                          | _Endereço=f(P<sub>pub</sub>)_                            | _Endereço=f(P<sub>pub</sub>)_ |
| _P<sub>priv</sub> = K<sub>priv</sub>+hash(S)_          | —                 | —                                                                         | —                                                                           |                                                  |

## Quando os endereços secretos dão errado {#go-wrong}

_Não há segredos na cadeia de blocos_. Embora os endereços secretos possam fornecer privacidade, essa privacidade é suscetível à análise de tráfego. Para dar um exemplo trivial, imagine que Bill financia um endereço e imediatamente envia uma transação para publicar um valor _R<sub>pub</sub>_. Sem o _V<sub>priv</sub>_ de Alice, não podemos ter certeza de que este é um endereço secreto, mas essa é a aposta mais segura. Em seguida, vemos outra transação que transfere todo o ETH desse endereço para o endereço do fundo de campanha de Alice. Podemos não ser capazes de provar, mas é provável que Bill tenha acabado de doar para a campanha de Alice. Carol certamente pensaria assim.

É fácil para Bill separar a publicação de _R<sub>pub</sub>_ do financiamento do endereço secreto (fazê-los em momentos diferentes, a partir de endereços diferentes). No entanto, isso não é suficiente. O padrão que Carol procura é que Bill financie um endereço e, em seguida, o fundo de campanha de Alice saca dele.

Uma solução é a campanha de Alice não sacar o dinheiro diretamente, mas usá-lo para pagar um terceiro. Se a campanha de Alice envia 10 ETH para os Serviços de Campanha de Dominação Mundial de Dave, Carol só sabe que Bill doou para um dos clientes de Dave. Se Dave tiver clientes suficientes, Carol não seria capaz de saber se Bill doou para Alice, que compete com ela, ou para Adam, Albert ou Abigail, com quem Carol não se importa. Alice pode incluir um valor com hash no pagamento e, em seguida, fornecer a Dave a pré-imagem, para provar que foi sua doação. Alternativamente, como observado acima, se Alice der a Dave seu _V<sub>priv</sub>_, ele já saberá de quem veio o pagamento.

O principal problema com essa solução é que ela exige que Alice se preocupe com o sigilo quando esse sigilo beneficia Bill. Alice pode querer manter sua reputação para que o amigo de Bill, Bob, também doe para ela. Mas também é possível que ela não se importe em expor Bill, porque então ele ficará com medo do que acontecerá se Carol vencer. Bill pode acabar dando ainda mais apoio a Alice.

### Usando várias camadas secretas {#multi-layer}

Em vez de confiar em Alice para preservar a privacidade de Bill, o próprio Bill pode fazê-lo. Ele pode gerar múltiplos meta-endereços para pessoas fictícias, Bob e Bella. Bill então envia ETH para Bob, e "Bob" (que na verdade é Bill) o envia para Bella. "Bella" (também Bill) o envia para Alice.

Carol ainda pode fazer análise de tráfego e ver o pipeline Bill-para-Bob-para-Bella-para-Alice. No entanto, se "Bob" e "Bella" também usarem ETH para outros fins, não parecerá que Bill transferiu nada para Alice, mesmo que Alice saque imediatamente do endereço secreto para seu endereço de campanha conhecido.

## Escrevendo uma aplicação de endereço secreto {#write-app}

Este artigo explica uma aplicação de endereço secreto [disponível no GitHub](https://github.com/qbzzt/251022-stealth-addresses.git).

### Ferramentas {#tools}

Existe [uma biblioteca de endereço secreto em typescript](https://github.com/ScopeLift/stealth-address-sdk) que poderíamos usar. No entanto, operações criptográficas podem ser intensivas em CPU. Prefiro implementá-las em uma linguagem compilada, como [Rust](https://rust-lang.org/), e usar [WASM](https://webassembly.org/) para executar o código no navegador.

Vamos usar [Vite](https://vite.dev/) e [React](https://react.dev/). Estas são ferramentas padrão da indústria; se você não estiver familiarizado com elas, pode usar [este tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Para usar o Vite, precisamos do Node.

### Veja os endereços secretos em ação {#in-action}

1. Instale as ferramentas necessárias: [Rust](https://rust-lang.org/tools/install/) e [Node](https://nodejs.org/en/download).

2. Clone o repositório do GitHub.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. Instale os pré-requisitos e compile o código Rust.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. Inicie o servidor web.

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. Acesse [a aplicação](http://localhost:5173/). Esta página da aplicação tem dois frames: um para a interface de usuário de Alice e outro para a de Bill. Os dois frames não se comunicam; eles estão na mesma página apenas por conveniência.

6. Como Alice, clique em **Gerar um Meta-endereço Secreto**. Isso exibirá o novo endereço secreto e as chaves privadas correspondentes. Copie o meta-endereço secreto para a área de transferência.

7. Como Bill, cole o novo meta-endereço secreto e clique em **Gerar um endereço**. Isso lhe dá o endereço para financiar Alice.

8. Copie o endereço e a chave pública de Bill e cole-os na área "Chave privada para endereço gerado por Bill" da interface do usuário de Alice. Depois que esses campos forem preenchidos, você verá a chave privada para acessar os ativos nesse endereço.

9. Você pode usar [uma calculadora online](https://iancoleman.net/ethereum-private-key-to-address/) para garantir que a chave privada corresponda ao endereço.

### Como o programa funciona {#how-the-program-works}

#### O componente WASM {#wasm}

O código-fonte que compila para WASM é escrito em [Rust](https://rust-lang.org/). Você pode vê-lo em [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Este código é principalmente uma interface entre o código JavaScript e [a biblioteca `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) em Rust é análogo a [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) em JavaScript. Ele contém informações do pacote, declarações de dependência, etc.

```toml
[package]
name = "rust-wasm"
version = "0.1.0"
edition = "2024"

[dependencies]
eth-stealth-addresses = "0.1.0"
hex = "0.4.3"
wasm-bindgen = "0.2.104"
getrandom = { version = "0.2", features = ["js"] }
```

O pacote [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) precisa gerar valores aleatórios. Isso não pode ser feito por meios puramente algorítmicos; requer acesso a um processo físico como fonte de entropia. Esta definição especifica que obteremos essa entropia perguntando ao navegador em que estamos executando.

```toml
console_error_panic_hook = "0.1.7"
```

[Esta biblioteca](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) nos dá mensagens de erro mais significativas quando o código WASM entra em pânico e não pode continuar.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

O tipo de saída necessário para produzir código WASM.

**`lib.rs`**

Este é o código Rust real.

```rust
use wasm_bindgen::prelude::*;
```

As definições para criar um pacote WASM a partir do Rust. Elas estão documentadas [aqui](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html).

```rust
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

As funções que precisamos da [biblioteca `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

```rust
use hex::{decode,encode};
```

Rust normalmente usa [arrays](https://doc.rust-lang.org/std/primitive.array.html) de bytes (`[u8; <size>]`) para valores. Mas em JavaScript, normalmente usamos strings hexadecimais. [A biblioteca `hex`](https://docs.rs/hex/latest/hex/) traduz para nós de uma representação para a outra.

```rust
#[wasm_bindgen]
```

Gere bindings WASM para poder chamar esta função a partir do JavaScript.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

A maneira mais fácil de retornar um objeto com vários campos é retornar uma string JSON.

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

A [`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) retorna três campos:

- O meta-endereço (_K<sub>pub</sub>_ e _V<sub>pub</sub>_)
- A chave privada de visualização (_V<sub>priv</sub>_)
- A chave privada de gastos (_K<sub>priv</sub>_)

A sintaxe de [tupla](https://doc.rust-lang.org/std/primitive.tuple.html) nos permite separar esses valores novamente.

```rust
    format!("{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Use a macro [`format!`](https://doc.rust-lang.org/std/fmt/index.html) para gerar a string codificada em JSON. Use [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) para alterar os arrays para strings hexadecimais.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Esta função transforma uma string hexadecimal (fornecida pelo JavaScript) em um array de bytes. Nós a usamos para analisar valores fornecidos pelo código JavaScript. Esta função é complicada por causa de como o Rust lida com arrays e vetores.

A expressão `<const N: usize>` é chamada de [genérica](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` é um parâmetro que controla o comprimento do array retornado. A função é na verdade chamada `str_to_array::<n>`, onde `n` é o comprimento do array.

O valor de retorno é `Option<[u8; N]>`, o que significa que o array retornado é [opcional](https://doc.rust-lang.org/std/option/). Este é um padrão típico em Rust para funções que podem falhar.

Por exemplo, se chamarmos `str_to_array::10("bad060a7")`, a função deveria retornar um array de dez valores, mas a entrada tem apenas quatro bytes. A função precisa falhar, e ela faz isso retornando `None`. O valor de retorno para `str_to_array::4("bad060a7")` seria `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode returns Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

A função [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) retorna um `Result<Vec<u8>, FromHexError>`. O tipo [`Result`](https://doc.rust-lang.org/std/result/) pode conter um resultado bem-sucedido (`Ok(value)`) ou um erro (`Err(error)`).

O método `.ok()` transforma o `Result` em um `Option`, cujo valor é o valor de `Ok()` se for bem-sucedido, ou `None` se não for. Finalmente, o [operador de ponto de interrogação](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) aborta as funções atuais e retorna um `None` se o `Option` estiver vazio. Caso contrário, ele desempacota o valor e o retorna (neste caso, para atribuir um valor a `vec`).

Este parece ser um método estranhamente complicado para lidar com erros, mas `Result` e `Option` garantem que todos os erros sejam tratados, de uma forma ou de outra.

```rust
    if vec.len() != N { return None; }
```

Se o número de bytes estiver incorreto, isso é uma falha e retornamos `None`.

```rust
    // try_into consome vec e tenta fazer [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust tem dois tipos de array. [Arrays](https://doc.rust-lang.org/std/primitive.array.html) têm um tamanho fixo. [Vetores](https://doc.rust-lang.org/std/vec/index.html) podem crescer e encolher. `hex::decode` retorna um vetor, mas a biblioteca `eth_stealth_addresses` quer receber arrays. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) converte um valor em outro tipo, por exemplo, um vetor em um array.

```rust
    Some(array)
}
```

Rust não exige que você use a palavra-chave [`return`](https://doc.rust-lang.org/std/keyword.return.html) ao retornar um valor no final de uma função.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Esta função recebe um meta-endereço público, que inclui tanto _V<sub>pub</sub>_ quanto _K<sub>pub</sub>_. Ele retorna o endereço secreto, a chave pública para publicar (_R<sub>pub</sub>_) e um valor de varredura de um byte que acelera a identificação de quais endereços publicados podem pertencer a Alice.

O valor de varredura faz parte do segredo compartilhado (_S = GR<sub>priv</sub>V<sub>priv</sub>_). Este valor está disponível para Alice, e verificá-lo é muito mais rápido do que verificar se _f(K<sub>pub</sub>+G\*hash(S))_ é igual ao endereço publicado.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

Usamos a função [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) da biblioteca.

```rust
    format!("{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

Prepare a string de saída codificada em JSON.

```rust
#[wasm_bindgen]
pub fn wasm_compute_stealth_key(
    address: &str, 
    bill_pub_key: &str, 
    view_private_key: &str,
    spend_private_key: &str    
) -> Option<String> {
    .
    .
    .
}
```

Esta função usa a função [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) da biblioteca para calcular a chave privada para sacar do endereço (_R<sub>priv</sub>_). Este cálculo requer estes valores:

- O endereço (_Endereço=f(P<sub>pub</sub>)_)
- A chave pública gerada por Bill (_R<sub>pub</sub>_)
- A chave privada de visualização (_V<sub>priv</sub>_)
- A chave privada de gastos (_K<sub>priv</sub>_)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) especifica que a função é executada quando o código WASM é inicializado.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Este código especifica que a saída de pânico seja enviada para o console JavaScript. Para vê-lo em ação, use a aplicação e dê a Bill um meta-endereço inválido (apenas mude um dígito hexadecimal). Você verá este erro no console do JavaScript:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Seguido por um rastreamento de pilha. Em seguida, dê a Bill o meta-endereço válido e a Alice um endereço inválido ou uma chave pública inválida. Você verá este erro:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Novamente, seguido por um rastreamento de pilha.

#### A interface do usuário {#ui}

A interface do usuário é escrita usando [React](https://react.dev/) e servida por [Vite](https://vite.dev/). Você pode aprender sobre eles usando [este tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Não há necessidade de [WAGMI](https://wagmi.sh/) aqui, porque não interagimos diretamente com uma cadeia de blocos ou uma carteira.

A única parte não óbvia da interface do usuário é a conectividade WASM. Funciona assim.

**`vite.config.js`**

Este arquivo contém [a configuração do Vite](https://vite.dev/config/).

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

Precisamos de dois plugins Vite: [react](https://www.npmjs.com/package/@vitejs/plugin-react) e [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

Este arquivo é o componente principal da aplicação. É um contêiner que inclui dois componentes: `Alice` e `Bill`, as interfaces de usuário para esses usuários. A parte relevante para o WASM é o código de inicialização.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Quando usamos [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), ele cria dois arquivos que usamos aqui: um arquivo wasm com o código real (aqui, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) e um arquivo JavaScript com as definições para usá-lo (aqui, `src/rust_wasm/pkg/rust_wasm.js`). A exportação padrão desse arquivo JavaScript é um código que precisa ser executado para iniciar o WASM.

```jsx
function App() {
    .
    .
    .
  useEffect(() => {
    const loadWasm = async () => {
      try {
        await init();
        setWasmReady(true)
      } catch (err) {
        console.error('Error loading wasm:', err)
        alert("Wasm error: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

O [hook `useEffect`](https://react.dev/reference/react/useEffect) permite que você especifique uma função que é executada quando as variáveis de estado mudam. Aqui, a lista de variáveis de estado está vazia (`[]`), então esta função é executada apenas uma vez quando a página carrega.

A função de efeito deve retornar imediatamente. Para usar código assíncrono, como o `init` do WASM (que precisa carregar o arquivo `.wasm` e, portanto, leva tempo), definimos uma função interna [`async`](https://en.wikipedia.org/wiki/Async/await) e a executamos sem um `await`.

**`Bill.jsx`**

Esta é a interface de usuário para Bill. Ele tem uma única ação, criar um endereço com base no meta-endereço secreto fornecido por Alice.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Além da exportação padrão, o código JavaScript gerado pelo `wasm-pack` exporta uma função para cada função no código WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Para chamar funções WASM, basta chamar a função exportada pelo arquivo JavaScript criado pelo `wasm-pack`.

**`Alice.jsx`**

O código em `Alice.jsx` é análogo, exceto que Alice tem duas ações:

- Gerar um meta-endereço
- Obter a chave privada para um endereço publicado por Bill

## Conclusão {#conclusion}

Endereços secretos não são uma panaceia; eles devem ser [usados corretamente](#go-wrong). Mas, quando usados corretamente, eles podem permitir a privacidade em uma cadeia de blocos pública.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).