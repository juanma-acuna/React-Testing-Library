<h1 align='center'>Center of Excellence (CoE): JS</h1>
<h2 align='center'>Juan Manuel Acuña</h2>
<h3 align='center'>Think twice, code once</h3>

<p align="center">
<a href="https://www.emojione.com/emoji/1f419">
  <img
    height="120"
    width="120"
    alt="octopus"
    src="https://raw.githubusercontent.com/testing-library/dom-testing-library/main/other/octopus.png"
  />
</a>
  <a href="https://www.emojione.com/emoji/1f410">
  <img
    height="120"
    width="120"
    alt="goat"
    src="https://raw.githubusercontent.com/testing-library/react-testing-library/main/other/goat.png"
  />
</a>
</p>

<h3 align='center'>Testing React with Jest and Testing Library</h3>
<h4 align='center'>By: Bonnie Schulkin</h4>
<h4 align='center'>https://www.udemy.com/course/react-testing-library/</h4>

### Index

##### [Color Button](https://github.com/Unosquare-CoE-JavaScript/juan-manuel-acuna/tree/training/React-Testing-Library/color-button)

##### [Sundaes on Demand](https://github.com/Unosquare-CoE-JavaScript/juan-manuel-acuna/tree/training/React-Testing-Library/sundaes-on-demand)

#### Notes of the course

- RTL is an opinionated testing library, that means it encourage you to follow certain good practices.
- Mainly, this library is designed to test the behavior, not how the code is written.
- It's designed to find the elements by their accessibility markers, not test ID.

Main differences against Jest

- RTL always provide a virtual DOM. This allows you interact with the content.
- Jest is intended to find tests, run tests and determine whether tests pass or fail.

It's important to have in mind that starting on React 18, we need to use createRoot instead of render.

`expect` is the core of the testing. It has two parts, the selector and the matcher.

Assertion examples:
`expect(element.textContent).toBe('hello');`
`expect(elementsArray).toHaveLength(7);`

- jest-dom comes from default with create-react-app
- _src/setupTests.js_ imports it before each test, makes matchers available
- DOM-based matchers
  - more examples: `toBeVisible()` or `toBeChecked()`

Jest

- RTL helps with:
  - rendering components into virtual DOM
  - searching virtual DOM
  - interact with virtual DOM
- BUT stills needs for a test runner, able to find tests, run them and make assertions
- Jest is the test runner recommended by RTL
  - comes with create-react-app
  - npm test runs an npm script that runs Jest in watch mode

TDD Test-Driven Development

- Write tests before writing the code
  - then write code according to "spec" set by tests
- "red-green" testings
  - test fail before code is written

Using TDD, testing is part of the coding process. It's more efficient, because every change drives to run all the tests, making us sure all still working as we want.

Types of tests

- Unit tests
  - Test one (and only one) unit of code in isolation
- Integration tests
  - How multiple units works together
- Functional tests
  - Tests a particular function (heres meaning _behavior_) of software
- Acceptance / End-to-end(E2E) Tests
  - Use actual browser and server (Cypress, Selenium)

As we say, TRL recommends to finding elements by accesibility handles:

- https://testing-library.com/docs/queries/about/#priority
- Roles documentation: https://www.w3.org/TR/wai-aria/#role_definitions
- Jest-dom: https://github.com/testing-library/jest-dom

Very standard questions to be asked before a testing

| Question                     | Answers                                                                                                                                                                                |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| What to render?              | The smallest posible component                                                                                                                                                         |
| Do we need to pass props?    | If the component has props and these props are used in any point of our test                                                                                                           |
| Do we need to wrap anything? | Context, memory router, etc                                                                                                                                                            |
| Where should the test go?    | A new file or ammend an existing one? As a geneeral thought, we don't like utra long tests, so, if we see this test is going to long, maybe is a good idea to split onto several files |
| How to test?                 | What queries and events?                                                                                                                                                               |
| Do we need to async / await? | Only if anything goest async. Remember, ALL remote server interaction are async (like axios), even when they are mocked                                                                |

https://testing-library.com/docs/react-testing-library/cheatsheet/

| Question                     | Answers |
| :--------------------------- | :------ |
| What to render?              |         |
| Do we need to pass props?    |         |
| Do we need to wrap anything? |         |
| Where should the test go?    |         |
| How to test?                 |         |
| Do we need to async / await? |         |
