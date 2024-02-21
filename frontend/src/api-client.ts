import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method:"POST",
        headers:{
            'Content-Type' : 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(formData)
    })
    const responseBody = await response.json();
    if(!response.ok){
        throw new Error(responseBody.messgae)
    }
    return responseBody;
}

export const signIn = async (formData:SignInFormData) =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method:"POST",
        headers:{
            'Content-Type' : 'application/json'
        },
        credentials: "include",
        body: JSON.stringify(formData)
    })
    const body = await response.json();
    if(!response.ok){
        throw new Error(body.messgae)
    }
    return body;
}


export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include"
    })
    if(!response.ok){
        throw new Error("token Invalid ")
    }
    return response.json()
}


export const signOut = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method:"POST",
        credentials: "include"
    })
    if(!response.ok){
        throw new Error("token Invalid ")
    }
    return response.json()
}


export const addMyHotel = async (hotelFormData:FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method:"POST",
        credentials: "include",
        body:hotelFormData
    });

    if(!response.ok){
        throw new Error("Failed to add hotel")
    }

    return response.json();
}