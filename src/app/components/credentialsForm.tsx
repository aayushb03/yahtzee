"use client"

import {signIn} from "next-auth/react"
import {useEffect, useState} from "react"
import { getAllUsers, addUser } from "@/services/userService"


type CredentialsFormProps = {
    csrfToken?: string;
    onClose: () => void;
}

const CredentialsForm = ({csrfToken, onClose}: CredentialsFormProps) => {
    const [error, setError] = useState("")
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [buttonShow, setButtonShow] = useState(false)

    useEffect(() => {
        setButtonShow(!(userName.length > 0 && password.length > 0));
      }, [userName, password]);

    // handles login button behavior
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLFormElement;
        const data = new FormData(target);
    
        const signInResponse = await signIn("credentials", {
          username: data.get("username") as string,
          password: data.get("password") as string,
          redirect: false,
        });
    
        if (signInResponse && !signInResponse.error) {
          // do something here
        } else {
          console.log("Error: ", signInResponse);
          setError("Username or password is wrong");
        }
    }

    // closes the modal and brings back to GameModeCard
    const handleGuest = () =>{
       onClose()
    }

    //handles register
    const handleRegister = () =>{
        // when registering setitng just an empty string as pastGameScore
        addUser(userName, password, "")
        // add in name prop so name is automatically saved? 
        onClose()
    }

    return( 
        <div className="flex h-full w-full justify-left items-left">
                <div className="flex justify-between w-full m-3">
                    <form onSubmit={handleSubmit} className="flex flex-col items-left">
                        <div className="mb-8">
                            <label htmlFor="username" className="mr-2 text-lg">Username: </label>
                            <input
                            type="text"
                            id="username"
                            name="username"
                            className="border border-gray-800 px-4 py-2 text-lg"
                            value={userName}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-8">
                            <label htmlFor="password" className="mr-2 text-lg">Password: </label>
                            <input
                            type="password"
                            id="password"
                            name="password"
                            className="border border-gray-800 px-4 py-2 text-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="text-center">
                            {error && <div style={{ color: "red", fontSize: "1.5rem" }}>{error}</div>}
                            <button disabled={buttonShow} type="submit" className="bg-app-yellow text-app-gray text-xl px-2 py-1 rounded-xl mx-1 w-48 border transition hover:scale-105 shadow">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-col ml-10" style={{background: '#879CB9'}}>
                        <div className="flex flex-col m-2 ">
                            <div className="text-center text-white">
                                <p className="m-4 text-lg">Don't have an accont?</p>
                                <button className="bg-app-yellow text-app-gray text-xl px-2 py-1 rounded-xl mx-1 w-48 border transition hover:scale-105 shadow"
                                onClick={handleGuest}>
                                    Continue as Guest
                                </button>
                                <p className="m-4 text-lg"> or </p>
                                <button className="bg-app-yellow text-app-gray text-xl px-2 py-1 rounded-xl m-1 w-48 border transition hover:scale-105 shadow"
                                onClick={handleRegister}>
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>

  );

}; export default CredentialsForm;