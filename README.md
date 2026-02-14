# Clean City – Smart Reporting for a Cleaner Tomorrow 🎯
## Basic Details
### Team Name: [nadha ck]

### Team Members
- Member 1: [Nadha ck] - [pptm aerts&science college]

### Hosted Project Link
[https://nadhack70-collab.github.io/tink-her-hack-temp/](https://nadhack70-collab.github.io/tink-her-hack-temp/)

### Project Description
Clean City is a smart waste reporting application designed to incentivize citizens to keep their environment clean. Users can report waste by uploading photos, which are verified by an AI system (simulated). Successful reports earn points, allowing users to level up through badges from "New Citizen" to "Clean City Hero".

### The Problem statement
Urban waste management is often neglected due to a lack of civic engagement and easy reporting mechanisms. Citizens often see waste but have no immediate way to report it or feel motivated to do so.

### The Solution
We provide a gamified reporting platform where:
1.  **Report**: Users snap a photo of waste.
2.  **Verify**: An AI system verifies the image (mocked logic).
3.  **Reward**: Users earn points and unlock badges (New Citizen, Green Ambassador, Clean City Hero).

---

## Technical Details

### Technologies/Components Used

**For Software:**
- **Languages used**: HTML, CSS, JavaScript (Vanilla)
- **Frameworks used**: None (Pure Vanilla JS for performance)
- **Tools used**: VS Code, Git

---

## Features

- **📸 Smart Reporting**: Upload waste photos with simulated AI verification.
- **🤖 Mock AI Logic**: 
    - Detects "garbage" filename -> Verified (+5 points).
    - Detects "ai" filename -> Fake (-5 points).
    - Random verification for other files.
- **🏆 Gamification**: 
    - Points system for every valid report.
    - Badges: New Citizen, Green Ambassador, Clean City Hero.
- **🎨 Modern UI**: Glassmorphism design trend with eco-friendly green themes.
- **📱 Responsive**: Fully optimized for mobile and desktop.

---

## Implementation

### Installation
No complex installation required as this is a static web application.

1. Clone the repository:
```bash
git clone https://github.com/nadhack70-collab/tink-her-hack-temp.git
```
2. Navigate to the project folder.

### Run
Simply open the `index.html` file in any modern web browser.
```bash
# Or use a simple http server
npx http-server .
```

---

## Project Documentation

### Screenshots

| Landing Page | Dashboard |
|:---:|:---:|
| ![Landing](https://placehold.co/300x600/00c853/ffffff?text=Landing+Page) | ![Dashboard](https://placehold.co/300x600/00c853/ffffff?text=Dashboard) |

| Report Waste | Profile |
|:---:|:---:|
| ![Report](https://placehold.co/300x600/00c853/ffffff?text=Report+Waste) | ![Profile](https://placehold.co/300x600/00c853/ffffff?text=Profile) |

### Diagrams

**Application Workflow:**
1.  **User** opens App -> Landing Page.
2.  **Auth**: User Registers/Logins (Data stored in LocalStorage).
3.  **Dashboard**: User views points and chooses action.
4.  **Action**: User reports waste -> **Mock AI** verifies.
5.  **Result**: Points awarded -> Profile updated.

---

## AI Tools Used (Transparency)

**Tool Used:** Google Gemini

**Purpose:** 
- Generating the core project structure (HTML/CSS/JS).
- Designing the Glassmorphism UI.
- Writing logical functions for the mock backend and confetti effects.

**Percentage of AI-generated code:** ~90%

**Human Contributions:**
- Project conception and problem statement.
- Customization of team details and deployment.

---

## Team Contributions

- **[Nadha ck]**: Full Stack Development, UI/UX Design, Project Documentation.

---

## License

This project is licensed under the MIT License.

---

Made with ❤️ at TinkerHub
