"use client"

import {getSession, signIn} from "next-auth/react"
import {useEffect, useState} from "react"
import { addUser } from "@/services/userService"
import { useUser } from "@/services/userContext"
// eslint-disable-next-line camelcase
import { Baloo_2 } from "next/font/google";
const baloo2 = Baloo_2({ subsets: ["latin"] });


type CredentialsFormProps = {
    csrfToken?: string;
    onClose: () => void;
}

// eslint-disable-next-line
const CredentialsForm = ({csrfToken, onClose}: CredentialsFormProps) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonShow, setButtonShow] = useState(false);
  // eslint-disable-next-line
  const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  const {setUser} = useUser();

  useEffect(() => {
    setButtonShow(!(email.length > 0 && password.length > 0));
  }, [email, password]);

  // handles login button behavior
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget as HTMLFormElement;
    const data = new FormData(target);
    
    const signInResponse = await signIn("credentials", {
      email: data.get("email") as string,
      password: data.get("password") as string,
      redirect: false,
    });
    
    if (signInResponse && !signInResponse.error) {
      console.log("Success: ", signInResponse);
      getSession().then((session) => {
        if (session && session.user && session.user.name && session.user.email) {
          setUser({ email: session.user.email, username: session.user.name });
        }
      });
    } else {
      console.log("Error: ", signInResponse);
      setError("Email or password is wrong");
    }
  }

  // closes the modal and brings back to GameModeCard
  const handleGuest = () =>{
    onClose();
  }

  //handles register
  const handleRegister = () =>{
    if (!regexp.test(email)) {
      setError("Invalid email");
      return;
    }
    if (username.length < 1) {
      setError("Please enter a username");
      return;
    }
    addUser(email, username, password).then(() => {
      onClose();
    }).catch(() => {
      setError("User already exists");
    });
  }

  return( 
    <div className={`flex h-full w-full justify-left items-left ${baloo2.className}`}>
      <div className="flex justify-between w-full m-3">
        <form onSubmit={handleSubmit} className="flex flex-col items-left w-52">
          <div className="mb-4">
            <label htmlFor="username" className="mr-2 text-lg w-48">Email: </label>
            <input
              type="text"
              id="email"
              name="email"
              className="border border-gray-800 px-4 py-2 text-lg"
              value={email}
              placeholder={"example@email.com"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="mr-2 text-lg w-48">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              className="border border-gray-800 px-4 py-2 text-lg"
              value={username}
              placeholder={"Only for sign-up"}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="mr-2 text-lg w-48">Password: </label>
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
            {error && <div className={"text-app-red"}>{error}</div>}
            <div className={"flex items-center"}>
              <button disabled={buttonShow} type="submit"
                className="bg-app-yellow text-app-gray px-2 py-1 rounded-xl mx-1 w-32 h-8 border transition hover:scale-105 shadow">
                Login
              </button>
              <p className="m-4 text-lg"> or </p>
              <button
                type="button"
                className="bg-app-yellow text-app-gray px-2 py-1 rounded-xl mx-1 w-32 h-8 border transition hover:scale-105 shadow"
                onClick={handleRegister}>
                Sign Up
              </button>
            </div>
          </div>
        </form>
        <div className="flex flex-col ml-10" style={{background: '#879CB9'}}>
          <div className="flex flex-col m-2 ">
            <div className="text-center text-white">
              <p className="m-4 text-lg">Don't have an account?</p>
              <button
                className="bg-app-yellow text-app-gray text-xl px-2 py-1 rounded-xl mx-1 w-48 border transition hover:scale-105 shadow"
                onClick={handleGuest}>
                                    Continue as Guest
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );

};

export default CredentialsForm;