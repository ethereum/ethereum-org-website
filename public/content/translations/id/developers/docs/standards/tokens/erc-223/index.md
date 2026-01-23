---
title: Standar Token ERC-223
description: Gambaran umum tentang standar token ERC-223 yang dapat di pertukarkan, cara kerjanya, dan perbandinganya dengan ERC-20.
lang: id
---

## Pengenalan {#introduction}

### Apa itu ERC-223? {#what-is-erc223}

ERC-223 adalah standar untuk token yang dapat dipertukarkan, mirip dengan standar ERC-20. Kunci perbedaannya adalah ERC-223 tidak hanya mengartikan API token tapi juga lapisan untuk mengirim token dari pengerim ke penerima. Ini mengenalkan sebuah model komunikasi yang memungkinkan pengiriman token di tangani di sisi penerima.

### Perbedaan dari ERC-20 {#erc20-differences}

ERC-223 membahas beberapa keterbatasan dari ERC-20 dan memperkenalkan sebuah langkah interaksi baru antara kontrak token dan kontrak yang dapat menerima beberapa token. Ada beberapa hal yang mungkin bisa dengan ERC-223 tapi tidak dengan ERC-20:

- Penanganan transfer token di sisi penerima: Penerima dapat mendeteksi bahwa token ERC-223 sedang disimpan.
- Penolakan terhadap token yang dikirim secara tidak benar: Jika pengguna mengirimkan token ERC-223 ke kontrak yang tidak seharusnya menerima token, kontrak tersebut dapat menolak transaksi tersebut, sehingga mencegah hilangnya token.
- Metadata dalam transfer: Token ERC-223 dapat menyertakan metadata, yang memungkinkan informasi sewenang-wenang untuk dilampirkan pada transaksi token.

## Persyaratan {#prerequisites}

