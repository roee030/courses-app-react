import React, {useState} from 'react';
import SearchBar from '../components/SearchBar';
import Title from '../components/Title';
import CoursesGrid from '../components/CoursesGrid';
import UseSearchEffect from '../hooks/UseSearchEffect';

export default function Home() {
    const [query, setQuery] = useState('');
    const [courses, isLoading] = UseSearchEffect('courses', query);
    console.log('wawawa');
    console.log(courses);
    
    return (
        <div>
            <Title title={"Search course"}/>
            <SearchBar onChange={searchString => setQuery(searchString)}/>
            <div>
                <CoursesGrid courses={courses}/>
            </div>
        </div>
    )
}
