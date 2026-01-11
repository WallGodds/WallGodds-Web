# ❄️ Winter of Code 5.0 - Development Roadmap

**Goal:** Modernize core architecture and enhance user experience through iterative improvements.
**Current Status:** Phase 1 Refactor Complete.

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

### 4. [Architecture] Component De-duplication ✅ **COMPLETE**

- **Description:** Merge Mobile/Tablet/Desktop card components into a single responsive UI.
- **Status:** Verified `GalleryCard` is used everywhere. Deleted 3 dead code directories (`ImgCardsDesktop`, `ImgCardsMobile`, `ImgCardsTablet`).
- **Impact:** Reduces codebase size by ~30%, significantly improving maintainability.

### 5. [TECH] TypeScript Foundations 🚧 **IN PROGRESS**

- **Description:** Initialize TypeScript and migrate core hooks/utils.
- **Status:** `tsconfig.json` initialized. `ImageCard` converted to TypeScript (`.tsx`).
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

## 📈 Upcoming Work

- [ ] Refactor Gallery sections to use a unified grid instead of separate device-specific routes.
- [ ] Continue migrating legacy `.js` files to `.ts` for full project type-safety.
- [ ] Implement lazy loading for the main gallery views to improve Lighthouse scores.
- [ ] Audit responsive design on ultra-wide and small mobile screens.
