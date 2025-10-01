import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getUserById } from "../../api/auth";
import axios from "axios";



function UserProfile() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const data = await getUserById(userId, token);
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
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