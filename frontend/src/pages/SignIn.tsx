import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string,
    password: string
}


const SignIn = () => {
    const queryClient = useQueryClient();
    const {showToast}  = useAppContext();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit, 
        formState:{errors}
    } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess:async () => {
            await queryClient.invalidateQueries("validateToken")
            showToast({type:"SUCCESS", message:"Login Sucess"});
            navigate("/")
        },
        onError:(error: Error) => {
            showToast({type:"ERROR", message:error.message});
            
        } 
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data)
    }) 
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
    <h2 className="text-3xl font-bold">Sign In</h2>

    <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input 
            type="email"
            className="border rounded w-full py-1 px-2 font-medium"
            {...register("email", {required:"This feild is required"})}
        />
        {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
            )}
    </label>

    <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input 
            type="password"
            className="border rounded w-full py-1 px-2 font-medium"
            {...register("password", {required:"This feild is required", minLength:{ 
                value : 6,
                message:"password must be atleast 6 character"
            }})}
        />
        {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
            )}
    </label>

    <span className="flex items-center justify-between">
        <span className="text-sm">
            Don't have an account ? <Link to="/register" className="font-bold">Register Here</Link>
        </span>
        <button 
        type="submit" 
        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-400 text-xl"
        >
            Sign In
        </button>
    </span>
</form>
  )
}

export default SignIn