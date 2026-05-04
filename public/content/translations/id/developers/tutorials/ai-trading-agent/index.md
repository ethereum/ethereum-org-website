---
title: Buat agen perdagangan AI Anda sendiri di Ethereum
description: Dalam tutorial ini Anda akan belajar cara membuat agen perdagangan AI sederhana. Agen ini membaca informasi dari blockchain, meminta rekomendasi dari LLM berdasarkan informasi tersebut, melakukan perdagangan yang direkomendasikan LLM, lalu menunggu dan mengulanginya.
author: Ori Pomerantz
tags: ["AI", "perdagangan", "agen", "Python"]
skill: intermediate
published: 2026-02-13
lang: id
sidebarDepth: 3
---

Dalam tutorial ini Anda akan belajar cara membangun agen perdagangan AI sederhana. Agen ini bekerja menggunakan langkah-langkah berikut:

1. Membaca harga token saat ini dan di masa lalu, serta informasi lain yang berpotensi relevan
2. Membangun kueri dengan informasi ini, beserta informasi latar belakang untuk menjelaskan bagaimana hal itu mungkin relevan
3. Mengirimkan kueri dan menerima kembali proyeksi harga
4. Berdagang berdasarkan rekomendasi
5. Menunggu dan mengulangi

Agen ini mendemonstrasikan cara membaca informasi, menerjemahkannya ke dalam kueri yang menghasilkan jawaban yang dapat digunakan, dan menggunakan jawaban tersebut. Semua ini adalah langkah-langkah yang diperlukan untuk agen AI. Agen ini diimplementasikan dalam Python karena ini adalah bahasa yang paling umum digunakan dalam AI.

## Mengapa melakukan ini? {#why-do-this}

Agen perdagangan otomatis memungkinkan pengembang untuk memilih dan mengeksekusi strategi perdagangan. [Agen AI](/ai-agents) memungkinkan strategi perdagangan yang lebih kompleks dan dinamis, berpotensi menggunakan informasi dan algoritma yang bahkan belum dipertimbangkan oleh pengembang.

## Alat-alat {#tools}

