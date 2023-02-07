# Building a Decentralized Application on Stacks Blockchain Using Clarity

In this tutorial, we are going to learn how to build a simple decentralized application on Stacks blockchain using Clarity and ReactJS. This article aims to introduce you to this technology and how to work with it.

This tutorial will be divided into three chapters:

- Introduction to Stacks and Clarity
- Creating your first smart contract using Clarity
- Building a decentralized application using ReactJS and Clarity

Let’s get started!

# Introduction to Stacks and Clarity

## What Is Stacks?

![stacks-homepage.png](/docs/images/stacks-homepage.png)

The Stacks blockchain project (formerly Blockstack) was founded in 2013 by [Muneeb Ali](https://muneeb.com/) and [Ryan Shea](https://www.shea.io/), and it became the first SEC-qualified token offering in 2019. Stack is an open-source blockchain network that leverages the security and capital of Bitcoin for decentralized apps and smart contracts. To enable apps and smart contracts, Stacks is connected to Bitcoin.

Several misconceptions revolve around Stacks, like Stacks is a layer-2 system, a merge-mined chain, a sidechain, or a proof-of-stake chain. It is not. Stacks is a layer-1 blockchain, that is using a novel and unique mining protocol called *proof-of-transfer* (PoX). This kind of protocol runs in parallel to another blockchain, and in Stacks’ case, it is Bitcoin, and Stacks uses a reliable broadcast medium for its block header.

Stacks is **not** a layer-2 system for Bitcoin — Stacks is an independent system in and of itself. The Stacks blockchain is run entirely by and for Stacks nodes, making it different from the Bitcoin blockchain. Transactions in Stacks are distinct from those in bitcoin. While Stacks is made to introduce new use cases for Bitcoin through smart contracts, layer-2 technologies like Lightning are made to scale Bitcoin payment transactions. Stacks is not intended to be a layer-2 scaling solution for Bitcoin.

Stacks is **not** a merged-mined chain — Stacks miners are the only block producers on the Stacks chain. Bitcoin miners do not validate Stacks blocks and do not receive Stacks block rewards. Furthermore, Stacks is not a blind merged-mined chain because STX block winners are public and randomly selected (rather than highest-bid-wins), and its tokens are minted on a schedule independent of miner commitment or Bitcoin transferred (instead of minted only by one-way pegs from Bitcoin). This ensures that Stacks can progress without the involvement of Bitcoin miners, and that Stacks miners are adequately compensated for keeping the system running regardless of transaction volume.

Stacks is **not** a sidechain for two reasons. First, the history of all Stacks blocks is stored in Bitcoin. This means that creating a private Stacks fork is at least as difficult as reorganizing the Bitcoin chain. As a result, attacks on the chain that rely on creating private forks (such as selfish mining and double-spending) are much more difficult to carry out profitably, because all honest participants can see the attack coming and apply countermeasures before it occurs. Sidechains do not provide this level of security. Second, rather than representing pegged Bitcoin, the Stacks blockchain has its own token. This means that the Stacks blockchain's canonical fork is supported by the value of its entire token economy, whereas the support for a sidechain's canonical fork is only provided by system-specific incentives for its validators to produce blocks honestly or by the willingness of Bitcoin miners to process peg-in requests (whichever is the weaker guarantee).

Stacks is **not** a PoS chain — Unlike PoS, which would need ownership of the native coin, block generation requires an extrinsic investment. Transferring Bitcoin to a specified random list of Bitcoin addresses is the sole way to create blocks in the Stacks chain. Additionally, the Stacks blockchain has the ability to fork, and a mechanism exists to rank forks according to quality regardless of the group of miners and the tokens they own. These two characteristics set it apart from PoS chains, which are unable to fork since there is no way to determine a canonical fork without relying on a third party to declare a certain fork to be legitimate. The Stacks blockchain can withstand failure modes that would bring down a PoS chain, thanks to its forking capability.

Please take a look at this table to see the key differences between Stacks and other chain types.

![stacks-key-differences.png](/docs/images/stacks-key-differences.png)

If you want to learn more about Stacks blockchain, you can visit the official website at [https://stacks.co](https://stacks.co).

## What Is Clarity?

Clarity is a smart contract language that originally target Stacks blockchain. It is developed as a joint effort of [Hiro PBC](https://hiro.so/), [Algorand](http://algorand.com/), and other various stakeholders. Clarity enables you to create smart contracts that are more secure and safe, which is a big advancement in the realm of smart contract creation. The language is designed specifically for developers working on applications involving high-stakes transactions and is optimized for readability and predictability.

There are several reasons that make the Clarity different from other smart contract languages. First, Clarity is secure by design, and this design process was done by examining the common pitfalls, mistakes, and vulnerabilities in the smart contract engineering field as a whole. Some other reasons are Clarity is interpreted, it does not permit reentrancy, and built-in support for custom token.

Clarity is interpreted, not compiled — The Clarity code is interpreted and submitted to the blockchain without any change, unlike the Solidity where it needs to be compiled into byte-code before it is submitted to the blockchain. There are two risks with the compiled smart contract language; First, the compiler adds a layer of complexity, and the bugs in the compiler may leads to a different byte-code. Two, the byte-code is not human-readable, and it leads to difficulty to verify what the smart contract is actually doing.

Clarity does not permit reentrancy — When one smart contract calls another, and that second contract calls back into the first, this is known as reentrancy; the call "re-enters" the same logic. It might make it possible for an attacker to start several token withdrawals before the contract has time to update its internal balance sheet. Reentrancy is not allowed on the language level according to Clarity's design, which views it as a negative trait.

Built-in support for custom token — Custom fungible and non-fungible token issuance is a common use for smart contracts. The Clarity language has built-in support for custom token features. The language has internal support to help the developer for creating an internal balance sheet, managing supply, and emitting token events.

# Creating Your First Smart Contract Using Clarity

In this part, we are going to start learning on how to build smart contract using Clarity, and just like any other programming languages, we are going to start with a simple `hello world` program locally, and deploy it on the testnet. But before that, we need to set up our local development environment.

## Setting Up Local Development Environment

To create and debug the smart contracts locally, we are going to need these tools installed on your computer:

- [Clarinet](https://github.com/hirosystems/clarinet)
- [Clarity for Visual Studio Code plugin](https://marketplace.visualstudio.com/items?itemName=HiroSystems.clarity-lsp)

### Installing Clarinet

Clarinet is a local Clarity runtime that is packaged as a command-line application. It allows you to rapidly develop and test the Clarity smart contract without the need to deploy the contract to a local mocknet or a testnet.

Clarinet is available in the Homebrew (MacOS) and Winget (Windows) package manager, and it is highly recommended to install Clarinet from the package manager. Please refer to the official website for [Homebrew](https://brew.sh/) (MacOS) or [Winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/) (Windows) if you have not installed this package manager on your computer.

To install Clarinet on MacOS using Homebrew, use the following command:

```bash
brew install clarinet
```

And to install the Clarinet on Windows using Winget, use the following command:

```bash
winget install clarinet
```

After you finished installing the Clarinet, you can try to run this command to check if the Clarity has been installed successfully (the installed version could be different).

```bash
$ clarinet --version
clarinet-cli 0.33.0
```

### Installing Clarity for Visual Studio Code Plugin

If you are using Visual Studio Code for writing the code, you can install this plugin with these simple steps:

- Open your Visual Studio Code
- Open the *Extensions* sidebar, and search for “*Clarity for Visual Studio Code*”
- Click on the plugin, and choose *install*.

If you want to read the details of this plugin before installing it, you can read it on the official [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=HiroSystems.clarity-lsp).

## Develop Your First Smart Contract

If you have successfully installed the Clarinet, you can now start to develop the Clarinet smart contract by creating a Clarity project using the following command:

```bash
clarinet new awesome-project && cd awesome-project
```

There will be an option for you to participate in Clarinet development by sending diagnostic and usage data. Type ***y*** and E*nter* if you want to participate, or type ***n*** and *Enter* if you do not want to participate.

The command above will create a Clarity project directory and populate it with the boilerplate files that will help you to speed up the development process.

This is what the *Explorer* in your Visual Studio Code will look like:

![vscode-1.png](/docs/images/vscode-1.png)

To create a new smart contract, use the following command:

```bash
clarinet contract new my-contract
```

It will create a new `my-contract.clar` file under the `/contracts` directory. You can safely delete all the comments from this file since we are not using it.

Next, we are going to start writing the actual smart contract in it.

### Writing The Code

We are going to start with a simple *hello-world* program, so please write this code into the `my-contract.clar` file:

```lisp
(define-public (say-hi)
  (ok "hello world"))
```

Clarity features a *LISP-like* syntax, meaning that you will see a lot of parentheses, and inside these parentheses, there will be a lot of symbols, phrases, values, and other parentheses. Do not be intimidated by this if you find yourself unfamiliar with the syntax. Everyone has to start somewhere.

### Interacting With The Smart Contract

Now we are going to interact with the smart contract we have wrote. To begin with, we need to verify that the contract has the correct syntax with this command:

```bash
clarinet check
```

It will show the result like this, depends on your syntax correctness:

![console-2.png](/docs/images/console-2.png)

The next step is opening your Clarinet console with this command:

```bash
clarinet console
```

The first thing you will see after you run the code above is a table contains wallet addresses and STX balances like this:

![console-1.png](/docs/images/console-1.png)

To start interact with the `say-hi` function in the `my-contract.clar` file that we have just wrote, you can use this command:

```lisp
(contract-call? .my-contract say-hi)
```

and with the output result, it will look like this:

```lisp
>> (contract-call? .my-contract say-hi)
(ok "hello world")
```

What we have just done was, we are calling the built-in `contract-call` Clarinet function, and it opened the `my-contract` file, and call the `say-hi` function.

> 💡 Do you remember that Clarity is an interpreted language? When we call the `say-hi` function, we do not compile it.


But, what about arguments? At some point, we are going to need to put an argument (or more) for more complex function.

Let’s get back to `my-contract.clar` and write these lines of code below the `say-hi` function, and we will name it `my-name` function.

```lisp
(define-read-only (my-name (name (string-ascii 10))) 
  (ok name))
```

As you can see in the `my-name` function, the first line of this function contains a lot of parentheses, similar to LIPS language. We will get into this later.

The final `my-contract.clar` smart contract file would be like similar to this:

```lisp
(define-public (say-hi)
  (ok "hello world"))

(define-read-only (my-name (name (string-ascii 10))) 
  (ok name))
```

To run this new function, close the Clarinet console (using Ctrl+D), and repeat the same process:

- `clarinet test`
- `clarinet console`

But this time, the command to run the `my-name` function is a little bit different. You can use the following command:

```lisp
(contract-call? .my-contract my-name "John")
```

Since the `my-name` function takes an argument, we can put the argument after the function name, hence the `"John"` in the end of command before the parentheses.

And here is the result:

```lisp
>> (contract-call? .my-contract my-name "John")
(ok "John")
```

That is, we are now understand how to write a Clarity smart contract and how to interact with. The next step of this tutorial is to deploy the smart contract to the testnet, and interact with it. But before we jump into that part, it is better for us to understand the basic of Clarity.

### The Clarity Basic

As mentioned previously, Clarity is a *LIPS-like* language, and there will be a lot of parentheses inside the smart contract file. One best way to conceptualize Clarity is to think of lists inside lists, and it is usually called [S-expression](https://en.wikipedia.org/wiki/S-expression). Try to run these command inside the Clarinet console, and see what you get.

- `(+ 4 5)`
- `(concat "Hello" " World!")`
- `(* 2 (+ 19 80))`

Surprisingly, the notation above is being used in real life! In math, it is called [Polish notation](https://en.wikipedia.org/wiki/Polish_notation), even though not everyone get used to it.

As you start writing more Clarity code, you will discover which formatting is most comfortable for you. Looking at how other developers format their code also helps.

Just like any other programming language, you can also write commentary inside your code. Your comments are prefixed with a double semicolon `;;` . It can also be used to temporarily disable some lines of code during development process.

See this example on how the commentary works in Clarity:

```lisp
;; A comment on its own line.

(+ 1 2) ;; The result will be 3.

;; The following line is not evaluated:
;; (+ 4 5)
```

Now, can you convert this line into Clarity?

```bash
(45 * 12) - 21
```

Clarity is fun, *right*? To learn more about Clarity language, you can visit the official website at [https://clarity-lang.org/](https://clarity-lang.org/).

## Deploying Smart Contract

Deploying the Clarity smart contract is quite easy after you understand the basic of Clarity. But in this part, we are not going to use the *command-line* tool. Instead, we are going to use the online tools that already available. Here are the steps that we are going to do to deploy the Clarity smart contract:

- Installing Hiro Wallet
- Request STX balance
- Deploying smart contract
- Interact with smart contract

### Installing Hiro Wallet

Hiro Wallet to Stacks is like Metamask to Ethereum. It is the most popular wallet for the Stacks blockchain. There are other several wallet options that we can use for Stacks blockchain, but in this tutorial, we are going to use Hiro Wallet.

To install Hiro Wallet extension on your web browser, you can start by opening the official download page at [https://wallet.hiro.so/wallet/install-web](https://wallet.hiro.so/wallet/install-web). At the point when this tutorial is written, Hiro Wallet only supports Chrome/Brave and Firefox, so if you are using another browser, you have to change your browser. 

Just like the Clarinet, after you install the wallet, you will be asked if you are willing to participate in the Hiro Wallet development by sending diagnostic and usage data. Click “*Allow”* if you want to participate, or click “*Deny”*  if you do not want to participate.

After that, you will be asked to create a new wallet. Click the the “*Create new wallet*” button if you do not have one.

![wallet-1.png](/docs/images/wallet-1.png)

To create a new wallet, there will be several steps you need to go through:

- After you click the *Create new wallet* button, the wallet will generate a new secret phrase. Treat this as a password and save it in somewhere safe. Click *I’ve backed it up* button if you have stored it.
- Create a password for your wallet. The password should be longer than 12 characters, with symbols, numbers and words. Click *Continue* when you are done.
- You will be asked to fund your wallet. You can click *Skip* button in the top-right corner if you do not want to fund your wallet for now.
- You are set! You wallet is ready to use.

### Request STX Balance

Every single transaction in blockchain requires you to pay with real money (that already converted to cryptocurrency). But in development phase, we do not want to spend our money just to test the application. That is why the testnet exists; to help you develop, test and interact with the application (in this case, with the smart contract) without spending any amount of real money. Think that testnet is a sandbox environment and you can do anything inside it without worrying about the real-world consequence. 

To be able to make a transaction, you need to fund your wallet. And in the testnet, there is something called faucet, where you can *fill* your wallet with testnet cryptocurrency.

To request the STX balance, open this page [https://explorer.stacks.co/sandbox/faucet?chain=testnet](https://explorer.stacks.co/sandbox/faucet?chain=testnet) and connect your wallet. The process of connecting a wallet is just a matter of click where you click the *Connect Wallet* button, and choose which address you want it to be connected. After that, you should see something like this:

![sandbox-1.png](/docs/images/sandbox-1.png)

To request the STX for your wallet, just click the *Request STX* button, and there will be a message like this:

```
💰 STX coming your way shortly! 💰
```

All you need to do is to wait patiently for the fund to be transferred to your wallet. You can also monitor this transaction from your wallet. Click your wallet extension, and click on the *Activity* tab on your wallet.

An easy 500 STX will be transferred to your wallet shortly, and we can start to deploy our first smart contract.

### Deploying Smart Contract

In this part of tutorial, we are going to use the same smart contract we have wrote previously (the `my-contract.clar` file) and deploy it to the Stacks testnet.

The first step you need to do is to open the *Write & Deploy* section of the sandbox application. Open this link [https://explorer.stacks.co/sandbox/deploy?chain=testnet](https://explorer.stacks.co/sandbox/deploy?chain=testnet) to open it in your browser. By default, you will see this page:

![sandbox-2.png](/docs/images/sandbox-2.png)

Do not be discouraged by the pre-written code on the page. It is there to tell us where you need to write our own smart contract.

The next step is to *copy-pasting* our `my-contract.clar` content to the code editor in this sandbox application. You could also rename the smart contract name if you wish, and the smart contract name field is just above the *Deploy* button.

Here is what my sandbox page looks like after I paste the code and rename it:

![sandbox-3.png](/docs/images/sandbox-3.png)

If you are done pasting the code and renaming the smart contract, you can click the *Deploy* button to deploy the smart contract to Stacks blockchain testnet. There will be a new pop-up window, prompting you to confirm the transaction. Scroll down the pop-up window and click “*Confirm*” to deploy the smart contract.

![sandbox-4.png](/docs/images/sandbox-4.png)

Most of the time, deploying the smart contract takes a quite bit of time, depend of the busy-*ness* of the tesnet network itself. To monitor your transaction, you can click your wallet extension and click the *Activity* tab in it. If you see *Pending* in the tab, just wait for the transaction to be finished.

![sandbox-5.png](/docs/images/sandbox-5.png)

You can also click the transaction item in your wallet to open it in the Stacks’ blockchain explorer to see the latest status of your transaction. You can also grab the smart contract address and the smart contract name from this explorer page, which we will be using later.

### Interacting With the Smart Contract

Congratulation! You have been successfully deployed your smart contract on Stacks blockchain. In this part of tutorial, we are going to interact with the deployed smart contract.

To be able to interact with your smart contract, please open this page [https://explorer.stacks.co/sandbox/contract-call?chain=testnet](https://explorer.stacks.co/sandbox/contract-call?chain=testnet). Here is the first look of the page:

![sandbox-6.png](/docs/images/sandbox-6.png)

Again, please do not be discouraged with the pre-filled fields in this page. In this page, the only thing you need to do first is to grab your smart contract address along with the smart contract name.

The smart contract address and name can be retrieved from you wallet’s activity, or the easier part is opening the transaction history by clicking the hamburger menu (three horizontal lines) in top-right corner of the sandbox application.

When the button is clicked, there will be a new section in the right part of the page like this:

![sandbox-7.png](/docs/images/sandbox-7.png)

Click the downward-facing arrow, and it will expand the menu, and you can click on the *View transaction* button to see the transaction on the blockchain explorer.

If you are using your wallet, click on your `my-contract` item listed in the *Activity* list in your wallet, and it will open a new page. The `my-contract` is the smart contract name you have wrote in the previous part of deploying smart contract, and it could be different if you choose to rename it.

The transaction page in the blockchain explorer will look like this:

![sandbox-8.png](/docs/images/sandbox-8.png)

> 💡 See that *Source code* part in the explorer? The Clarity does not need to be compiled, so there is no need to verify the smart contract. Other language like Solidity requires the owner to verify the smart contract by submitting the source code to verify it in order to be able to interact with the smart contract.

One thing you need to do in this page is copy the smart contract address and name in the *Contract name* part, located just below the *Summary* label in this page. A copy button will appear when you hover this part.

![sandbox-19.png](/docs/images/sandbox-19.png)

After you copy the *Contract name* from the explorer, head back to the sandbox app, in the *Call a contract* section. If you happen to lose the tab, you can re-open by clicking this link [https://explorer.stacks.co/sandbox/contract-call?chain=testnet](https://explorer.stacks.co/sandbox/contract-call?chain=testnet).

Paste the copied contract name into the contract detail fields, above the *Get contract* button. Just make sure that you paste it in the top field (the one where the `ST000000000000000000002AMW42H` is written), and the sandbox app will automatically populate the bottom part. After you pasted it, it will look like this:

![sandbox-9.png](/docs/images/sandbox-9.png)

After the smart contract address and smart contract name pasted to the correct field, click the *Get contract* button, and it will load your smart contract. The page will be changed and the available functions will be displayed.

![sandbox-10.png](/docs/images/sandbox-10.png)

To start interacting with the smart contract, please click the `say-hi` from the *Available functions* section (the middle part of the page), and there will be a *Call function* button.

![sandbox-11.png](/docs/images/sandbox-11.png)

Click on the *Call function* button, and there will be another pop-up window to confirm that you want to make this transaction. Click the *Confirm* button in the pop-up window.

![sandbox-12.png](/docs/images/sandbox-12.png)

After you click the *Confirm* button, please open the wallet extension in your browser to see the transaction history in the *Activity* tab. If the transaction is still pending, it will show the *Pending* state (orange-colored text). Click it so it will open the transaction in the Stacks blockchain explorer.

![sandbox-13.png](/docs/images/sandbox-13.png)

After you click the transaction to call the function, it will open another Stacks blockchain explorer page. The difference between the previous Stacks blockchain explorer page, this newly opened page will show the result after we call the function, and there will be a new section like this:

![sandbox-14.png](/docs/images/sandbox-14.png)

It shows the “*hello world*” text, just like what we have wrote in the smart contract. Congratulation! Now you are successfully interact with your smart contract.

Now, let’s get back to the sandbox application and interact with the second function with an argument.

On the *Available functions* in the sandbox application, click the `my-name` function, and then there will be a field to input your name. Fill it and with your name and click *Call function* button. In this case, I filled it with “*XARPN*”.

The difference between the `my-name` and `say-hi` function is, the `my-name` function does not call a pop-up wallet window. This is because that we are not triggering any on-chain transaction  in the `my-name` function.

![sandbox-16.png](/docs/images/sandbox-16.png)

> 💡 The `define-public` function in the `say-hi` function will trigger on-chain transaction, and the `define-read-only` in the `my-name` function is meant for reading the input argument only, so no on-chain transaction.

We have reached the end of second chapter. Let’s recap what we have learned so far:

- Setting up local development environment
- Creating a smart contract and test locally
- Installing Hiro Wallet
- Request STX balance
- Deploying smart contract to testnet
- Interact with deployed smart contract

In the next chapter, we are going to learn on how to build a decentralized application on Stacks blockchain.

# Building a Decentralized Application Using ReactJS and Clarity

We have reached the beginning of the final chapter, and you will be guided to build a decentralized application using ReactJS and Clarity. The application we are going to build is an on-chain calculator which can perform basic math operations (addition, subtraction, division, and multiplication) and deploy it to the Stacks testnet. 

This chapter will be much more complex compared to the previous chapter as you will handle the front-end development as well as the smart contract development, and the tutorial will have a much faster pace. Having a basic understanding in developing front-end application using modern framework will also be very helpful.

For the front-end part, we are going to utilize the ReactJS paired with TailwindCSS, and for the smart contract we are going to use Clarity. At the end of this chapter, your front- end application will be able to facilitate an on-chain transaction on Stacks testnet.

## Building the Smart Contract

It is better to start the development from the smart contract, as this is the core of our decentralized application. The smart contract will contain four functions to perform basic math operation.

Let’s start by creating a new smart contract project.

```bash
clarinet new stacalc && cd stacalc
```

Then, let’s create a new smart contract file.

```bash
clarinet contract new calculator
```

There will be a new smart contract file in the `/contracts` directory called `calculator.clar`. Let’s write down this code into the smart contract file:

```lisp
;; define result variable
(define-data-var result int 0)

;; addition
(define-public (addition (valA int) (valB int))
   (begin
    (var-set result (+ valA valB))
    (ok (var-get result))
   )
)

;; subtraction
(define-public (subtraction (valA int) (valB int))
   (begin
    (var-set result (- valA valB))
    (ok (var-get result))
   )
)

;; division
(define-public (division (valA int) (valB int))
   (begin
    (var-set result (/ valA valB))
    (ok (var-get result))
   )
)

;; multiplication
(define-public (multiplication (valA int) (valB int))
   (begin
    (var-set result (* valA valB))
    (ok (var-get result))
   )
)
```

The smart contract contains four main functions to do basic math operation: *addition*, *subtraction*, *division*, and *multiplication*. Those four functions are similar to each other, and what makes them different is the operator. The *addition* function utilize the (+) operator; the *subtraction* function utilize the (-) operator; the *division* function utilize the (/) operator; and the *multiplication* function utilize the (*) operator. The `result` variable that is declared in the top of the file is being used to store the calculation result.

After you write the smart contract, you can test it locally to make sure that everything is correct. Start by checking the smart contract file using this command:

```bash
clarinet test
```

After that, we can head to Clarinet console to check the functionality.

```bash
clarinet console
```

This is the expected result when you are calling the smart contract from the Clarinet console (you may change the arguments to another integer number):

```lisp
;; calling the addition function
>> (contract-call? .calculator addition 4 3)
(ok 7)
```

```lisp
;; calling the subtraction function
>> (contract-call? .calculator subtraction 4 3)
(ok 1)
```

```lisp
;; calling the division function
>> (contract-call? .calculator division 10 3)
(ok 3)
```

```lisp
;; calling the multiplication function
>> (contract-call? .calculator multiplication 12 2)
(ok 24)
```

> 💡 The *division* function will only return the integer part of the result. So if you try to calculate `5 / 2`, instead of `2.5`, it will return `2`. This is an expected behavior, please refer to [this page](https://docs.stacks.co/docs/write-smart-contracts/clarity-language/language-functions#-divide) for more information.


Let’s deploy our smart contract using sandbox application that we have used in the previous chapter. After you successfully deploy the smart contract, grab the address and load it into the *Call a contract* page. It will display all the four functions, like this:

![sandbox-17.png](/docs/images/sandbox-17.png)

Test the functionality by making a transaction for each function, and make sure it resulting in desired value. For example, this is the *addition* function when it is successfully called:

![sandbox-18.png](/docs/images/sandbox-18.png)

If you have done this part successfully, then we are already halfway to create our first decentralized application on Stacks blockchain. The next part will be developing our front-end part.

## Building the Front-End

If you have previously built any front-end application using ReactJS, this part will be so much easier as you already familiar with the technology. The front-end will contain just a single page to enter the number and few buttons for interaction. Please take a look at the final UI below:

![stacalc-1.png](/docs/images/stacalc-1.png)

The page contains only six rows:

- Row 1: The application name/title
- Row 2: The application short description
- Row 3: The connected wallet address (*currently hidden*)
- Row 4: The field to put the numbers and choose the operator
- Row 5: Buttons to connect/disconnect wallet and calculate the result
- Row 6: Link to the transaction in the blockchain explorer (*currently hidden*)

To give you a better perspective about the front-end application, you can see the live demo at [https://stacalc.vercel.app/](https://stacalc.vercel.app/).

### Setting Up the ReactJS and TailwindCSS

Before we start to write the code, we need to setting up the ReactJS and TailwindCSS project. The TailwindCSS is optional if you do not want to use it, but you have to write your own CSS code if you choose not to use TailwindCSS.

Start by creating a ReactJS project:

```bash
npx create-react-app stacalc && cd stacalc
```

Install the required TailwindCSS packages:

```bash
npm install -D tailwindcss postcss autoprefixer
```

Generate TailwindCSS configuration file:

```bash
npx tailwindcss init -p
```

Change the TailwindCSS configuration in the `tailwind.config.js` so it will look like this:

```jsx
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Open your `./src/index.css` and add these lines:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Then, you can change your `./src/App.js` file to utilize the TailwindCSS.

```jsx
export default function App() {
  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}
```

Try to start the server to check if there is any error.

```bash
npm run start
```

You can also open [http://localhost:3000](http://localhost:3000) in your browser to see the final result from this configuration.

If you have a difficulty to setup your ReactJS and TailwindCSS project, please refer to the official documentation at [https://tailwindcss.com/docs/guides/create-react-app](https://tailwindcss.com/docs/guides/create-react-app) before continue to the next step.

### Installing Required Packages

Now, we are going to install the required packages to work with the Clarity smart contract we have deployed previously. Use the following command to install the packages:

```bash
npm i @stacks/auth @stacks/connect @stacks/network @stacks/profile @stacks/transactions buffer react-router-dom
```

> 💡 The `react-router-dom` package is optional, but if you want to scale-up your application in the future, it is recommended to utilize this package.

Since there are a lot of new packages that we are installing, make sure that there is no error when installing those packages.

### Writing the Code

Finally, we are going to write the code for our front-end application. Please follow these guides to write the code.

**Step 1: Create the homepage**

Since we are using `react-router-dom` we are now able to group the page files in a separate directory. Create a new file in `./src/pages/Home/index.jsx` and copy this code:

```jsx
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { authenticate, logoutUser, userSession } from "../../lib/auth";
import { calculate } from "../../lib/calculate";

function Home(props) {
  const [userData, setUserData] = useState();
  const [valA, setValA] = useState();
  const [valB, setValB] = useState();
  const [finishData, setFinishData] = useState();
  const [calcMode, setCalcMode] = useState("addition");

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/");
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  const calculateHandler = async () => {
    if (!isNaN(valA) && !isNaN(valB))
      calculate(valA, valB, setFinishData, calcMode);
    else alert("Please fill out the numbers");
  };

  return (
    <div className="flex flex-col bg-gray-100 items-center justify-center w-full min-h-screen">
      <div>
        <h1 className="text-5xl font-mono text-center">
          {"<"}Stacalc{"/>"}
        </h1>
        <p className="font-serif text-center">
          Super simple calculator on{" "}
          <a
            href="https://www.stacks.co/"
            target="_blank"
            rel="noreferrer"
            className="border-b border-dashed border-black"
          >
            Stacks blockchain
          </a>
        </p>
        {userData !== undefined ? (
          <p className="font-serif text-center my-2">
            Connected to:{" "}
            <span className="bg-gray-200 px-2 py-1">
              {userData.profile.stxAddress.testnet.slice(0, 4) +
                "..." +
                userData.profile.stxAddress.testnet.slice(-4)}
            </span>
          </p>
        ) : (
          <div className="my-2">&nbsp;</div>
        )}
        <div className="flex flex-row space-x-5 mt-10">
          <input
            type="number"
            className="border border-black p-2"
            placeholder="Value 1"
            // Receive number only
            onChange={(event) => {
              setValA(event.target.value);
            }}
          ></input>
          <select
            name="operator"
            id="operator"
            className="px-5 py-3 border border-black"
            onChange={(e) => setCalcMode(e.target.value)}
          >
            <option value="addition">+</option>
            <option value="subtraction">-</option>
            <option value="multiplication">x</option>
            <option value="division">/</option>
          </select>
          <input
            type="number"
            className="border border-black p-2"
            placeholder="Value 2"
            // Receive number only
            onChange={(event) => {
              setValB(event.target.value);
            }}
          ></input>
        </div>
        <div className="flex flex-row items-center justify-center mt-10 space-x-5">
          {userSession.isUserSignedIn() ? (
            <button
              onClick={logoutUser}
              className="px-5 py-3 bg-black text-gray-50 disabled:bg-gray-300"
            >
              Disconnect Wallet
            </button>
          ) : (
            <button
              onClick={authenticate}
              className="px-5 py-3 bg-black text-gray-50 disabled:bg-gray-300"
            >
              Connect Wallet
            </button>
          )}
          <button
            className="px-5 py-3 bg-black text-gray-50 disabled:bg-gray-300"
            disabled={!userSession.isUserSignedIn()}
            onClick={calculateHandler}
          >
            Calculate
          </button>
        </div>
        <div className="mt-5">
          {finishData !== undefined ? (
            <p className="text-center font-serif">
              <a
                href={
                  "https://explorer.stacks.co/txid/0x" +
                  finishData.txId +
                  "?chain=testnet"
                }
                target="_blank"
                rel="noreferrer"
                className="border-b border-dashed border-black"
              >
                Click to see result
              </a>
            </p>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
```

There are a lot of *unknown* import in this file, and if we try to run the application, there will be a lot error appeared. Do not worry, we will discuss it.

This line below is being used to import `authenticate`, `logoutUser`, and `userSession` functions from a custom JS file. We will create this file later.

```jsx
import { authenticate, logoutUser, userSession } from "../../lib/auth";
```

This line below is being used to import the `calculate` function from another custom JS file, which we will also create it later.

```jsx
import { calculate } from "../../lib/calculate";
```

These are the states that are being used in our application. There are `userData` to store the state of our wallet profile, the `valA` and `valB` are being used to store the numbers we type, the `finishData` is being used to store the returned transaction data from the blockchain, and the `calcMode` is being used to store the operator that we want to use. Most of them are *null*, and only the `calcMode` is pre-defined.

```jsx
const [userData, setUserData] = useState();
const [valA, setValA] = useState();
const [valB, setValB] = useState();
const [finishData, setFinishData] = useState();
const [calcMode, setCalcMode] = useState("addition");
```

These lines of code is being used basically for checking if the user is already connect the wallet to the application or not. If the user already connect the wallet, then load the profile data and store it to `userData` .

```jsx
.useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        window.history.replaceState({}, document.title, "/");
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);
```

This `calculateHandler` function is being used to handle the *Calculate* button when it is being clicked. If the requirements are met (both `valA` and `valB` are numbers), then we call `calculate()` function.

```jsx
const calculateHandler = async () => {
    if (!isNaN(valA) && !isNaN(valB))
      calculate(valA, valB, setFinishData, calcMode);
    else alert("Please fill out the numbers");
  };
```

The line below is being used choose the UI, whether the application should display the *Connect Wallet* button (if user has not connect the wallet) or *Disconnect Wallet* button (if user has connected the wallet).

```jsx
{userSession.isUserSignedIn() ? (
    <button
      onClick={logoutUser}
      className="px-5 py-3 bg-black text-gray-50 disabled:bg-gray-300"
    >
      Disconnect Wallet
    </button>
  ) : (
    <button
      onClick={authenticate}
      className="px-5 py-3 bg-black text-gray-50 disabled:bg-gray-300"
    >
      Connect Wallet
    </button>
  )}
```

This block of code is being used to show the connected wallet address in `ST00…0000` format. If user has not connect the wallet yet, the line will be empty and nothing is displayed.

```jsx
{userData !== undefined ? (
  <p className="font-serif text-center my-2">
    Connected to:{" "}
    <span className="bg-gray-200 px-2 py-1">
      {userData.profile.stxAddress.testnet.slice(0, 4) +
        "..." +
        userData.profile.stxAddress.testnet.slice(-4)}
    </span>
  </p>
) : (
  <div className="my-2">&nbsp;</div>
)}
```

This block of code will be used to show the link to the transaction in the blockchain explorer after the transaction has been successfully confirmed. If the transaction has not been confirmed, it will show nothing.

```jsx
{finishData !== undefined ? (
  <p className="text-center font-serif">
    <a
      href={
        "https://explorer.stacks.co/txid/0x" +
        finishData.txId +
        "?chain=testnet"
      }
      target="_blank"
      rel="noreferrer"
      className="border-b border-dashed border-black"
    >
      Click to see result
    </a>
  </p>
) : (
  <span>&nbsp;</span>
)}
```

**Step 2: Create auth.js file**

After you create the first file above, the next step will be creating a custom JS file for authentication. Create this file in `./src/lib/auth.js` and copy this code:

```jsx
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
window.Buffer = window.Buffer || require("buffer").Buffer;

const appConfig = new AppConfig(["store_write", "publish_data"]);

export const userSession = new UserSession({ appConfig });

export function authenticate() {
  showConnect({
    appDetails: {
      name: "Stacalc",
      icon: ".",
    },
    redirectTo: "/",
    onFinish: () => {
      window.location.reload();
    },
    userSession: userSession,
  });
}

export function getUserData() {
  return userSession.loadUserData();
}

export const logoutUser = () => {
  userSession.signUserOut(window.location.origin);
};
```

This file is so much simpler compared to the homepage file, and it contains only four functions: `authenticate()`, `getUserData()`, and `logoutUser()`.

The `authenticate()` function is being used to connect the wallet with the application, and stores the user data into the `userSession` variable.

The `getUserData()` function is being used to retrieve the user data that is stored in the `userSession`.

The `logoutUser()` function is being used to disconnect the user’s wallet from the application if they decide that they do not want to use the application anymore.

**Step 3: Create calculate.js file**

The third file we are going to write is the `calculate.js` that is located in `./src/lib/calculate.js` . Copy the code into the file:

```jsx
import { openContractCall } from "@stacks/connect";
import { intCV } from "@stacks/transactions";
import Config from "./config";

export const calculate = async (valA, valB, setFinishData, type) => {
  return await openContractCall({
    onCancel: () => {}, // do nothing when canceled
    onFinish: (tx) => setFinishData(tx),
    contractAddress: Config.contractAddress,
    contractName: Config.contractName,
    functionName: type,
    functionArgs: [intCV(valA), intCV(valB)],
  });
};
```

This file is a very short one, with just one function inside it. The `calculate()` function takes four arguments for it to be able to work:

- `valA` is the first number we put into the field in the homepage
- `valB` is the second number we put into the field in the homepage
- `setFinishData` contains the state *setter* from the homepage
- `type` contains the function name from the smart contract (*addition*, *subtraction*, *division*, or *multiplication*)

The `onFinish` function will be called after the transaction is successfully executed, and that is why we want to return the value to the homepage.

This file also import from another custom JS file called `config.js` that we will create right after this one.

**Step 4: Create config.js file**

As the name implies, this file contains the configuration for this project. And by configuration, it helps us to configure the smart contract part that is being used in this project. Copy this code to your file:

```jsx
const Config = {
  contractName: "stacalc",
  contractAddress: "ST5K05SFTN5MZ17HTMA9HXSMHF6H301SYQNBD9E9",
};

export default Config;
```

There are only two fields in the `Config` constant, the `contractName` to store the smart contract name, and the `contractAddress` to store the smart contract address.

These field are already pre-filled with my deployed smart contract address, so you may want to fill it with your own smart contract name and address.

> 💡 It is usually better to write the address in a more secure place like in the environment variables. But for the simplicity of this tutorial, I write the address directly in the code.

**Step 5: Edit the App.js**

We previously have written the `./src/App.js` to demonstrate the ReactJS + TailwindCSS configuration. However, we do not want to use that code. Delete all the code in the `./src/App.js` and use this code instead:

```jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
```

What this `App.js` does is routing the pages using `react-router-dom`, and it will open the `<Home />` that we have created above if we open the [http://localhost:3000](http://localhost:3000) in your browser.

### Running the Application

Now that the we already finished to write the code, it is time to run the application. You can start the development server by using the following command:

```bash
npm run start
```

Then open [http://localhost:3000](http://localhost:3000) in your browser. If there is no error, you should see this screen:

![stacalc-1.png](/docs/images/stacalc-1.png)

There is a *Connect Wallet* button next to a disabled *Calculate* button. 

In order to use this application, the first thing you need to do is clicking the *Connect Wallet* button in order to connect your Hiro Wallet to be able to create a transaction.

After you click the *Connect Wallet* button, there will be a new pop-up window asking you which account that will be connected.

![stacalc-2.png](/docs/images/stacalc-2.png)

Click on the account name that you want to connect, and the *Calculate* button will be automatically enabled, and the *Connect Wallet* button will become *Disconnect Wallet* button. Also, there will be a new line below the description line, showing the connected wallet address.

![stacalc-3.png](/docs/images/stacalc-3.png)

To start the on-chain calculation, fill the `Value 1` and `Value 2` fields with any integer number, and click the *Calculate* button. You can also change the operator by clicking the drop-down menu in between the number fields. Another pop-up window will appear after you click the *Calculate* button, asking you to confirm the transaction.

![stacalc-4.png](/docs/images/stacalc-4.png)

Please pay attention at the pop-up window, that the `Value 1` value is transferred to `valA` in the pop-up window, and the `Value 2` value is transferred to `valB` in the pop-up window. This process happens automatically.

Click *Confirm* button on the pop-up window to execute the transaction. A new *Click to see result* link below the buttons will be displayed, and you can check the transaction in the blockchain explorer by clicking the link.

![stacalc-5.png](/docs/images/stacalc-5.png)

If we click the link, it will bring us to the blockchain explorer page, similar to when we check the calculation transaction in the previous chapter. The page will display the calculation result when the transaction is done.

![stacalc-6.png](/docs/images/stacalc-6.png)

The result of `12 + 33` is `45` and it is stored in the blockchain (this is why it is called on-chain). At this point, you have successfully create your first decentralized application on Stacks blockchain. Congratulation!

If you want to deploy your application, you can use Vercel or Netlify to make your on-chain calculator accessible from around the world.

At this stage, you should now be able to create a working decentralized application on Stacks blockchain.

# Conclusion

You have reached the end of this tutorial, and if you follow this guide carefully, you have already:

- Understand what Stacks is
- Understand what Clarity is
- Know how to setting up local development environment for Clarity
- Know how to create a wallet address using Hiro Wallet
- Know how to request STX balance
- Know how to write and test the Clarity smart contract locally
- Know how to deploy Clarity smart contract
- Know how to interact with your smart contract
- Be able to use Stacks blockchain explorer
- Be able to use Stacks sandbox application
- Be able to create a front-end application that interact with the smart contract

If somehow you get lost in any part of this tutorial, you can check the code on the Github repository at [https://github.com/dkhd/stacalc](https://github.com/dkhd/stacalc).

For more advanced step (if you want to), you can add more features into the decentralized application that you have built in this tutorial, like doing multiple operations in a single transaction, showing the calculation history, displaying your wallet profile, and many more.