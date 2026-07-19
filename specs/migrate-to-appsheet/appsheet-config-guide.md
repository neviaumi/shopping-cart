# Google AppSheet Configuration Guide

This guide provides step-by-step instructions for configuring the migrated Shopping Cart application in the Google AppSheet Editor.

---

## 💾 1. Database Schema & Column Configurations

Ensure the following physical and virtual columns are configured correctly in the **Data > Columns** section of the AppSheet Editor.

### `Sessions` Table
*   **Session ID**
    *   *Type*: `Text`
    *   *Key?*: Checked
    *   *Show?*: Unchecked (or `CONTEXT("ViewType") <> "Form"`)
    *   *Initial Value*: `UNIQUEID()`
    *   *Editable?*: `FALSE`
*   **Name**
    *   *Type*: `Name`
    *   *Required?*: Checked
    *   *Editable?*: `[Status] = "Active"`
*   **Created At**
    *   *Type*: `DateTime`
    *   *Initial Value*: `NOW()`
    *   *Editable?*: `FALSE`
*   **Status**
    *   *Type*: `Enum`
    *   *Values*: `"Active"`, `"Checked Out"`
    *   *Allow other values*: Unchecked
    *   *Initial Value*: `"Active"`
    *   *Editable?*: `[Status] = "Active"`
*   **Total Amount** (Virtual Column)
    *   *Type*: `Price`
    *   *Formula*: `SUM(SELECT(Cart Items[Item Total], [Session ID] = [_THISROW].[Session ID]))`

### `Cart Items` Table
*   **Item ID**
    *   *Type*: `Text`
    *   *Key?*: Checked
    *   *Initial Value*: `UNIQUEID()`
    *   *Editable?*: `FALSE`
*   **Session ID**
    *   *Type*: `Ref`
    *   *ReferencedTableName*: `Sessions`
    *   *IsPartOf*: Checked (Establishes parent-child inline relation)
    *   *Editable?*: `OR(ISBLANK([Session ID]), [Session ID].[Status] = "Active")`
*   **Name**
    *   *Type*: `Text`
    *   *Required?*: Checked
    *   *Editable?*: `[Session ID].[Status] = "Active"`
*   **Quantity**
    *   *Type*: `Number`
    *   *Required?*: Checked
    *   *Initial Value*: `1`
    *   *Valid_If*: `[_THIS] >= 1`
    *   *Editable?*: `[Session ID].[Status] = "Active"`
*   **Price**
    *   *Type*: `Price`
    *   *Required?*: Checked
    *   *Initial Value*: `0.00`
    *   *Valid_If*: `[_THIS] >= 0`
    *   *Editable?*: `[Session ID].[Status] = "Active"`
*   **Item Total** (Virtual Column)
    *   *Type*: `Price`
    *   *Formula*: `[Quantity] * [Price]`

---

## 🍕 2. Slices (Filtered Tables)

Create the following Slices by hovering over the **`Sessions`** table under the **Data** menu and clicking the **`+` (plus)** icon.

### `Active Session` Slice
*   **Slice Name**: `Active Session`
*   **Source Table**: `Sessions`
*   **Row Filter Condition**:
    ```text
    [Status] = "Active"
    ```

### `History` Slice
*   **Slice Name**: `History`
*   **Source Table**: `Sessions`
*   **Row Filter Condition**:
    ```text
    [Status] = "Checked Out"
    ```
*   **Slice Actions** (under Actions): Set to **Custom** and ensure the standard **`Add`** action is **not** selected to prevent manual additions from the history view.

---

## ⚡ 3. Actions

Create the Checkout action to transition a session to the Checked Out state.

### `Checkout` Action
*   **Action Name**: `Checkout`
*   **For this data**: `Sessions`
*   **Do this**: `Data: set the values of some columns in this row`
*   **Set these columns**:
    *   `Status` = `"Checked Out"`
*   **Only if this condition is true (Behavior)**:
    ```text
    [Status] = "Active"
    ```
*   **Appearance**: Set to `Display prominently` with a checkout-related icon (e.g., shopping bag, checkmark).

---

## 📱 4. User Interface Views

Configure the following views in **App > Views** (or click the **Views** smartphone icon in the leftmost sidebar).

### View 1: `Start Session` (Form View)
*   **For this data**: `Sessions`
*   **View Type**: `Form`
*   **Position**: `left`
*   **Column Order**: Set to **Manual** and select **only** the `Name` column.
*   **Show If**:
    ```text
    ISBLANK(FILTER("Active Session", TRUE))
    ```
*   **Finish View (Behavior)**: Set to `Active Session`.

### View 2: `Active Session` (Detail View)
*   **For this data**: `Active Session` (Slice)
*   **View Type**: `Detail`
*   **Position**: `left`
*   **Show If**:
    ```text
    ISNOTBLANK(FILTER("Active Session", TRUE))
    ```

### View 3: `History` (Deck or List View)
*   **For this data**: `History` (Slice)
*   **View Type**: `Deck` (or `List`)
*   **Position**: `right`

---

## ⚙️ 5. General & Starting View Settings

Configure the starting view behavior under **Settings > Views: General**:

*   **Starting view**: Click the beaker icon to use a formula and paste:
    ```text
    IFS(
      ISNOTBLANK(SELECT(Sessions[Session ID], [Status] = "Active")), "Active Session",
      TRUE, "Start Session"
    )
    ```

---

## 📶 6. Offline & Sync Settings

Configure offline capability under **Settings > Offline mode**:

*   **Offline Use**: Checked/Enabled (stores data locally on user device).
*   **Sync on start**: Checked/Enabled (fetches fresh data from database when app launches).
*   **Automatic sync**: Checked/Enabled (automatically pushes changes to database when connectivity is restored).
