---
title: API JSON-RPC
description: Protokol pemanggilan prosedur jarak jauh (RPC) tanpa state dan berbobot ringan untuk klien Ethereum.
lang: id
---

Agar aplikasi perangkat lunak dapat berinteraksi dengan blockchain Ethereum (dengan membaca data blockchain dan/atau mengirim transaksi ke jaringan), perangkat lunak harus terhubung dengan node Ethereum.

Untuk keperluan ini, setiap [klien Ethereum](/developers/docs/nodes-and-clients/#execution-clients) mengimplementasikan [spesifikasi JSON-RPC](http://www.jsonrpc.org/specification), sehingga ada serangkaian metode yang seragam yang menjadi tumpuan aplikasi.

JSON-RPC adalah protokol pemanggilan prosedur jarak jauh (RPC) tanpa state dan berbobot ringan. Spesifikasi ini terutama menentukan beberapa struktur data dan aturan seputar pemrosesannya. Ini adalah transportasi agnostik karena konsepnya dapat digunakan dalam proses yang sama, melalui soket, melalui HTTP, atau dalam beragam lingkungan penyaluran pesan. Menggunakan JSON (RFC 4627) sebagai format data.

## Sumber daya JSON-RPC {#json-rpc-resources}

- [Spesifikasi JSON-RPC Ethereum](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/eth1.0-apis/assembled-spec/openrpc.json&uiSchema[appBar][ui:splitView]=true&uiSchema[appBar][ui:input]=false&uiSchema[appBar][ui:examplesDropdown]=false)
- [Repo GitHub Spesifikasi JSON-RPC Ethereum](https://github.com/ethereum/eth1.0-apis)

## Implementasi klien {#client-implementations}

Tiap klien Ethereum dapat menggunakan bahasa pemrograman berbeda ketika mengimplementasikan spesifikasi JSON-RPC. Lihat [dokumentasi klien](/developers/docs/nodes-and-clients/#execution-clients) individual untuk detail lebih lanjut terkait bahasa pemrograman spesifik. Kami menyarankan melihat dokumentasi dari setiap klien untuk mendapatkan informasi dukungan API yang terbaru.

## Pustaka Praktis {#convenience-libraries}

Meskipun Anda dapat memilih untuk berinteraksi secara langsung dengan klien Ethereum melalui API JSON-RPC, sering kali ada opsi yang lebih mudah bagi para pengembang dapp. Banyak pustaka [JavaScript](/developers/docs/apis/javascript/#available-libraries) dan [API backedn](/developers/docs/apis/backend/#available-libraries) ada untuk menyediakan wrapper berdasarkan API JSON-RPC. Dengan menggunakan pustaka ini, pengembang dapat menulis metode satu baris yang intuitif dalam bahasa pemrograman pilihan mereka untuk memulai permintaan JSON-RPC (yang mendasari) yang berinteraksi dengan Ethereum.

## Topik terkait {#related-topics}

- [Node dan klien](/developers/docs/nodes-and-clients/)
- [API JavaScript](/developers/docs/apis/javascript/)
- [API Backend](/developers/docs/apis/backend/)
