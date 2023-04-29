import '../App.css';
import {useState} from 'react';
import NavBar from '../navigation/NavBar';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';



function Submission_Portal(){
    const location = useLocation();
    const posting = location.state?.posting;
    const className = location.state?.className;
    const sectionID = location.state?.sectionID;
    //react hook to change the state of the file uploads
    const [fileUpload, setFileUpload] = useState(null);
   
    //function to add files
    async function uploadFile() {
        if(fileUpload == null) return; //If no file is submitted bail out.
        else{
            alert('file uploaded!')
            let formData = new FormData();
            const ctrl = new AbortController();
            setTimeout(() => ctrl.abort(), 5000);
            formData.append("file", fileUpload); //Tag our file
            formData.append("Class", className);
            formData.append("Section", sectionID);
            formData.append("Job", posting.job_title);
            console.log(fileUpload)
            try
            {
                //Post to the backend, where it is listening.
                let r = await fetch(`http://localhost:5000/applicants`, 
                {method: "POST", body: formData, signal: ctrl.signal});
                console.log("HTTP response code",r.status)
            }
            catch(e)
            {
                console.log("We messed up");
            }
        }
    };

    return(
        <div className='App'>
            <div>
                <NavBar/>
            </div>
            <h1>{`Class: `+ className + `, Section: ` + sectionID}</h1>
            <h2>{`Job Title: `+posting.job_title}</h2>
            <div>
                <input type="file" onChange={(event) => {setFileUpload(event.target.files[0])}}/>
                <button onClick={uploadFile}>Upload File</button> 

            </div>

        </div>
       
    )

}

export default Submission_Portal;