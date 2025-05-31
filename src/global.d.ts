declare global {
    interface Window {
        api: {
            sayHello(): () => void;
        };
    }
}

export { };
