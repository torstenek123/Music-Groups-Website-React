import React from 'react'

export default function MusicGroupView(props) { 
    const musicGroup = props.serviceData || [];
    const onReturn = (e) => {
        props.onReturn(e);
    }
    const returnColor = (props.darkMode) ? "btn btn-outline-warning" : "btn btn-info";

  return (
    <>
    <h2 class="pb-2 border-bottom">View details of a music group</h2>
    <div className="row row-cols-1 row-cols-lg-4 align-items-stretch g-4 py-5">
        <div className="col-md-7 col-lg-10">
            <form className="needs-validation" novalidate>

                <div className="row g-3">
                    <div className="col-sm-6">
                        <label for="groupName" className="form-label">Group Name</label>
                        <input type="text" className="form-control groupName" value={musicGroup.name} readonly ></input>
                    </div>

                    <div className="col-sm-6">
                        <label for="genre" className="form-label">Genre</label>
                        <input type="text" className="form-control genre"value={musicGroup.strGenre} readonly></input>
                    </div>

                    <div className="col-sm-6">
                    </div>
                    <div className="col-sm-6">
                        <label for="established" className="form-label">Established Year</label>
                        <input type="text" className="form-control established" value={musicGroup.establishedYear} readonly></input>
                    </div>
                </div>

                <div className="row g-1">
                    <h3 className="pb-2">Artists</h3>

                    <div className="row mb-2 text-center">
                        <div className="col-md-12 themed-grid-head-col">Name</div>
                    </div>

                {musicGroup.artists.map((artist => 
                    <div className="row mb-2 text-center">
                        <div className="col-md-12 themed-grid-col artists">{ `${artist.firstName} ${artist.lastName}`}</div>
                    </div>
                ))}
                </div>

                <div className="row g-1">
                <h3 className="pb-2">Albums</h3>
    
                <div className="row mb-2 text-center">
                    <div className="col-md-10 themed-grid-head-col">Name</div>
                    <div className="col-md-2 themed-grid-head-col">Year</div>
                </div>

                {musicGroup.albums.map((album) => (
                    <div className="row mb-2 text-center" >
                        <div className="col-md-10 themed-grid-col albums" >{album.name}</div>
                        <div className="col-md-2 themed-grid-col releaseYear" >{album.releaseYear}</div>
                    </div>
                ))}

                </div>                      
            </form>
        </div>
    </div>

    <nav aria-label="Return to music groups list button">
        <button className={returnColor} onClick={onReturn} aria-label="Previous">
        <span aria-hidden="true">Return</span>
        </button>
    </nav>

    </>
  )
}
