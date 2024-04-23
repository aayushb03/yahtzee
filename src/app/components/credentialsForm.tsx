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

/**
 * Handles the form on the modal that handles taking in credentials as well as verifying them and throwing errors if incorrect or empty
 * @param CredentialsFormProps
 * @returns CredentialsForm
 */
// eslint-disable-next-line
const CredentialsForm = ({csrfToken, onClose}: CredentialsFormProps) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buttonShow, setButtonShow] = useState(false);
  // eslint-disable-next-line
  const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  const [isSignUp, setSignUp] = useState(false)

  const {setUser} = useUser();

  useEffect(() => {
    setButtonShow(!(email.length > 0 && password.length > 0));
  }, [email, password]);

  useEffect(() => {
    setError("");
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }, [isSignUp]);

  /**
   * Handles the submission of the form
   * @param e
   */
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
          setUser({ email: session.user.email, username: session.user.name});
        }
      });
    } else {
      console.log("Error: ", signInResponse);
      setError("Email or password is wrong");
    }
  }

  /**
   * Handles the guest login
   * @returns void 
   */
  const handleGuest = () =>{
    onClose();
  }

  /**
   * Handles the registration of a new user
   * @returns void
   */
  const handleRegister = () =>{
    setSignUp(true)
    if (!regexp.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    if (username.length < 1) {
      setError("Please enter a username");
      return;
    }
    if (password.length < 8) {
      setError("Please enter a password with at least 8 characters");
      return;
    }
    if (password != confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    addUser(email, username, password).then(() => {
      signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      }).then(() => {
        getSession().then((session) => {
          if (session && session.user && session.user.name && session.user.email) {
            setUser({ email: session.user.email, username: session.user.name });
          }
        });
      }
      );
    }).catch(() => {
      setError("Email or Username already exists");
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
          {isSignUp ?
            <div className="mb-4">
              <label htmlFor="username" className="mr-2 text-lg w-48">Username: </label>
              <input
                type="text"
                id="username"
                name="username"
                className="border border-gray-800 px-4 py-2 text-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div> : <></>}
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
          {isSignUp &&
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="mr-2 text-lg w-48"> Confirm Password: </label>
            <input
              type="password"
              className="border border-gray-800 px-4 py-2 text-lg"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          }
          <div className="text-center">
            {error && <div className={"text-app-red pb-2"}>{error}</div>}
            <div className={"flex items-center justify-center"}>
              {!isSignUp &&
                (<button disabled={buttonShow} type="submit"
                  className="bg-app-yellow text-app-gray px-2 py-1 rounded-xl mx-1 w-32 h-8 border transition hover:scale-105 shadow">
                  Login
                </button>)
              }
              {isSignUp &&
                (
                  <button
                    type="button"
                    className="bg-app-yellow text-app-gray px-2 py-1 rounded-xl mx-1 w-32 h-8 border transition hover:scale-105 shadow"
                    onClick={handleRegister}>
                    Sign Up
                  </button>
                )
              }
            </div>
          </div>
        </form>
        <div className="flex flex-col ml-10 justify-center items-center" style={{background: '#879CB9'}}>
          <div className="flex flex-col m-2 ">
            <div className="text-center text-white">
              {!isSignUp &&
                (<button
                  className="bg-app-yellow text-app-gray text-xl px-2 py-1 rounded-xl mx-1 w-48 border transition hover:scale-105 shadow"
                  onClick={() => setSignUp(true)}>
                Sign Up
                </button>)}
              { isSignUp &&
                (<button
                  className="bg-app-yellow text-app-gray text-xl px-2 py-1 rounded-xl mx-1 w-48 border transition hover:scale-105 shadow"
                  onClick={() => setSignUp(false)}>
                  Login
                </button>)}
              <p className="m-4 text-lg"> or </p>
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

