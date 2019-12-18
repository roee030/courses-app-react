import React, {useState} from 'react';
import SearchBar from '../components/SearchBar';
import Title from '../components/Title';
import CoursesGrid from '../components/CoursesGrid';
import useSearchEffect from '../hooks/use_search_effect';

export default function Home() {
    const [query, setQuery] = useState('');
    const [courses, isLoading] = useSearchEffect('courses', query);
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
