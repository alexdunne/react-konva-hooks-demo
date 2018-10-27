# React Konva & Hooks demo

With the recent release of [hooks](https://reactjs.org/docs/hooks-overview.html) in react 16.7.0-alpha I wanted to create a demo application to play around with this new library feature.

The power and composability of hooks is displayed in the [MousePosition](https://github.com/alexdunne/react-konva-hooks-demo/blob/master/src/lib/MousePosition.js) and [WindowSize](https://github.com/alexdunne/react-konva-hooks-demo/blob/master/src/lib/WindowSize.js). These hooks use a combination of `useState` and `useEffect` alongside Browser APIs to provide reusable state logic that can be shared and consumed across multiple components easily.

To run this project locally you'll need to:

```
git clone git@github.com:alexdunne/react-konva-hooks-demo.git
cd react-konva-hooks-demo
yarn install
yarn start
```

Or visit the demo website https://react-konva-hooks-demo.netlify.com/
