---
title: "Connect your website to MetaMask and ENS"
description: "Learn how to fetch the user's account data and possible ENS domain using JavaScript and the ethers.js library and thus making it accessible to your website."
author: "Sebastian Supreme"
sidebar: true
tags: ["metamask", "ens", "ethersjs", "ethers.js", "javascript", "html", "css"]
skill: intermediate
published: 2022-09-23
lang: en
---

In this article you will learn to easily implement MetaMask and Ethereum Name Service support into your website.
This is accomplished using JavaScript and the ethers.js library.
Please note that this tutorial is only for educational purposes and is not intended to be used commercially, but rather as a quick way to set up a makeshift implementation to test your code.
The following code is licensed under the MIT license (SPDX-License-Identifier: MIT).

Copyright (c) 2022 Sebastian Supreme

## HTML {#html}

First, we will preload the ethers.js library directly through your browser.
For that, you need to include the following line into the head of your HTML file.
```html
<head>
  <!--Ethers.js library-->
  <link rel="preconnect" href="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js">
</head>
```
Now, we move on to the body.
We create a button to control the action of connecting to MetaMask, which we will implement later on.
Additionally, we insert the library script.
```html
<body>
  <a id="connectbutton" href="#">Connect Wallet</a>
  <script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js" type="application/javascript"></script>
  <!--...-->
</body>
```
## CSS {#css}

We temporarily move to the css file to style the button and give it a nice look.
```css
a {
    position: absolute;
    top: 10px;
    right: 15px;
    display: inline-block;
    padding: 7px 14px;
    margin: 10px 10px 10px 10px;
    color: #fff;
    text-decoration: none;
    overflow: hidden;
    font-size: 15px;
    letter-spacing: 1px;
    border-radius: 16px;
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.5), 0 0 0 0 rgba(0, 238, 255, 0.5);
    transition: box-shadow 0.3s ease;
    background: linear-gradient(90deg, #0011ff, #00ddff);
}

a:hover {
    box-shadow: 5px -5px 12px 0 rgba(0, 123, 255, 0.5), -5px 5px 12px 0 rgba(0, 238, 255, 0.5);
}
```
## JavaScript {#javascript}

Now follows the actual JavaScript implementation. For that, we navigate back to the HTML file and continue where we left off.
```html
<script type="text/javascript">
  //Insert the following code here
</script>
```
We start off with defining the necessary variables.
Lucky for us, we can easily access MetaMask through the `window.ethereum` object as long as the user has already installed the MetaMask extension.
We fetch our button and assign a variable to it. 
And lastly, we define some basic variables.
```javascript
// SPDX-License-Identifier: MIT
const provider = new ethers.providers.Web3Provider(window.ethereum);
const connectbutton = document.getElementById("connectbutton");

let connectedToMetaMask = false;
let account;
let ens_name;
let abbr_account; //abbreviation of the account address
let balance_wei;
let balance_eth;
```
Next, we will implement a function to reverse resolve the ENS domain of the user.
Note that ethers.js automatically checks that the forward resolution matches.
```javascript
// SPDX-License-Identifier: MIT
//Reverse Resolution Ethereum Name Service
async function reverseResolutionENS(address){
    ens_name = await provider.lookupAddress(address);
    console.log('Current ENS Name: ' + ens_name);

    if (ens_name != null) {
        connectbutton.textContent = ens_name;
    } else {
        connectbutton.textContent = abbr_account;
    }
}
```
Now, we write another function to request a MetaMask connection.
```javascript
// SPDX-License-Identifier: MIT
//Request account connection
function connectAccount(){
    window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(accounts => {
        account = accounts[0];
        console.log(account);
        connectedToMetaMask = true;

        updateConnectButton();

        updateBalance();
    });
}
```
We implement yet another function to update the information on our button.
It either shows the address or the ENS domain if there is one available.
```javascript
// SPDX-License-Identifier: MIT
//Display current account on connectbutton
function updateConnectButton(){
    connectbutton.style["boxShadow"] = "0 0 0px #000";
    const array = account.toString().split('');
    abbr_account = array[0] + array[1] + array[2] + array[3] + array[4] + '...' + array[array.length - 4] + array[array.length - 3] + array[array.length - 2] + array[array.length - 1];
    connectbutton.textContent = abbr_account;

    reverseResolutionENS(account);
}
```
And we need one last function to update the balance variables.
```javascript
// SPDX-License-Identifier: MIT
//Request account balance
function updateBalance(){
    window.ethereum
    .request({ method: 'eth_getBalance', params: [account, 'latest'] })
    .then(result => {
        balance_wei = parseInt(result);
        balance_eth = balance_wei / 10**18;
        console.log(balance_eth + ' ETH');
        console.log(balance_wei + ' wei');
    });
}
```
Additionally, we check for an event that gets triggered when the user switches accounts.
```javascript
// SPDX-License-Identifier: MIT
//Event: Account has changed
window.ethereum.on('accountsChanged', function (accounts) {
    try{
        connectAccount();
    } catch (error){
        console.error(error);
    }
});
```
And last but not least, we attach an event listener to our button to manage click events.
```javascript
// SPDX-License-Identifier: MIT
//OnClick Listener for connectbutton
connectbutton.addEventListener('click', () => {

    if(connectedToMetaMask == false){

        //Check if MetaMask is installed
        if (typeof window.ethereum !== 'undefined') {

            try{
                connectAccount();
            } catch (error){
                console.error(error);
            }

        } else {
            connectbutton.innerText = 'MetaMask not installed';
            console.log('MetaMask is not installed!');
        }

    }

});
```
## Conclusion {#conclusion}

Congratulations! If you followed the steps and completed the basic website layout by yourself, then you should have a functioning test set up to connect to your Ethereum account.
You can now use the data stored in the variables to your heart's content.
Note that this implementation example will throw errors if the user cancels the connection attempt. You need to implement a way to handle those events by yourself.

You can test your website locally in your browser by cd'ing your way into the project folder and starting a http-server using your command line.

Best of luck.
