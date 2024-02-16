import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from '../api-client';

export type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}

const Register = () => {
    const {
        register, 
        watch, 
        handleSubmit, 
        formState:{errors}
    } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess:() => {
            console.log("Registration Success");
        },
        onError:(error: Error) => {
            console.log(error.message);
            
        } 
    });
    const onSubmit = handleSubmit((data) => {
        console.log(data);
        mutation.mutate(data);
    })
    
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <div className="flex flex-col gap-5 md:flex-row">
            <label className="text-gray-700 text-sm font-bold flex-1">
                First Name
                <input 
                    type="text"
                    className="border rounded w-full py-1 px-2 font-medium "
                    {...register("firstName", {required:"This feild is required"})}
                />
                {errors.firstName && (
                    <span className="text-red-500">{errors.firstName.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Last Name
                <input 
                    type="text"
                    className="border rounded w-full py-1 px-2 font-medium"
                    {...register("lastName", {required:"This feild is required"})}
                />
                {errors.lastName && (
                    <span className="text-red-500">{errors.lastName.message}</span>
                )}
            </label>
        </div>
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

        <label className="text-gray-700 text-sm font-bold flex-1">
            Confirm Password
            <input 
                type="password"
                className="border rounded w-full py-1 px-2 font-medium"
                {...register("confirmPassword", {
                    validate:(val) => {
                        if(!val){
                            return "This feild is required"
                        } else if(watch("password") !== val){
                            return "Password not matched"
                        }
                        
                    }
                })}
            />
            {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
        </label>
        <span>
            <button 
            type="submit" 
            className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-400 text-xl"
            >
                Create Account
            </button>
        </span>
    </form>
  )
}

export default Register