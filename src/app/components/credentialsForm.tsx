"use client"

import {signIn} from "next-auth/react"
import {useState} from "react"


type CredentialsFormProps = {
    csrfToken?: string;
}

const CredentialsForm = ({csrfToken}: CredentialsFormProps) => {
    const [error, setError] = useState("")

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        const target = e.currentTarget as HTMLFormElement;
        const data = new FormData(target);
    
        const signInResponse = await signIn("credentials",{
            username: data.get("text"),
            password: data.get("password"),
            redirect: false,
        })

        if(signInResponse && !signInResponse.error){
            //do something here
        }else{
            console.log("Error: ", signInResponse)
            setError("Username or password is wrong")
        }

    };

    return( 
        <form
        onSubmit={handlesubmit}>

        </form>
    )
}; export default CredentialsForm;