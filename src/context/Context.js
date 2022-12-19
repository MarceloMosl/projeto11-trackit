import React, { useState } from "react";
import { createContext } from "react";

export const AuthToken = createContext()

export default function UserToken ({children}) {

    const [token, setToken] = useState({nome: "Marcelo"})

    return (
        <AuthToken.Provider value={{token, setToken}}>
            {children}
        </AuthToken.Provider>

    )
}
