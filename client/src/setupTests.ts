import '@testing-library/jest-dom/extend-expect';
beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        value: () => {
            return {
                matches: false,
                addListener: () => {},
                removeListener: () => {},
            };
        },
    });
});
