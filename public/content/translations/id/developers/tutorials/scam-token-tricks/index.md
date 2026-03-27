---
title: "Beberapa trik yang digunakan oleh token penipuan dan cara mendeteksinya"
description: Dalam tutorial ini kita membedah sebuah token penipuan untuk melihat beberapa trik yang dimainkan oleh penipu, bagaimana mereka mengimplementasikannya, dan bagaimana kita dapat mendeteksinya.
author: Ori Pomerantz
tags: ["penipuan", "Solidity", "erc-20", "JavaScript", "TypeScript"]
skill: intermediate
published: 2023-09-15
lang: id
---

Dalam tutorial ini kita membedah [sebuah token penipuan](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) untuk melihat beberapa trik yang dimainkan oleh penipu dan bagaimana mereka mengimplementasikannya. Pada akhir tutorial, Anda akan memiliki pandangan yang lebih komprehensif tentang kontrak token ERC-20, kemampuannya, dan mengapa skeptisisme diperlukan. Kemudian kita melihat event yang dipancarkan oleh token penipuan tersebut dan melihat bagaimana kita dapat mengidentifikasi bahwa token tersebut tidak sah secara otomatis.

## Token penipuan - apa itu, mengapa orang membuatnya, dan bagaimana cara menghindarinya {#scam-tokens}

Salah satu penggunaan paling umum untuk Ethereum adalah bagi sebuah kelompok untuk membuat token yang dapat diperdagangkan, dalam artian mata uang mereka sendiri. Namun, di mana pun ada kasus penggunaan sah yang membawa nilai, ada juga penjahat yang mencoba mencuri nilai tersebut untuk diri mereka sendiri.

Anda dapat membaca lebih lanjut tentang subjek ini [di tempat lain di ethereum.org](/guides/how-to-id-scam-tokens/) dari perspektif pengguna. Tutorial ini berfokus pada membedah token penipuan untuk melihat bagaimana hal itu dilakukan dan bagaimana hal itu dapat dideteksi.

### Bagaimana saya tahu wARB adalah penipuan? {#warb-scam}

Token yang kita bedah adalah [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code), yang berpura-pura setara dengan [token ARB](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) yang sah.

