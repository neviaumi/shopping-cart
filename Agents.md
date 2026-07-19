# Project Documentation for AI Agents

Welcome! This document provides an architectural overview, data flow descriptions, and key commands to help you quickly understand and work on this repository.

---

## 🚀 Project Overview
This is a modern **Shopping Cart web application** built with:
*   **Runtime/Package Manager**: [Deno](https://deno.land/) (with compatibility layer for `node_modules` and Vite/Vitest).
*   **Framework**: [Vue 3](https://vuejs.org/) (Composition API, Script Setup).
*   **UI Library**: [Vuetify](https://vuetifyjs.com/) (Material Design 3 elements).
*   **State Management**: [Pinia](https://pinia.vuejs.org/).
*   **Routing**: [Vue Router](https://router.vuejs.org/).
*   **Testing**: [Vitest](https://vitest.dev/) with [Happy DOM](https://github.com/capricorn86/happy-dom) as the environment.
*   **Build Tooling**: [Vite](https://vitejs.dev/) with PWA (Progressive Web App) support.

---

## 📂 Codebase Structure & Architecture

```
shopping-cart/
├── deno.json               # Deno task manager, imports map, and configuration
├── index.html              # HTML Entry Point
├── vite.config.ts          # Vite build config with Vuetify & PWA plugins
├── vitest.config.ts        # Vitest configuration merging Vite config
├── vitest.setup.ts         # Global test setup (mocks ResizeObserver, registers Vue plugins)
└── src/
    ├── main.ts             # Application entry point
    ├── App.vue             # Root layout component
    ├── App.spec.ts         # Unit tests for App.vue
    ├── storage.ts          # Robust wrapper around localStorage
    ├── storage.spec.ts     # Storage wrapper tests
    ├── components/
    │   └── StorageErrorBoundary.vue  # Error Boundary for storage quota limit exceeded
    ├── plugins/
    │   ├── router.ts       # Route registrations
    │   └── vuetify.ts      # Vuetify setup
    ├── routes/
    │   └── shopping-cart/
    │       ├── current/    # Current active cart views
    │       │   ├── CartSession.vue
    │       │   └── components/
    │       │       └── CartSession/
    │       │           ├── AddCartItemForm.vue
    │       │           ├── Cart.vue
    │       │           ├── CreateCartSession.vue
    │       │           └── CartItem/
    │       │               ├── CartItem.vue
    │       │               └── InlineEditCartItemForm.vue
    │       └── history/    # Archived session/cart views
    │           ├── HistoryListing.vue
    │           └── SessionDetail.vue
    ├── stores/
    │   ├── cart.ts         # Current shopping cart actions/state
    │   ├── history.ts      # Past checked-out sessions history actions
    │   └── session.ts      # Active session management
    └── utils/
        └── formatting.ts   # Currency & Date formatting helpers
```

---

## 💾 State & Data Flow (localStorage Keys)
The application is local-first, utilizing `localStorage` via [src/storage.ts](file:///Users/david/my-apps/shopping-cart/src/storage.ts) for persistence.

### Data Schemas
*   **`Session`**:
    ```typescript
    interface Session {
      id: string | null;
      name: string | null;
      createdAt: number; // timestamp
    }
    ```
*   **`CartItem`**:
    ```typescript
    interface CartItem {
      id: string;
      name: string;
      quantity: number;
      price: number;
    }
    ```

### Storage Key Map
| Storage Key | Data Format | Description |
| :--- | :--- | :--- |
| `shopping:session:current` | `Session` JSON string | The active shopping session info. |
| `shopping:session:current:cart` | `CartItem[]` JSON string | List of items in the currently active cart. |
| `shopping:sessions` | `string[]` (IDs list) | Index of all archived session IDs. |
| `shopping:session:${sessionId}` | `Session` JSON string | Details for an archived session. |
| `shopping:session:${sessionId}:cart` | `CartItem[]` JSON string | Checked out cart items for a specific archived session. |

### Lifecycle of a Session
1.  **Creation**:
    *   If no session exists, the UI shows `CreateCartSession.vue`.
    *   Creating a session sets `shopping:session:current` and enables the addition of items.
2.  **Shopping**:
    *   Items are added, updated, or removed using [src/stores/cart.ts](file:///Users/david/my-apps/shopping-cart/src/stores/cart.ts).
    *   State changes are synced to `shopping:session:current:cart`.
3.  **Checkout**:
    *   On checkout, the active session is cleared.
    *   The session info and cart items are written to `shopping:session:${sessionId}` and `shopping:session:${sessionId}:cart`.
    *   The `sessionId` is added to the list in `shopping:sessions`.
    *   The client is redirected to `/shopping-cart/history`.

---

## 🛠️ CLI Task Tasks

The following tasks are defined in `deno.json`:

*   **Start Local Development Server**:
    ```bash
    deno task dev
    ```
    *Starts the dev server at http://localhost:8080 (Vite).*

*   **Run Unit Tests**:
    ```bash
    deno task test
    ```
    *Runs tests once via Vitest.*

*   **Linting and Formatting**:
    *   Format code check: `deno fmt --check`
    *   Run Deno Linter: `deno lint`

---

## 🧪 Testing Strategy & Configuration
*   We use **Vitest** + **Happy DOM** for lightweight browser API mocking.
*   Vuetify and standard plugins are automatically injected in [vitest.setup.ts](file:///Users/david/my-apps/shopping-cart/vitest.setup.ts).
*   Mock dependencies/APIs where needed, especially browser globals such as `ResizeObserver`.

---

## ⚙️ Agent Environment Configuration (`.env.agent`)
Whenever you execute terminal commands using the `run_command` tool, you must load the environment variables defined in the [.env.agent](file:///Users/david/my-apps/shopping-cart/.env.agent) file at the root of the workspace.

To do this, source the `.env.agent` file at the beginning of the command execution line. For example:
```bash
source .env.agent && <command>
```
