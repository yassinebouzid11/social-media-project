import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { db,auth } from "../config/firebase";
import { addDoc, collection} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export const CreatePostForm=()=>{

    const [user]=useAuthState(auth);

    const schema=yup.object().shape({
        title:yup.string().required("add a title please"),
        description:yup.string().required("add a description please")
    })
    const {register, handleSubmit,watch, formState:{errors}}=useForm({
        resolver:yupResolver(schema),
    });

    const navigate=useNavigate();

    const postsRef=collection(db,"posts");

    const onSubmitFunction=async (data)=>{
        try{
        await addDoc(postsRef,{
            ...data,
            userId:user?.uid,
            username:user?.displayName,
            })
        }
        catch (errors){
            console.error("check this error please:",errors);
        }
        console.log(data);
        console.log(user);
        navigate("/");
    }
    return(
        <div>
            <form onSubmit={handleSubmit(onSubmitFunction)}>
                <input type="text"  placeholder="Title" {...register("title")}/>
                <p>{errors.title?.message}</p>
                <input type="text"  placeholder="description" {...register("description")}/>
                <p>{errors.description?.message}</p>
                <input type="submit" value="Create"/>
            </form>
        </div>

    )
}