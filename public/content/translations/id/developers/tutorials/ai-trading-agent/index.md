---
title: Buat agen perdagangan AI Anda sendiri di Ethereum
description: Dalam tutorial ini Anda akan belajar cara membuat agen perdagangan AI sederhana. Agen ini membaca informasi dari rantai blok, meminta rekomendasi dari LLM berdasarkan informasi tersebut, melakukan perdagangan yang direkomendasikan LLM, lalu menunggu dan mengulangi.
author: Ori Pomerantz
tags: [ "AI", "perdagangan", "agen", "python" ]
skill: intermediate
published: 2026-02-13
lang: id
sidebarDepth: 3
---

Dalam tutorial ini Anda akan belajar cara membangun agen perdagangan AI sederhana. Agen ini bekerja menggunakan langkah-langkah berikut:

1. Baca harga token saat ini dan yang lalu, serta informasi lain yang berpotensi relevan
2. Buat kueri dengan informasi ini, beserta informasi latar belakang untuk menjelaskan bagaimana informasi tersebut mungkin relevan
3. Kirimkan kueri dan terima kembali harga yang diproyeksikan
4. Perdagangkan berdasarkan rekomendasi
5. Tunggu dan ulangi

Agen ini menunjukkan cara membaca informasi, menerjemahkannya ke dalam kueri yang menghasilkan jawaban yang dapat digunakan, dan menggunakan jawaban tersebut. Semua ini adalah langkah-langkah yang diperlukan untuk agen AI. Agen ini diimplementasikan dalam Python karena ini adalah bahasa yang paling umum digunakan dalam AI.

## Mengapa melakukan ini? {#why-do-this}

Agen perdagangan otomatis memungkinkan pengembang untuk memilih dan menjalankan strategi perdagangan. [Agen AI](/ai-agents) memungkinkan strategi perdagangan yang lebih kompleks dan dinamis, berpotensi menggunakan informasi dan algoritma yang bahkan belum dipertimbangkan oleh pengembang untuk digunakan.

## Perangkat {#tools}

