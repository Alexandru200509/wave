<br />
<p align="center">
  <a>
    <img src="./assets/wave.png" alt="Logo" width="80%" height="10%">
  </a>

  <h3 align="center">Wave</h3>
</p>

### Table of Contents

<details open="open">
  <summary>Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About the Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#api-reference">API Reference</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

### About the project

Wave is an efficient, scalable, and open-source backend solution designed for retrieving geographical locations of public IP addresses. It leverages the power of MaxMind's GeoLite2 database and is crafted in TypeScript. This project serves as a free microservice for VoltzzNode Enterprise.

### Built with

- Typescript
- Express.js
- Helmet.js
- Node.js
- Nodemon
- MaxMind

## Getting Started

To get started with the Wave, follow these steps:

### Installation

1. Install NVM (Node Version Manager) by following the instructions for your operating system:

    - **Windows**: Visit the NVM for Windows repository at [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows) and follow the installation guide.
    - **Linux/macOS**: Open your terminal and run the following command:
        ```bash
        curl -o- https://github.com/coreybutler/nvm-windows.git | bash
        ```

2. Reload the shell configuration

    - **Linux/macOS**: Run the following command:
        ```bash
        source ~/.bashrc
        ```

3. Install Node.js 21 by running the following command:
    ```bash
    nvm install 21
    ```
4. Verify that Node.js 21 is installed:
    ```bash
    node --version
    ```

### Clone the Repository

1. Clone the repository:
    ```bash
    git clone https://github.com/Alexandru200509/wave.git
    ```
2. Navigate to the project directory:
    ```bash
    cd wave
    ```

### Install Dependencies

1. Install NPM packages:
    ```bash
    npm install
    ```

### Configuration

1. The configuration file write's itself automatically!

### Usage

- Start the server as production:

    ```bash
    npm run start
    ```

- Start the server as production(JavaScript build):

    ```bash
    npm run start-js
    ```

    - **Important**: To run the JavaScript build, you must first build the server using:
        ```bash
        npm run build
        ```

- Start the server as dev:

    ```bash
    npm run dev
    ```

- Build and compile the server as executable:

    ```bash
    npm run build
    ```

- Test the server:

    ```bash
    npm run test
    ```

- Overwrite the coding style:

    ```bash
    npm run format
    ```
## API Reference

For detailed information about the API endpoints and request/response examples, please refer to the [API Reference documentation](https://github.com/Alexandru200509/wave/wiki/API-Reference).

## License

This project is licensed under the [CC-BY-NC-ND-4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) license.
