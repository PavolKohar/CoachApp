import { useParams } from "react-router-dom";
import TrainingSettingsForm from "../../components/users/TrainingSettingsForm";
import TrainingSettingsList from "../../components/TrainingSettingsList";
import { useState } from "react";
import { useEffect } from "react";
import { getUserById } from "../../api/auth";
import { getAllTrainingSettingsForUser } from "../../api/users";
import { useNavigate } from "react-router-dom";



function UserEditPage (){

    const {userId} = useParams();
    const [user,setUser] = useState(null)
    const [settings,setSettings] = useState([])
    const [successMessage, setSuccessMessage] = useState(""); 
    const navigate = useNavigate();


   
        const fetchSettings = async () => {
            try {
                const data = await getAllTrainingSettingsForUser(userId);
                const userData = await getUserById(userId,localStorage.getItem("token"));
                console.log("Setts: ", data);
                console.log("user: ", userData);
                setUser(userData)
                setSettings(data)
            } catch (error) {

            if(error.response?.status === 403){
             navigate("/forbidden")
          }
            if(error.response?.status === 404){
              navigate("/not-found")
          } 
                console.error("Error fetching data: " ,error)
            }
        };



    useEffect(()=>{
        fetchSettings();

    },[userId])


        if (!user && !settings) {
        return <div className="spinner-grow spinner-grow-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
    }




    return(
        <>
            <div className="container py-4">
                 {successMessage && (
        <div className="alert alert-success text-center" role="alert">
          {successMessage}
        </div>
      )}
            <div className="row">
                {/* LEFT COLUMN - LIST */}
                <div className="col-lg-4 mb-4">
                
                    
                    
                    <TrainingSettingsList setts={settings} />
                    
             
                </div>

                {/* RIGHT COLUMN - FORM */}
                <div className="col-lg-8 mb-4">
                <div className="card shadow-sm h-100">
                    <div className="card-body">
                   
                    <TrainingSettingsForm userId={userId} 
                                    onSuccess={() => {
                  fetchSettings();                  // ⬅️ znova načítaj zoznam
                  setSuccessMessage("Training setting added successfully!"); // ⬅️ zobraz správu
                  setTimeout(() => setSuccessMessage(""), 3000); // ⬅️ automaticky skry po 3s
                }} />
                    </div>
                </div>
                </div>
            </div>
            </div>

        
        
        
        
        </>
    )

}

export default UserEditPage;