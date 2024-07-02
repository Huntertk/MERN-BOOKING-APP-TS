import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

type HotelType = {
    _id:string;
    userId:string;
    name:string;
    city:string;
    country:string;
    description:string;
    type:string;
    adultCount:number;
    childCount:number;
    facilities:string[];
    pricePerNight:number;
    starRating:number;
    imageUrls:string[];
    lastUpdated:Date;
}

export const register = async (formData:RegisterFormData) => {
    
    const response = await fetch(`${API_BASE_URL}/api/users/register`,{
        method:"POST",
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
    })

    const responseBody = await response.json();
    if(!response.ok){
        throw new Error(responseBody.message);
    }
}

export const signIn = async (formData:SignInFormData) => {
    
    const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
        method:"POST",
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(formData)
    })

    const responseBody = await response.json();
    if(!response.ok){
        throw new Error(responseBody.message);
    }
}

export const validateToken = async () => {
     const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials:'include'
     })

     if(!response.ok){
        throw new Error("Token Invalid")
     }
     return await response.json()
}


export const logout = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method:"POST",
        credentials:'include',
    })

    if(!response.ok){
       throw new Error("Error during sign out")
    }
    return await response.json()
}

export const addMyHotel = async (hotelFormData:FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotel`, {
        method:"POST",
        credentials:"include",
        body:hotelFormData,
    });
    if(!response.ok){
        throw new Error("Failed to add hotel")
    }

    return await response.json();
}

export const fetchMyHotels = async ():Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotel`, {
        credentials:"include",
    });
    if(!response.ok){
        throw new Error("Failed to fetch hotels")
    }

    return response.json();
}