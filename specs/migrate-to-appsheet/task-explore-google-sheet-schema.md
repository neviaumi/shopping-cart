SPEC: [spec.md](file:///Users/david/my-apps/shopping-cart/specs/migrate-to-appsheet/spec.md)

# Task: Explore Google Sheet Schema

## Goal
Explore and define the physical database schema for Google Sheets to serve as the data source for the AppSheet migration. This includes documenting the physical columns needed, their data types, AppSheet-specific settings (keys, references, virtual columns), and providing ready-to-use CSV template schemas for quick import into Google Sheets.

## Acceptance Criteria
- [ ] Define the physical schema for the `Sessions` table (representing active and checked-out shopping sessions) with appropriate column headers.
- [ ] Define the physical schema for the `Cart Items` table (representing shopping cart line items referencing a session) with appropriate column headers.
- [ ] Document the AppSheet-specific configuration details for each column, such as Key, Label, Type, Initial Value, and Required constraint.
- [ ] Specify formulas for virtual columns (like `Total Amount` on Sessions and `Item Total` on Cart Items) and confirm they are not part of the physical Google Sheet columns but computed dynamically in AppSheet.
- [ ] Provide ready-to-use CSV block templates for both `Sessions` and `Cart Items` sheets, enabling direct copy-paste initialization of the Google Sheets document.
- [ ] Verify that all attributes listed in the parent [spec.md](file:///Users/david/my-apps/shopping-cart/specs/migrate-to-appsheet/spec.md) are mapped.

## Files to change
- [ ] `specs/migrate-to-appsheet/google-sheet-schema.md` (Create a new file containing the schema documentation and CSV templates)

## Test Plan
- [ ] Verify that all column headers in the CSV templates align with the database schema definitions.
- [ ] Confirm that `Session ID` is correctly linked as a reference from `Cart Items` to `Sessions`.
- [ ] Check that AppSheet virtual column formulas are correctly written using AppSheet expression syntax (e.g. `SUM(SELECT(...))` and multiplication).
