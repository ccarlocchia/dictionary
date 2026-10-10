# Dictionary

[Open the Dictionary App](https://ccarlocchia.github.io/dictionary/)

## Requirements

- Node.js 20 or newer
- npm (included with Node.js)

## Local development

Install the exact dependencies recorded in `package-lock.json`, then start the Vite development server:

```sh
npm ci
npm start
```

Open the local URL printed by Vite, usually [http://localhost:5173](http://localhost:5173).

## Tests and production preview

Run the test suite:

```sh
npm test
```

Run tests in watch mode while developing:

```sh
npm run test:watch
```

Create and preview an optimized production build:

```sh
npm run build
npm run preview
```

The build output is written to `dist/`. Vite is configured with the `/dictionary/` base path used by this repository's GitHub Pages site.

## Deploy to GitHub Pages

1. Make sure the repository's `origin` remote points to `ccarlocchia/dictionary`, and that your Git credentials allow pushing to it.
2. In the GitHub repository, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then select the `gh-pages` branch and `/ (root)` as the folder. Save the setting if it is not already configured.
3. From the project directory, run:

   ```sh
   npm run deploy
   ```

The deploy script builds the app first, then publishes the contents of `dist/` to the `gh-pages` branch. GitHub Pages updates the site after the deployment finishes.

---

## About

This project was inspired by the tutorial [Code a Dictionary with React and Material UI](https://www.youtube.com/watch?v=ToXna81iij0). It uses [Free Dictionary API](https://freedictionaryapi.com/) for definitions.
