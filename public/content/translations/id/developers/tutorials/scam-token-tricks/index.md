---
title: "Beberapa trik yang digunakan oleh token penipuan dan cara mendeteksinya"
description: Dalam tutorial ini, kami membedah token penipuan untuk melihat beberapa trik yang dimainkan penipu, cara mereka menerapkannya, dan cara kami mendeteksinya.
author: Ori Pomerantz
tags:
  [
    "penipuan",
    "solidity",
    "erc-20",
    "javascript",
    "typescript"
  ]
skill: intermediate
published: 2023-09-15
lang: id
---

Dalam tutorial ini, kami membedah [token penipuan](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) untuk melihat beberapa trik yang dimainkan oleh penipu dan bagaimana mereka menerapkannya. Di akhir tutorial ini, Anda akan memiliki pandangan yang lebih komprehensif tentang kontrak token ERC-20, kemampuannya, dan mengapa skeptisisme itu perlu. Kemudian kita melihat event yang dipancarkan oleh token penipuan tersebut dan melihat bagaimana kita dapat mengidentifikasi bahwa token tersebut tidak sah secara otomatis.

## Token penipuan - apa itu, mengapa orang membuatnya, dan bagaimana cara menghindarinya {#scam-tokens}

Salah satu kegunaan paling umum dari Ethereum untuk suatu grup adalah membuat token yang dapat dipertukarkan, dalam pengertian sebagai mata uang mereka sendiri. Namun, di mana pun ada kasus penggunaan sah yang membawa nilai, juga ada para penjahat yang mencoba mencuri nilai tersebut untuk diri mereka sendiri.

Anda dapat membaca lebih lanjut tentang subjek ini [di tempat lain di ethereum.org](/guides/how-to-id-scam-tokens/) dari perspektif pengguna. Tutorial ini berfokus pada pembedahan token penipuan untuk melihat cara kerjanya dan bagaimana token tersebut dapat dideteksi.

### Bagaimana saya tahu wARB adalah penipuan? {#warb-scam}

Token yang kita bedah adalah [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), yang berpura-pura setara dengan [token ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) yang sah.

