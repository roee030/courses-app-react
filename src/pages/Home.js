import React, {useState,useContext} from 'react';
import SearchBar from '../components/SearchBar';
import Title from '../components/Title';
import CoursesGrid from '../components/CoursesGrid';
import useSearchEffect from '../hooks/UseSearchEffect';
import UserContext from '../helpers/UserContext';
import "./Home.css";
export default function Home() {
    const [query, setQuery] = useState('');
    const [courses, isLoading] = useSearchEffect('courses', query);
    
    
    return (
        <div>
            <div className="HomeCoverPhoto">
                <div className="HomeSearchTool">
                    <Title title={"Search course"}/>
                    <SearchBar onChange={searchString => setQuery(searchString)}/>
                </div>
            </div>
            <div>
                <CoursesGrid courses={courses}/>
            </div>
        </div>
    )
}
