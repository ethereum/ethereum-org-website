---
title: Using UseDApp with Unity
description: Learn how to use UseDApp to interact with Unity engine project 
author: "lucasespinosa28"
tags: ["usedapp", "unity","react","dapp"]
skill: intermediate
lang: en
sidebar: true
sourceUrl: https://github.com/lucasespinosa28/usedappwithUnity
---
## Introduction {#introduction}
In this tutorial, you will learn how to use [UseDApp](https://usedapp.readthedocs.io/en/latest/) a React plugins for rapid Dapp development, 
and how to interact with a Unity using react, you will get your account balance inside a Unity and send a transaction from unity.

### You need have [Unity](https://unity.com/) installed 

## Unity project {#unity-project}
On the Unity will have a text to receive the account balance, and a button to send a transaction using UseDApp,
to communicate from unity to [UseDApp](https://usedapp.readthedocs.io/en/latest/) we will need an extra code using ```jslib```.

### 1\. Create a new unity project and configure to webgl {#new-unity-project}
Create a new unity project, the name of the project and if the project is 2d or 3d makes no difference. 
![Captura de Tela (80)](https://user-images.githubusercontent.com/52639395/119444261-4e3a6980-bd01-11eb-9946-e7b7653918b3.png)

Configure the project to build to WebGL to use in the browser, go to ```File > build settings``` choose Webgl, and click on the switch platform.

![Captura de Tela (78)](https://user-images.githubusercontent.com/52639395/119444075-0a476480-bd01-11eb-8b00-a29c13a0b468.png)

After switch to webgl go to ```Edit > Project Settings > Player ```, in publish setting choose disable compression format

![Captura de Tela (77)](https://user-images.githubusercontent.com/52639395/119443979-e2f09780-bd00-11eb-9eea-2bed9ca5596d.png)

### 2\. Create the interface{#create-UI}
Now create the UI to interact with unity
  1. Create a ```Canvas```.
  2. Create a ```Text``` with name **BalanceText** to store the balance.
  3. Create a ```Button```to call method to send a transaction and a ```Input Field``` to store the address for transaction.
![Captura de Tela (90)](https://user-images.githubusercontent.com/52639395/119541875-4dd3ba00-bd65-11eb-913a-ba320f0dfc55.png)

### 3\. Write code to receive the balance {#unity-balance}
In asset folder create a new cs file ```BalanceController.cs```, drag and drop this file into gameobject ```BalanceText```,open the code file and writer the code below.
```csharp
    void EtherBalanceToUnity(string amount)
    {
        GameObject.Find("BalanceText").GetComponent<Text>().text = $"Balance: {amoun} EHT";
    }
```
The **EtherBalanceToUnity** will receive the account balance from react app.

### 4\. Write code to send a transaction {#unity-send-transaction}
In asset folder create a new folder with name **Plugins**, create a new file ```script.jslib``` inside this new folder, 
[jslib](https://docs.unity3d.com/Manual/webgl-interactingwithbrowserscripting.html) script are similar  to javascript,
this script build a bridge between your Unity project and the react app,**SendTranscationFromUnitya** is the function that will exist in both unity and react app,write the code below.
```javascript
    mergeInto(LibraryManager.library, {
      SendTranscationFromUnity:function (address,amount) {
        ReactUnityWebGL.SendTranscationFromUnity(Pointer_stringify(address), amount);
      },
});
```
Create a new file ```SendController.cs``` put the code in the gameobject **Button**,open the file and add this code.
```csharp
    //The variable that stores the input field.
    public InputField input;
    //Tell to unity to use the script.jslib in Plugins folder, to use the SendTranscationFromUnity function in script.jslib . 
    [DllImport("__Internal")]
    private static extern void SendTranscationFromUnity(string address, double amount);
    void Start()
    {
        //Add a method to send information about your transaction.
        GameObject.Find("Button").GetComponent<Button>().onClick.AddListener(Transaction);
        //Set the input field.
        input = GameObject.Find("InputField").GetComponent<InputField>();
        //Since unity Webgl does not support ctrl-v without external code, set demo address here.
        input.text = "0xf8331f18a7106bF6B9C0847b3BbC5B6180806A2C";
    }
    void Transaction()
    {
        //A valid eth address is 42 characters long 
        if (input.text.Length == 42)
        {
          //Send transaction information to react app.
          SendTranscationFromUnity(input.text, 1e15);
        }
    }
```

Now our unit project is ready, wait for the next tutorial part to build the project, the code only works when is builded, it will not work in unity editor mode, 
to learning more about unity in web browser and how interact using javascript consult the [official documentation](https://docs.unity3d.com/Manual/webgl-gettingstarted.html)

## React app with UseApp {#React-UseDApp}
Create a react app that use UseDApp,with UseDapp is possible easy connect you web wallet in a dapp to send transaction and get information about your account,
also use [react-unity-webgl](https://github.com/jeffreylanters/react-unity-webgl) to help use the Unity in a react app.  

### 1\.Create a react app and install the necessary plugins {#React-app-modules}
Create a react app and install UseDApp and react-unity-webgl
 1. ```npx create-react-app dapp --template typescript ```
 2. ```npm install @usedapp/core```
 3. ```npm install react-unity-webgl@8.x```

### 2\. Build unity project and add to react app{#add-unity-app}
In your react app in the```public```folder create a new folder ```unity``` and build your unity project to this folder ```public/unity```.
![Captura de Tela (87)](https://user-images.githubusercontent.com/52639395/119470093-5ce34980-bd1e-11eb-8737-5d20aa36e6fa.png)

### 3\. React unity{#react-unity-webgl}
Now the unity project are builded ,use [react-unity-webgl](https://github.com/jeffreylanters/react-unity-webgl) to insert a unity project inside a react app, in ```src/App.tsx``` add this code.
```typescript
import Unity, { UnityContext } from "react-unity-webgl";

//create a new unity webgl
const unityContext = new UnityContext({
  loaderUrl: "unity/Build/unity.loader.js",
  dataUrl: "unity/Build/unity.data",
  frameworkUrl: "unity/Build/unity.framework.js",
  codeUrl: "unity/Build/unity.wasm",
});


function App() {
  return (
    <div className="App">
    //insert the  unity webgl in your app
       <Unity unityContext={unityContext} />
    </div>
  );
}
```
Set a size for unity WebGL using css in ```src/index.css```
```css
canvas{
  width: 840px;
  height: 480px;
}

```
### 4\. Configure UseDApp{#UseDApp-config}
Let's use the UseDApp to get the account balance and send a transction,but first we need to configure it in ```src/index.tsx```
```typescript
import { ChainId, Config, DAppProvider } from '@usedapp/core';

const config:Config  = {
  //Choose your favorite network
  readOnlyChainId: ChainId.Kovan,
  readOnlyUrls: {
    [ChainId.Kovan]: '<add a eth endpoint here>',
  },
}
//Add UseDApp in your app
ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```
### 5\. UseDApp to communicate with unity{#UseDApp}
Create the functions that will interact with unity, in ```sr/App.tsx``` let's write  the first part of code to interact with unity.
```typescript
  import { useEtherBalance, useEthers, useSendTransaction } from '@usedapp/core';
  import { formatEther,formatUnits} from '@ethersproject/units'
  
  //This function will show the account balance in the unity. 
  function EtherBalanceToUnity(amount : string) {
    unityContext.send("/Canvas/Text", "EtherBalanceToUnity", amount);
  }
```
Now modify the **App function** to show the account balance on unity and send a transaction when clicked in button inside the unity
```typescript
 const App = () => {
   //Connect to wallet to access your account.
  const { activateBrowserWallet, account } = useEthers()
   //The function that will be used to send a transaction.
  const { sendTransaction } = useSendTransaction()

  //Get the balance in your account.
  const etherBalance = useEtherBalance(account)
  //Detect if the SendTranscationFromUnity method in unity is called,and open the wallet to send a new transaction.
  unityContext.on("SendTranscationFromUnity",( address, amount) => {
    sendTransaction({ to: address, value: amount })
  });
  return <div>
    <div>
     //Connect to your wallet
      <button onClick={() => { 
            activateBrowserWallet(); 
          }}>Connect</button>
          {account && <p>Account: {account}</p>}
          //Show your account balance on unity
          {etherBalance && EtherBalanceToUnity(formatEther(etherBalance))}
    </div>
    <div>
      <Unity unityContext={unityContext} />
    </div>
  </div>
    
}
```
Run your app: ```npm run start```,

When clicked in connect the UsaDApp will open your wallet and ask to connect to website,if you accept the connection, your account balance will be shown in the unity.
When clicked in **Send 0.001ETH** , the unity will pass the address inside the input field and the amount to **SendTranscationFromUnity** in your react app, 
and will be open a pop-up asking to confirm the transaction.
![Captura de Tela (92)](https://user-images.githubusercontent.com/52639395/119553471-0d2e6d80-bd72-11eb-873f-82856299f330.png)

