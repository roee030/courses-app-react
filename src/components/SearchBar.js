import React, { useState, useEffect } from 'react';
import { MDBCol, MDBIcon } from "mdbreact";
import "./SearchBar.css";
import axios from 'axios';
import useSearchEffect from '../hooks/use_search_effect';
import CourseCard from '../components/courses/CardComponent';

export function SearchPage() {
  const [search, setSearch] = useState('');
  const [result, loading] = useSearchEffect('courses', search);
  console.log('asasas');
  console.log(result);
  
  return (
    <div className="SearchBar">
    <MDBCol md="6">
      <div className="input-group md-form form-sm form-1 pl-0 ">
        <div className="input-group-prepend">
          <span className="input-group-text  lighten-3" id="basic-text1">
            <MDBIcon className="text-white" icon="search" />
          </span>
        </div>
        <input className="form-control my-0 py-1" type="text" placeholder="Search For Course" aria-label="Search" onChange={e => setSearch(e.target.value)} />
        {showResult(result, loading)}
      </div>
    </MDBCol>
    </div>
  );
}

function showResult(result, loading) {
    if (loading === 'false') {
        return <h1>Search for Courses</h1>
    }
    else if (loading === 'null') {
        return <h1>No Courses Found</h1>
    }
    else {
      result.map(item => {
        return CourseCard(item);
      });
    }
}

export default SearchPage;

// function useAsyncHook(def) {
//   const [account, setAccount] = useState('succeful 1');

//   useEffect(() => {
//     async function fetchAccount() {
//       try {
//         const reqBody = {
//           name:"Roee",
//           idNumber:"132456789",
//           idNumberConf:"132456789",
//           personalNumber:"1234567",
//           personalNumberConf:"1234567",
//           hogerNumber:"12345678",
//           hogerNumberConf:"12345678",
//           phoneNumber:"0548336350",
//           birthDate:"06/12/1990",
//           password:"1132456",
//           passwordConf:"1132456"
//         };

//         const config = {
//           headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//               'Accept': 'application/json'
//           }
//         };

        
//         setAccount(final);
//       } catch (error) {

//         console.log('test33')      
//         console.log(error)      
//       }
//     }
//     fetchAccount();
//   }, [def]);


//   return [account, 'test2'];
// }

// function useAsyncHook(searchCourse) {
//   const [result, setResult] = useState([]);
//   const [loading, setLoading] = useState("false");

//   useEffect(() => {
//     async function fetchCourseList() {
//       try {
//         setLoading("true");
//         const reqBody = {
//           name:"Roee",
//           idNumber:"132456789",
//           idNumberConf:"132456789",
//           personalNumber:"1234567",
//           personalNumberConf:"1234567",
//           hogerNumber:"12345678",
//           hogerNumberConf:"12345678",
//           phoneNumber:"0548336350",
//           birthDate:"06/12/1990",
//           password:"1132456",
//           passwordConf:"1132456"
//         };

//         const config = {
//           headers: {
//               'Content-Type': 'application/x-www-form-urlencoded',
//               'Accept': 'application/json'
//           }
//         };
//         const newAccount = await axios.post('localhost:3010/accounts/signup', reqBody, config);
//         const final = await newAccount.data;
//         console.log('wwwwwww');
//         console.log(final);
//         setResult(final);
//       } catch (error) {
//         setLoading("null");
//       }
//     }

//     if (searchCourse !== "") {
//       fetchCourseList();
//     }
//   }, [searchCourse]);

//   return [result, loading];
// }