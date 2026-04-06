---
title: Standar Token ERC-223
description: Gambaran umum tentang standar token fungible ERC-223, cara kerjanya, dan perbandingannya dengan ERC-20.
lang: id
---

## Pengantar {#introduction}

### Apa itu ERC-223? {#what-is-erc223}

ERC-223 adalah standar untuk token fungible, mirip dengan standar ERC-20. Perbedaan utamanya adalah ERC-223 tidak hanya mendefinisikan API token tetapi juga logika untuk mentransfer token dari pengirim ke penerima. Ini memperkenalkan model komunikasi yang memungkinkan transfer token ditangani di sisi penerima.

### Perbedaan dari ERC-20 {#erc20-differences}

ERC-223 mengatasi beberapa batasan ERC-20 dan memperkenalkan metode interaksi baru antara kontrak token dan kontrak yang mungkin menerima token. Ada beberapa hal yang dimungkinkan dengan ERC-223 tetapi tidak dengan ERC-20:

- Penanganan transfer token di sisi penerima: Penerima dapat mendeteksi bahwa token ERC-223 sedang didepositkan.
- Penolakan token yang dikirim secara tidak benar: Jika pengguna mengirim token ERC-223 ke kontrak yang tidak seharusnya menerima token, kontrak dapat menolak transaksi, mencegah hilangnya token.
- Metadata dalam transfer: Token ERC-223 dapat menyertakan metadata, memungkinkan informasi arbitrer dilampirkan pada transaksi token.

## Prasyarat {#prerequisites}

