import React, { useState } from "react";

export const AuthContext = React.createContext({});

export function AuthProvider(props) {
    const [user,setUser] = useState({
        name: '',
        image: '',
        token: ''
    })
    let [habitosHoje,setHabitosHoje] = useState([]);
    let [habitos,setHabitos] = useState([]);
    const [hoje,setHoje] = useState({
        percentage: 0,
    })

    return(
        <AuthContext.Provider value={{user,setUser,hoje,setHoje,habitosHoje,setHabitosHoje,habitos,setHabitos}}>
            {props.children}
        </AuthContext.Provider>
        
    )
}