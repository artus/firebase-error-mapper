# Firebase Error Mapper

Firebase returns error messages that are not very user friendly:

```Firebase: Error (auth/network-request-failed).```

This library maps the error code to human readable text, as specified in the [firebase documentation](https://firebase.google.com/docs/auth/admin/errors).

## Usage

Create a new `FirebaseErrorMessageMapper`, and add custom mappings if desired.

```js
const mapper = new FirebaseErrorMessageMapper()
mapper.addMapping("auth/invalid-email", "Please enter a valid email address.");

/* 
  Some code calling Firebase, which throws an error.

  Error {
    message: "Firebase: Error (auth/network-request-failed)."
  }
*/

const mappedErrorMessage = mapper.map(error.message);

// mappedErrorMessage = "A network error has occurred, please try again later."

/* 
  Some other code calling Fireabse, which throws an error.

  Error {
    message: "Firebase: Error (auth/invalid-email)"
  }
*/

const mappedErrorMessage = mapper.map(error.message);

// mappedErrorMessage = "Please enter a valid email address."
```

# TSDX User Guide

## Commands

TSDX scaffolds your new library inside `/src`.

To run TSDX, use:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.