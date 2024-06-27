import {createContext, useContext, useReducer} from "react";
import testAction from "@/core/testAction";

const initialState = {
    firstName: "Petar",
    email: "pbisevac@singidunum.ac.rs",
}

// 1. Korak - kreiranje konteksta -> globalnog stanja
const testContext = createContext();

// 2. Korak - kreiranje reducera -> funkcije koje ce promeniti stanje u contextu
const testReducer = (state, action) => {
    switch (action.type) {
        case testAction.CHANGE_EMAIL:
            return {...state, email: action.payload};
        case testAction.CHANGE_FIRST_NAME:
            return {...state, firstName: action.payload};
        default:
            return state;
    }
};

// 3. Korak - kreiranje provajdera za nase parcijalne komponente
const TestProvider = ({ children }) => {
    const [state, dispatch] = useReducer(testReducer, initialState);

    const value = { state, dispatch };

    return (
        <testContext.Provider value={value}>
            {children}
        </testContext.Provider>
    );
};

// 4. Korak - kreirati funkciju za koriscenje contexta
const useTestActions = () => {
    const context = useContext(testContext);

    if (context === undefined) {
        throw new Error('testActions must be used within a TestProvider');
    }

    return context;
};

export { TestProvider, useTestActions };

