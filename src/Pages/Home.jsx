import axios from "axios"
import { useEffect, useState } from "react";
import List from "../components/List";
import Pagination from "../components/Pagination";
import Select from 'react-select';

const Home = () => {
    
    //all the categories
    const [categories, setCategories] = useState([]);

    //selected categories
    const [selected, setSelected] = useState([]);

    //all the posts
    const [data, setData] = useState([]);

    //user is currently on this page
    const [currentPage, setCurrentPage] = useState(1);

    //number of posts displayed on a page
    const [recordsPerPage] = useState(10);
    const [showRecords, setShowRecords] = useState([]);

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    /*Posts displayed on the current page, slice(a,b) returns posts from
    index a to b, if no posts selectioned all posts are displayed*/
    let currentRecords;
    if(showRecords.length > 0){
        currentRecords = showRecords.slice(indexOfFirstRecord, indexOfLastRecord);
    }
    else { currentRecords = data?.slice(indexOfFirstRecord, indexOfLastRecord);}
    
    
    //ceil will put the remaining posts on a different page if the result is not even
    let nPages;
    if(showRecords.length > 0){
     nPages = Math.ceil(showRecords.length / recordsPerPage);
    }
    else { nPages = Math.ceil(data.length / recordsPerPage); }

    const getData = () => {
        try {
            axios.get('/api/posts').then((res) => {
                setData(res.data.posts);
            })}
        catch (error) {
            console.log(error)
        }
    }

    const getCategories = () => {
        var listCategories = []
        for (const post of data){
            for (const category of post.categories){
                //nbApparition permits to check that a category is not pushed in the list twice 
                let nbApparition = 0; 
                for(var i = 0; i<listCategories.length; i++){
                    if (listCategories[i] == category.name){
                        nbApparition++
                    }
                }
                if(nbApparition !== 1){
                    listCategories.push(category.name);
                }
            }
        }
        for (var j = 0; j<listCategories.length; j++){
            let categ = {label: listCategories[j], value: listCategories[j]}
            setCategories((prevState) => ([...prevState, categ]))
        }
    }


    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if(data){
            getCategories()
        }
    }, [data])

    useEffect(() => {
        getFilteredPosts()
    }, [selected])

    const getFilteredPosts = () => {
        function filter(post) {
            //count the number of categories of the post that are in the selected categories
            let catOk = 0;
            for (let x = 0; x < post.categories.length; x++) {
                for( let y = 0; y < selected.length; y++ ) {
                    const a = selected[y].label
                    const b = post.categories[x].name
                    if(a===b){
                        catOk++
                    }
                }
            }
            //put in currentRecords the posts in which minimum 1 category is selected
            return catOk > 0;
        }
        currentRecords = data?.filter(filter);
        setShowRecords(currentRecords);
    }
    
    return (
        <div className="home-container">
            <h2>All Posts</h2>
            <Select className="select"
                value={selected}
                onChange={setSelected}
                options={categories}
                isMulti={true}
                isSearchable={true}
            />
            <List posts={currentRecords}></List>
            <footer className="bg-light text-center text-lg-start">
                <div className="text-center p-3">
                    <Pagination
                        nPages = { nPages }
                        currentPage = { currentPage } 
                        setCurrentPage = { setCurrentPage }
                    />
                </div>
            </footer>
        </div>
    );
}

export default Home;