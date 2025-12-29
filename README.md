# Guild Wars 2 Rotation Planner

Plan out rotations for [Guild Wars 2](https://www.guildwars2.com).

Visit [zerthox.github.io/gw2-rotation-planner/](https://zerthox.github.io/gw2-rotation-planner/) to use it.

## Build setup

The project is written in [TypeScript](https://www.typescriptlang.org/) and makes use of [Gatsby](https://www.gatsbyjs.com/) as the main frontend framework.
The UI is realized using [React](https://reactjs.org/) and state management is done with help of [Redux](https://redux.js.org/).
[MUI](https://mui.com/) and [@discretize/gw2-ui-new](https://github.com/discretize/discretize-ui) are used for UI components.

Everything necessary is included as [npm](https://www.npmjs.com/) dependencies. You are only required to have [Node.js](https://nodejs.org/) installed.

```sh
# install dependencies
npm install

# run gatsby dev server
npm run dev

# build site for production
npm run build
```
