# ❄️ Winter of Code 5.0 - Speed-Run Roadmap

**Target Date:** February 1, 2026
**Goal:** Submit 5+ high-quality PRs on Day 1 to establish a strong lead.

---

## 🚀 PR Queue

### 1. [UI] Global Footer Integration ✅ **CODE READY**

- **Description:** Global footer integration with modern branding, social links, and navigation.
- **Impact:** Fixes layout consistency across all pages via `App.jsx`.

### 2. [UX] Shimmer Loaders & Lazy Loading ✅ **CODE READY**

- **Description:** Implement skeleton loaders in `ImgCard` and native lazy loading.
- **Impact:** Professional-grade UX for image-heavy pages.

### 3. [Feature] One-Tap Image Downloads ✅ **CODE READY**

- **Description:** Implement actual image blob download logic in `ImgCard`.
- **Impact:** Restores missing core functionality.

### 4. [Architecture] Component De-duplication 🚀 **HIGH PRIORITY**

- **Description:** Merge Mobile/Tablet/Desktop card components into a single responsive UI.
- **Impact:** Reduces codebase size by ~30%, significantly improving maintainability.

### 5. [TECH] TypeScript Foundations 🚀 **HIGH PRIORITY**

- **Description:** Initialize TypeScript and migrate core hooks/utils.
- **Impact:** Modernizes codebase and prevents runtime errors.

---

## 🛠️ Accomplishments Today

### ✨ Unified Footer

- Created a comprehensive `Footer.jsx` and `Footer.module.css`.
- Integrated globally in `App.jsx`.
- Cleaned up redundant imports in `Home.jsx` and `Aboutus.jsx`.

### ✨ Enhanced Image Card

- Implemented actual **Download** functionality (image blob fetching).
- Added **Skeleton Loading** state with shimmer animation.
- Improved visual transitions when images load.

### ✨ Reusable Skeleton

- Created a generic `Skeleton` component for future use in the project.

---

## 📈 Next Steps (Local Prep for Feb 1st)

- [ ] Refactor Gallery sections to use a unified grid instead of separate device-specific routes.
- [ ] Initialize `tsconfig.json` and start migrating `.js` to `.ts`.
- [ ] Prepare highly detailed PR descriptions using the "Technical Highlights" and "Feature Descriptions" crafted today.
- [ ] Test all changes on different screen sizes to ensure flawlessly responsive design.
