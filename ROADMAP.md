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
- **Status:** Verified `GalleryCard` is used everywhere. Deleted 3 dead code directories (`MobileSection`, `TabletSection`, `DesktopSection`).
- **Impact:** Reduces codebase size by ~30%, significantly improving maintainability.

### 5. [TECH] TypeScript Foundations 🚧 **IN PROGRESS**

- **Description:** Initialize TypeScript and migrate core hooks/utils.
- **Status:** `tsconfig.json` initialized. `ImageCard`, `Gallery`, `GalleryGrid`, and `SideBar` converted to TypeScript (`.tsx`).
- **Impact:** Modernizes codebase and prevents runtime errors.

---

## 🛠️ Accomplishments Today

### ✨ Gallery Architecture Overhaul

- **De-duplicated UI:** Successfully merged `Mobile.jsx`, `Tablet.jsx`, and `Desktop.jsx` into a single, responsive `GalleryGrid.tsx`.
- **Centralized Assets:** Created `wallpaperData.ts` to manage all internal wallpaper imports in one place.
- **TypeScript Migration:** Converted `Gallery`, `GalleryGrid`, and `SideBar` to TypeScript, improving type safety.
- **Improved Performance:** Enabled native lazy loading for gallery images to improve Lighthouse scores.
- **Cleaned Codebase:** Removed 12+ redundant files and 3 directories, reducing bundle complexity.

---

## 📈 Upcoming Work

- [ ] Continue migrating legacy `.js` files to `.ts` for full project type-safety.
- [ ] Implement lazy loading for the main gallery views to improve Lighthouse scores. (✅ Initial implementation in `ImageCard`)
- [ ] Audit responsive design on ultra-wide and small mobile screens.
- [ ] Implement robust error boundaries for the Gallery grid.
