import React , {useState , createContext} from 'react';

const all= {
    users: {},
    courses: {},
    posts: {},
    reviews: {},
    myUser: {}
}

const AppContext = createContext(all);
export default AppContext;


// export default function UserManagement(props)
// {
//     return(
//         <UserContext.Provider value={UserContext}>
//             {props.children}
//         </UserContext.Provider>
//     );
// }