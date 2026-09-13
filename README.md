# Life Points

Level up your daily routine

## How to launch (Expo Snack)

Visit this link: https://snack.expo.dev/@notteapot/life-points?platform=android

You can either use the Android emulator or the Web one. The Web version might have some unexpected bugs - it is recommented to use the Android emulator. 

## How to launch (local build with Expo Go)

1. Prequisites:
   - Git
   - Node.js (v20 or newer)
   - npm
   - Expo Go on an Android device. **The Expo Go app should support v54 SDK**
2. Clone the repo
   - `git clone <ssh-repo-url>`
3. Install the dependencies
   - `npm ci`
4. Create a `.env` file in the project root

```env
EXPO_PUBLIC_SUPABASE_URL=https://tkpjxfdapjrfewwwnbyf.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=sb_publishable_1Svwqxv6yoSh8BvvwyzJig_4nyPRJe7
```

5. Launch the app
   - `npx expo start`
   - Scan the QR code from the Expo Go mobile app