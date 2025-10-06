import { useParams } from "react-router-dom";
import TrainingSettingsForm from "../../components/users/TrainingSettingsForm";



function UserEditPage (){

    const {userId} = useParams();



    return(
        <>
        <TrainingSettingsForm userId={userId}/>
        
        
        
        
        </>
    )

}

export default UserEditPage;