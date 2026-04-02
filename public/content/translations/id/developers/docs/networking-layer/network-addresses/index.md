---
title: Alamat jaringan
description: Pengenalan tentang alamat jaringan.
lang: id
sidebarDepth: 2
---

Node [Ethereum](/) harus mengidentifikasi diri mereka dengan beberapa informasi dasar untuk terhubung ke peer. Untuk memastikan setiap calon peer dapat menafsirkan informasi ini, informasi tersebut disampaikan dalam salah satu dari tiga format standar yang dapat dipahami oleh node Ethereum mana pun: multiaddr, enode, atau Ethereum Node Records (ENR). ENR adalah standar saat ini untuk alamat jaringan Ethereum.

## Prasyarat {#prerequisites}

Beberapa pemahaman tentang [lapisan jaringan](/developers/docs/networking-layer/) Ethereum diperlukan untuk memahami halaman ini.

## Multiaddr {#multiaddr}

Format alamat node Ethereum yang asli adalah 'multiaddr' (singkatan dari 'multi-addresses'). Multiaddr adalah format universal yang dirancang untuk jaringan peer-to-peer. Alamat direpresentasikan sebagai pasangan kunci-nilai dengan kunci dan nilai yang dipisahkan oleh garis miring. Misalnya, multiaddr untuk node dengan alamat IPv4 `192.168.22.27` yang mendengarkan port TCP `33000` terlihat seperti:

`/ip4/192.168.22.27/tcp/33000`

Untuk node Ethereum, multiaddr berisi ID node (sebuah hash dari kunci publik mereka):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Enode adalah cara untuk mengidentifikasi node Ethereum menggunakan format alamat URL. ID node heksadesimal dienkode di bagian nama pengguna dari URL yang dipisahkan dari host menggunakan tanda @. Nama host hanya dapat diberikan sebagai alamat IP; nama DNS tidak diperbolehkan. Port di bagian nama host adalah port pendengar TCP. Jika port TCP dan UDP (penemuan) berbeda, port UDP ditentukan sebagai parameter kueri "discport".

Dalam contoh berikut, URL node mendeskripsikan node dengan alamat IP `10.3.58.6`, port TCP `30303`, dan port penemuan UDP `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Ethereum Node Records (ENR) {#enr}

Ethereum Node Records (ENR) adalah format standar untuk alamat jaringan di Ethereum. Mereka menggantikan multiaddr dan enode. Ini sangat berguna karena memungkinkan pertukaran informasi yang lebih besar antar node. ENR berisi tanda tangan, nomor urut, dan bidang yang merinci skema identitas yang digunakan untuk menghasilkan dan memvalidasi tanda tangan. ENR juga dapat diisi dengan data arbitrer yang diatur sebagai pasangan kunci-nilai. Pasangan kunci-nilai ini berisi alamat IP node dan informasi tentang sub-protokol yang dapat digunakan oleh node. Klien konsensus menggunakan [struktur ENR spesifik](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure) untuk mengidentifikasi boot node dan juga menyertakan bidang `eth2` yang berisi informasi tentang fork Ethereum saat ini dan subnet gosip pengesahan (ini menghubungkan node ke sekumpulan peer tertentu yang pengesahannya diagregasi bersama).

## Bacaan Lebih Lanjut {#further-reading}

- [EIP-778: Ethereum Node Records (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)