# How to Get Your Firebase Configuration Keys

1.  **Go to the Firebase Console**
    *   Visit [https://console.firebase.google.com/](https://console.firebase.google.com/) and sign in with your Google account.

2.  **Create a New Project**
    *   Click **"Create a project"** (or "Add project").
    *   Enter a name (e.g., `Nivika-Gifts`).
    *   Disable Google Analytics (optional, makes it faster) and click **Create**.

3.  **Register Your App**
    *   Once the project is ready, you will see the overview page.
    *   Click the **Web Icon** `</>` (it looks like a coding bracket) to add a web app.
    *   Register the app (Name it "Nivika Client").
    *   Click **Register app**.

4.  **Copy the Configuration**
    *   You will see a code block labeled `const firebaseConfig = { ... };`.
    *   **Copy only the values** inside the curly braces.

    It will look like this:
    ```javascript
    const firebaseConfig = {
      apiKey: "AIzaSy...",
      authDomain: "nivika-gifts.firebaseapp.com",
      projectId: "nivika-gifts",
      storageBucket: "nivika-gifts.appspot.com",
      messagingSenderId: "123456...",
      appId: "1:123456..."
    };
    ```

5.  **Paste into Your Code**
    *   Go to your file: `c:\devoloper\nivikagifts.in\client\src\firebase.js`
    *   Replace the placeholder values with these real values.
    
6.  **Enable Authentication**
    *   In the Firebase Console sidebar, go to **Build** > **Authentication**.
    *   Click **Get Started**.
    *   Click **Google**.
    *   Switch **Enable** to On.
    *   Select a **Project support email**.
    *   Click **Save**.

7.  **Enable Email/Password (Optional)**
    *   In Authentication > Sign-in method, click **Add new provider**.
    *   Select **Email/Password**.
    *   Enable **Email/Password**.
    *   Click **Save**.

Now your login should work!
