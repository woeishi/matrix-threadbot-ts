# matrix threadbot

matrix chatbot for capturing thread messages

## About

A bot running on Node.js connecting to a matrix network. 
On receiving a mention in a thread message it captures the preceding messages
into a single copy-pastable reply.

The intended purpose is knowledge capturing by facilitating the transfer of relevant discussions 
into longer lived and searchable media like forums, wikis, documentations,...

### Built With

* [Matrix.org][matrix-url]
* [Node.js][node-url]
* [Typescript][typescript-url]

<p align="right"><a href="#matrix-threadbot">↑</a></p>


## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

* [nodejs][node-url] >= 16
* [npm][npm-url] or [yarn][yarn-url]

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/woeishi/matrix-threadbot-ts.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```
3.  Create an `.env` and enter required data (see .env.example)

<p align="right"><a href="#matrix-threadbot">↑</a></p>



## Usage

### live bot

mention its user handle in a message of a matrix chat thread.
optionally following arguments:
- `below`: post the captured message sequence in the thread instead of as direct message
- `part`: only capture up to last bot mention, defaults to capturing the whole thread
- `html` or `plain`: format as html or plain text (minimal md) instead of default markdown
- `help` or `?`: show help message

### Development

start node.js with typescript compiler and filewatcher
```sh
npm run start:dev
```
or
```sh
yarn start:dev
```

### Building

```sh
npm run build
```
or
```sh
yarn build
```

<p align="right"><a href="#matrix-threadbot">↑</a></p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right"><a href="#matrix-threadbot">↑</a></p>


[matrix-url]: https://matrix.org/
[node-url]: https://nodejs.org/
[typescript-url]: https://www.typescriptlang.org/
[npm-url]: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
[yarn-url]: https://yarnpkg.com