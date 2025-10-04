import { useState } from "react";
import { useParams } from "react-router-dom";


function EditClientPage (){


    return(
        <>
            <div className="container mt-3">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="text-center flex-grow-1">Edit Page</h1>

                <div className="dropdown">
                <button
                    className="btn btn-success dropdown-toggle"
                    type="button"
                    id="dropdownMenuDark"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    ⚙️
                </button>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
                    <li><a className="dropdown-item" href="#">Statistic</a></li>
                    <li><a className="dropdown-item" href="#">Create training plan</a></li>
                    <li><a className="dropdown-item" href="#">Deactivate</a></li>
                    <li><a className="dropdown-item" href="#">Remove Client</a></li>
                </ul>
                </div>
            </div>
            <hr />
            </div>
        
        
        
        
        </>
    )
}


export default EditClientPage;