Tutorial ini menggunakan [Python](https://www.python.org/), [pustaka Web3](https://web3py.readthedocs.io/en/stable/), dan [Uniswap v3](https://github.com/Uniswap/v3-periphery) untuk kuotasi dan perdagangan.

### Mengapa Python? {#python}

Bahasa yang paling banyak digunakan untuk AI adalah [Python](https://www.python.org/), jadi kami menggunakannya di sini. Jangan khawatir jika Anda tidak tahu Python. Bahasa ini sangat jelas, dan saya akan menjelaskan dengan tepat apa yang dilakukannya.

[Pustaka Web3](https://web3py.readthedocs.io/en/stable/) adalah API Python Ethereum yang paling umum. Cukup mudah digunakan.

### Berdagang di rantai blok {#trading-on-blockchain}

Ada [banyak bursa terdesentralisasi (DEX)](/apps/categories/defi/) yang memungkinkan Anda memperdagangkan token di Ethereum. Namun, mereka cenderung memiliki nilai tukar yang serupa karena [arbitrase](/developers/docs/smart-contracts/composability/#better-user-experience).

[Uniswap](https://app.uniswap.org/) adalah DEX yang banyak digunakan yang dapat kita gunakan untuk kuotasi (untuk melihat nilai relatif token) dan perdagangan.

### OpenAI {#openai}

Untuk model bahasa besar, saya memilih untuk memulai dengan [OpenAI](https://openai.com/). Untuk menjalankan aplikasi dalam tutorial ini, Anda harus membayar untuk akses API. Pembayaran minimum sebesar $5 sudah lebih dari cukup.

## Pengembangan, langkah demi langkah {#step-by-step}

Untuk menyederhanakan pengembangan, kita akan melanjutkannya secara bertahap. Setiap langkah adalah sebuah cabang di GitHub.

### Memulai {#getting-started}

Ada langkah-langkah untuk memulai di bawah UNIX atau Linux (termasuk [WSL](https://learn.microsoft.com/en-us/windows/wsl/install))

1. Jika Anda belum memilikinya, unduh dan instal [Python](https://www.python.org/downloads/).

2. Kloning repositori GitHub.

   ```sh
   git clone https://github.com/qbzzt/260215-ai-agent.git -b 01-getting-started
   cd 260215-ai-agent
   ```

3. Instal [`uv`](https://docs.astral.sh/uv/getting-started/installation/). Perintah di sistem Anda mungkin berbeda.

   ```sh
   pipx install uv
   ```

4. Unduh pustaka.

   ```sh
   uv sync
   ```

5. Aktifkan lingkungan virtual.

   ```sh
   source .venv/bin/activate
   ```

6. Untuk memverifikasi Python dan Web3 berfungsi dengan benar, jalankan `python3` dan berikan program ini. Anda dapat memasukkannya di prompt `>>>`; tidak perlu membuat file.

   ```python
   from web3 import Web3
   MAINNET_URL = "https://eth.drpc.org"
   w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
   w3.eth.block_number
   quit()
   ```

### Membaca dari rantai blok {#read-blockchain}

Langkah selanjutnya adalah membaca dari rantai blok. Untuk melakukannya, Anda perlu beralih ke cabang `02-read-quote` lalu menggunakan `uv` untuk menjalankan program.

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

Impor pustaka yang kita butuhkan. Mereka dijelaskan di bawah ini saat digunakan.

```python
print = functools.partial(print, flush=True)
```

Mengganti `print` Python dengan versi yang selalu membersihkan keluaran dengan segera. Ini berguna dalam skrip yang berjalan lama karena kita tidak ingin menunggu pembaruan status atau keluaran debugging.

```python
MAINNET_URL = "https://eth.drpc.org"
```

Sebuah URL untuk menuju ke Jaringan Utama. Anda bisa mendapatkan satu dari [Simpul sebagai layanan](/developers/docs/nodes-and-clients/nodes-as-a-service/) atau menggunakan salah satu yang diiklankan di [Chainlist](https://chainlist.org/chain/1).

```python
BLOCK_TIME_SECONDS = 12
MINUTE_BLOCKS = int(60 / BLOCK_TIME_SECONDS)
HOUR_BLOCKS = MINUTE_BLOCKS * 60
DAY_BLOCKS = HOUR_BLOCKS * 24
```

Sebuah blok Jaringan Utama Ethereum biasanya terjadi setiap dua belas detik, jadi ini adalah jumlah blok yang kita harapkan terjadi dalam suatu periode waktu. Perhatikan bahwa ini bukan angka yang pasti. Ketika [pengusul blok](/developers/docs/consensus-mechanisms/pos/block-proposal/) tidak berfungsi, blok tersebut dilewati, dan waktu untuk blok berikutnya adalah 24 detik. Jika kita ingin mendapatkan blok yang tepat untuk stempel waktu, kita akan menggunakan [pencarian biner](https://en.wikipedia.org/wiki/Binary_search). Namun, ini sudah cukup dekat untuk tujuan kita. Memprediksi masa depan bukanlah ilmu pasti.

```python
CYCLE_BLOCKS = DAY_BLOCKS
```

Ukuran siklus. Kami meninjau kuotasi sekali per siklus dan mencoba memperkirakan nilai di akhir siklus berikutnya.

```python
# Alamat pool yang kita baca
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
```

Nilai kuotasi diambil dari pool Uniswap 3 USDC/WETH di alamat [`0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640`](https://eth.blockscout.com/address/0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640?tab=read_write_contract). Alamat ini sudah dalam bentuk checksum, tetapi lebih baik menggunakan [`Web3.to_checksum_address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_checksum_address) untuk membuat kode dapat digunakan kembali.

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

Ini adalah [ABI](https://docs.soliditylang.org/en/latest/abi-spec.html) untuk dua kontrak yang perlu kita hubungi. Untuk menjaga agar kode tetap ringkas, kami hanya menyertakan fungsi yang perlu kami panggil.

```python
w3 = Web3(Web3.HTTPProvider(MAINNET_URL))
```

Mulai pustaka [`Web3`](https://web3py.readthedocs.io/en/stable/quickstart.html#remote-providers) dan sambungkan ke simpul Ethereum.

```python
@dataclass(frozen=True)
class ERC20Token:
    address: str
    symbol: str
    decimals: int
    contract: Contract
```

Ini adalah salah satu cara untuk membuat kelas data di Python. Tipe data [`Contract`](https://web3py.readthedocs.io/en/stable/web3.contract.html) digunakan untuk terhubung ke kontrak. Perhatikan `(frozen=True)`. Dalam Python, [boolean](https://en.wikipedia.org/wiki/Boolean_data_type) didefinisikan sebagai `True` atau `False`, dengan huruf besar. Kelas data ini `beku` (frozen), artinya bidang-bidangnya tidak dapat dimodifikasi.

Perhatikan indentasi. Berbeda dengan [bahasa turunan C](https://en.wikipedia.org/wiki/List_of_C-family_programming_languages), Python menggunakan indentasi untuk menunjukkan blok. Interpreter Python tahu bahwa definisi berikut bukan bagian dari kelas data ini karena tidak dimulai pada indentasi yang sama dengan bidang kelas data.

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

Ini adalah cara untuk mendefinisikan sebuah fungsi di Python. Definisi tersebut diberi indentasi untuk menunjukkan bahwa ia masih merupakan bagian dari `PoolInfo`.

Dalam sebuah fungsi yang merupakan bagian dari kelas data, parameter pertama selalu `self`, yaitu instance kelas data yang memanggilnya. Di sini ada parameter lain, yaitu nomor blok.

```python
        assert block <= w3.eth.block_number, "Blok ada di masa depan"
```

Jika kita bisa membaca masa depan, kita tidak akan memerlukan AI untuk berdagang.

```python
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
```

Sintaks untuk memanggil fungsi di EVM dari Web3 adalah ini: `<objek kontrak>.functions.<nama fungsi>().call(<parameter>). Parameter dapat berupa parameter fungsi EVM (jika ada; di sini tidak ada) atau [parameter bernama](https://en.wikipedia.org/wiki/Named_parameter) untuk mengubah perilaku rantai blok. Di sini kita menggunakan satu, `block_identifier`, untuk menentukan [nomor blok](/developers/docs/apis/json-rpc/#default-block) yang ingin kita jalankan.

Hasilnya adalah [struct ini, dalam bentuk array](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol#L56-L72). Nilai pertama adalah fungsi dari nilai tukar antara dua token.

```python
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2
```

Untuk mengurangi kalkulasi di dalam rantai, Uniswap v3 tidak menyimpan faktor pertukaran aktual tetapi akar kuadratnya. Karena EVM tidak mendukung matematika titik mengambang atau pecahan, alih-alih nilai aktual, responsnya adalah <math><msqrt><mi>harga</mi></msqrt><mo>&#x22C5</mo><msup><mn>2</mn><mn>96</mn></msup></math>

```python
         # (token1 per token0)
        return 1/(raw_price * self.decimal_factor)
```

Harga mentah yang kita dapatkan adalah jumlah `token0` yang kita peroleh untuk setiap `token1`. Di pool kami, `token0` adalah USDC (Koin Stabil dengan nilai yang sama dengan dolar AS) dan `token1` adalah [WETH](https://opensea.io/learn/blockchain/what-is-weth). Nilai yang sebenarnya kita inginkan adalah jumlah dolar per WETH, bukan kebalikannya.

Faktor desimal adalah rasio antara [faktor desimal](https://docs.openzeppelin.com/contracts/4.x/erc20#a-note-on-decimals) untuk kedua token tersebut.

```python
@dataclass(frozen=True)
class Quote:
    timestamp: str
    price: Decimal
    asset: str
```

Kelas data ini mewakili sebuah kuotasi: harga aset tertentu pada titik waktu tertentu. Pada titik ini, bidang `asset` tidak relevan karena kita menggunakan satu pool dan oleh karena itu hanya memiliki satu aset. Namun, kami akan menambahkan lebih banyak aset nanti.

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

Fungsi ini mengambil sebuah alamat dan mengembalikan informasi tentang kontrak token di alamat tersebut. Untuk membuat [Kontrak Web3](https://web3py.readthedocs.io/en/stable/web3.contract.html) yang baru, kita memberikan alamat dan ABI ke `w3.eth.contract`.

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

Fungsi ini mengembalikan semua yang kita butuhkan tentang [pool tertentu](https://github.com/Uniswap/v3-core/blob/main/contracts/UniswapV3Pool.sol). Sintaks `f"<string>"` adalah [string yang diformat](https://docs.python.org/3/reference/lexical_analysis.html#f-strings).

```python
def get_quote(pool: PoolInfo, block_number: int = None) -> Quote:
```

Dapatkan objek `Quote`. Nilai default untuk `block_number` adalah `None` (tidak ada nilai).

```python
    if block_number is None:
        block_number = w3.eth.block_number
```

Jika nomor blok tidak ditentukan, gunakan `w3.eth.block_number`, yang merupakan nomor blok terbaru. Ini adalah sintaks untuk [pernyataan `if`](https://docs.python.org/3/reference/compound_stmts.html#the-if-statement).

Mungkin terlihat seolah-olah akan lebih baik jika hanya mengatur default ke `w3.eth.block_number`, tetapi itu tidak bekerja dengan baik karena itu akan menjadi nomor blok pada saat fungsi didefinisikan. Dalam agen yang berjalan lama, ini akan menjadi masalah.

```python
    block = w3.eth.get_block(block_number)
    price = pool.get_price(block_number)
    return Quote(
        timestamp=datetime.fromtimestamp(block.timestamp, timezone.utc).isoformat(),
        price=price.quantize(Decimal("0.01")),
        asset=pool.asset
    )
```

Gunakan [pustaka `datetime`](https://docs.python.org/3/library/datetime.html) untuk memformatnya ke format yang dapat dibaca oleh manusia dan model bahasa besar (LLM). Gunakan [`Decimal.quantize`](https://docs.python.org/3/library/decimal.html#decimal.Decimal.quantize) untuk membulatkan nilai ke dua tempat desimal.

```python
def get_quotes(pool: PoolInfo, start_block: int, end_block: int, step: int) -> list[Quote]:
```

Di Python Anda mendefinisikan sebuah [daftar](https://docs.python.org/3/library/stdtypes.html#typesseq-list) yang hanya dapat berisi tipe tertentu menggunakan `list[<type>]`.

```python
    quotes = []
    for block in range(start_block, end_block + 1, step):
```

Di Python sebuah [`for` loop](https://docs.python.org/3/tutorial/controlflow.html#for-statements) biasanya melakukan iterasi pada sebuah daftar. Daftar nomor blok untuk menemukan kutipan berasal dari [`range`](https://docs.python.org/3/library/stdtypes.html#range).

```python
        quote = get_quote(pool, block)
        quotes.append(quote)
    return quotes
```

Untuk setiap nomor blok, dapatkan objek `Quote` dan tambahkan ke daftar `quotes`. Kemudian kembalikan daftar itu.

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

Ini adalah kode utama dari skrip. Baca informasi pool, dapatkan dua belas kutipan, dan [`pprint`](https://docs.python.org/3/library/pprint.html#pprint.pprint) mereka.

### Membuat prompt {#prompt}

Selanjutnya, kita perlu mengubah daftar kutipan ini menjadi sebuah prompt untuk LLM dan mendapatkan nilai masa depan yang diharapkan.

```sh
git checkout 03-create-prompt
uv run agent.py
```

Outputnya sekarang akan menjadi prompt untuk LLM, mirip dengan:

```
Mengingat kutipan ini:
Aset: WETH/USDC
        2026-01-20T16:34 3016.21
        .
        .
        .
        2026-02-01T17:49 2299.10

Aset: WBTC/WETH
        2026-01-20T16:34 29.84
        .
        .
        .
        2026-02-01T17:50 33.46


Berapa nilai yang Anda harapkan untuk WETH/USDC pada waktu 2026-02-02T17:56?

Berikan jawaban Anda sebagai satu angka yang dibulatkan ke dua tempat desimal,
tanpa teks lain.
```

Perhatikan bahwa ada kutipan untuk dua aset di sini, `WETH/USDC` dan `WBTC/WETH`. Menambahkan kutipan dari aset lain mungkin meningkatkan akurasi prediksi.

#### Seperti apa bentuk sebuah prompt {#prompt-explanation}

Prompt ini berisi tiga bagian, yang cukup umum dalam prompt LLM.

1. Informasi. LLM memiliki banyak informasi dari pelatihan mereka, tetapi biasanya mereka tidak memiliki yang terbaru. Inilah alasan kita perlu mengambil kutipan terbaru di sini. Menambahkan informasi ke prompt disebut [retrieval augmented generation (RAG)](https://en.wikipedia.org/wiki/Retrieval-augmented_generation).

2. Pertanyaan sebenarnya. Inilah yang ingin kita ketahui.

3. Instruksi pemformatan output. Biasanya, LLM akan memberi kita perkiraan dengan penjelasan tentang bagaimana ia sampai pada perkiraan tersebut. Ini lebih baik untuk manusia, tetapi program komputer hanya membutuhkan hasil akhirnya.

#### Penjelasan kode {#prompt-code}

Berikut adalah kode barunya.

```python
from datetime import datetime, timezone, timedelta
```

Kita perlu memberikan LLM waktu yang kita inginkan untuk perkiraan. Untuk mendapatkan waktu "n menit/jam/hari" di masa depan, kita menggunakan [kelas `timedelta`](https://docs.python.org/3/library/datetime.html#datetime.timedelta).

```python
# Alamat pool yang kita baca
WETHUSDC_ADDRESS = Web3.to_checksum_address("0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640")
WETHWBTC_ADDRESS = Web3.to_checksum_address("0xCBCdF9626bC03E24f779434178A73a0B4bad62eD")
```

Kita memiliki dua pool yang perlu dibaca.

```python
@dataclass(frozen=True)
class PoolInfo:
    .
    .
    .
    reverse: bool = False

    def get_price(self, block: int) -> Decimal:
        assert block <= w3.eth.block_number, "Blok ada di masa depan"
        sqrt_price_x96 = Decimal(self.contract.functions.slot0().call(block_identifier=block)[0])
        raw_price = (sqrt_price_x96 / Decimal(2**96)) ** 2  # (token1 per token0)
        if self.reverse:
            return 1/(raw_price * self.decimal_factor)
        else:
            return raw_price * self.decimal_factor
```

Di pool WETH/USDC, kami ingin tahu berapa banyak `token0` (USDC) yang kami butuhkan untuk membeli satu `token1` (WETH). Di pool WETH/WBTC, kami ingin tahu berapa banyak `token1` (WETH) yang kami butuhkan untuk membeli satu `token0` (WBTC, yaitu Bitcoin terbungkus). Kita perlu melacak apakah rasio pool perlu dibalik.

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

Untuk mengetahui apakah sebuah pool perlu dibalik, kita harus mendapatkannya sebagai input untuk `read_pool`. Selain itu, simbol aset perlu diatur dengan benar.

Sintaks `<a> if <b> else <c>` adalah padanan Python dari [operator kondisional terner](https://en.wikipedia.org/wiki/Ternary_conditional_operator), yang dalam bahasa turunan C adalah `<b> ? <a> : <c>`.

```python
def format_quotes(quotes: list[Quote]) -> str:
    result = f"Asset: {quotes[0].asset}\n"
    for quote in quotes:
        result += f"\t{quote.timestamp[0:16]} {quote.price.quantize(Decimal('0.01'), rounding=ROUND_HALF_UP)}\n"
    return result
```

Fungsi ini membangun sebuah string yang memformat daftar objek `Quote`, dengan asumsi semuanya berlaku untuk aset yang sama.

```python
def make_prompt(quotes: list[list[Quote]], expected_time: str, asset: str) -> str:
    return f"""
```

Di Python, [literal string multibaris](https://www.w3schools.com/python/gloss_python_multi_line_strings.asp) ditulis sebagai `"""` .... `"""`.

```python
Mengingat kutipan ini:
{
    functools.reduce(lambda acc, q: acc + '\n' + q,
        map(lambda q: format_quotes(q), quotes))
}
```

Di sini, kami menggunakan pola [MapReduce](https://en.wikipedia.org/wiki/MapReduce) untuk menghasilkan string untuk setiap daftar kutipan dengan `format_quotes`, lalu mereduksinya menjadi satu string untuk digunakan dalam prompt.

```python
Berapa nilai yang Anda harapkan untuk {asset} pada waktu {expected_time}?

Berikan jawaban Anda sebagai satu angka yang dibulatkan ke dua tempat desimal,
tanpa teks lain.
    """
```

Sisa dari prompt adalah seperti yang diharapkan.

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

Tinjau kedua pool dan dapatkan kuotasi dari keduanya.

```python
future_time = (datetime.now(timezone.utc) + timedelta(days=1)).isoformat()[0:16]

print(make_prompt(wethusdc_quotes + wethwbtc_quotes, future_time, wethusdc_pool.asset))
```

Tentukan titik waktu masa depan yang kita inginkan estimasinya, dan buat prompt.

### Berinteraksi dengan LLM {#interface-llm}

Selanjutnya, kita akan meminta LLM yang sebenarnya dan menerima nilai masa depan yang diharapkan. Saya menulis program ini menggunakan OpenAI, jadi jika Anda ingin menggunakan penyedia yang berbeda, Anda harus menyesuaikannya.

1. Dapatkan [akun OpenAI](https://auth.openai.com/create-account)

2. [Danai akun](https://platform.openai.com/settings/organization/billing/overview)—jumlah minimum pada saat penulisan adalah $5

3. [Buat kunci API](https://platform.openai.com/settings/organization/api-keys)

4. Di baris perintah, ekspor kunci API agar program Anda dapat menggunakannya

   ```sh
   export OPENAI_API_KEY=sk-<sisa kunci ada di sini>
   ```

5. Checkout dan jalankan agen

   ```sh
   git checkout 04-interface-llm
   uv run agent.py
   ```

Berikut adalah kode barunya.

```python
from openai import OpenAI

open_ai = OpenAI()  # Klien membaca variabel lingkungan OPENAI_API_KEY
```

Impor dan buat instance API OpenAI.

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

print ("Harga saat ini:", wethusdc_quotes[-1].price)
print(f"Pada {future_time}, harga yang diharapkan: {expected_price} USD")

if (expected_price > current_price):
    print(f"Beli, saya perkirakan harga akan naik sebesar {expected_price - current_price} USD")
else:
    print(f"Jual, saya perkirakan harga akan turun sebesar {current_price - expected_price} USD")
```

Keluarkan harga dan berikan rekomendasi beli atau jual.

#### Menguji prediksi {#testing-the-predictions}

Sekarang setelah kita dapat menghasilkan prediksi, kita juga dapat menggunakan data historis untuk menilai apakah kita menghasilkan prediksi yang berguna.

```sh
uv run test-predictor.py
```

Hasil yang diharapkan serupa dengan:

```
Prediksi untuk 2026-01-05T19:50: diprediksi 3138.93 USD, riil 3218.92 USD, kesalahan 79.99 USD
Prediksi untuk 2026-01-06T19:56: diprediksi 3243.39 USD, riil 3221.08 USD, kesalahan 22.31 USD
Prediksi untuk 2026-01-07T20:02: diprediksi 3223.24 USD, riil 3146.89 USD, kesalahan 76.35 USD
Prediksi untuk 2026-01-08T20:11: diprediksi 3150.47 USD, riil 3092.04 USD, kesalahan 58.43 USD
.
.
.
Prediksi untuk 2026-01-31T22:33: diprediksi 2637.73 USD, riil 2417.77 USD, kesalahan 219.96 USD
Prediksi untuk 2026-02-01T22:41: diprediksi 2381.70 USD, riil 2318.84 USD, kesalahan 62.86 USD
Prediksi untuk 2026-02-02T22:49: diprediksi 2234.91 USD, riil 2349.28 USD, kesalahan 114.37 USD
Kesalahan prediksi rata-rata selama 29 prediksi: 83.87103448275862068965517241 USD
Perubahan rata-rata per rekomendasi: 4.787931034482758620689655172 USD
Varians standar perubahan: 104.42 USD
Hari menguntungkan: 51.72%
Hari merugi: 48.28%
```

Sebagian besar penguji identik dengan agen, tetapi berikut adalah bagian-bagian yang baru atau dimodifikasi.

```python
CYCLES_FOR_TEST = 40 # Untuk backtest, berapa banyak siklus yang kita uji

# Dapatkan banyak kutipan
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

Kami melihat ke belakang sebanyak `CYCLES_FOR_TEST` (ditentukan sebagai 40 di sini) hari.

```python
# Buat prediksi dan periksa terhadap riwayat nyata

total_error = Decimal(0)
changes = []
```

Ada dua jenis kesalahan yang kami minati. Yang pertama, `total_error`, hanyalah jumlah kesalahan yang dibuat oleh prediktor.

Untuk memahami yang kedua, `changes`, kita perlu mengingat tujuan agen. Tujuannya bukan untuk memprediksi rasio WETH/USDC (harga ETH). Ini untuk mengeluarkan rekomendasi jual dan beli. Jika harga saat ini adalah $2000 dan memprediksi $2010 besok, kami tidak keberatan jika hasil sebenarnya adalah $2020 dan kami mendapatkan uang tambahan. Namun, kita _keberatan_ jika diprediksi $2010, dan membeli ETH berdasarkan rekomendasi tersebut, dan harganya turun menjadi $1990.

```python
for index in range(0,len(wethusdc_quotes)-CYCLES_BACK):
```

Kami hanya dapat melihat kasus di mana riwayat lengkap (nilai yang digunakan untuk prediksi dan nilai dunia nyata untuk membandingkannya) tersedia. Ini berarti kasus terbaru haruslah yang dimulai `CYCLES_BACK` yang lalu.

```python
    wethusdc_slice = wethusdc_quotes[index:index+CYCLES_BACK]
    wethwbtc_slice = wethwbtc_quotes[index:index+CYCLES_BACK]
```

Gunakan [irisan](https://www.w3schools.com/python/ref_func_slice.asp) untuk mendapatkan jumlah sampel yang sama dengan jumlah yang digunakan agen. Kode antara di sini dan segmen berikutnya adalah kode get-a-prediction yang sama yang kami miliki di agen.

```python
    predicted_price = Decimal(response.choices[0].message.content.strip())
    real_price = wethusdc_quotes[index+CYCLES_BACK].price
    prediction_time_price = wethusdc_quotes[index+CYCLES_BACK-1].price
```

Dapatkan harga yang diprediksi, harga riil, dan harga pada saat prediksi. Kita memerlukan harga pada saat prediksi untuk menentukan apakah rekomendasi tersebut untuk membeli atau menjual.

```python
    error = abs(predicted_price - real_price)
    total_error += error
    print (f"Prediksi untuk {prediction_time}: diprediksi {predicted_price} USD, riil {real_price} USD, kesalahan {error} USD")
```

Hitung kesalahannya, dan tambahkan ke total.

```python
    recomended_action = 'buy' if predicted_price > prediction_time_price else 'sell'
    price_increase = real_price - prediction_time_price
    changes.append(price_increase if recomended_action == 'buy' else -price_increase)
```

Untuk `changes`, kami menginginkan dampak moneter dari membeli atau menjual satu ETH. Jadi pertama, kita perlu menentukan rekomendasi, kemudian menilai bagaimana harga sebenarnya berubah, dan apakah rekomendasi tersebut menghasilkan uang (perubahan positif) atau merugikan uang (perubahan negatif).

```python
print (f"Kesalahan prediksi rata-rata selama {len(wethusdc_quotes)-CYCLES_BACK} prediksi: {total_error / Decimal(len(wethusdc_quotes)-CYCLES_BACK)} USD")

length_changes = Decimal(len(changes))
mean_change = sum(changes, Decimal(0)) / length_changes
print (f"Perubahan rata-rata per rekomendasi: {mean_change} USD")
var = sum((x - mean_change) ** 2 for x in changes) / length_changes
print (f"Varians standar perubahan: {var.sqrt().quantize(Decimal("0.01"))} USD")
```

Laporkan hasilnya.

```python
print (f"Hari menguntungkan: {len(list(filter(lambda x: x > 0, changes)))/length_changes:.2%}")
print (f"Hari merugi: {len(list(filter(lambda x: x < 0, changes)))/length_changes:.2%}")
```

Gunakan [`filter`](https://www.w3schools.com/python/ref_func_filter.asp) untuk menghitung jumlah hari yang menguntungkan dan jumlah hari yang merugikan. Hasilnya adalah objek filter, yang perlu kita ubah menjadi daftar untuk mendapatkan panjangnya.

### Mengirimkan transaksi {#submit-txn}

Sekarang kita perlu benar-benar mengirimkan transaksi. Namun, saya tidak ingin menghabiskan uang sungguhan pada saat ini, sebelum sistem terbukti. Sebaliknya, kita akan membuat fork lokal dari Jaringan Utama, dan "berdagang" di jaringan itu.

Berikut adalah langkah-langkah untuk membuat fork lokal dan mengaktifkan perdagangan.

1. Instal [Foundry](https://getfoundry.sh/introduction/installation)

2. Mulai [`anvil`](https://getfoundry.sh/anvil/overview)

   ```sh
   anvil --fork-url https://eth.drpc.org --block-time 12
   ```

   `anvil` mendengarkan di URL default untuk Foundry, http://localhost:8545, jadi kita tidak perlu menentukan URL untuk [perintah `cast`](https://getfoundry.sh/cast/overview) yang kita gunakan untuk memanipulasi rantai blok.

3. Saat berjalan di `anvil`, ada sepuluh akun uji yang memiliki ETH—atur variabel lingkungan untuk yang pertama

   ```sh
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ADDRESS=`cast wallet address $PRIVATE_KEY`
   ```

4. Ini adalah kontrak yang perlu kita gunakan. [`SwapRouter`](https://github.com/Uniswap/v3-periphery/blob/main/contracts/SwapRouter.sol) adalah kontrak Uniswap v3 yang kami gunakan untuk benar-benar berdagang. Kita bisa berdagang langsung melalui pool, tetapi ini jauh lebih mudah.

   Dua variabel terbawah adalah jalur Uniswap v3 yang diperlukan untuk menukar antara WETH dan USDC.

   ```sh
   WETH_ADDRESS=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   USDC_ADDRESS=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   POOL_ADDRESS=0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640
   SWAP_ROUTER=0xE592427A0AEce92De3Edee1F18E0157C05861564
   WETH_TO_USDC=0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
   USDC_TO_WETH=0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
   ```

5. Setiap akun uji memiliki 10.000 ETH. Gunakan kontrak WETH untuk membungkus 1000 ETH untuk mendapatkan 1000 WETH untuk perdagangan.

   ```sh
   cast send $WETH_ADDRESS "deposit()" --value 1000ether --private-key $PRIVATE_KEY
   ```

6. Gunakan `SwapRouter` untuk memperdagangkan 500 WETH untuk USDC.

   ```sh
   cast send $WETH_ADDRESS "approve(address,uint256)" $SWAP_ROUTER 500ether --private-key $PRIVATE_KEY
   MAXINT=`cast max-int uint256`
   cast send $SWAP_ROUTER \
       "exactInput((bytes,address,uint256,uint256,uint256))" \
       "($WETH_TO_USDC,$ADDRESS,$MAXINT,500ether,1000000)" \
       --private-key $PRIVATE_KEY
   ```

   Panggilan `approve` membuat tunjangan yang memungkinkan `SwapRouter` untuk membelanjakan sebagian token kita. Kontrak tidak dapat memantau aksi, jadi jika kita mentransfer token langsung ke kontrak `SwapRouter`, kontrak tersebut tidak akan tahu bahwa ia telah dibayar. Sebaliknya, kami mengizinkan kontrak `SwapRouter` untuk membelanjakan sejumlah tertentu, dan kemudian `SwapRouter` melakukannya. Ini dilakukan melalui fungsi yang dipanggil oleh `SwapRouter`, sehingga ia tahu jika berhasil.

7. Verifikasi Anda memiliki cukup kedua token.

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
Harga saat ini: 1843.16
Pada 2026-02-06T23:07, harga yang diharapkan: 1724.41 USD
Saldo akun sebelum perdagangan:
Saldo USDC: 927301.578272
Saldo WETH: 500
Jual, saya perkirakan harga akan turun sebesar 118.75 USD
Transaksi approve terkirim: 74e367ddbb407c1aaf567d87aa5863049991b1d2aa092b6b85195d925e2bd41f
Transaksi approve ditambang.
Transaksi jual terkirim: fad1bcf938585c9e90364b26ac7a80eea9efd34c37e5db81e58d7655bcae28bf
Transaksi jual ditambang.
Saldo akun setelah perdagangan:
Saldo USDC: 929143.797116
Saldo WETH: 499
```

Untuk benar-benar menggunakannya, Anda memerlukan beberapa perubahan kecil.

- Di baris 14, ubah `MAINNET_URL` ke titik akses nyata, seperti `https://eth.drpc.org`
- Pada baris 28, ubah `PRIVATE_KEY` ke kunci pribadi Anda sendiri
- Kecuali Anda sangat kaya dan dapat membeli atau menjual 1 ETH setiap hari untuk agen yang belum terbukti, Anda mungkin ingin mengubah 29 untuk mengurangi `WETH_TRADE_AMOUNT`

#### Penjelasan kode {#trading-code}

Berikut adalah kode barunya.

```python
SWAP_ROUTER_ADDRESS=Web3.to_checksum_address("0xE592427A0AEce92De3Edee1F18E0157C05861564")
WETH_TO_USDC=bytes.fromhex("C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc20001F4A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")
USDC_TO_WETH=bytes.fromhex("A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB480001F4C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
PRIVATE_KEY="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
```

Variabel yang sama yang kita gunakan di langkah 4.

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

Untuk benar-benar berdagang, kita memerlukan fungsi `approve`. Kami juga ingin menampilkan saldo sebelum dan sesudah, jadi kami juga memerlukan `balanceOf`.

```python
SWAP_ROUTER_ABI = [
  { "name": "exactInput", ...},
]
```

Di `SwapRouter` ABI, kita hanya perlu `exactInput`. Ada fungsi terkait, `exactOutput`, yang bisa kita gunakan untuk membeli tepat satu WETH, tetapi untuk kesederhanaan kita hanya menggunakan `exactInput` dalam kedua kasus.

```python
account = w3.eth.account.from_key(PRIVATE_KEY)
swap_router = w3.eth.contract(
    address=SWAP_ROUTER_ADDRESS,
    abi=SWAP_ROUTER_ABI
)
```

Definisi Web3 untuk [`akun`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html) dan kontrak `SwapRouter`.

```python
def txn_params() -> dict:
    return {
        "from": account.address,
        "value": 0,
        "gas": 300000,
        "nonce": w3.eth.get_transaction_count(account.address),
    }
```

Parameter transaksi. Kita memerlukan fungsi di sini karena [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) harus berubah setiap saat.

```python
def approve_token(contract: Contract, amount: int):
```

Setujui alokasi token untuk `SwapRouter`.

```python
    txn = contract.functions.approve(SWAP_ROUTER_ADDRESS, amount).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
```

Beginilah cara kami mengirim transaksi di Web3. Pertama kita menggunakan [objek `Kontrak`](https://web3py.readthedocs.io/en/stable/web3.contract.html) untuk membangun transaksi. Kemudian kita menggunakan [`web3.eth.account.sign_transaction`](https://web3py.readthedocs.io/en/stable/web3.eth.account.html#sign-a-contract-transaction) untuk menandatangani transaksi, menggunakan `PRIVATE_KEY`. Terakhir, kami menggunakan [`w3.eth.send_raw_transaction`](https://web3py.readthedocs.io/en/stable/transactions.html#chapter-2-w3-eth-send-raw-transaction) untuk mengirim transaksi.

```python
    print(f"Transaksi approve terkirim: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Transaksi approve ditambang.")
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

Berbeda dengan `SELL_PARAMS`, parameter pembelian bisa berubah. Jumlah masukan adalah biaya 1 WETH, seperti yang tersedia di `quote`.

```python
def buy(quote: Quote):
    buy_params = make_buy_params(quote)
    approve_token(wethusdc_pool.token0.contract, buy_params["amountIn"])
    txn = swap_router.functions.exactInput(buy_params).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Transaksi beli terkirim: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Transaksi beli ditambang.")


def sell():
    approve_token(wethusdc_pool.token1.contract,
                  WETH_TRADE_AMOUNT * 10**wethusdc_pool.token1.decimals)
    txn = swap_router.functions.exactInput(SELL_PARAMS).build_transaction(txn_params())
    signed_txn = w3.eth.account.sign_transaction(txn, private_key=PRIVATE_KEY)
    tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
    print(f"Transaksi jual terkirim: {tx_hash.hex()}")
    w3.eth.wait_for_transaction_receipt(tx_hash)
    print("Transaksi jual ditambang.")
```

Fungsi `buy()` dan `sell()` hampir identik. Pertama kita menyetujui alokasi yang cukup untuk `SwapRouter`, dan kemudian kita memanggilnya dengan jalur dan jumlah yang benar.

```python
def balances():
    token0_balance = wethusdc_pool.token0.contract.functions.balanceOf(account.address).call()
    token1_balance = wethusdc_pool.token1.contract.functions.balanceOf(account.address).call()

    print(f"{wethusdc_pool.token0.symbol} Balance: {Decimal(token0_balance) / Decimal(10 ** wethusdc_pool.token0.decimals)}")
    print(f"{wethusdc_pool.token1.symbol} Balance: {Decimal(token1_balance) / Decimal(10 ** wethusdc_pool.token1.decimals)}")
```

Laporkan saldo pengguna dalam kedua mata uang.

```python
print("Saldo akun sebelum perdagangan:")
balances()

if (expected_price > current_price):
    print(f"Beli, saya perkirakan harga akan naik sebesar {expected_price - current_price} USD")
    buy(wethusdc_quotes[-1])
else:
    print(f"Jual, saya perkirakan harga akan turun sebesar {current_price - expected_price} USD")
    sell()

print("Saldo akun setelah perdagangan:")
balances()
```

Agen ini saat ini hanya bekerja sekali. Namun, Anda dapat mengubahnya agar berfungsi secara terus-menerus baik dengan menjalankannya dari [`crontab`](https://man7.org/linux/man-pages/man1/crontab.1.html) atau dengan membungkus baris 368-400 dalam sebuah loop dan menggunakan [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep) untuk menunggu hingga tiba waktunya untuk siklus berikutnya.

## Kemungkinan perbaikan {#improvements}

Ini bukan versi produksi penuh; ini hanyalah contoh untuk mengajarkan dasar-dasarnya. Berikut adalah beberapa ide untuk perbaikan.

### Perdagangan yang lebih cerdas {#smart-trading}

Ada dua fakta penting yang diabaikan agen saat memutuskan apa yang harus dilakukan.

- _Besarnya perubahan yang diantisipasi_. Agen menjual sejumlah `WETH` yang tetap jika harga diperkirakan akan menurun, terlepas dari besarnya penurunan.
  Boleh dibilang, akan lebih baik untuk mengabaikan perubahan kecil dan menjual berdasarkan seberapa besar kita mengharapkan harga akan turun.
- _Portofolio saat ini_. Jika 10% dari portofolio Anda ada di WETH dan Anda pikir harganya akan naik, mungkin masuk akal untuk membeli lebih banyak. Tetapi jika 90% dari portofolio Anda ada di WETH, Anda mungkin sudah cukup terekspos, dan tidak perlu membeli lebih banyak. Kebalikannya benar jika Anda mengharapkan harga akan turun.

### Bagaimana jika Anda ingin merahasiakan strategi perdagangan Anda? {#secret}

Vendor AI dapat melihat kueri yang Anda kirim ke LLM mereka, yang dapat mengekspos sistem perdagangan jenius yang Anda kembangkan dengan agen Anda. Sistem perdagangan yang digunakan terlalu banyak orang tidak ada gunanya karena terlalu banyak orang mencoba membeli saat Anda ingin membeli (dan harga naik) dan mencoba menjual saat Anda ingin menjual (dan harga turun).

Anda dapat menjalankan LLM secara lokal, misalnya, menggunakan [LM-Studio](https://lmstudio.ai/), untuk menghindari masalah ini.

### Dari bot AI ke agen AI {#bot-to-agent}

Anda dapat membuat argumen yang baik bahwa ini adalah [bot AI, bukan agen AI](/ai-agents/#ai-agents-vs-ai-bots). Ini mengimplementasikan strategi yang relatif sederhana yang mengandalkan informasi yang telah ditentukan sebelumnya. Kita dapat mengaktifkan perbaikan diri, misalnya, dengan menyediakan daftar pool Uniswap v3 dan nilai terbarunya dan menanyakan kombinasi mana yang memiliki nilai prediktif terbaik.

### Perlindungan slippage {#slippage-protection}

Saat ini tidak ada [perlindungan slippage](https://uniswapv3book.com/milestone_3/slippage-protection.html). Jika kutipan saat ini adalah $2000, dan harga yang diharapkan adalah $2100, agen akan membeli. Namun, jika sebelum agen membeli biayanya naik menjadi $2200, tidak masuk akal lagi untuk membeli.

Untuk menerapkan perlindungan slippage, tentukan nilai `amountOutMinimum` di baris 325 dan 334 dari [`agent.py`](https://github.com/qbzzt/260215-ai-agent/blob/05-trade/agent.py#L325).

## Kesimpulan {#conclusion}

Semoga, sekarang Anda cukup tahu untuk memulai dengan agen AI. Ini bukan gambaran umum yang komprehensif tentang subjek ini; ada seluruh buku yang didedikasikan untuk itu, tetapi ini cukup untuk membuat Anda memulai. Semoga beruntung!

[Lihat di sini untuk lebih banyak pekerjaan saya](https://cryptodocguy.pro/).
