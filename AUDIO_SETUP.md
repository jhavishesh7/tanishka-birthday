# Setup Instructions

## Audio Setup

To enable the Happy Birthday song when cutting the cake, please add an audio file:

1. Create a file named `happy-birthday.mp3` in the `public` folder
2. The file should be a Happy Birthday song in MP3 format
3. Alternatively, you can use any royalty-free Happy Birthday song

If you don't add the file, the cake cutting will still work, but without the audio.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Set to "true" to bypass the countdown screen (for testing)
NEXT_PUBLIC_BYPASS_COUNTDOWN=false

# Birthday date (optional, defaults to January 20)
NEXT_PUBLIC_BIRTHDAY_DATE=2025-01-20
```

### Bypass Countdown

There are **three ways** to bypass the countdown screen:

1. **Environment Variable** (Recommended for development):
   Create a `.env.local` file and set:
   ```
   NEXT_PUBLIC_BYPASS_COUNTDOWN=true
   ```
   Then restart your dev server.

2. **URL Parameter** (Quick testing):
   Add `?bypass=true` to your URL:
   ```
   http://localhost:3000?bypass=true
   ```

3. **LocalStorage** (Browser console):
   Open browser console and run:
   ```javascript
   localStorage.setItem('bypassCountdown', 'true')
   ```
   Then refresh the page.

Any of these methods will automatically skip the countdown and proceed to the loader screen.