Cara termudah untuk mengetahui token mana yang sah adalah dengan melihat organisasi asalnya, [Arbitrum](https://arbitrum.foundation/). Alamat-alamat yang sah ditentukan [dalam dokumentasi mereka](https://docs.arbitrum.foundation/deployment-addresses#token).

### Mengapa kode sumbernya tersedia? {#why-source}

Biasanya kita berharap orang yang mencoba menipu orang lain akan bersikap rahasia, dan memang banyak token penipuan yang tidak menyediakan kodenya (misalnya, [yang ini](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) dan [yang ini](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Namun, token yang sah biasanya memublikasikan kode sumber mereka, jadi agar tampak sah, penulis token penipuan terkadang melakukan hal yang sama. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) adalah salah satu token yang kode sumbernya tersedia, yang membuatnya lebih mudah untuk dipahami.

Meskipun penyebar kontrak dapat memilih untuk memublikasikan kode sumber atau tidak, mereka _tidak dapat_ memublikasikan kode sumber yang salah. Penjelajah blok mengompilasi kode sumber yang disediakan secara independen, dan jika tidak mendapatkan kode bita yang sama persis, penjelajah blok akan menolak kode sumber tersebut. [Anda dapat membaca lebih lanjut tentang ini di situs Etherscan](https://etherscan.io/verifyContract).

## Perbandingan dengan token ERC-20 yang sah {#compare-legit-erc20}

Kita akan membandingkan token ini dengan token ERC-20 yang sah. Jika Anda tidak terbiasa dengan cara penulisan token ERC-20 yang sah, [lihat tutorial ini](/developers/tutorials/erc20-annotated-code/).

### Konstanta untuk alamat-alamat istimewa {#constants-for-privileged-addresses}

Kontrak terkadang membutuhkan alamat-alamat istimewa. Kontrak yang dirancang untuk penggunaan jangka panjang mengizinkan beberapa alamat istimewa untuk mengubah alamat-alamat tersebut, misalnya untuk memungkinkan penggunaan kontrak multisig yang baru. Ada beberapa cara untuk melakukan ini.

Kontrak [token `HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) menggunakan pola [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). Alamat istimewa disimpan dalam penyimpanan, di bidang yang disebut `_owner` (lihat berkas ketiga, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

Kontrak [token `ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) tidak memiliki alamat istimewa secara langsung. Namun, kontrak tersebut tidak membutuhkannya. Kontrak tersebut berada di belakang [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) di [alamat `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Kontrak tersebut memiliki alamat istimewa (lihat berkas keempat, `ERC1967Upgrade.sol`) yang dapat digunakan untuk peningkatan.

```solidity
    /**
     * @dev Menyimpan alamat baru di slot admin EIP1967.
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

Sebaliknya, kontrak `wARB` memiliki `contract_owner` yang di-hardcode.

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[Pemilik kontrak ini](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) bukanlah kontrak yang dapat dikendalikan oleh akun yang berbeda pada waktu yang berbeda, melainkan [akun milik eksternal](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Ini berarti bahwa kontrak tersebut mungkin dirancang untuk penggunaan jangka pendek oleh seorang individu, bukan sebagai solusi jangka panjang untuk mengendalikan ERC-20 yang akan tetap berharga.

Dan memang, jika kita melihat di Etherscan, kita melihat bahwa penipu hanya menggunakan kontrak ini selama 12 jam ([transaksi pertama](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) hingga [transaksi terakhir](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) selama 19 Mei 2023.

### Fungsi `_transfer` palsu {#the-fake-transfer-function}

Sudah menjadi standar untuk melakukan transfer aktual menggunakan [fungsi `_transfer` internal](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

Di `wARB`, fungsi ini terlihat hampir sah:

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Bagian yang mencurigakan adalah:

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

Jika pemilik kontrak mengirim token, mengapa event `Transfer` menunjukkan token tersebut berasal dari `deployer`?

Namun, ada masalah yang lebih penting. Siapa yang memanggil fungsi `_transfer` ini? Fungsi ini tidak dapat dipanggil dari luar, karena ditandai sebagai `internal`. Dan kode yang kita miliki tidak menyertakan panggilan apa pun ke `_transfer`. Jelas, ini ada di sini sebagai umpan.

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

Ketika kita melihat fungsi yang dipanggil untuk mentransfer token, `transfer` dan `transferFrom`, kita melihat bahwa mereka memanggil fungsi yang sama sekali berbeda, `_f_`.

### Fungsi `_f_` yang sebenarnya {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

Ada dua potensi tanda bahaya dalam fungsi ini.

- Penggunaan [pengubah fungsi](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`. Namun, ketika kita melihat ke dalam kode sumber, kita melihat bahwa `_mod_` sebenarnya tidak berbahaya.

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- Masalah yang sama yang kita lihat di `_transfer`, yaitu ketika `contract_owner` mengirim token, token tersebut seolah-olah berasal dari `deployer`.

### Fungsi event palsu `dropNewTokens` {#the-fake-events-function-dropNewTokens}

Sekarang kita sampai pada sesuatu yang terlihat seperti penipuan yang sebenarnya. Saya sedikit mengedit fungsi ini agar lebih mudah dibaca, tetapi secara fungsional setara.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Fungsi ini memiliki pengubah `auth()`, yang berarti hanya dapat dipanggil oleh pemilik kontrak.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

Batasan ini sangat masuk akal, karena kita tidak ingin akun acak mendistribusikan token. Namun, sisa fungsi ini mencurigakan.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Sebuah fungsi untuk mentransfer dari akun pool ke sebuah array penerima sejumlah array jumlah sangat masuk akal. Ada banyak kasus penggunaan di mana Anda ingin mendistribusikan token dari satu sumber ke beberapa tujuan, seperti penggajian, airdrop, dll. Lebih murah (dalam hal gas) untuk melakukannya dalam satu transaksi daripada menerbitkan beberapa transaksi, atau bahkan memanggil ERC-20 beberapa kali dari kontrak yang berbeda sebagai bagian dari transaksi yang sama.

Namun, `dropNewTokens` tidak melakukan itu. Fungsi ini memancarkan [event `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), tetapi tidak benar-benar mentransfer token apa pun. Tidak ada alasan yang sah untuk membingungkan aplikasi di luar rantai dengan memberi tahu mereka tentang transfer yang sebenarnya tidak terjadi.

### Fungsi `Approve` yang membakar {#the-burning-approve-function}

Kontrak ERC-20 seharusnya memiliki [fungsi `approve`](/developers/tutorials/erc20-annotated-code/#approve) untuk tunjangan, dan memang token penipuan kami memiliki fungsi seperti itu, dan bahkan benar. Namun, karena Solidity merupakan turunan dari C, ia peka terhadap huruf besar/kecil. "Approve" dan "approve" adalah string yang berbeda.

Selain itu, fungsionalitasnya tidak terkait dengan `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Fungsi ini dipanggil dengan sebuah array alamat untuk para pemegang token.

```solidity
    public approver() {
```

Pengubah `approver()` memastikan hanya `contract_owner` yang diizinkan untuk memanggil fungsi ini (lihat di bawah).

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

Untuk setiap alamat pemegang, fungsi ini memindahkan seluruh saldo pemegang ke alamat `0x00...01`, yang secara efektif membakarnya (fungsi `burn` yang sebenarnya dalam standar juga mengubah total pasokan, dan mentransfer token ke `0x00...00`). Ini berarti `contract_owner` dapat menghapus aset pengguna mana pun. Itu sepertinya bukan fitur yang Anda inginkan dalam token tata kelola.

### Masalah kualitas kode {#code-quality-issues}

Masalah kualitas kode ini tidak _membuktikan_ bahwa kode ini adalah penipuan, tetapi membuatnya tampak mencurigakan. Perusahaan terorganisir seperti Arbitrum biasanya tidak merilis kode seburuk ini.

#### Fungsi `mount` {#the-mount-function}

Meskipun tidak ditentukan dalam [standar](https://eips.ethereum.org/EIPS/eip-20), secara umum fungsi yang membuat token baru disebut [`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Jika kita melihat di konstruktor `wARB`, kita melihat fungsi pencetakan telah diubah namanya menjadi `mount` untuk beberapa alasan, dan dipanggil lima kali dengan seperlima dari pasokan awal, bukan sekali untuk seluruh jumlah demi efisiensi.

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

Fungsi `mount` itu sendiri juga mencurigakan.

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

Melihat `require`, kita melihat bahwa hanya pemilik kontrak yang diizinkan untuk mencetak. Itu sah. Tetapi pesan kesalahannya seharusnya _hanya pemilik yang diizinkan untuk mencetak_ atau semacamnya. Sebaliknya, pesannya adalah _ERC20: mint ke alamat nol_ yang tidak relevan. Tes yang benar untuk pencetakan ke alamat nol adalah `require(account != address(0), "<pesan kesalahan>")`, yang tidak pernah diperiksa oleh kontrak.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Ada dua fakta mencurigakan lainnya, yang terkait langsung dengan pencetakan:

- Ada parameter `account`, yang diduga merupakan akun yang seharusnya menerima jumlah yang dicetak. Tetapi saldo yang bertambah sebenarnya adalah milik `contract_owner`.

- Meskipun saldo yang bertambah adalah milik `contract_owner`, event yang dipancarkan menunjukkan transfer ke `account`.

### Mengapa ada `auth` dan `approver`? Mengapa ada `mod` yang tidak melakukan apa-apa? {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

Kontrak ini berisi tiga pengubah: `_mod_`, `auth`, dan `approver`.

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` mengambil tiga parameter dan tidak melakukan apa pun dengannya. Mengapa harus ada?

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` dan `approver` lebih masuk akal, karena mereka memeriksa bahwa kontrak dipanggil oleh `contract_owner`. Kami mengharapkan tindakan istimewa tertentu, seperti pencetakan, dibatasi untuk akun tersebut. Namun, apa gunanya memiliki dua fungsi terpisah yang melakukan _hal yang sama persis_?

## Apa yang dapat kita deteksi secara otomatis? {#what-can-we-detect-automatically}

Kita dapat melihat bahwa `wARB` adalah token penipuan dengan melihat Etherscan. Namun, itu adalah solusi terpusat. Secara teori, Etherscan dapat disabotase atau diretas. Lebih baik dapat mengetahui secara mandiri apakah suatu token sah atau tidak.

Ada beberapa trik yang bisa kita gunakan untuk mengidentifikasi bahwa sebuah token ERC-20 mencurigakan (baik penipuan atau ditulis dengan sangat buruk), dengan melihat event yang dipancarkannya.

## Event `Approval` yang mencurigakan {#suspicious-approval-events}

[Event `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) seharusnya hanya terjadi dengan permintaan langsung (berbeda dengan [event `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1) yang dapat terjadi sebagai hasil dari sebuah tunjangan). [Lihat dokumentasi Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) untuk penjelasan rinci tentang masalah ini dan mengapa permintaan harus langsung, bukan dimediasi oleh kontrak.

Ini berarti bahwa event `Approval` yang menyetujui pengeluaran dari [akun milik eksternal](/developers/docs/accounts/#types-of-account) harus berasal dari transaksi yang berasal dari akun tersebut, dan tujuannya adalah kontrak ERC-20. Segala jenis persetujuan lain dari akun milik eksternal adalah mencurigakan.

Berikut adalah [program yang mengidentifikasi jenis event ini](https://github.com/qbzzt/20230915-scam-token-detection), menggunakan [viem](https://viem.sh/) dan [TypeScript](https://www.typescriptlang.org/docs/), varian JavaScript dengan keamanan tipe. Untuk menjalankannya:

1. Salin `.env.example` ke `.env`.
2. Edit `.env` untuk menyediakan URL ke simpul Jaringan Utama Ethereum.
3. Jalankan `pnpm install` untuk menginstal paket yang diperlukan.
4. Jalankan `pnpm susApproval` untuk mencari persetujuan yang mencurigakan.

Berikut adalah penjelasan baris demi baris:

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

Impor definisi tipe, fungsi, dan definisi rantai dari `viem`.

```typescript
import { config } from "dotenv"
config()
```

Baca `.env` untuk mendapatkan URL.

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Buat klien Viem. Kita hanya perlu membaca dari rantai blok, jadi klien ini tidak memerlukan kunci pribadi.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Alamat kontrak ERC-20 yang mencurigakan, dan blok di mana kita akan mencari event. Penyedia simpul biasanya membatasi kemampuan kita untuk membaca event karena bandwidth bisa menjadi mahal. Untungnya `wARB` tidak digunakan selama periode delapan belas jam, jadi kita bisa mencari semua event (hanya ada 13 total).

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

Ini adalah cara untuk meminta informasi event dari Viem. Ketika kita memberikannya tanda tangan event yang tepat, termasuk nama bidang, ia akan mengurai event tersebut untuk kita.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Algoritma kami hanya berlaku untuk akun milik eksternal. Jika ada kode bita yang dikembalikan oleh `client.getBytecode`, itu berarti ini adalah kontrak dan kita harus melewatinya.

Jika Anda belum pernah menggunakan TypeScript sebelumnya, definisi fungsinya mungkin terlihat sedikit aneh. Kita tidak hanya memberitahunya bahwa parameter pertama (dan satu-satunya) disebut `addr`, tetapi juga bahwa tipenya adalah `Address`. Demikian pula, bagian `: boolean` memberitahu TypeScript bahwa nilai kembalian dari fungsi tersebut adalah boolean.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Fungsi ini mendapatkan tanda terima transaksi dari sebuah event. Kita memerlukan tanda terima untuk memastikan kita tahu apa tujuan transaksi itu.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Ini adalah fungsi yang paling penting, yang benar-benar memutuskan apakah sebuah event mencurigakan atau tidak. Tipe kembalian, `(Event | null)`, memberitahu TypeScript bahwa fungsi ini dapat mengembalikan `Event` atau `null`. Kami mengembalikan `null` jika event tersebut tidak mencurigakan.

```typescript
const owner = ev.args._owner
```

Viem memiliki nama bidang, jadi ia mengurai event tersebut untuk kita. `_owner` adalah pemilik token yang akan dibelanjakan.

```typescript
// Persetujuan oleh kontrak tidak mencurigakan
if (await isContract(owner)) return null
```

Jika pemiliknya adalah kontrak, asumsikan persetujuan ini tidak mencurigakan. Untuk memeriksa apakah persetujuan kontrak mencurigakan atau tidak, kita perlu melacak eksekusi penuh transaksi untuk melihat apakah pernah sampai ke kontrak pemilik, dan jika kontrak tersebut memanggil kontrak ERC-20 secara langsung. Itu jauh lebih mahal sumber dayanya daripada yang ingin kita lakukan.

```typescript
const txn = await getEventTxn(ev)
```

Jika persetujuan berasal dari akun milik eksternal, dapatkan transaksi yang menyebabkannya.

```typescript
// Persetujuan ini mencurigakan jika berasal dari pemilik EOA yang bukan merupakan `from` dari transaksi tersebut
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Kita tidak bisa hanya memeriksa kesetaraan string karena alamatnya adalah heksadesimal, jadi mereka mengandung huruf. Terkadang, misalnya dalam `txn.from`, huruf-huruf itu semuanya huruf kecil. Dalam kasus lain, seperti `ev.args._owner`, alamatnya dalam [kasus campuran untuk identifikasi kesalahan](https://eips.ethereum.org/EIPS/eip-55).

Tetapi jika transaksi tersebut bukan dari pemilik, dan pemilik tersebut adalah milik eksternal, maka kita memiliki transaksi yang mencurigakan.

```typescript
// Ini juga mencurigakan jika tujuan transaksi bukan kontrak ERC-20 yang sedang kita
// selidiki
if (txn.to.toLowerCase() != testedAddress) return ev
```

Demikian pula, jika alamat `to` transaksi, kontrak pertama yang dipanggil, bukan kontrak ERC-20 yang sedang diselidiki, maka itu mencurigakan.

```typescript
    // Jika tidak ada alasan untuk curiga, kembalikan null.
    return null
}
```

Jika tidak ada kondisi yang benar, maka event `Approval` tidak mencurigakan.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Fungsi `async`](https://www.w3schools.com/js/js_async.asp) mengembalikan objek `Promise`. Dengan sintaks umum, `await x()`, kita menunggu `Promise` itu terpenuhi sebelum kita melanjutkan pemrosesan. Ini sederhana untuk diprogram dan diikuti, tetapi juga tidak efisien. Sementara kita menunggu `Promise` untuk sebuah event tertentu terpenuhi, kita sudah bisa mulai mengerjakan event berikutnya.

Di sini kita menggunakan [`map`](https://www.w3schools.com/jsref/jsref_map.asp) untuk membuat array objek `Promise`. Kemudian kita menggunakan [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) untuk menunggu semua janji tersebut diselesaikan. Kami kemudian [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) hasil-hasil tersebut untuk menghapus event-event yang tidak mencurigakan.

### Event `Transfer` yang mencurigakan {#suspicious-transfer-events}

Cara lain yang memungkinkan untuk mengidentifikasi token penipuan adalah dengan melihat apakah mereka memiliki transfer yang mencurigakan. Misalnya, transfer dari akun yang tidak memiliki banyak token. Anda dapat melihat [cara mengimplementasikan tes ini](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), tetapi `wARB` tidak memiliki masalah ini.

## Kesimpulan {#conclusion}

Deteksi otomatis penipuan ERC-20 mengalami [negatif palsu](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), karena penipuan dapat menggunakan kontrak token ERC-20 yang normal sempurna yang hanya tidak mewakili sesuatu yang nyata. Jadi Anda harus selalu berusaha untuk _mendapatkan alamat token dari sumber tepercaya_.

Deteksi otomatis dapat membantu dalam kasus-kasus tertentu, seperti bagian DeFi, di mana ada banyak token dan perlu ditangani secara otomatis. Tetapi seperti biasa [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp), lakukan riset Anda sendiri, dan dorong pengguna Anda untuk melakukan hal yang sama.

[Lihat di sini untuk lebih banyak pekerjaan saya](https://cryptodocguy.pro/).
