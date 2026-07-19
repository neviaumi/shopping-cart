SPEC: [spec.md](file:///Users/david/my-apps/shopping-cart/specs/migrate-to-appsheet/spec.md)

# Task: Configure AppSheet UI and Database

## Goal
Configure AppSheet database settings (columns, slices, expressions) and user interface (views, navigation, actions, offline sync) to support the shopping cart migration. This involves documenting the exact settings, expressions, views, and step-by-step procedures so they can be accurately implemented in the AppSheet editor.

## Acceptance Criteria
- [x] Document AppSheet column settings (keys, types, formulas, validation, initial values) for both `Sessions` and `Cart Items` tables.
- [x] Define and document the Active Session Slice (`[Status] = "Active"`) and Checked Out/History Slice (`[Status] = "Checked Out"`).
- [x] Define the Checkout Action (data change: set `Status` to `"Checked Out"`), including condition to only show when Status is "Active".
- [x] Define the AppSheet UI Views:
  - Active Session Detail View (card/detail view showing the current active session, with nested inline Cart Items).
  - History Listing View (deck/list view of checked out sessions).
  - Session Details View (read-only view for checked out sessions).
- [x] Define security rules (`Editable_If` expressions) to prevent modification of checked-out sessions and their cart items.
- [x] Document Offline & Sync settings (Offline Use enabled, Sync on start, Automatic sync).
- [x] Provide step-by-step setup guides/instructions for the user to apply these configurations in the AppSheet editor.

## Files to change
- [x] `specs/migrate-to-appsheet/appsheet-config-guide.md` (Create a new configuration guide file containing step-by-step AppSheet editor setup instructions and expressions)

## Test Plan
- [x] Verify that all expressions (virtual columns, editable_if, slices) conform to valid AppSheet expression syntax.
- [x] Verify that the `Editable_If` rule `[Status] = "Active"` or `[Session ID].[Status] = "Active"` correctly locks down records as specified.
- [x] Verify that views and slices correctly target the database schema columns defined in `google-sheet-schema.md`.
