# Specification: Migrate Shopping Cart to Google Appsheet

## Goals
- Re-platform the shopping cart application from a custom web application (Vue 3, Vuetify, Pinia, Deno, localStorage) to Google Appsheet.
- Significantly reduce maintenance effort (no packages/dependencies updates, no hosting infrastructure, no code debugging, built-in offline synchronization).
- Retain the existing user flow: starting a session, adding/editing/deleting cart items, performing checkout, and viewing checked-out sessions in history.

## Acceptance Criteria (AC)
- [ ] **Data Source Setup**: A Google Sheets spreadsheet (or Appsheet database) created with two sheets/tables: `Sessions` and `Cart Items` configured with proper relationships.
- [ ] **Database Schema & Data Types**:
  - `Sessions` table:
    - `Session ID` (Key, Text, initial value `UNIQUEID()`)
    - `Name` (Text, Required)
    - `Created At` (DateTime, default `NOW()`)
    - `Status` (Enum: "Active", "Checked Out", default "Active")
    - `Total Amount` (Virtual Column: `SUM(SELECT(Cart Items[Item Total], [Session ID] = [_THISROW].[Session ID]))`)
  - `Cart Items` table:
    - `Item ID` (Key, Text, initial value `UNIQUEID()`)
    - `Session ID` (Ref to `Sessions` table, Required)
    - `Name` (Text, Required)
    - `Quantity` (Number, Required, minimum value 1, default 1)
    - `Price` (Price, Required, default 0.00)
    - `Item Total` (Virtual Column: `[Quantity] * [Price]`)
- [ ] **Active Session UX**:
  - A view displaying the current "Active" session (filtered where `[Status] = "Active"`).
  - If no active session exists, the UI must present a form or option to create one (entering a session name).
  - Inside the active session view, a nested inline list of `Cart Items` for that session, supporting Add, Edit, and Delete actions.
- [ ] **Checkout Action**:
  - A custom action/button in the active session view that changes the session's `Status` from "Active" to "Checked Out".
- [ ] **History & Archiving UX**:
  - A dedicated "History" view displaying a list of all "Checked Out" sessions showing their creation date, name, and total amount.
  - A detailed view for each historical session displaying its metadata and its read-only list of checked out `Cart Items`.
- [ ] **Access & Modification Constraints**:
  - Editing, adding, or deleting cart items and session details must be disabled for any session whose status is "Checked Out" (configured via `Editable_If` rule `[Session ID].[Status] = "Active"`).
- [ ] **Offline & PWA Capability**:
  - The Appsheet application is configured with offline mode enabled, allowing local data caching and automatic synchronization when network access is available.

## Explore
- **Current Architecture**:
  - **Front-end**: Built using Vue 3 (Composition API) and Vuetify (Material Design 3 elements) for styling/layout. State is managed by Pinia.
  - **Storage**: Custom offline persistence wrapper in [src/storage.ts](file:///Users/david/my-apps/shopping-cart/src/storage.ts) using `localStorage`. It manages active session states under key prefix `shopping:session:current` and archived sessions under `shopping:session:${sessionId}`.
  - **Error Handling**: A dedicated error boundary [StorageErrorBoundary.vue](file:///Users/david/my-apps/shopping-cart/src/components/StorageErrorBoundary.vue) manages quota exceptions if local storage fills up.
- **Migration Mapping to Appsheet**:
  - **Database Layer**: Local storage & serialization code is replaced entirely by Google Sheets/Appsheet DB tables.
  - **Offline & Storage Sync**: Appsheet automatically manages local device caching and synchronization, rendering `src/storage.ts` and `StorageErrorBoundary.vue` obsolete.
  - **Component Mapping**:
    - [CreateCartSession.vue](file:///Users/david/my-apps/shopping-cart/src/routes/shopping-cart/current/components/CartSession/CreateCartSession.vue) maps to a standard Appsheet Form view for the `Sessions` table.
    - [Cart.vue](file:///Users/david/my-apps/shopping-cart/src/routes/shopping-cart/current/components/CartSession/Cart.vue) and its children ([AddCartItemForm.vue](file:///Users/david/my-apps/shopping-cart/src/routes/shopping-cart/current/components/CartSession/AddCartItemForm.vue), [CartItem.vue](file:///Users/david/my-apps/shopping-cart/src/routes/shopping-cart/current/components/CartSession/CartItem/CartItem.vue), [InlineEditCartItemForm.vue](file:///Users/david/my-apps/shopping-cart/src/routes/shopping-cart/current/components/CartSession/CartItem/InlineEditCartItemForm.vue)) map to a Session Detail view containing a nested inline list view of `Cart Items` with standard insert/update forms.
    - [HistoryListing.vue](file:///Users/david/my-apps/shopping-cart/src/routes/shopping-cart/history/HistoryListing.vue) maps to a List/Deck view of `Sessions` filtered to show only status "Checked Out".
    - [SessionDetail.vue](file:///Users/david/my-apps/shopping-cart/src/routes/shopping-cart/history/SessionDetail.vue) maps to a read-only Session Detail view in Appsheet.

## Scope
- Designing the database tables (`Sessions` and `Cart Items`) and defining columns, types, formulas, and validations.
- Setting up the Appsheet data tables and their relationships (References).
- Configuring the active session filter slice (`[Status] = "Active"`) and the checkout history slice (`[Status] = "Checked Out"`).
- Designing the Appsheet Views (Active Session Detail, Create Session Form, History List, History Detail).
- Implementing the "Checkout" Action (data change action to set `Status` to "Checked Out").
- Configuring `Editable_If` rules to secure checked-out sessions and items.
- Enabling Appsheet Offline & Sync options (Offline Use, Sync on start, Automatic sync).

## Out of Scope
- Automated migration of historical data from individual users' local browser storage to the new shared Appsheet database.
- Integration with third-party payment gateways (checkout remains a status-change action).
- Custom UI styling using HTML/CSS/JavaScript components that bypass native Appsheet view styles.
- User management and granular access control lists (standard Google Account integration is sufficient).
