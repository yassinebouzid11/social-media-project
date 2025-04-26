import {auth,provider} from "../config/firebase"
import {signInWithPopup} from "firebase/auth"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login=()=>{
    const navigate = useNavigate()
    const [isSigningIn,setIsSigningIn]=useState(false);

    const signInWithGoogle= async ()=>{
            if(isSigningIn)return;

            setIsSigningIn(true);
            
        try{ 

            await auth.signOut();

            provider.setCustomParameters({
                prompt:'select_account'
            });
            const result=await signInWithPopup(auth,provider);
            console.log(result);
            navigate("/");

        } catch (error) {
            console.error("Error during sign-in:", error);
        } finally {
            setIsSigningIn(false); // Re-enable button after process is complete
        }
    }

    return(
        <div>
            <p>Sign in with google</p>
            <button onClick={signInWithGoogle} disabled={isSigningIn}>
                {isSigningIn ? 'Signing in...' : 'Sign in with Google'}
            </button>
        </div>
    );
}