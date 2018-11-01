# SPACECHATTTTTT

_What if you could magically understand anyone in the world?
What if you could experience a conversation beyond words?_

Spacechat is a virtual reality chatroom that allows users to interpret and experience speech with multiple senses. Users enter a mesmerizing digital world where they can speak with others in twelve languages using automatic realtime translation, and watch the emotional content of their conversation rendered dazzlingly in virtual reality.

Created by @elsa-brown, @thefishter, @keziyah, and @ssundby
Powered by A-Frame, WebGL, socket.io, React.js, Redux, Node.js, Express.js


## An immersive multi-sensory communication experience
- Users select one of twelve supported languages
  - English, Spanish, French, Italian, Portuguese, German, Dutch, Arabic, Russian, Chinese, Japanese, Korean
- Users enter one of four mysterious abstracted worlds
  - bubbles, plasma, cosmos, ufo
- Web sockets enable real-time communication between users and the VR environment
- Web Speech API both captures spoken messages in the user's browser and speechifies incoming messages
- Google Translate API powers seamless communication and understanding between all users, across languages
- Indico Text APIs continuously analyze conversation content
  - Sentiment: analyzes the positivity of a message
  - Emotion: analyzes a message's alignment with five emotions - anger, fear, joy, sadness, and surprise
  - Personality: predicts the personality of a speaker based on the Five Factor Model
- Virtual environments respond to Indico analyses by changing color, size, and movement patterns

## Future directions
- [ ] open source release, to allow users to create and submit their own VR worlds
- [ ] avatars to represent users, which visually respond specifically to that user's message content
- [ ] incorporation of WebRTC audio, to enable users subscribed to the same language to hear each other's voices
