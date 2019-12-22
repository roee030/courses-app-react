import React , {useState , createContext} from 'react';

const all= {
    users: {},
    courses: {},
    posts: {},
    reviews: {},
    myUser: {
        _id : '5df9e6344a942df70da6f397',
        name : "asaf",
        personalNumber : 6044556,
        phoneNumber : 544322977,
        courses : {
            admin : {
                approved : [],
                pending : []
            },
            participate : {
                approved : [],
                pending : []
            }
        },
        isSuperUser : false,
        createdAt : "Wed Dec 18 2019 10:40:57 GMT+0200 (Israel Standard Time)"
    }
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