<br />
<p align="center">
  <a href="https://github.com/iamvladw/wave">
    <img src="./assets/wave.png" alt="Logo" width="30%" height="10%">
  </a>

  <h3 align="center">Wave</h3>
  
  <p align="center">
      Efficient, scalable, and open-source backend solution designed for retrieving geographical locations of public IP addresses
    <br />
    <a href="https://github.com/iamvladw/wave/wiki"><strong>Explore the wiki »</strong></a>
    <br />
    <br />
    <a href="https://github.com/iamvladw/wave">View Demo</a>
    ·
    <a href="https://github.com/iamvladw/wave/issues">Report Bug</a>
    ·
    <a href="https://github.com/iamvladw/wave/issues">Request Feature</a>
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/iamvladw/wave/jest.yml?label=Tests&style=popout&branch=dmain" alt="CI">
  <img src="https://img.shields.io/github/package-json/v/iamvladw/wave?label=Version&style=popout" alt="Version">
  <img src="https://img.shields.io/github/last-commit/iamvladw/wave?label=Last%20Commit&style=popout" alt="Last Commit">
  <img src="https://img.shields.io/github/downloads/iamvladw/wave/total?label=Downloads&style=popout" alt="Downloads">
  <img src="https://img.shields.io/github/contributors/iamvladw/wave?label=Contributors&style=popout" alt="Contributors">
  <img src="https://img.shields.io/github/release-date/iamvladw/wave?label=Release%20Date&style=popout" alt="Release Date">
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
- Winston
- Nodemon
- Axios
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
    git clone https://github.com/iamvladw/wave.git
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

## License

This project is licensed under the [CC-BY-NC-ND-4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/) license.

## Contact

Project Link: [https://github.com/iamvladw/wave](https://github.com/iamvladw/wave)