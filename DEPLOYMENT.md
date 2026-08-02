# Deploying Voxora

## 1. Deploy the backend to Render

1. Push this repository to GitHub.
2. In Render, choose **New → Blueprint** and select the repository.
3. Render reads `render.yaml` and asks for the secret environment values.
4. Enter the Twilio and ElevenLabs values from `.env.example`. The caller enters their destination number on the Voxora page.
5. After deployment, copy the Render URL, such as
   `https://elevenlabs-twilio-voice-agent.onrender.com`.
6. Add `RENDER_EXTERNAL_URL` in Render with that URL.

## 2. Deploy the frontend to Vercel

1. Import the same GitHub repository into Vercel.
2. Set **Root Directory** to `frontend`.
3. Add `VITE_API_URL` with the Render URL (without a trailing slash).
4. Add `VITE_RENDER_ENVIRONMENT_URL` with the Render Environment-page URL. It looks like `https://dashboard.render.com/web/srv-.../env` and powers the frontend Configure button.
5. Deploy and copy the resulting Vercel URL.

## 3. Complete the connection

In the Render service, add `FRONTEND_URL` with the exact Vercel URL and redeploy.
The frontend call button will now request a call to `MY_PHONE_NUMBER`.

Never add credentials to the frontend or to the repository. All Twilio and
ElevenLabs credentials belong only in Render's environment settings.
