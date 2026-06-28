---
title: "Usando endereços furtivos"
description: "Endereços furtivos permitem que os usuários transfiram ativos anonimamente. Após ler este artigo, você será capaz de: explicar o que são endereços furtivos e como eles funcionam, entender como usar endereços furtivos de uma forma que preserve o anonimato e escrever um aplicativo baseado na web que use endereços furtivos."
author: Ori Pomerantz
tags: ["Endereço furtivo", "privacidade", "criptografia", "Rust", "wasm"]
skill: intermediate
breadcrumb: "Endereços furtivos"
published: 2025-11-30
lang: pt-br
sidebarDepth: 3
---

Você é o Bill. Por motivos nos quais não entraremos, você quer doar para a campanha "Alice para Rainha do Mundo" e quer que a Alice saiba que você doou para que ela lhe dê uma recompensa se vencer. Infelizmente, a vitória dela não é garantida. Há uma campanha concorrente, "Carol para Imperatriz do Sistema Solar". Se a Carol vencer e descobrir que você doou para a Alice, você estará em apuros. Portanto, você não pode simplesmente fazer uma transferência de 200 ETH da sua conta para a da Alice.

O [ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) tem a solução. Este ERC explica como usar [endereços furtivos](https://nerolation.github.io/stealth-utils) para transferência anônima.

**Aviso**: A criptografia por trás dos endereços furtivos é, até onde sabemos, sólida. No entanto, existem possíveis ataques de canal lateral. [Abaixo](#go-wrong), você verá o que pode fazer para reduzir esse risco.

## Como os endereços furtivos funcionam {#how}

Este artigo tentará explicar os endereços furtivos de duas maneiras. A primeira é [como usá-los](#how-use). Esta parte é suficiente para entender o restante do artigo. Em seguida, há [uma explicação da matemática por trás disso](#how-math). Se você se interessa por criptografia, leia esta parte também. 

### A versão simples (como usar endereços furtivos) {#how-use}

Alice cria duas chaves privadas e publica as chaves públicas correspondentes (que podem ser combinadas em um único meta-endereço de comprimento duplo). Bill também cria uma chave privada e publica a chave pública correspondente.

Usando a chave pública de uma parte e a chave privada da outra, você pode derivar um segredo compartilhado conhecido apenas por Alice e Bill (ele não pode ser derivado apenas das chaves públicas). Usando esse segredo compartilhado, Bill obtém o endereço furtivo e pode enviar ativos para ele.

Alice também obtém o endereço a partir do segredo compartilhado, mas como ela conhece as chaves privadas das chaves públicas que publicou, ela também pode obter a chave privada que permite que ela faça saques desse endereço.

### A matemática (por que os endereços furtivos funcionam assim) {#how-math}

Endereços furtivos padrão usam [criptografia de curva elíptica (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) para obter melhor desempenho com menos bits de chave, mantendo o mesmo nível de segurança. Mas, na maior parte, podemos ignorar isso e fingir que estamos usando aritmética comum.

Há um número que todos conhecem, *G*. Você pode multiplicar por *G*. Mas devido à natureza da ECC, é praticamente impossível dividir por *G*. A maneira como a criptografia de chave pública geralmente funciona no Ethereum é que você pode usar uma chave privada, *P<sub>priv</sub>*, para assinar transações que são então verificadas por uma chave pública, *P<sub>pub</sub> = GP<sub>priv</sub>*. 

Alice cria duas chaves privadas, *K<sub>priv</sub>* e *V<sub>priv</sub>*. *K<sub>priv</sub>* será usada para gastar dinheiro do endereço furtivo, e *V<sub>priv</sub>* para visualizar os endereços que pertencem a Alice. Alice então publica as chaves públicas: *K<sub>pub</sub> = GK<sub>priv</sub>* e *V<sub>pub</sub> = GV<sub>priv</sub>*

Bill cria uma terceira chave privada, *R<sub>priv</sub>*, e publica *R<sub>pub</sub> = GR<sub>priv</sub>* em um registro central (Bill também poderia tê-la enviado para Alice, mas presumimos que Carol está ouvindo).

Bill calcula *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*, que ele espera que Alice também conheça (explicado abaixo). Esse valor é chamado de *S*, o segredo compartilhado. Isso dá a Bill uma chave pública, *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*. A partir dessa chave pública, ele pode calcular um endereço e enviar os recursos que quiser para ele. No futuro, se Alice vencer, Bill pode dizer a ela *R<sub>priv</sub>* para provar que os recursos vieram dele.

Alice calcula *R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*. Isso dá a ela o mesmo segredo compartilhado, *S*. Como ela conhece a chave privada, *K<sub>priv</sub>*, ela pode calcular *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)*. Essa chave permite que ela acesse ativos no endereço que resulta de *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)*.

Temos uma chave de visualização separada para permitir que Alice subcontrate os Serviços de Campanha de Dominação Mundial do Dave. Alice está disposta a deixar Dave saber os endereços públicos e informá-la quando mais dinheiro estiver disponível, mas ela não quer que ele gaste o dinheiro da campanha dela.

Como a visualização e o gasto usam chaves separadas, Alice pode dar a Dave *V<sub>priv</sub>*. Então Dave pode calcular *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* e, dessa forma, obter as chaves públicas (*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*). Mas sem *K<sub>priv</sub>*, Dave não pode obter a chave privada.

Para resumir, estes são os valores conhecidos pelos diferentes participantes.

| Alice | Publicado | Bill | Dave |
| - | - | - | - |
| G | G | G | G |
| *K<sub>priv</sub>* | - | - | - | 
| *V<sub>priv</sub>* | - | - | *V<sub>priv</sub>* |
| *K<sub>pub</sub> = GK<sub>priv</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* |
| *V<sub>pub</sub> = GV<sub>priv</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* |
| - | - | *R<sub>priv</sub>* | - |
| *R<sub>pub</sub>* | *R<sub>pub</sub>* | *R<sub>pub</sub> = GR<sub>priv</sub>* | *R<sub>pub</sub>* |
| *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | - | *S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | *S = *R<sub>pub</sub>V<sub>priv</sub>* = GR<sub>priv</sub>V<sub>priv</sub>* |
| *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | - | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* |
| *Endereço=f(P<sub>pub</sub>)* | - | *Endereço=f(P<sub>pub</sub>)* | *Endereço=f(P<sub>pub</sub>)* | *Endereço=f(P<sub>pub</sub>)*
| *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)* | - | - | - |

## Quando os endereços furtivos dão errado {#go-wrong}

*Não há segredos na blockchain*. Embora os endereços furtivos possam fornecer privacidade, essa privacidade é suscetível à análise de tráfego. Para pegar um exemplo trivial, imagine que Bill financia um endereço e imediatamente envia uma transação para publicar um valor *R<sub>pub</sub>*. Sem a *V<sub>priv</sub>* de Alice, não podemos ter certeza de que este é um endereço furtivo, mas é a aposta mais provável. Em seguida, vemos outra transação que transfere todo o ETH desse endereço para o endereço do fundo de campanha de Alice. Podemos não ser capazes de provar, mas é provável que Bill tenha acabado de doar para a campanha de Alice. Carol certamente pensaria assim.

É fácil para Bill separar a publicação de *R<sub>pub</sub>* do financiamento do endereço furtivo (fazer isso em momentos diferentes, a partir de endereços diferentes). No entanto, isso é insuficiente. O padrão que Carol procura é que Bill financie um endereço e, em seguida, o fundo de campanha de Alice faça saques dele. 

Uma solução é que a campanha de Alice não saque o dinheiro diretamente, mas o use para pagar um terceiro. Se a campanha de Alice enviar 10 ETH para os Serviços de Campanha de Dominação Mundial do Dave, Carol só saberá que Bill doou para um dos clientes do Dave. Se Dave tiver clientes suficientes, Carol não seria capaz de saber se Bill doou para Alice, que compete com ela, ou para Adam, Albert ou Abigail, com quem Carol não se importa. Alice pode incluir um valor de hash com o pagamento e, em seguida, fornecer a Dave a pré-imagem, para provar que foi a doação dela. Alternativamente, como observado acima, se Alice der a Dave sua *V<sub>priv</sub>*, ele já saberá de quem veio o pagamento.

O principal problema com essa solução é que ela exige que Alice se importe com o sigilo quando esse sigilo beneficia Bill. Alice pode querer manter sua reputação para que o amigo de Bill, Bob, também doe para ela. Mas também é possível que ela não se importe em expor Bill, porque então ele terá medo do que acontecerá se Carol vencer. Bill pode acabar fornecendo ainda mais apoio a Alice.

### Usando múltiplas camadas furtivas {#multi-layer}

Em vez de depender de Alice para preservar a privacidade de Bill, o próprio Bill pode fazer isso. Ele pode gerar vários meta-endereços para pessoas fictícias, Bob e Bella. Bill então envia ETH para Bob, e "Bob" (que na verdade é Bill) o envia para Bella. "Bella" (também Bill) o envia para Alice.

Carol ainda pode fazer análise de tráfego e ver o fluxo de Bill para Bob, para Bella e para Alice. No entanto, se "Bob" e "Bella" também usarem ETH para outros fins, não parecerá que Bill transferiu nada para Alice, mesmo que Alice saque imediatamente do endereço furtivo para seu endereço de campanha conhecido.

## Escrevendo um aplicativo de endereço furtivo {#write-app}

Este artigo explica um aplicativo de endereço furtivo [disponível no GitHub](https://github.com/qbzzt/251022-stealth-addresses.git). 

### Ferramentas {#tools}

Existe [uma biblioteca de endereço furtivo em TypeScript](https://github.com/ScopeLift/stealth-address-sdk) que poderíamos usar. No entanto, operações criptográficas podem exigir muito da CPU. Prefiro implementá-las em uma linguagem compilada, como [Rust](https://rust-lang.org/), e usar [WASM](https://webassembly.org/) para executar o código no navegador.

Vamos usar [Vite](https://vite.dev/) e [React](https://react.dev/). Estas são ferramentas padrão da indústria; se você não estiver familiarizado com elas, pode usar [este tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Para usar o Vite, precisamos do Node.

### Veja os endereços furtivos em ação {#in-action}

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

5. Navegue até [o aplicativo](http://localhost:5173/). Esta página do aplicativo tem dois quadros: um para a interface de usuário da Alice e outro para a do Bill. Os dois quadros não se comunicam; eles estão na mesma página apenas por conveniência.

6. Como Alice, clique em **Generate a Stealth Meta-Address** (Gerar um meta-endereço furtivo). Isso exibirá o novo endereço furtivo e as chaves privadas correspondentes. Copie o meta-endereço furtivo para a área de transferência.

7. Como Bill, cole o novo meta-endereço furtivo e clique em **Generate an address** (Gerar um endereço). Isso lhe dá o endereço para financiar para Alice. 

8. Copie o endereço e a chave pública de Bill e cole-os na área "Private key for address generated by Bill" (Chave privada para endereço gerado por Bill) da interface de usuário da Alice. Assim que esses campos forem preenchidos, você verá a chave privada para acessar os ativos nesse endereço.

9. Você pode usar [uma calculadora online](https://iancoleman.net/ethereum-private-key-to-address/) para garantir que a chave privada corresponda ao endereço.

### Como o programa funciona {#how-the-program-works}

#### O componente WASM {#wasm}

O código-fonte que compila em WASM é escrito em [Rust](https://rust-lang.org/). Você pode vê-lo em [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Este código é principalmente uma interface entre o código JavaScript e [a biblioteca `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) em Rust é análogo ao [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) em JavaScript. Ele contém informações do pacote, declarações de dependência, etc.

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

O pacote [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) precisa gerar valores aleatórios. Isso não pode ser feito por meios puramente algorítmicos; requer acesso a um processo físico como fonte de entropia. Esta definição especifica que obteremos essa entropia perguntando ao navegador em que estamos sendo executados.

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

Gere ligações (bindings) WASM para poder chamar esta função a partir do JavaScript.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

A maneira mais fácil de retornar um objeto com vários campos é retornar uma string JSON. 

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

O [`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) retorna três campos:

- O meta-endereço (*K<sub>pub</sub>* e *V<sub>pub</sub>*)
- A chave privada de visualização (*V<sub>priv</sub>*)
- A chave privada de gasto (*K<sub>priv</sub>*)

A sintaxe de [tupla](https://doc.rust-lang.org/std/primitive.tuple.html) nos permite separar esses valores novamente.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
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

Esta função transforma uma string hexadecimal (fornecida pelo JavaScript) em um array de bytes. Nós a usamos para analisar valores fornecidos pelo código JavaScript. Esta função é complicada devido à forma como o Rust lida com arrays e vetores.

A expressão `<const N: usize>` é chamada de [genérica](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` é um parâmetro que controla o comprimento do array retornado. A função é na verdade chamada de `str_to_array::<n>`, onde `n` é o comprimento do array.

O valor de retorno é `Option<[u8; N]>`, o que significa que o array retornado é [opcional](https://doc.rust-lang.org/std/option/). Este é um padrão típico em Rust para funções que podem falhar.

Por exemplo, se chamarmos `str_to_array::10("bad060a7")`, a função deve retornar um array de dez valores, mas a entrada tem apenas quatro bytes. A função precisa falhar, e faz isso retornando `None`. O valor de retorno para `str_to_array::4("bad060a7")` seria `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode retorna Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

A função [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) retorna um `Result<Vec<u8>, FromHexError>`. O tipo [`Result`](https://doc.rust-lang.org/std/result/) pode conter um resultado bem-sucedido (`Ok(value)`) ou um erro (`Err(error)`).

O método `.ok()` transforma o `Result` em um `Option`, cujo valor é o valor `Ok()` se for bem-sucedido ou `None` se não for. Finalmente, o [operador de ponto de interrogação](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) aborta as funções atuais e retorna um `None` se o `Option` estiver vazio. Caso contrário, ele desempacota o valor e o retorna (neste caso, para atribuir um valor a `vec`).

Isso parece um método estranhamente complicado para lidar com erros, mas `Result` e `Option` garantem que todos os erros sejam tratados, de uma forma ou de outra.

```rust
    if vec.len() != N { return None; }
```

Se o número de bytes estiver incorreto, isso é uma falha e retornamos `None`.

```rust
    // try_into consome vec e tenta criar [u8; N]
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

Esta função recebe um meta-endereço público, que inclui tanto *V<sub>pub</sub>* quanto *K<sub>pub</sub>*. Ela retorna o endereço furtivo, a chave pública a ser publicada (*R<sub>pub</sub>*) e um valor de varredura de um byte que acelera a identificação de quais endereços publicados podem pertencer a Alice.

O valor de varredura faz parte do segredo compartilhado (*S = GR<sub>priv</sub>V<sub>priv</sub>*). Esse valor está disponível para Alice, e verificá-lo é muito mais rápido do que verificar se *f(K<sub>pub</sub>+G\*hash(S))* é igual ao endereço publicado.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

Usamos o [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) da biblioteca.

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
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

Esta função usa o [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) da biblioteca para calcular a chave privada para sacar do endereço (*R<sub>priv</sub>*). Este cálculo requer estes valores:

- O endereço (*Endereço=f(P<sub>pub</sub>)*)
- A chave pública gerada por Bill (*R<sub>pub</sub>*)
- A chave privada de visualização (*V<sub>priv</sub>*)
- A chave privada de gasto (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) especifica que a função é executada quando o código WASM é inicializado.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Este código especifica que a saída de pânico seja enviada para o console JavaScript. Para vê-lo em ação, use o aplicativo e dê a Bill um meta-endereço inválido (basta alterar um dígito hexadecimal). Você verá este erro no console JavaScript:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Seguido por um rastreamento de pilha (stack trace). Em seguida, dê a Bill o meta-endereço válido e dê a Alice um endereço inválido ou uma chave pública inválida. Você verá este erro:

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Novamente, seguido por um rastreamento de pilha.

#### A interface de usuário {#ui}

A interface de usuário é escrita usando [React](https://react.dev/) e servida pelo [Vite](https://vite.dev/). Você pode aprender sobre eles usando [este tutorial](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Não há necessidade de [Wagmi](https://wagmi.sh/) aqui porque não interagimos diretamente com uma blockchain ou uma carteira.

A única parte não óbvia da interface de usuário é a conectividade WASM. Veja como funciona.

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

Precisamos de dois plugins do Vite: [react](https://www.npmjs.com/package/@vitejs/plugin-react) e [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

Este arquivo é o componente principal do aplicativo. É um contêiner que inclui dois componentes: `Alice` e `Bill`, as interfaces de usuário para esses usuários. A parte relevante para o WASM é o código de inicialização.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Quando usamos [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), ele cria dois arquivos que usamos aqui: um arquivo wasm com o código real (aqui, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) e um arquivo JavaScript com as definições para usá-lo (aqui, `src/rust_wasm/pkg/rust_wasm.js`). A exportação padrão desse arquivo JavaScript é o código que precisa ser executado para iniciar o WASM.

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

O [hook `useEffect`](https://react.dev/reference/react/useEffect) permite que você especifique uma função que é executada quando as variáveis de estado mudam. Aqui, a lista de variáveis de estado está vazia (`[]`), então esta função é executada apenas uma vez quando a página é carregada.

A função de efeito tem que retornar imediatamente. Para usar código assíncrono, como o `init` do WASM (que tem que carregar o arquivo `.wasm` e, portanto, leva tempo), definimos uma função interna [`async`](https://en.wikipedia.org/wiki/Async/await) e a executamos sem um `await`.

**`Bill.jsx`**

Esta é a interface de usuário para Bill. Ela tem uma única ação, criar um endereço com base no meta-endereço furtivo fornecido por Alice.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

Além da exportação padrão, o código JavaScript gerado por `wasm-pack` exporta uma função para cada função no código WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Para chamar funções WASM, basta chamarmos a função exportada pelo arquivo JavaScript criado por `wasm-pack`.

**`Alice.jsx`**

O código em `Alice.jsx` é análogo, exceto que Alice tem duas ações:

- Gerar um meta-endereço
- Obter a chave privada para um endereço publicado por Bill

## Conclusão {#conclusion}

Endereços furtivos não são uma panaceia; eles precisam ser [usados corretamente](#go-wrong). Mas quando usados corretamente, eles podem permitir a privacidade em uma blockchain pública.

[Veja aqui mais do meu trabalho](https://cryptodocguy.pro/).