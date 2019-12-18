import React , {useState , createContext} from 'react';

const UserContext = createContext("lalala");
export {UserContext}
export default function UserManagement(props)
{
    const UserHook = useState({color:"red"})

    return(
        <UserContext.Provider value={UserHook}>
            {props.children}
        </UserContext.Provider>
    );
}