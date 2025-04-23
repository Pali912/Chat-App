# Basic Real-time Chat Application

This is a simple real-time chat application built using React Native for the frontend and Node.js with Socket.IO for the backend. It features basic user login and the ability to send and receive messages in real time.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js** (version >= 16 recommended) - [https://nodejs.org/](https://nodejs.org/)
* **npm** (should be installed with Node.js) or **yarn** - [https://yarnpkg.com/](https://yarnpkg.com/)
* **Expo CLI** - You can install it globally using npm or yarn:
    ```bash
    npm install -g expo-cli
    # or
    yarn global add expo-cli
    ```
* **Expo Go app** on your mobile device (for testing on a physical device) or a mobile simulator/emulator (iOS or Android).

## Installation

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone [YOUR_REPOSITORY_URL]
    cd [YOUR_PROJECT_DIRECTORY]
    ```

2.  **Navigate to the backend directory and install dependencies:**
    ```bash
    cd backend
    npm install
    # or
    yarn install
    ```

3.  **Navigate to the frontend directory and install dependencies:**
    ```bash
    cd frontend
    npm install
    # or
    yarn install
    ```

## Running the Application

You need to run both the backend server and the frontend application separately.

### Running the Backend Server

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Start the Node.js server:
    ```bash
    node server.js
    ```
    You should see the message `Server listening on port 3000` in your terminal. **Keep this terminal window open.**

### Running the Frontend Application

1.  Open a **new terminal window** and navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Start the React Native application using Expo CLI:
    ```bash
    npx expo start
    # or
    yarn start
    ```

3.  This command will open the Expo Developer Tools in your web browser. You have a few options to run the app:
    * **Run on Android device/emulator:** Make sure you have an Android emulator running or the Expo Go app installed on your Android device. Click "Run on Android device/emulator" in the Expo Developer Tools or scan the QR code with the Expo Go app.
    * **Run on iOS simulator:** If you are on macOS with Xcode installed, you can click "Run on iOS simulator".
    * **Run in web browser:** Click "Run in web browser" to open a web version of the chat application (note that WebSocket support might vary in different browsers and environments).

## Usage

1.  Once the frontend application is running, you will first see a login screen. Enter a username and a password (these are for demonstration purposes only, no actual authentication is implemented).
2.  After logging in, you will enter the main chat screen.
3.  You can type messages in the input field at the bottom and press the "Send" button or the Enter key to send them.
4.  Messages sent by you and other connected users will appear in the chat window in real time, along with the sender's name and a timestamp.
5.  A list of currently online users is displayed at the top of the chat screen.

## Important Notes

* This is a basic implementation for demonstration purposes. It lacks features like user registration, persistent data storage, and robust security.
* The "login" is a simple check for non-empty username and password fields.
* For testing on a physical mobile device, ensure that your device and your computer running the backend server are on the same Wi-Fi network. The frontend will attempt to connect to the IP address `http://10.1.34.60:3000`. If this IP address is not your computer's local IP address, you might need to update it in `frontend/components/ChatScreen.js`.

## Further Development

This project can be extended with features such as:

* User registration and authentication.
* Private messaging.
* Message history.
* Styling enhancements.
* Error handling and improved user experience.
