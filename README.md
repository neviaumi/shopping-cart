# Shopping Cart

A modern shopping cart application built with Deno, Vite, and Vue 3, utilizing
Vuetify for the UI.

## Features

- **Runtime**: Built on [Deno](https://deno.land/) for a secure and modern
  JavaScript/TypeScript runtime.
- **Framework**: [Vue 3](https://vuejs.org/) for a reactive and component-based
  architecture.
- **UI Library**: [Vuetify](https://vuetifyjs.com/) for beautiful and responsive
  Material Design components.
- **Tooling**: [Vite](https://vitejs.dev/) for blazing fast development and
  building.
- **Testing**: [Vitest](https://vitest.dev/) with Happy DOM for unit testing.
- **Type Safety**: TypeScript support out of the box.

## Installation & Setup

Ensure you have [Deno](https://deno.land/#installation) installed on your
system.

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd shopping-cart
   ```

2. **Install dependencies:** Deno caches dependencies on the first run, but you
   can cache them upfront:
   ```bash
   deno cache src/main.ts
   ```
   _Note: This project uses `node_modules` via Deno's compatibility layer._

## Usage

### Development Server

Start the development server with hot module replacement:

```bash
deno task dev
```

The application will be available at `http://localhost:5173` (by default).

### Running Tests

Execute the unit test suite:

```bash
deno task test
```

## Project Structure

- `src/main.ts`: Application entry point.
- `src/App.vue`: Root Vue component.
- `src/plugins/`: Vuetify and other plugin configurations.
- `deno.json`: Project configuration and task definitions.
- `vite.config.ts`: Vite build configuration.

## License

[MIT](LICENSE)
