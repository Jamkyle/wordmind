# 🧠 WordMind - Multiplayer Word Guessing Game 🎯

**WordMind** is an online multiplayer word-guessing game inspired by *Motus*. Players take turns guessing a hidden word, receiving hints on letter placements, and racing to solve it before their opponents. The game supports real-time multiplayer with up to **5 players per session** and also features a solo mode.

## 🚀 Features  
✅ **Multiplayer Mode** – Up to 5 players can join a private game and compete in turns.  
✅ **Real-time Gameplay** – Instant updates using Firebase Firestore and React Query.  
✅ **No Login Required** – Players can join and play instantly without an account.  
✅ **Turn-Based Word Guessing** – Each player submits a word and gets feedback on correct and misplaced letters.  
✅ **Zustand State Management** – Smooth and reactive UI updates.  
✅ **Next.js + Firebase** – Scalable architecture with App Router.  

## 🛠 Tech Stack  
- **Frontend:** Next.js (App Router), React, TypeScript, Zustand  
- **Backend:** Firebase Firestore (Real-time sync)  
- **State Management:** Zustand + React Query  
- **Game Logic:** Custom word validation and scoring system  

## 🎮 How to Play?  
1️⃣ **Create a game room** and share the invite link.  
2️⃣ **Players join** and enter their names.  
3️⃣ **Take turns guessing the hidden word**, following letter feedback.  
4️⃣ **The first player to guess the word correctly wins!**  

## 📌 Installation  
```sh
git clone https://github.com/yourusername/wordmind.git
cd wordmind
yarn install
yarn dev

