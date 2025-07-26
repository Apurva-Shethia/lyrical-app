export const mockData = {
  sampleLyrics: [
    { text: "First things first", timestamp: 0 },
    { text: "I'ma say all the words inside my head", timestamp: 3000 },
    { text: "I'm fired up", timestamp: 6000 },
    { text: "And tired of the way that things have been", timestamp: 9000 },
    { text: "Oh-ooh", timestamp: 12000 },
    { text: "The way that things have been", timestamp: 15000 },
    { text: "Oh-ooh", timestamp: 18000 },
    
    { text: "Second things second", timestamp: 21000 },
    { text: "Don't you tell me what you think that I could be", timestamp: 24000 },
    { text: "I'm the one at the sail", timestamp: 27000 },
    { text: "I'm the master of my sea", timestamp: 30000 },
    { text: "Oh-ooh", timestamp: 33000 },
    { text: "The master of my sea", timestamp: 36000 },
    { text: "Oh-ooh", timestamp: 39000 },

    { text: "I was broken from a young age", timestamp: 42000 },
    { text: "Taking my sulking to the masses", timestamp: 45000 },
    { text: "Writing my poems for the few", timestamp: 48000 },
    { text: "That look at me, took to me, shook to me, feeling me", timestamp: 51000 },
    { text: "Singing from heartache from the pain", timestamp: 54000 },
    { text: "Taking my message from the veins", timestamp: 57000 },
    { text: "Speaking my lesson from the brain", timestamp: 60000 },
    { text: "Seeing the beauty through the...", timestamp: 63000 },

    { text: "Pain!", timestamp: 66000 },
    { text: "You made me a, you made me a believer, believer", timestamp: 69000 },
    { text: "Pain!", timestamp: 72000 },
    { text: "You break me down and build me up, believer, believer", timestamp: 75000 },
    { text: "Pain!", timestamp: 78000 },
    { text: "Oh, let the bullets fly, oh, let them rain", timestamp: 81000 },
    { text: "My life, my love, my drive, it came from...", timestamp: 84000 },
    { text: "Pain!", timestamp: 87000 },
    { text: "You made me a, you made me a believer, believer", timestamp: 90000 },

    { text: "Third things third", timestamp: 93000 },
    { text: "Send a prayer to the ones up above", timestamp: 96000 },
    { text: "All the hate that you've heard", timestamp: 99000 },
    { text: "Has turned your spirit to a dove", timestamp: 102000 },
    { text: "Oh-ooh", timestamp: 105000 },
    { text: "Your spirit up above", timestamp: 108000 },
    { text: "Oh-ooh", timestamp: 111000 },
  ],

  sampleSrtFile: `1
00:00:00,000 --> 00:00:03,000
First things first

2
00:00:03,000 --> 00:00:06,000
I'ma say all the words inside my head

3
00:00:06,000 --> 00:00:09,000
I'm fired up

4
00:00:09,000 --> 00:00:12,000
And tired of the way that things have been`,

  sampleLrcFile: `[00:00.00]First things first
[00:03.00]I'ma say all the words inside my head
[00:06.00]I'm fired up
[00:09.00]And tired of the way that things have been`,

  sentimentExamples: {
    happy: ["I'm fired up", "You made me a believer", "Let them rain"],
    sad: ["I was broken from a young age", "Singing from heartache", "From the pain"],
    angry: ["Pain!", "Let the bullets fly", "All the hate"],
    calm: ["Send a prayer", "Your spirit to a dove", "Spirit up above"],
    energetic: ["First things first", "I'm the master of my sea", "Break me down and build me up"]
  }
};