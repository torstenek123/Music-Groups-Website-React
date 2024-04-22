import React, {useState, useEffect} from 'react'
import { Outlet, useParams, useNavigate, useOutletContext } from 'react-router-dom';

import Musicservice from '../services/musicService';
import MusicGroupList from '../components/music-group-list';
import MusicGroupView from '../components/music-group-view';

export function MusicGroupsWebApi(){

    const service = new Musicservice();

    return (

        <div className="container px-4 py-4">
            <Outlet context={service}/>
        </div>
    )

}

export function MusicGroupsWebApiList(){
    const service = useOutletContext();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(null);
    const [serviceData, setServiceData] = useState();

    //pagination requisite
    let { pageNr } = useParams();
    pageNr ??= 0;
    const pageSize = 10;
    const [maxNrPages, setMaxNrPages ] = useState(10);
    console.log("max number of pages is: ", maxNrPages);
    const [currentPage, setCurrentPage] = useState(pageNr);

    
    useEffect(() => {
       async function readWebApi() {
          const data = await service.readFilterAsync(searchTerm, currentPage);
          setServiceData(data);
          setMaxNrPages(Math.ceil(data.dbItemsCount/pageSize))
       }
       readWebApi();
    }, [service, currentPage, searchTerm])

    //clicking on a musicgroup navigates to details
    const onView = (e) => {
        const id = e.currentTarget.dataset.itemid;
        console.log(id);
        navigate(`/albums-webapi/${id}`);
    }
    //clicking on pag nav buttons redirects to the corresponding page
    const onPageChange = (e) => {
        setCurrentPage(e.pageNr);
        console.log("out pageNr: ", e.pageNr);
        navigate(`/albums-webapi/page/${e.pageNr}`);
    }

    const onSearch = (e) => {
        const search = e.search;
        setSearchTerm(search);
        //since i dont want it to display pages outside the scope of the search term, i go back to page 0
        setCurrentPage(0);
        console.log("out search: ", search);
    }

    if (!serviceData) {
        return(
            <div>Waiting for musicgroups...</div>
        )
    }
    // let darkMode = false;
    // if(document.body.classList.contains("bg-dark")) darkMode = true;
    const darkMode = sessionStorage.getItem("darkmode") === "true";
    if (darkMode && document.body){
        document.body.classList.add("bg-dark");
    } 
    return(
        <>
        <MusicGroupList serviceData = {serviceData} onClick = {onView} onPageChange = {onPageChange} 
                   onSearch  = {onSearch} filter = {searchTerm} pageNr = {currentPage} darkMode = {darkMode}
        />
        </>
    ) 
}

export function MusicGroupsWebApiDetails(){
    const service = useOutletContext();
    const navigate = useNavigate();
    const [serviceData, setServiceData] = useState();
    const { id } = useParams();

    useEffect(() => {
        async function readWebApi() {
           const data = await service.readItemAsync(id);
           setServiceData(data);
        }
        readWebApi();
     }, [service, id])

    //going back to listview 
    const onReturn = (e) => {
        navigate("/albums-webapi/");
    }
    //temp message while fetching data
    if(!serviceData) {
        return (
            <div>Waiting for details...</div>
        )
    }
    const darkMode = sessionStorage.getItem("darkmode") === "true";
    if (darkMode && document.body){
        document.body.classList.add("bg-dark");
    } 
    return(
        <>
        <MusicGroupView onReturn = {onReturn} serviceData = {serviceData} darkMode ={darkMode}/>
        </>
    )
}