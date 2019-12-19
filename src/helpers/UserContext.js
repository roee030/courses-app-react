import React , {useState , createContext} from 'react';

const all= {
    user: 'aaa',
    courses: {

    },

}

const UserContext = createContext(all);
export default UserContext;


// export default function UserManagement(props)
// {
//     return(
//         <UserContext.Provider value={UserContext}>
//             {props.children}
//         </UserContext.Provider>
//     );
// }