- [Akun](/developers/docs/accounts)
- [Kontrak Pintar](/developers/docs/smart-contracts/)
- [Standar token](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Isi {#body}

ERC-223 adalah standar token yang mengimplementasikan API untuk token di dalam kontrak pintar. Ini juga mendeklarasikan API untuk kontrak yang seharusnya menerima token ERC-223. Kontrak yang tidak mendukung API Penerima ERC-223 tidak dapat menerima token ERC-223, mencegah kesalahan pengguna.

Jika sebuah kontrak pintar mengimplementasikan metode dan peristiwa berikut, itu dapat disebut kontrak token yang kompatibel dengan ERC-223. Setelah diterapkan, kontrak tersebut akan bertanggung jawab untuk melacak token yang dibuat di Ethereum.

Kontrak tidak diwajibkan untuk hanya memiliki fungsi-fungsi ini dan pengembang dapat menambahkan fitur lain dari standar token yang berbeda ke kontrak ini. Misalnya, fungsi `approve` dan `transferFrom` bukan bagian dari standar ERC-223 tetapi fungsi-fungsi ini dapat diimplementasikan jika diperlukan.

Dari [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Metode {#methods}

Token ERC-223 harus mengimplementasikan metode berikut:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Kontrak yang seharusnya menerima token ERC-223 harus mengimplementasikan metode berikut:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Jika token ERC-223 dikirim ke kontrak yang tidak mengimplementasikan fungsi `tokenReceived(..)` maka transfer harus gagal dan token tidak boleh dipindahkan dari saldo pengirim.

### Peristiwa {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Contoh {#examples}

API token ERC-223 mirip dengan ERC-20, jadi dari sudut pandang pengembangan UI tidak ada perbedaan. Satu-satunya pengecualian di sini adalah bahwa token ERC-223 mungkin tidak memiliki fungsi `approve` + `transferFrom` karena ini bersifat opsional untuk standar ini.

#### Contoh Solidity {#solidity-example}

Contoh berikut mengilustrasikan bagaimana kontrak token ERC-223 dasar beroperasi:

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

Sekarang kita ingin kontrak lain menerima deposit `tokenA` dengan asumsi bahwa tokenA adalah token ERC-223. Kontrak harus menerima hanya tokenA dan menolak token lainnya. Ketika kontrak menerima tokenA, kontrak harus memancarkan peristiwa `Deposit()` dan meningkatkan nilai variabel `deposits` internal.

Berikut adalah kodenya:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // The only token that we want to accept. // Satu-satunya token yang ingin kami terima.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // It is important to understand that within this function // Penting untuk dipahami bahwa di dalam fungsi ini
        // msg.sender is the address of a token that is being received, // msg.sender adalah alamat dari token yang sedang diterima,
        // msg.value  is always 0 as the token contract does not own or send ether in most cases, // msg.value  selalu 0 karena kontrak token tidak memiliki atau mengirim ether pada sebagian besar kasus,
        // _from      is the sender of the token transfer, // _from      adalah pengirim dari transfer token,
        // _value     is the amount of tokens that was deposited. // _value     adalah jumlah token yang disetorkan.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Pertanyaan yang sering diajukan {#faq}

### Apa yang akan terjadi jika kita mengirim beberapa tokenB ke kontrak? {#sending-tokens}

Transaksi akan gagal, dan transfer token tidak akan terjadi. Token akan dikembalikan ke alamat pengirim.

### Bagaimana kita bisa melakukan deposit ke kontrak ini? {#contract-deposits}

Panggil fungsi `transfer(address,uint256)` atau `transfer(address,uint256,bytes)` dari token ERC-223, dengan menentukan alamat `RecipientContract`.

### Apa yang akan terjadi jika kita mentransfer token ERC-20 ke kontrak ini? {#erc-20-transfers}

Jika token ERC-20 dikirim ke `RecipientContract`, token akan ditransfer, tetapi transfer tidak akan dikenali (tidak ada peristiwa `Deposit()` yang akan dipicu, dan nilai deposit tidak akan berubah). Deposit ERC-20 yang tidak diinginkan tidak dapat disaring atau dicegah.

### Bagaimana jika kita ingin mengeksekusi beberapa fungsi setelah deposit token selesai? {#function-execution}

Ada beberapa cara untuk melakukannya. Dalam contoh ini kita akan mengikuti metode yang membuat transfer ERC-223 identik dengan transfer ether:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // The only token that we want to accept. // Satu-satunya token yang ingin kami terima.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Handle incoming transaction and perform a subsequent function call. // Menangani transaksi masuk dan melakukan pemanggilan fungsi berikutnya.
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

Ketika `RecipientContract` menerima token ERC-223, kontrak akan mengeksekusi fungsi yang dienkode sebagai parameter `_data` dari transaksi token, identik dengan bagaimana transaksi ether mengenkode panggilan fungsi sebagai `data` transaksi. Baca [bidang data](/developers/docs/transactions/#the-data-field) untuk informasi lebih lanjut.

Dalam contoh di atas, token ERC-223 harus ditransfer ke alamat `RecipientContract` dengan fungsi `transfer(address,uin256,bytes calldata _data)`. Jika parameter data adalah `0xc2985578` (tanda tangan dari fungsi `foo()`) maka fungsi foo() akan dipanggil setelah deposit token diterima dan peristiwa Foo() akan dipicu.

Parameter juga dapat dienkode dalam `data` transfer token, misalnya kita dapat memanggil fungsi bar() dengan nilai 12345 untuk `_someNumber`. Dalam hal ini `data` harus berupa `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` di mana `0x0423a132` adalah tanda tangan dari fungsi `bar(uint256)` dan `00000000000000000000000000000000000000000000000000000000000004d2` adalah 12345 sebagai uint256.

## Batasan {#limitations}

Meskipun ERC-223 mengatasi beberapa masalah yang ditemukan dalam standar ERC-20, standar ini bukannya tanpa batasan tersendiri:

- Adopsi dan Kompatibilitas: ERC-223 belum diadopsi secara luas, yang mungkin membatasi kompatibilitasnya dengan alat dan platform yang ada.
- Kompatibilitas Mundur: ERC-223 tidak kompatibel mundur dengan ERC-20, yang berarti bahwa kontrak dan alat ERC-20 yang ada tidak akan berfungsi dengan token ERC-223 tanpa modifikasi.
- Biaya Gas: Pemeriksaan dan fungsionalitas tambahan dalam transfer ERC-223 dapat mengakibatkan biaya gas yang lebih tinggi dibandingkan dengan transaksi ERC-20.

## Bacaan lebih lanjut {#further-reading}

- [EIP-223: Standar Token ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Proposal awal ERC-223](https://github.com/ethereum/eips/issues/223)