- [Akun](/developers/docs/accounts)
- [Kontrak Pintar](/developers/docs/smart-contracts/)
- [Standar token](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Body {#body}

ERC-223 adalah standar token yang menerapksn API untuk token dalam kontrak pintar. Ini juga mengumumkan API untuk kontrak yang seharusnya menerima token ERC-223. Kontrak yang tidak mendukung API Penerima ERC-223 tidak dapat menerima token ERC-223, sehingga mencegah kesalahan pengguna.

Jika sebuah smart contract mengimplementasikan metode dan event berikut, maka kontrak tersebut dapat disebut sebagai kontrak token yang kompatibel dengan ERC-223. Setelah diterapkan, kontrak ini akan bertanggung jawab untuk melacak token yang dibuat di Ethereum.

Kontrak ini tidak diwajibkan hanya memiliki fungsi-fungsi tersebut, dan pengembang dapat menambahkan fitur lain dari standar token yang berbeda ke dalam kontrak ini. Sebagai contoh, fungsi 'approve' dan 'transferFrom' bukan bagian dari standar ERC-223, tetapi fungsi-fungsi ini dapat diimplementasikan jika diperlukan.

Dari [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Methods {#methods}

Token ERC-223 harus mengimplementasikan metode-metode berikut:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Sebuah kontrak yang seharusnya menerima token ERC-223 harus mengimplementasikan metode berikut:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Jika token ERC-223 dikirim ke kontrak yang tidak mengimplementasikan fungsi 'tokenReceived(..)' maka transfer harus gagal dan token tidak boleh dipindahkan dari saldo pengirim.

### Peristiwa {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Contoh {#examples}

API token ERC-223 mirip dengan ERC-20, sehingga dari sudut pandang pengembangan antarmuka pengguna UI tidak ada perbedaan. Satu-satunya pengecualian di sini adalah token ERC-223 mungkin tidak memiliki fungsi 'approve' + 'transferFrom' karena fungsi-fungsi ini bersifat opsional untuk standar ini.

#### Contoh Solidity {#solidity-example}

Contoh berikut menunjukkan bagaimana kontrak token ERC-223 dasar beroperasi:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

Sekarang kita ingin kontrak lain untuk menerima deposit 'tokenA' dengan asumsi bahwa tokenA adalah token ERC-223. Kontrak tersebut harus hanya menerima tokenA dan menolak token lainnya. Saat kontrak menerima tokenA, kontrak harus memicu emit event 'Deposit()' dan menambahkan nilai variabel internal 'deposits'.

Berikut Kodenya:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // Satu-satunya token yang ingin kita terima.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Penting untuk dipahami bahwa di dalam fungsi ini
        // msg.sender adalah alamat token yang sedang diterima,
        // msg.value  selalu 0 karena kontrak token tidak memiliki atau mengirimkan ether dalam sebagian besar kasus,
        // _from      adalah pengirim transfer token,
        // _value     adalah jumlah token yang disimpan.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Pertanyaan yang sering diajukan {#faq}

### Apa yang akan terjadi jika kita mengirim tokenB ke kontrak? {#sending-tokens}

Transaksi akan gagal, dan transfer token tidak akan terjadi. Token tersebut akan dikembalikan ke alamat pengirim.

### Bagaimana kita bisa melakukan deposit ke kontrak ini? {#contract-deposits}

Panggil fungsi 'transfer(address,uint256)' atau 'transfer(address,uint256,bytes)' dari token ERC-223, dengan menyertakan alamat 'RecipientContract'.

### Apa yang akan terjadi jika kita mentransfer token ERC-20 ke kontrak ini? {#erc-20-transfers}

Jika token ERC-20 dikirim ke 'RecipientContract', token akan ditransfer, tetapi transfer tersebut tidak akan diakui (tidak ada event 'Deposit()' yang dipicu, dan nilai deposits tidak akan berubah). Deposit ERC-20 yang tidak diinginkan tidak dapat difilter atau dicegah.

### Bagaimana jika kita ingin mengeksekusi suatu fungsi setelah deposit token selesai? {#function-execution}

Ada beberapa cara untuk melakukannya. Dalam contoh ini, kita akan mengikuti metode yang membuat transfer ERC-223 identik dengan transfer ether:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // Satu-satunya token yang ingin kita terima.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Menangani transaksi yang masuk dan melakukan panggilan fungsi berikutnya.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

Jetika `RecipientContract` menerima token ERC-223, kontrak akan mengeksekusi sebuah fungsi yang dikodekan sebagai parameter `_data` dari transaksi token, sama seperti bagaimana transaksi ether mengkodekan pemanggilan fungsi sebagai `data` transaksi. Baca [bidang data](/developers/docs/transactions/#the-data-field) untuk informasi lebih lanjut.

Dalam contoh di atas, token ERC-223 harus ditransfer ke alamat `RecipientContract` menggunakan fungsi `transfer(address,uint256,bytes calldata _data)`. Jika parameter data berisi `0xc2985578` (signature dari fungsi `foo())` maka fungsi foo() akan dipanggil setelah deposit token diterima dan event Foo() akan dipicu.

Parameter juga dapat dienkode di dalam `data` transfer token. Misalnya, kita bisa memanggil fungsi bar() dengan nilai 12345 untuk parameter `_someNumber`. Dalam kasus ini `data` harus berupa `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` di mana `0x0423a132` adalah signature dari fungsi `bar(uint256)` dan `00000000000000000000000000000000000000000000000000000000000004d2` adalah angka 12345 dalam format uint256.

## Keterbatasan {#limitations}

Meskipun ERC-223 mengatasi beberapa masalah yang ditemukan pada standar ERC-20, standar ini tidak tanpa keterbatasan:

- Adopsi dan Kompatibilitas: ERC-223 belum banyak diadopsi, sehingga dapat membatasi kompatibilitasnya dengan alat dan platform yang sudah ada.
- Kompatibilitas Mundur: ERC-223 tidak kompatibel secara mundur dengan ERC-20, artinya kontrak dan alat ERC-20 yang sudah ada tidak akan bekerja dengan token ERC-223 tanpa modifikasi.
- Biaya Gas: Pemeriksaan tambahan dan fungsionalitas dalam transfer ERC-223 dapat menyebabkan biaya gas lebih tinggi dibandingkan dengan transaksi ERC-20.

## Bacaan lebih lanjut {#further-reading}

- [EIP-223: ERC-223 Token Standard](https://eips.ethereum.org/EIPS/eip-223)
- [Initial ERC-223 proposal](https://github.com/ethereum/eips/issues/223)
