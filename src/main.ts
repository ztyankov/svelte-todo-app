import App from './App.ts';

const app = new App({
    target: document.body,
    props: {
        appName: `Z's Svelte Todo App`
    }
});

export default app;