Cara termudah untuk mengetahui mana token yang sah adalah dengan melihat organisasi asalnya, [Arbitrum](https://arbitrum.foundation/). Alamat yang sah ditentukan [dalam dokumentasi mereka](https://docs.arbitrum.foundation/deployment-addresses#token).

### Mengapa kode sumbernya tersedia? {#why-source}

Biasanya kita mengharapkan orang yang mencoba menipu orang lain untuk bersikap rahasia, dan memang banyak token penipuan tidak menyediakan kodenya (misalnya, [yang ini](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) dan [yang ini](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)).

Namun, token yang sah biasanya mempublikasikan kode sumber mereka, jadi untuk tampil sah, pembuat token penipuan terkadang melakukan hal yang sama. [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) adalah salah satu token dengan kode sumber yang tersedia, yang membuatnya lebih mudah untuk dipahami.

Meskipun penyebar kontrak dapat memilih apakah akan mempublikasikan kode sumber atau tidak, mereka _tidak bisa_ mempublikasikan kode sumber yang salah. Penjelajah blok mengkompilasi kode sumber yang disediakan secara independen, dan jika tidak mendapatkan bytecode yang sama persis, ia menolak kode sumber tersebut. [Anda dapat membaca lebih lanjut tentang ini di situs Etherscan](https://etherscan.io/verifyContract).

## Perbandingan dengan token ERC-20 yang sah {#compare-legit-erc20}

Kita akan membandingkan token ini dengan token ERC-20 yang sah. Jika Anda tidak terbiasa dengan bagaimana token ERC-20 yang sah biasanya ditulis, [lihat tutorial ini](/developers/tutorials/erc20-annotated-code/).

### Konstanta untuk alamat istimewa {#constants-for-privileged-addresses}

Kontrak terkadang membutuhkan alamat istimewa. Kontrak yang dirancang untuk penggunaan jangka panjang memungkinkan beberapa alamat istimewa untuk mengubah alamat tersebut, misalnya untuk mengaktifkan penggunaan kontrak multi tanda tangan yang baru. Ada beberapa cara untuk melakukan ini.

[Kontrak token `HOP`](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) menggunakan pola [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable). Alamat istimewa disimpan dalam penyimpanan, di bidang yang disebut `_owner` (lihat file ketiga, `Ownable.sol`).

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[Kontrak token `ARB`](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) tidak memiliki alamat istimewa secara langsung. Namun, ia tidak membutuhkannya. Ia berada di belakang sebuah [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) di [alamat `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code). Kontrak tersebut memiliki alamat istimewa (lihat file keempat, `ERC1967Upgrade.sol`) yang dapat digunakan untuk peningkatan.

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

[Pemilik kontrak ini](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) bukanlah kontrak yang dapat dikendalikan oleh akun yang berbeda pada waktu yang berbeda, melainkan sebuah [akun yang dimiliki secara eksternal](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs). Ini berarti bahwa ia mungkin dirancang untuk penggunaan jangka pendek oleh seorang individu, daripada sebagai solusi jangka panjang untuk mengendalikan ERC-20 yang akan tetap bernilai.

Dan memang, jika kita melihat di Etherscan kita melihat bahwa penipu hanya menggunakan kontrak ini selama 12 jam ([transaksi pertama](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2) hingga [transaksi terakhir](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)) selama 19 Mei 2023.

### Fungsi `_transfer` palsu {#the-fake-transfer-function}

Merupakan standar untuk melakukan transfer aktual menggunakan [fungsi `_transfer` internal](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer).

Dalam `wARB` fungsi ini terlihat hampir sah:

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

Jika pemilik kontrak mengirim token, mengapa event `Transfer` menunjukkan bahwa token tersebut berasal dari `deployer`?

Namun, ada masalah yang lebih penting. Siapa yang memanggil fungsi `_transfer` ini? Ia tidak dapat dipanggil dari luar, ia ditandai sebagai `internal`. Dan kode yang kita miliki tidak menyertakan panggilan apa pun ke `_transfer`. Jelas, ia ada di sini sebagai pengecoh.

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

- Masalah yang sama yang kita lihat di `_transfer`, yaitu ketika `contract_owner` mengirim token, token tersebut tampak berasal dari `deployer`.

### Fungsi event palsu `dropNewTokens` {#the-fake-events-function-dropNewTokens}

Sekarang kita sampai pada sesuatu yang terlihat seperti penipuan yang sebenarnya. Saya mengedit fungsinya sedikit agar lebih mudah dibaca, tetapi secara fungsional setara.

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

Fungsi ini memiliki pengubah `auth()`, yang berarti ia hanya dapat dipanggil oleh pemilik kontrak.

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

Pembatasan ini sangat masuk akal, karena kita tidak ingin akun acak mendistribusikan token. Namun, sisa fungsi tersebut mencurigakan.

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

Sebuah fungsi untuk mentransfer dari akun pool ke array penerima dengan array jumlah sangat masuk akal. Ada banyak kasus penggunaan di mana Anda ingin mendistribusikan token dari satu sumber ke beberapa tujuan, seperti penggajian, airdrop, dll. Lebih murah (dalam hal gas) untuk melakukannya dalam satu transaksi daripada mengeluarkan beberapa transaksi, atau bahkan memanggil ERC-20 beberapa kali dari kontrak yang berbeda sebagai bagian dari transaksi yang sama.

Namun, `dropNewTokens` tidak melakukan itu. Ia memancarkan [event `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1), tetapi sebenarnya tidak mentransfer token apa pun. Tidak ada alasan yang sah untuk membingungkan aplikasi offchain dengan memberi tahu mereka tentang transfer yang tidak benar-benar terjadi.

### Fungsi `Approve` yang membakar {#the-burning-approve-function}

Kontrak ERC-20 seharusnya memiliki [fungsi `approve`](/developers/tutorials/erc20-annotated-code/#approve) untuk alokasi (allowance), dan memang token penipuan kita memiliki fungsi seperti itu, dan bahkan benar. Namun, karena Solidity diturunkan dari C, ia peka terhadap huruf besar-kecil (case significant). "Approve" dan "approve" adalah string yang berbeda.

Selain itu, fungsionalitasnya tidak terkait dengan `approve`.

```solidity
    function Approve(
        address[] memory holders)
```

Fungsi ini dipanggil dengan array alamat untuk pemegang token.

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

Untuk setiap alamat pemegang, fungsi ini memindahkan seluruh saldo pemegang ke alamat `0x00...01`, yang secara efektif membakarnya (`burn` yang sebenarnya dalam standar juga mengubah total pasokan, dan mentransfer token ke `0x00...00`). Ini berarti bahwa `contract_owner` dapat menghapus aset pengguna mana pun. Itu sepertinya bukan fitur yang Anda inginkan dalam token tata kelola.

### Masalah kualitas kode {#code-quality-issues}

Masalah kualitas kode ini tidak _membuktikan_ bahwa kode ini adalah penipuan, tetapi membuatnya tampak mencurigakan. Perusahaan terorganisir seperti Arbitrum biasanya tidak merilis kode seburuk ini.

#### Fungsi `mount` {#the-mount-function}

Meskipun tidak ditentukan dalam [standar tersebut](https://eips.ethereum.org/EIPS/eip-20), secara umum fungsi yang membuat token baru disebut [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn).

Jika kita melihat di konstruktor `wARB`, kita melihat fungsi mint telah diganti namanya menjadi `mount` karena suatu alasan, dan dipanggil lima kali dengan seperlima dari pasokan awal, alih-alih sekali untuk seluruh jumlah demi efisiensi.

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

Melihat pada `require`, kita melihat bahwa hanya pemilik kontrak yang diizinkan untuk melakukan mint. Itu sah. Tetapi pesan kesalahannya seharusnya _only owner is allowed to mint_ atau semacamnya. Sebaliknya, pesan yang muncul adalah _ERC20: mint to the zero address_ yang tidak relevan. Pengujian yang benar untuk melakukan mint ke alamat nol adalah `require(account != address(0), "<error message>")`, yang tidak pernah diperiksa oleh kontrak tersebut.

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

Ada dua fakta mencurigakan lainnya, yang terkait langsung dengan minting:

- Terdapat parameter `account`, yang mungkin merupakan akun yang seharusnya menerima jumlah yang di-mint. Tetapi saldo yang bertambah sebenarnya adalah milik `contract_owner`.

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

`auth` dan `approver` lebih masuk akal, karena mereka memeriksa bahwa kontrak dipanggil oleh `contract_owner`. Kita mengharapkan tindakan istimewa tertentu, seperti minting, dibatasi pada akun tersebut. Namun, apa gunanya memiliki dua fungsi terpisah yang melakukan _hal yang persis sama_?

## Apa yang dapat kita deteksi secara otomatis? {#what-can-we-detect-automatically}

Kita dapat melihat bahwa `wARB` adalah token penipuan dengan melihat di Etherscan. Namun, itu adalah solusi terpusat. Secara teori, Etherscan bisa disabotase atau diretas. Lebih baik jika kita dapat mengetahui secara mandiri apakah sebuah token sah atau tidak.

Ada beberapa trik yang dapat kita gunakan untuk mengidentifikasi bahwa token ERC-20 mencurigakan (baik itu penipuan atau ditulis dengan sangat buruk), dengan melihat event yang mereka pancarkan.

## Event `Approval` yang mencurigakan {#suspicious-approval-events}

[Event `Approval`](https://eips.ethereum.org/EIPS/eip-20#approval) seharusnya hanya terjadi dengan permintaan langsung (berbeda dengan [event `Transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer-1) yang dapat terjadi sebagai akibat dari alokasi). [Lihat dokumentasi Solidity](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin) untuk penjelasan terperinci tentang masalah ini dan mengapa permintaan harus langsung, bukan dimediasi oleh kontrak.

Ini berarti bahwa event `Approval` yang menyetujui pengeluaran dari [akun yang dimiliki secara eksternal](/developers/docs/accounts/#types-of-account) harus berasal dari transaksi yang berasal dari akun tersebut, dan yang tujuannya adalah kontrak ERC-20. Segala jenis persetujuan lain dari akun yang dimiliki secara eksternal adalah mencurigakan.

Berikut adalah [program yang mengidentifikasi jenis event ini](https://github.com/qbzzt/20230915-scam-token-detection), menggunakan [viem](https://viem.sh/) dan [TypeScript](https://www.typescriptlang.org/docs/), varian JavaScript dengan keamanan tipe. Untuk menjalankannya:

1. Salin `.env.example` ke `.env`.
2. Edit `.env` untuk memberikan URL ke node mainnet Ethereum.
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

Impor definisi tipe, fungsi, dan definisi chain dari `viem`.

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

Buat klien Viem. Kita hanya perlu membaca dari blockchain, jadi klien ini tidak memerlukan kunci pribadi.

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

Alamat kontrak ERC-20 yang mencurigakan, dan blok di mana kita akan mencari event. Penyedia node biasanya membatasi kemampuan kita untuk membaca event karena bandwidth bisa menjadi mahal. Untungnya `wARB` tidak digunakan selama periode delapan belas jam, jadi kita dapat mencari semua event (hanya ada 13 secara total).

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

Ini adalah cara untuk meminta informasi event kepada Viem. Ketika kita memberikannya tanda tangan event yang tepat, termasuk nama bidang, ia akan mengurai event tersebut untuk kita.

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

Algoritma kita hanya berlaku untuk akun yang dimiliki secara eksternal. Jika ada bytecode yang dikembalikan oleh `client.getBytecode`, itu berarti ini adalah kontrak dan kita harus melewatinya saja.

Jika Anda belum pernah menggunakan TypeScript sebelumnya, definisi fungsinya mungkin terlihat sedikit aneh. Kita tidak hanya memberitahunya bahwa parameter pertama (dan satu-satunya) disebut `addr`, tetapi juga bahwa ia bertipe `Address`. Demikian pula, bagian `: boolean` memberi tahu TypeScript bahwa nilai kembalian dari fungsi tersebut adalah boolean.

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

Fungsi ini mendapatkan tanda terima transaksi dari sebuah event. Kita memerlukan tanda terima untuk memastikan kita tahu apa tujuan transaksinya.

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

Ini adalah fungsi yang paling penting, yang benar-benar memutuskan apakah sebuah event mencurigakan atau tidak. Tipe kembalian, `(Event | null)`, memberi tahu TypeScript bahwa fungsi ini dapat mengembalikan `Event` atau `null`. Kita mengembalikan `null` jika event tersebut tidak mencurigakan.

```typescript
const owner = ev.args._owner
```

Viem memiliki nama bidang, jadi ia mengurai event tersebut untuk kita. `_owner` adalah pemilik token yang akan dihabiskan.

```typescript
// Approvals by contracts are not suspicious // Persetujuan oleh kontrak tidak mencurigakan
if (await isContract(owner)) return null
```

Jika pemiliknya adalah kontrak, asumsikan persetujuan ini tidak mencurigakan. Untuk memeriksa apakah persetujuan kontrak mencurigakan atau tidak, kita perlu melacak eksekusi penuh dari transaksi untuk melihat apakah ia pernah sampai ke kontrak pemilik, dan apakah kontrak tersebut memanggil kontrak ERC-20 secara langsung. Itu jauh lebih mahal sumber dayanya daripada yang ingin kita lakukan.

```typescript
const txn = await getEventTxn(ev)
```

Jika persetujuan berasal dari akun yang dimiliki secara eksternal, dapatkan transaksi yang menyebabkannya.

```typescript
// The approval is suspicious if it comes an EOA owner that isn't the transaction's `from` // Persetujuan tersebut mencurigakan jika berasal dari pemilik EOA yang bukan `from` dari transaksi
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

Kita tidak bisa hanya memeriksa kesetaraan string karena alamat berbentuk heksadesimal, sehingga mengandung huruf. Terkadang, misalnya dalam `txn.from`, huruf-huruf tersebut semuanya huruf kecil. Dalam kasus lain, seperti `ev.args._owner`, alamatnya menggunakan [huruf besar-kecil campuran untuk identifikasi kesalahan](https://eips.ethereum.org/EIPS/eip-55).

Tetapi jika transaksi bukan dari pemilik, dan pemilik tersebut dimiliki secara eksternal, maka kita memiliki transaksi yang mencurigakan.

```typescript
// It is also suspicious if the transaction destination isn't the ERC-20 contract we are // Ini juga mencurigakan jika tujuan transaksi bukanlah kontrak ERC-20 yang sedang kita
// investigating // selidiki
if (txn.to.toLowerCase() != testedAddress) return ev
```

Demikian pula, jika alamat `to` dari transaksi, kontrak pertama yang dipanggil, bukanlah kontrak ERC-20 yang sedang diselidiki maka itu mencurigakan.

```typescript
    // If there is no reason to be suspicious, return null. // Jika tidak ada alasan untuk curiga, kembalikan null.
    return null
}
```

Jika tidak ada kondisi yang benar maka event `Approval` tidak mencurigakan.

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[Fungsi `async`](https://www.w3schools.com/js/js_async.asp) mengembalikan objek `Promise`. Dengan sintaks umum, `await x()`, kita menunggu `Promise` tersebut dipenuhi sebelum kita melanjutkan pemrosesan. Ini mudah diprogram dan diikuti, tetapi juga tidak efisien. Sementara kita menunggu `Promise` untuk event tertentu dipenuhi, kita sudah bisa mulai mengerjakan event berikutnya.

Di sini kita menggunakan [`map`](https://www.w3schools.com/jsref/jsref_map.asp) untuk membuat array objek `Promise`. Kemudian kita menggunakan [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) untuk menunggu semua promise tersebut diselesaikan. Kita kemudian melakukan [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) pada hasil tersebut untuk menghapus event yang tidak mencurigakan.

### Event `Transfer` yang mencurigakan {#suspicious-transfer-events}

Cara lain yang mungkin untuk mengidentifikasi token penipuan adalah dengan melihat apakah mereka memiliki transfer yang mencurigakan. Misalnya, transfer dari akun yang tidak memiliki banyak token. Anda dapat melihat [cara mengimplementasikan pengujian ini](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts), tetapi `wARB` tidak memiliki masalah ini.

## Kesimpulan {#conclusion}

Deteksi otomatis penipuan ERC-20 menderita [negatif palsu](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error), karena penipuan dapat menggunakan kontrak token ERC-20 yang sangat normal yang hanya tidak mewakili sesuatu yang nyata. Jadi Anda harus selalu berusaha untuk _mendapatkan alamat token dari sumber tepercaya_.

Deteksi otomatis dapat membantu dalam kasus tertentu, seperti komponen DeFi, di mana terdapat banyak token dan mereka perlu ditangani secara otomatis. Tetapi seperti biasa [caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp), lakukan riset Anda sendiri, dan dorong pengguna Anda untuk melakukan hal yang sama.

[Lihat di sini untuk karya saya yang lain](https://cryptodocguy.pro/).