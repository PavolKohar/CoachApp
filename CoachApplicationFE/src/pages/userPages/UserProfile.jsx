import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";



function UserProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/${userId}`)
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the user data!", error);
            });
    }, [userId]);

    if (!user) {
        return <div>Loading...</div>;
    }



    return (
        <div className="container">
      <h2 className="mt-4 text-primary">Welcome, {user.username}!</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phoneNumber}</p>
      {/* Doplníš ďalšie polia podľa potreby */}
    </div>
  );
}

export default UserProfile;