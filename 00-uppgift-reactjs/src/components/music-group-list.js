import React, {useState} from 'react'

export default function MusicGroupList(props) {

    const musicGroups = props.serviceData?.pageItems || [];

    //state is updated in <input> element
    const [searchInput, setSearchInput] = useState();

    //fills array with numbers from 0 - number of pages, the array is used to map the navigation buttons
    const itemCount = props.serviceData?.dbItemsCount || 0;
    const nrOfButtons = Math.ceil(itemCount/10);
    const nrOfButtonsArr = [];
    for (let i = 0; i < nrOfButtons; i++) {
        nrOfButtonsArr.push(i);
    }

    //string will be empty if props.filter is: empty, null, undefined or just whitespace ; it wont display "matching blablabla" if no "acceptable" search filter is used 
    let filter = props.filter;
    if(filter) filter = filter.trim();
    const searchFilter = (filter !== null && filter !== '' && filter !== undefined) ? `matching the search criteria "${filter}"` : '';
    
    //darkmode or lightmode buttons
    const btnDetailsColor = (props.darkMode) ? "btn btn-outline-info" : "btn btn-outline-secondary";
    const btnSearchColor = (props.darkMode) ? "btn btn-outline-warning" : "btn btn-success";
    const btnResetColor = (props.darkMode) ? "btn btn-outline-light" : "btn btn-danger";
    

    const onSearch = (e)=>{
        e.preventDefault();
        if(searchInput) e.search = searchInput.trim();
        console.log("in search: ", e.search);
        props.onSearch(e);
    }

    const onReset = (e)=>{
        e.preventDefault();
        setSearchInput("");
        props.onSearch(e);
        
    }

    const onPageChange = (e)=>{
        e.pageNr = e.target.dataset.id;
        console.log("in pageNr: ", e.pageNr,);
        props.onPageChange(e);
    }


  return (
    <>
    <main>
        <h2 className="pb-2 border-bottom">List of Music bands</h2>
        <div className="row mb-1 text-center">
            <div className="col-md-8 ">
                <form className="d-flex mt-3 mt-lg-0" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
                            value={searchInput} onChange={ (e) => setSearchInput(e.target.value) } data-search>
                    </input>
                    <button className={btnSearchColor} onClick={onSearch}>Search</button>
                    <div>&nbsp;&nbsp;&nbsp;</div>
                <button className= {btnResetColor} onClick={onReset} >Reset</button>
                </form>
                <p className="col-sm-6">Database contains {itemCount} music groups {searchFilter}</p>
            </div>
        </div>

        <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
            <div className="col-md-7 col-lg-10">
                <div className="row mb-2 text-center">
                <div className="col-md-10 themed-grid-head-col">Group Name</div>
                </div>
                <div className="row mb-2 text-center">
                {musicGroups.map((group) => (
                    <>
                    <div className="col-md-8 themed-grid-col link-color" data-itemid = {group.musicGroupId} onClick={props.onClick}>
                        <div>
                            {group.name}
                        </div>
                    </div>
                    <div className='col-md-2 themed-grid-col' data-itemid = {group.musicGroupId} onClick={props.onClick}>
                        <button class={btnDetailsColor}>Details</button>
                    </div>
                    </>            
                ))}
                </div>
            </div>
        </div>

        <nav aria-label="Pagination buttons">
            <ul className="pagination">
            {nrOfButtonsArr.map(nrOfButton => (
                    <li className="page-item"><button className="page-link" onClick={onPageChange} data-id={nrOfButton}> {nrOfButton} </button></li>
            ))}
            </ul>
        </nav>
    </main>
    </>
  )
}
