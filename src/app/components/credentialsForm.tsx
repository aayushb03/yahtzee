"use client"

import {signIn} from "next-auth/react"
import {useState} from "react"


type CredentialsFormProps = {
    csrfToken?: string;
}

const CredentialsForm = ({csrfToken}: CredentialsFormProps) => {
    const [error, setError] = useState("")

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

    return( 
        <div className="flex h-full w-full justify-center items-center mb-40">
                <div className="flex justify-around">
                    <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="mb-4">
                            <label htmlFor="username" className="mr-2 text-lg">Username: </label>
                            <input
                            type="text"
                            id="username"
                            name="username"
                            className="border border-gray-800 px-2 py-1 text-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="mr-2 text-lg">Password: </label>
                            <input
                            type="password"
                            id="password"
                            name="password"
                            className="border border-gray-800 px-2 py-1 text-lg"
                            />
                        </div>
                        <div>
                            {error && <div style={{ color: "red", fontSize: "1.5rem" }}>{error}</div>}
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 mx-auto">
                            Sign In
                            </button>
                        </div>
                    </form>
                </div>
        </div>

  );

}; export default CredentialsForm;