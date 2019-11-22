module.exports = {
    preset: 'ts-jest',

    // The root of your source code, typically /src
    // `<rootDir>` is a token Jest substitutes
    roots: ["<rootDir>/src"],

    // Jest transformations -- this adds support for TypeScript
    // using ts-jest
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        '^.+\\.tsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'babel-jest',
    },

    transformIgnorePatterns: [
        "node_modules/(?!(react-native"
        + "|react-navigation-tabs"
        + "|react-native-splash-screen"
        + "|react-native-screens"
        + "|react-native-reanimated"
        + ")/)",
    ],

    // Runs special logic, such as cleaning up components
    // when using React Testing Library and adds special
    // extended assertions to Jest
    setupFilesAfterEnv: [
        "@testing-library/react/cleanup-after-each",
        "@testing-library/jest-dom/extend-expect"
    ],

    modulePathIgnorePatterns: [
        "<rootDir>/components/customer/Create.css"
    ],

    // Test spec file resolution pattern
    // Matches parent folder `__tests__` and filename
    // should contain `test` or `spec`.
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

    // Module file extensions for importing
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverage: true,
    clearMocks: true,
    coverageDirectory: "coverage",
};