Tutorial ini menggunakan [Python](https://www.python.org/), [pustaka Web3](https://web3py.readthedocs.io/en/stable/), dan [Uniswap v3](https://github.com/Uniswap/v3-periphery) untuk penawaran harga dan perdagangan.

### Mengapa Python? {#python}

Bahasa yang paling banyak digunakan untuk AI adalah [Python](https://www.python.org/), jadi kami menggunakannya di sini. Jangan khawatir jika Anda tidak tahu Python. Bahasanya sangat jelas, dan saya akan menjelaskan dengan tepat apa yang dilakukannya.

[Pustaka Web3](https://web3py.readthedocs.io/en/stable/) adalah API Ethereum Python yang paling umum. Ini cukup mudah digunakan.

### Berdagang di blockchain {#trading-on-blockchain}

Ada [banyak pertukaran terdesentralisasi (DEX)](/apps/categories/defi/) yang memungkinkan Anda memperdagangkan token di Ethereum. Namun, mereka cenderung memiliki nilai tukar yang serupa karena [arbitrase](/developers/docs/smart-contracts/composability/#better-user-experience).

[Uniswap](https://app.uniswap.org/) adalah DEX yang banyak digunakan yang dapat kita gunakan untuk penawaran harga (untuk melihat nilai relatif token) dan perdagangan.

### OpenAI {#openai}

Untuk model bahasa besar (LLM), saya memilih untuk memulai dengan [OpenAI](https://openai.com/). Untuk menjalankan aplikasi dalam tutorial ini, Anda harus membayar akses API. Pembayaran minimum sebesar $5 sudah lebih dari cukup.

## Pengembangan, langkah demi langkah {#step-by-step}

Untuk menyederhanakan pengembangan, kita melanjutkan secara bertahap. Setiap langkah adalah cabang (branch) di GitHub.

### Memulai {#getting-started}

Berikut adalah langkah-langkah untuk memulai di bawah UNIX atau Linux (termasuk [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Jika Anda belum memilikinya, unduh dan instal [Python](https://www.python.org/downloads/).

2. Klon repositori GitHub.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
```

3. Instal [`uv`](https://docs.astral.sh/uv/getting-started/installation/). Perintah pada sistem Anda mungkin berbeda.

   ```sh
   pipx install uv
```

4. Unduh pustaka-pustaka tersebut.

   ```sh
   uv sync
```

5. Aktifkan lingkungan virtual.

   ```sh
   source .venv/bin/activate
```

6. Untuk memverifikasi bahwa Python dan Web3 berfungsi dengan benar, jalankan `python3` dan berikan program ini. Anda dapat memasukkannya pada prompt `>>>`; tidak perlu membuat file.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
```

### Membaca dari blockchain {#read-blockchain}

Langkah selanjutnya adalah membaca dari blockchain. Untuk melakukannya, Anda perlu beralih ke cabang `02-read-quote` dan kemudian menggunakan `uv` untuk menjalankan program.

```sh
git checkout 02-read-quote
uv run agent.py
```

Anda akan menerima daftar objek `Quote`, masing-masing dengan stempel waktu, harga, dan aset (saat ini selalu `WETH/USDC`).

Berikut adalah penjelasan baris demi baris.

```python
from web3 import Web3
from web3.contract import Contract
from decimal import Decimal, ROUND_HALF_UP
from dataclasses import dataclass
from datetime import datetime, timezone
from pprint import pprint
import time
import functools
import sys
```

Impor pustaka yang kita butuhkan. Pustaka tersebut dijelaskan di bawah ini saat digunakan.

```python
print = functools.partial(print, flush=True)
```

Mengganti `print` Python dengan versi yang selalu langsung mengeluarkan (flush) output. Ini berguna dalam skrip yang berjalan lama karena kita tidak ingin menunggu pembaruan status atau output debugging.

```python
MAINNET_URL = "https://eth.drpc.org"
```

URL untuk menuju ke mainnet. Anda bisa mendapatkannya dari [Node sebagai layanan](/developers/docs/nodes-and-clients/nodes-as-a-service/) atau menggunakan salah satu yang diiklankan di [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Blok mainnet Ethereum biasanya terjadi setiap dua belas detik, jadi ini adalah jumlah blok yang kita harapkan terjadi dalam suatu periode waktu. Perhatikan bahwa ini bukan angka pasti. Ketika [pengusul blok](/developers/docs/consensus-mechanisms/pos/block-proposal/) sedang down, blok tersebut dilewati, dan waktu untuk blok berikutnya adalah 24 detik. Jika kita ingin mendapatkan blok yang tepat untuk stempel waktu, kita akan menggunakan [pencarian biner](https://en.wikipedia.org/wiki/Binary_search). Namun, ini sudah cukup dekat untuk tujuan kita. Memprediksi masa depan bukanlah ilmu pasti.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

Ukuran siklus. Kita meninjau penawaran harga sekali per siklus dan mencoba memperkirakan nilai pada akhir siklus berikutnya.

```python
# The address of the pool we're reading # Alamat pool yang sedang kita baca
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Nilai penawaran harga diambil dari kolam Uniswap 3 USDC/WETH di alamat [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Alamat ini sudah dalam bentuk checksum, tetapi lebih baik menggunakan [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) untuk membuat kode dapat digunakan kembali.

```python
POOL_ABI = [
    { "name": "slot0", ... },
    { "name": "token0", ... },
    { "name": "token1", ... },
]

ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... }
]
```

Ini adalah [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) untuk dua kontrak yang perlu kita hubungi. Untuk menjaga agar kode tetap ringkas, kita hanya menyertakan fungsi yang perlu kita panggil.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Inisialisasi pustaka [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) dan hubungkan ke node Ethereum.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Ini adalah salah satu cara untuk membuat kelas data di Python. Tipe data [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) digunakan untuk terhubung ke kontrak. Perhatikan `(frozen=True)`. Dalam Python [boolean](https://en.wikipedia.org/wiki/Boolean_data_type) didefinisikan sebagai `True` atau `False`, dengan huruf kapital. Kelas data ini `frozen` (dibekukan), yang berarti bidang-bidangnya tidak dapat dimodifikasi.

Perhatikan indentasinya. Berbeda dengan [bahasa turunan C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python menggunakan indentasi untuk menunjukkan blok. Interpreter Python tahu bahwa definisi berikut bukan bagian dari kelas data ini karena tidak dimulai pada indentasi yang sama dengan bidang kelas data.

```python
@dataclass(frozen=True)
class PoolInfo:
    address: str
    token0: ERC20Token
    token1: ERC20Token
    contract: Contract
    asset: str
    decimal_factor: Decimal = 1
```

Tipe [`Decimal`](https://docs.python.org/3/library/decimal.html) digunakan untuk menangani pecahan desimal secara akurat.

```python
    def get_price(self, block: int) -> Decimal:
```

Ini adalah cara untuk mendefinisikan fungsi di Python. Definisinya diindentasi untuk menunjukkan bahwa ia masih bagian dari `PoolInfo`.

Dalam fungsi yang merupakan bagian dari kelas data, parameter pertama selalu `self`, instans kelas data yang dipanggil di sini. Di sini ada parameter lain, yaitu nomor blok.

```python
        assert block <= w3.eth.block_number, "Block is in the future"
```

Jika kita bisa membaca masa depan, kita tidak akan membutuhkan AI untuk berdagang.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Sintaks untuk memanggil fungsi pada EVM dari Web3 adalah ini: `<contract object>.functions.<function name>().call(<parameters>)`. Parameternya bisa berupa parameter fungsi EVM (jika ada; di sini tidak ada) atau [parameter bernama](https://en.wikipedia.org/wiki/Named_parameter) untuk memodifikasi perilaku blockchain. Di sini kita menggunakan satu, `block_identifier`, untuk menentukan [nomor blok](/developers/docs/apis/json-rpc/#default-block) yang ingin kita jalankan.

Hasilnya adalah [struct ini, dalam bentuk array](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). Nilai pertama adalah fungsi dari nilai tukar antara kedua token tersebut.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Untuk mengurangi perhitungan onchain, Uniswap v3 tidak menyimpan faktor pertukaran aktual melainkan akar kuadratnya. Karena EVM tidak mendukung matematika floating point atau pecahan, alih-alih nilai aktual, responsnya adalah <math><msqrt><mi>price</mi></msqrt><mo>&#x22C5;</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 per token0) # (token1 per token0)
        return 1/(raw_price * self.decimal_factor)
```

Harga mentah yang kita dapatkan adalah jumlah `token0` yang kita dapatkan untuk setiap `token1`. Di kolam kita `token0` adalah USDC (stablecoin dengan nilai yang sama dengan dolar AS) dan `token1` adalah [WETH](https://opensea.io/learn/blockchain/what-is-weth). Nilai yang benar-benar kita inginkan adalah jumlah dolar per WETH, bukan kebalikannya.

Faktor desimal adalah rasio antara [faktor desimal](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) untuk kedua token tersebut.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Kelas data ini mewakili penawaran harga: harga aset tertentu pada titik waktu tertentu. Pada titik ini, bidang `asset` tidak relevan karena kita menggunakan satu kolam dan oleh karena itu memiliki satu aset. Namun, kita akan menambahkan lebih banyak aset nanti.

```python
def read_token(address: str) -> ERC20Token:
    token = w3.eth.contract(address=address, abi=ERC20_ABI)
    symbol = token.functions.symbol().call()
    decimals = token.functions.decimals().call()

    return ERC20Token(
        address=address,
        symbol=symbol,
        decimals=decimals,
        contract=token
    )
```

Fungsi ini mengambil alamat dan mengembalikan informasi tentang kontrak token di alamat tersebut. Untuk membuat [`Contract` Web3](https://web3py.readthedocs.io/en/stable/web3.contract.html) baru, kita memberikan alamat dan ABI ke `w3.eth.contract`.

```python
def read_pool(address: str) -> PoolInfo:
    pool_contract = w3.eth.contract(address=address, abi=POOL_ABI)
    token0Address = pool_contract.functions.token0().call()
    token1Address = pool_contract.functions.token1().call()
    token0 = read_token(token0Address)
    token1 = read_token(token1Address)

    return PoolInfo(
        address=address,
        asset=f"{token1.symbol}/{token0.symbol}",
        token0=token0,
        token1=token1,
        contract=pool_contract,
        decimal_factor=Decimal(10) ** Decimal(token0.decimals - token1.decimals)
    )
```

Fungsi ini mengembalikan semua yang kita butuhkan tentang [kolam tertentu](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). Sintaks `f"<string>"` adalah [string yang diformat](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Dapatkan objek `Quote`. Nilai default untuk `block_number` adalah `None` (tidak ada nilai).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Jika nomor blok tidak ditentukan, gunakan `w3.eth.block_number`, yang merupakan nomor blok terbaru. Ini adalah sintaks untuk [pernyataan `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Mungkin terlihat seolah-olah akan lebih baik untuk hanya mengatur default ke `w3.eth.block_number`, tetapi itu tidak berfungsi dengan baik karena itu akan menjadi nomor blok pada saat fungsi didefinisikan. Dalam agen yang berjalan lama, ini akan menjadi masalah.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Gunakan [pustaka `datetime`](https://docs.python.org/3/library/datetime.html) untuk memformatnya ke format yang dapat dibaca oleh manusia dan model bahasa besar (LLM). Gunakan [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) untuk membulatkan nilai menjadi dua tempat desimal.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Di Python Anda mendefinisikan [daftar (list)](https://docs.python.org/3/library/stdtypes.html#typesseq-list) yang hanya dapat berisi tipe tertentu menggunakan `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Di Python, [perulangan `for`](https://docs.python.org/3/tutorial/controlflow.html#for-statements) biasanya mengulangi sebuah daftar. Daftar nomor blok untuk menemukan penawaran harga berasal dari [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Untuk setiap nomor blok, dapatkan objek `Quote` dan tambahkan ke daftar `quotes`. Kemudian kembalikan daftar tersebut.

```python
pool = read_pool(WETHUSDC_ADDRESS)
quotes = get_quotes(
    pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS
)

pprint(quotes)
```

Ini adalah kode utama dari skrip. Baca informasi kolam, dapatkan dua belas penawaran harga, dan [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) mereka.

### Membuat prompt {#prompt}

Selanjutnya, kita perlu mengubah daftar penawaran harga ini menjadi prompt untuk LLM dan mendapatkan nilai masa depan yang diharapkan.

```sh
git checkout 03-create-prompt
uv run agent.py
```

Outputnya sekarang akan menjadi prompt ke LLM, mirip dengan:

```
Given these quotes:
Asset: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

Asset: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


What would you expect the value for WETH/USDC to be at time 2026-02-02T17:56?

Provide your answer as a single number rounded to two decimal places,
without any other text.
```

Perhatikan bahwa ada penawaran harga untuk dua aset di sini, `WETH/USDC` dan `WBTC/WETH`. Menambahkan penawaran harga dari aset lain mungkin meningkatkan akurasi prediksi.

#### Seperti apa bentuk prompt {#prompt-explanation}

Prompt ini berisi tiga bagian, yang cukup umum dalam prompt LLM.

1. Informasi. LLM memiliki banyak informasi dari pelatihannya, tetapi mereka biasanya tidak memiliki yang terbaru. Inilah alasan kita perlu mengambil penawaran harga terbaru di sini. Menambahkan informasi ke prompt disebut [retrieval augmented generation (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. Pertanyaan sebenarnya. Inilah yang ingin kita ketahui.

3. Instruksi pemformatan output. Biasanya, LLM akan memberi kita perkiraan dengan penjelasan tentang bagaimana ia mencapainya. Ini lebih baik untuk manusia, tetapi program komputer hanya membutuhkan hasil akhirnya.

#### Penjelasan kode {#prompt-code}

Berikut adalah kode barunya.

```python
from datetime import datetime, timezone, timedelta
```

Kita perlu memberikan LLM waktu yang kita inginkan untuk perkiraan. Untuk mendapatkan waktu "n menit/jam/hari" di masa depan, kita menggunakan [kelas `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# The addresses of the pools we're reading # Alamat-alamat pool yang sedang kita baca
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Kita memiliki dua kolam yang perlu kita baca.

```python
@dataclass(frozen=True)
class PoolInfo:
    .
    .
    .
    reverse: bool = False

    def get_price(self, block: int) -> Decimal:
        assert block <= w3.eth.block_number, "Block is in the future"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 per token0) # (token1 per token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

Di kolam WETH/USDC, kita ingin tahu berapa banyak `token0` (USDC) yang kita butuhkan untuk membeli satu `token1` (WETH). Di kolam WETH/WBTC, kita ingin tahu berapa banyak `token1` (WETH) yang kita butuhkan untuk membeli satu `token0` (WBTC, yang merupakan Bitcoin terbungkus). Kita perlu melacak apakah rasio kolam perlu dibalik.

```python
def read_pool(address: str, reverse: bool = False) -> PoolInfo:
    .
    .
    .

    return PoolInfo(
        .
        .
        .

        asset= f"{token1.symbol}/{token0.symbol}" if reverse else f"{token0.symbol}/{token1.symbol}",
        reverse=reverse
    )
```

Untuk mengetahui apakah sebuah kolam perlu dibalik, kita harus mendapatkannya sebagai input ke `read_pool`. Selain itu, simbol aset perlu diatur dengan benar.

Sintaks `<a> if <b> else <c>` adalah padanan Python dari [operator kondisional ternary](https://en.wikipedia.org/wiki/Ternary_conditional_operator), yang dalam bahasa turunan C akan menjadi `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Fungsi ini membangun string yang memformat daftar objek `Quote`, dengan asumsi semuanya berlaku untuk aset yang sama.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Di Python [literal string multi-baris](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) ditulis sebagai `"""` .... `"""`.

```python
Given these quotes:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Di sini, kita menggunakan pola [MapReduce](https://en.wikipedia.org/wiki/MapReduce) untuk menghasilkan string untuk setiap daftar penawaran harga dengan `format_quotes`, lalu mereduksinya menjadi satu string untuk digunakan dalam prompt.

```python
What would you expect the value for {asset} to be at time {expected_time}?

Provide your answer as a single number rounded to two decimal places,
without any other text.
    """
```

Sisa prompt adalah seperti yang diharapkan.

```python
wethusdc_pool = read_pool(WETHUSDC_ADDRESS, True)
wethusdc_quotes = get_quotes(
    wethusdc_pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS,
)

wethwbtc_pool = read_pool(WETHWBTC_ADDRESS)
wethwbtc_quotes = get_quotes(
    wethwbtc_pool,
    w3.eth.block_number - 12*CYCLE_BLOCKS,
    w3.eth.block_number,
    CYCLE_BLOCKS
)
```

Tinjau kedua kolam dan dapatkan penawaran harga dari keduanya.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Tentukan titik waktu masa depan yang kita inginkan untuk perkiraan, dan buat prompt.

### Berinteraksi dengan LLM {#interface-llm}

Selanjutnya, kita memberikan prompt ke LLM yang sebenarnya dan menerima nilai masa depan yang diharapkan. Saya menulis program ini menggunakan OpenAI, jadi jika Anda ingin menggunakan penyedia yang berbeda, Anda perlu menyesuaikannya.

1. Dapatkan [akun OpenAI](https://auth.openai.com/create-account)
2. [Isi dana akun](https://platform.openai.com/settings/organization/billing/overview)—jumlah minimum pada saat penulisan adalah $5
3. [Buat kunci API](https://platform.openai.com/settings/organization/api-keys)
4. Di baris perintah, ekspor kunci API agar program Anda dapat menggunakannya

   ```sh
   export OPENAI_API_KEY=sk-<the rest of the key goes here>
```

5. Checkout dan jalankan agen

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
```

Berikut adalah kode barunya.

```python
from openai import OpenAI

open_ai = OpenAI()  # The client reads the OPENAI_API_KEY environment variable # Klien membaca variabel lingkungan OPENAI_API_KEY
```

Impor dan instansiasi API OpenAI.

```python
response = open_ai.chat.completions.create(
    model="gpt-4-turbo",
    messages=[
        {"role": "user", "content": prompt}
    ],
    temperature=0.0,
    max_tokens=16,
)
```

Panggil API OpenAI (`open_ai.chat.completions.create`) untuk membuat respons.

```python
expected_price = Decimal(response.choices[0].message.content.strip())
current_price = wethusdc_quotes[-1].price

print ("Current price:", wethusdc_quotes[-1].price)
print(f"In {future_time}, expected price: {expected_price} USD")

if (expected_price > current_price):
    print(f"Buy, I expect the price to go up by {expected_price - current_price} USD")
else:
    print(f"Sell, I expect the price to go down by {current_price - expected_price} USD")
```

Keluarkan harga dan berikan rekomendasi beli atau jual.

#### Menguji prediksi {#testing-the-predictions}

Sekarang setelah kita dapat menghasilkan prediksi, kita juga dapat menggunakan data historis untuk menilai apakah kita menghasilkan prediksi yang berguna.

```sh
uv run test-predictor.py
```

Hasil yang diharapkan mirip dengan:

```
Prediction for 2026-01-05T19:50: predicted 3138.93 USD, real 3218.92 USD, error 79.99 USD
Prediction for 2026-01-06T19:56: predicted 3243.39 USD, real 3221.08 USD, error 22.31 USD
Prediction for 2026-01-07T20:02: predicted 3223.24 USD, real 3146.89 USD, error 76.35 USD
Prediction for 2026-01-08T20:11: predicted 3150.47 USD, real 3092.04 USD, error 58.43 USD
.
.
.
Prediction for 2026-01-31T22:33: predicted 2637.73 USD, real 2417.77 USD, error 219.96 USD
Prediction for 2026-02-01T22:41: predicted 2381.70 USD, real 2318.84 USD, error 62.86 USD
Prediction for 2026-02-02T22:49: predicted 2234.91 USD, real 2349.28 USD, error 114.37 USD
Mean prediction error over 29 predictions: 83.87103448275862068965517241 USD
Mean change per recommendation: 4.787931034482758620689655172 USD
Standard variance of changes: 104.42 USD
Profitable days: 51.72%
Losing days: 48.28%
```

Sebagian besar penguji identik dengan agen, tetapi berikut adalah bagian-bagian yang baru atau dimodifikasi.

```python
CYCLES_FOR_TEST = 40 # For the backtest, how many cycles we test over # Untuk backtest, berapa banyak siklus yang kita uji

# Get lots of quotes # Dapatkan banyak kuotasi
wethusdc_pool = read_pool(WETHUSDC_ADDRESS, True)
wethusdc_quotes = get_quotes(
    wethusdc_pool,
    w3.eth.block_number - CYCLE_BLOCKS*CYCLES_FOR_TEST,
    w3.eth.block_number,
    CYCLE_BLOCKS,
)

wethwbtc_pool = read_pool(WETHWBTC_ADDRESS)
wethwbtc_quotes = get_quotes(
    wethwbtc_pool,
    w3.eth.block_number - CYCLE_BLOCKS*CYCLES_FOR_TEST,
    w3.eth.block_number,
    CYCLE_BLOCKS
)
```

Kita melihat `CYCLES_FOR_TEST` (ditentukan sebagai 40 di sini) hari ke belakang.

```python
# Create predictions and check them against real history # Buat prediksi dan bandingkan dengan riwayat nyata

total_error = Decimal(0)
changes = []
```

Ada dua jenis kesalahan yang kita minati. Yang pertama, `total_error`, hanyalah jumlah kesalahan yang dibuat oleh prediktor.

Untuk memahami yang kedua, `changes`, kita perlu mengingat tujuan agen. Tujuannya bukan untuk memprediksi rasio WETH/USDC (harga ETH). Tujuannya adalah untuk mengeluarkan rekomendasi jual dan beli. Jika harga saat ini adalah $2000 dan ia memprediksi $2010 besok, kita tidak keberatan jika hasil sebenarnya adalah $2020 dan kita mendapatkan uang ekstra. Tetapi kita _akan_ keberatan jika ia memprediksi $2010, dan membeli ETH berdasarkan rekomendasi tersebut, lalu harganya turun menjadi $1990.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Kita hanya dapat melihat kasus di mana riwayat lengkap (nilai yang digunakan untuk prediksi dan nilai dunia nyata untuk membandingkannya) tersedia. Ini berarti kasus terbaru haruslah yang dimulai `CYCLES_BACK` yang lalu.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Gunakan [irisan (slices)](https://www.w3schools.com/python/ref_func_slice.asp) untuk mendapatkan jumlah sampel yang sama dengan jumlah yang digunakan agen. Kode antara di sini dan segmen berikutnya adalah kode dapatkan-prediksi yang sama dengan yang kita miliki di agen.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Dapatkan harga yang diprediksi, harga sebenarnya, dan harga pada saat prediksi. Kita membutuhkan harga pada saat prediksi untuk menentukan apakah rekomendasinya adalah membeli atau menjual.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediction for {prediction_time}: predicted {predicted_price} USD, real {real_price} USD, error {error} USD")
```

Hitung kesalahannya, dan tambahkan ke total.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Untuk `changes`, kita menginginkan dampak moneter dari membeli atau menjual satu ETH. Jadi pertama-tama, kita perlu menentukan rekomendasi, lalu menilai bagaimana harga sebenarnya berubah, dan apakah rekomendasi tersebut menghasilkan uang (perubahan positif) atau menghabiskan uang (perubahan negatif).

```python
print (f"Mean prediction error over {len(wethusdc_quotes)-CYCLES_BACK} predictions: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Mean change per recommendation: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Standard variance of changes: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Laporkan hasilnya.

```python
print (f"Profitable days: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Losing days: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Gunakan [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) untuk menghitung jumlah hari yang menguntungkan dan jumlah hari yang merugikan. Hasilnya adalah objek filter, yang perlu kita ubah menjadi daftar untuk mendapatkan panjangnya.

### Mengirimkan transaksi {#submit-txn}

Sekarang kita perlu benar-benar mengirimkan transaksi. Namun, saya tidak ingin menghabiskan uang sungguhan pada titik ini, sebelum sistemnya terbukti. Sebagai gantinya, kita akan membuat fork lokal dari mainnet, dan "berdagang" di jaringan tersebut.

Berikut adalah langkah-langkah untuk membuat fork lokal dan mengaktifkan perdagangan.

1. Instal [Foundry](https://getfoundry.sh/introduction/installation)

2. Mulai [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
```

   `anvil` mendengarkan pada URL default untuk Foundry, http://localhost:8545, jadi kita tidak perlu menentukan URL untuk [perintah `cast`](https://getfoundry.sh/cast/overview) yang kita gunakan untuk memanipulasi blockchain.

3. Saat berjalan di `anvil`, ada sepuluh akun pengujian yang memiliki ETH—atur variabel lingkungan untuk yang pertama

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
```

4. Ini adalah kontrak yang perlu kita gunakan. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) adalah kontrak Uniswap v3 yang kita gunakan untuk benar-benar berdagang. Kita bisa berdagang langsung melalui kolam, tetapi ini jauh lebih mudah.

   Dua variabel terbawah adalah jalur Uniswap v3 yang diperlukan untuk menukar antara WETH dan USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
```

5. Setiap akun pengujian memiliki 10.000 ETH. Gunakan kontrak WETH untuk membungkus 1000 ETH guna mendapatkan 1000 WETH untuk perdagangan.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
```

6. Gunakan `SwapRouter` untuk menukar 500 WETH dengan USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
```

   Panggilan `approve` membuat kelonggaran (allowance) yang memungkinkan `SwapRouter` untuk membelanjakan sebagian token kita. Kontrak tidak dapat memantau peristiwa, jadi jika kita mentransfer token langsung ke kontrak `SwapRouter`, ia tidak akan tahu bahwa ia telah dibayar. Sebagai gantinya, kita mengizinkan kontrak `SwapRouter` untuk membelanjakan jumlah tertentu, dan kemudian `SwapRouter` melakukannya. Ini dilakukan melalui fungsi yang dipanggil oleh `SwapRouter`, sehingga ia tahu apakah itu berhasil.

7. Verifikasi bahwa Anda memiliki cukup kedua token tersebut.

   ```sh
   cast call $WETH_ADDRESS "balanceOf(address)" $ADDRESS | cast from-wei
   echo `cast call $USDC_ADDRESS "balanceOf(address)" $ADDRESS | cast to-dec`/10^6 | bc
```

Sekarang setelah kita memiliki WETH dan USDC, kita dapat benar-benar menjalankan agen.

```sh
git checkout 05-trade
uv run agent.py
```

Outputnya akan terlihat mirip dengan:

```
(ai-trading-agent) qbzzt@Ori-Cloudnomics:~/260215-ai-agent$ uv run agent.py
Current price: 1843.16
In 2026-02-06T23:07, expected price: 1724.41 USD
Account balances before trade:
USDC Balance: 927301.578272
WETH Balance: 500
Sell, I expect the price to go down by 118.75 USD
Approve transaction sent: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Approve transaction mined.
Sell transaction sent: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Sell transaction mined.
Account balances after trade:
USDC Balance: 929143.797116
WETH Balance: 499
```

Untuk benar-benar menggunakannya, Anda memerlukan beberapa perubahan kecil.

- Di baris 14, ubah `MAINNET_URL` ke titik akses nyata, seperti `https://eth.drpc.org`
- Di baris 28, ubah `PRIVATE_KEY` ke kunci pribadi Anda sendiri
- Kecuali Anda sangat kaya dan dapat membeli atau menjual 1 ETH setiap hari untuk agen yang belum terbukti, Anda mungkin ingin mengubah baris 29 untuk mengurangi `WETH_TRADE_AMOUNT`

#### Penjelasan kode {#trading-code}

Berikut adalah kode barunya.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

Variabel yang sama yang kita gunakan pada langkah 4.

```python
WETH_TRADE_AMOUNT=1
```

Jumlah yang akan diperdagangkan.

```python
ERC20_ABI = [
    { "name": "symbol", ... },
    { "name": "decimals", ... },
    { "name": "balanceOf", ...},
    { "name": "approve", ...}
]
```

Untuk benar-benar berdagang, kita membutuhkan fungsi `approve`. Kita juga ingin menunjukkan saldo sebelum dan sesudah, jadi kita juga membutuhkan `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

Dalam ABI `SwapRouter` kita hanya membutuhkan `exactInput`. Ada fungsi terkait, `exactOutput`, yang bisa kita gunakan untuk membeli tepat satu WETH, tetapi demi kesederhanaan kita hanya menggunakan `exactInput` di kedua kasus.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Definisi Web3 untuk [`account`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) dan kontrak `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

Parameter transaksi. Kita membutuhkan fungsi di sini karena [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) harus berubah setiap saat.

```python
def approve_token(contract: Contract, amount: int):
```

Setujui kelonggaran token untuk `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Beginilah cara kita mengirim transaksi di Web3. Pertama kita menggunakan [objek `Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) untuk membangun transaksi. Kemudian kita menggunakan [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) untuk menandatangani transaksi, menggunakan `PRIVATE_KEY`. Terakhir, kita menggunakan [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) untuk mengirim transaksi.

```python
    print(f"Approve transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Approve transaction mined.")
```

[`w3.eth.wait_for_transaction_receipt`](https://web3py.readthedocs.io/en/stable/web3.eth.html#web3.eth.Eth.wait_for_transaction_receipt) menunggu hingga transaksi ditambang. Ini mengembalikan tanda terima jika diperlukan.

```python
SELL_PARAMS = {
    "path": WETH_TO_USDC,
    "recipient": account.address,
    "deadline": 2**256 - 1,
    "amountIn": WETH_TRADE_AMOUNT * 10 ** wethusdc_pool.token1.decimals,
    "amountOutMinimum": 0,
}
```

Ini adalah parameter saat menjual WETH.

```python
def make_buy_params(quote: Quote) -> dict:
    return {
        "path": USDC_TO_WETH,
        "recipient": account.address,
        "deadline": 2**256 - 1,
        "amountIn": int(quote.price*WETH_TRADE_AMOUNT) * 10**wethusdc_pool.token0.decimals,
        "amountOutMinimum": 0,
    }
```

Berbeda dengan `SELL_PARAMS`, parameter beli dapat berubah. Jumlah input adalah biaya 1 WETH, seperti yang tersedia di `quote`.

```python
def buy(quote: Quote):
    buy_params = make_buy_params(quote)
    approve_token(wethusdc_pool.token0.contract, buy_params["amountIn"])
    txn = swap_router.functions.exactInput(buy_params).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Buy transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Buy transaction mined.")


def sell():
    approve_token(wethusdc_pool.token1.contract,
                  WETH_TRADE_AMOUNT * 10**wethusdc_pool.token1.decimals)
    txn = swap_router.functions.exactInput(SELL_PARAMS).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Sell transaction sent: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Sell transaction mined.")
```

Fungsi `buy()` dan `sell()` hampir identik. Pertama kita menyetujui kelonggaran yang cukup untuk `SwapRouter`, dan kemudian kita memanggilnya dengan jalur dan jumlah yang benar.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Laporkan saldo pengguna di kedua mata uang.

```python
print("Account balances before trade:")
balances()

if (expected_price > current_price):
    print(f"Buy, I expect the price to go up by {expected_price - current_price} USD")
    buy(wethusdc_quotes[-1])
else:
    print(f"Sell, I expect the price to go down by {current_price - expected_price} USD")
    sell()

print("Account balances after trade:")
balances()
```

Agen ini saat ini hanya bekerja sekali. Namun, Anda dapat mengubahnya agar bekerja terus menerus baik dengan menjalankannya dari [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) atau dengan membungkus baris 368-400 dalam sebuah perulangan dan menggunakan [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) untuk menunggu hingga tiba waktunya untuk siklus berikutnya.

## Kemungkinan perbaikan {#improvements}

Ini bukan versi produksi penuh; ini hanyalah contoh untuk mengajarkan dasar-dasarnya. Berikut adalah beberapa ide untuk perbaikan.

### Perdagangan yang lebih cerdas {#smart-trading}

Ada dua fakta penting yang diabaikan agen saat memutuskan apa yang harus dilakukan.

- _Besarnya perubahan yang diantisipasi_. Agen menjual jumlah `WETH` yang tetap jika harga diperkirakan akan turun, terlepas dari besarnya penurunan tersebut.
  Bisa dibilang, akan lebih baik untuk mengabaikan perubahan kecil dan menjual berdasarkan seberapa banyak kita memperkirakan harga akan turun.
- _Portofolio saat ini_. Jika 10% dari portofolio Anda ada di WETH dan Anda pikir harganya akan naik, mungkin masuk akal untuk membeli lebih banyak. Tetapi jika 90% dari portofolio Anda ada di WETH, Anda mungkin sudah cukup terekspos, dan tidak perlu membeli lebih banyak. Kebalikannya berlaku jika Anda memperkirakan harga akan turun.

### Bagaimana jika Anda ingin merahasiakan strategi perdagangan Anda? {#secret}

Vendor AI dapat melihat kueri yang Anda kirim ke LLM mereka, yang dapat mengekspos sistem perdagangan jenius yang Anda kembangkan dengan agen Anda. Sistem perdagangan yang digunakan terlalu banyak orang tidak ada nilainya karena terlalu banyak orang mencoba membeli saat Anda ingin membeli (dan harganya naik) dan mencoba menjual saat Anda ingin menjual (dan harganya turun).

Anda dapat menjalankan LLM secara lokal, misalnya, menggunakan [LM-Studio](https://lmstudio.ai/), untuk menghindari masalah ini.

### Dari bot AI ke agen AI {#bot-to-agent}

Anda dapat membuat argumen yang bagus bahwa ini adalah [bot AI, bukan agen AI](/ai-agents/#ai-agents-vs-ai-bots). Ini mengimplementasikan strategi yang relatif sederhana yang bergantung pada informasi yang telah ditentukan sebelumnya. Kita dapat mengaktifkan peningkatan diri, misalnya, dengan memberikan daftar kolam Uniswap v3 dan nilai terbarunya serta menanyakan kombinasi mana yang memiliki nilai prediktif terbaik.

### Perlindungan slippage {#slippage-protection}

Saat ini tidak ada [perlindungan slippage](https://uniswapv3book.com/milestone_3/slippage-protection.html). Jika penawaran harga saat ini adalah $2000, dan harga yang diharapkan adalah $2100, agen akan membeli. Namun, jika sebelum agen membeli biayanya naik menjadi $2200, tidak masuk akal lagi untuk membeli.

Untuk mengimplementasikan perlindungan slippage, tentukan nilai `amountOutMinimum` di baris 325 dan 334 dari [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Kesimpulan {#conclusion}

Semoga, sekarang Anda tahu cukup banyak untuk memulai dengan agen AI. Ini bukan gambaran komprehensif tentang subjek tersebut; ada seluruh buku yang didedikasikan untuk itu, tetapi ini cukup untuk membantu Anda memulai. Semoga berhasil!

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).