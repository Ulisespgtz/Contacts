//acceder a la biblioteca de "context" de react native
import { createContext, useState } from 'react';

export const MyContext = createContext(
    //este es el estado o valores iniciales del objeto
    {
        loginData: {},
        setLoginData: () => { },
    }
);

export const MyContextProvider = ({ children }) => {
    const [loginData, setLoginData] = useState({});

    return (
        <MyContext.Provider value={{ loginData, setLoginData }}>
            {children}
        </MyContext.Provider>
    );
}