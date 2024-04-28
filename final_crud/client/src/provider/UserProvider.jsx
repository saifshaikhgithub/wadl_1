import { useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/getuser')
            .then(response => setUsers(response.data))
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const addUser = (user) => {
        setUsers([...users, user]); // Spread the existing users array and add the new user
    }
    console.log(users);
    return (
        <UserContext.Provider value={{ users, addUser }}>
            {children}
        </UserContext.Provider>
    );
};
