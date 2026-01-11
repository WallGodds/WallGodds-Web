# Winter of Code 5.0 Proposal

**Project Name:** WallGodds-Web
**Under Organization:** Google Developer Groups (GDG) OnCampus IIIT Kalyani

---

## About Me

- **Name:** Vivek Yadav
- **Email-Id:** vivekyadav300@gmail.com
- **GitHub Username:** vivekyadav-3
- **Country:** India
- **Timezone:** IST (GMT +5:30)
- **Primary Language:** English
- **LinkedIn Profile Link:** https://www.linkedin.com/in/vivekyadavcs/
- **Other Links:** https://vivekyadav-3.github.io/

---

## Synopsis

Currently, the WallGodds-Web codebase has quite a bit of fragmentation. We have separate components for Mobile, Tablet, and Desktop which makes maintenance a headache. It's also entirely in JavaScript, which isn't ideal for scaling.

My proposal focuses on a **"Refactor & Solidify"** strategy:

1.  **Architecture:** Merging fragmented UI components into unified, responsive modules to reduce codebase size by ~30%.
2.  **Reliability:** Migrating the codebase from JavaScript to **TypeScript** to prevent runtime errors and improve developer experience.
3.  **Performance:** Implementing advanced strategies like Shimmer Loading and Blob downloads for a premium user experience.

This modernization matters because it transforms a simple web project into a production-grade, maintainable open-source repository.

---

## Benefits to the Community

1.  **Maintainability:** By removing duplicate code (e.g., merging `ImgCardMobile`, `ImgCardTablet`, `ImgCardDesktop` into a single `ImageCard`), specific bugs only need to be fixed in one place, not three.
2.  **Developer Experience:** Adding TypeScript provides self-documentation and autocomplete, making it much easier for _new_ contributors to join the project during future phases of Winter of Code.
3.  **User Experience:** Faster load times and a consistent interface across all devices will retain more users on the platform.

---

## Project Plan

**Tech Stack:**

- **Frontend:** React.js, Vite
- **Language:** TypeScript (Migrating from JavaScript)
- **Styling:** CSS Modules (Responsive Design)
- **Tools:** Git, GitHub Actions (CI/CD)

**Execution Strategy:**
I have adopted a proactive **"Early-Start" strategy**, having already begun local analysis and prototyping before the official coding phase. My plan involves aggressive refactoring in the first week to establish a stable foundation, followed by rigorous stability testing and feature enhancements.

---

## Milestones

| Milestone                          | Tentative Date  | KPI (Key Performance Indicator)                                                                                                                             |
| :--------------------------------- | :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Week 1: Architecture Refactor**  | Feb 1 - Feb 7   | • Merge 3 disparate `ImgCard` components into 1 unified `ImageCard`.<br>• Reduce `Components` directory size by 30%.<br>• **Status:** Prototyping Complete. |
| **Week 2: TypeScript Migration**   | Feb 8 - Feb 14  | • Initialize `tsconfig.json`.<br>• Migrate core components (`Gallery`, `ImageCard`, `Navbar`) to `.tsx`.<br>• Achieve 0 linting errors.                     |
| **Week 3: Feature Enhancement**    | Feb 15 - Feb 21 | • Implement "One-Tap Download" using Blob API.<br>• Add Shimmer/Skeleton loading states.<br>• Fix styling consistency issues.                               |
| **Week 4: Optimization**           | Feb 22 - Feb 28 | • Audit performance (Lighthouse score).<br>• Implement Lazy Loading for images.<br>• Fix responsive layout bugs on ultra-wide screens.                      |
| **Week 5: Documentation & Polish** | Mar 1 - Mar 7   | • Write comprehensive `README.md`.<br>• Add `CONTRIBUTING.md` for future devs.<br>• Final UI Polish.                                                        |
| **Week 6: Buffer & submission**    | Mar 8 - Mar 15  | • Final code review.<br>• Buffer for unexpected bugs.<br>• Submit final project report.                                                                     |

---

## Deliverables

- ✅ **Unified Component System:** A single, responsive source of truth for UI cards.
- ✅ **TypeScript Codebase:** A fully typed frontend accessible to modern tooling.
- ✅ **Performance Optimization:** Shimmer loaders and Lazy Loading implemented.
- ✅ **Zero-Bug Downloads:** A robust image download system that works on mobile and desktop.
- ✅ **Documentation:** Complete setup and contribution guides.

---

## Acknowledgement

I verify that this proposal is my original work and I am committed to completing the goals listed above during the Winter of Code 5.0 timeline.
