# 🕹️ RunnerLens

A 3D endless runner prototype built in **Lens Studio 5.15.1**.  
The player runs forward, avoids obstacles, collects coconuts, and earns points.

---

## 📖 Overview

This project demonstrates basic gameplay mechanics inside **Lens Studio**:
- Continuous forward movement and increasing speed  
- Left/right swipe lane switching  
- Jump and fall animations  
- Score and lives UI  
- Collectible system
- Restart and Start menus

It’s designed as a sample mini-game for Snap AR or prototype development.

---

## 🧩 Project Structure

| Folder / File | Description |
|----------------|-------------|
| **Assets/** | 3D models, textures, materials, and sounds |
| **Packages/** | External resources imported into Lens Studio |
| **Support/** | Scene configuration, lighting, and environment settings |
| **Workspaces/** | UI panels and layout data |
| **Scripts/** | Game logic (`PlayerController.js`, `Collectible.js`, etc.) |
| **Runner.lsproj** | The main Lens Studio project file |
| **.gitignore** | Git exclusion rules |
| **README.md** | This documentation |

---

## ⚙️ Requirements

- **Lens Studio 5.15.1** or newer  
- A computer with GPU support for real-time 3D preview  
- (Optional) A connected mobile device for live testing

---

## 🚀 How to Open

1. Launch **Lens Studio**  
2. Choose **File → Open Project**  
3. Select the file `Runner.lsproj`  
4. Wait for assets to load  
5. Press **Run** or **Preview** to play the game  

---

## 🧠 Gameplay Summary

- **Swipe Left/Right:** move between lanes  
- **Swipe Up:** jump over obstacles  
- **Collect coconuts** to earn points  
- **Avoid obstacles** — losing all lives restarts the game  

---

## 📦 Version Control

This repository excludes temporary folders (`Cache`, `Temp`, `PreviewCache`, etc.)  
via `.gitignore`, keeping the repo clean and lightweight.

---

## 👤 Author

**Daniil Pavlenko**  
Game Developer | Lens Studio & Unity  
📧 _[pavlenko.game@gmail.com]_

---

