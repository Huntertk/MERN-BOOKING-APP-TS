import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
import {HotelSearchResponse} from '../../backend/src/shared/types'


type HotelType = {
    _id:string;
    userId:string;
    name:string;
    city:string;
    country:string;
    description:string;
    type:string;
    adultCount: number;
    childCount:number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls:string[];
    lastUpdated: Date;
}

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

export const fetchMyHotel = async () : Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials:"include"
    });

    if(!response.ok){
        throw new Error("Error fetching hotels")
    }

    return response.json();
}

export type SearchParams = {
    destination?:string;
    checkIn?:string;
    checkOut?:string;
    adultCount?:string;
    childCount?:string;
    page?:string
}

export const searchHotel = async (searchParams:SearchParams) : Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "")
    queryParams.append("checkIn", searchParams.checkIn || "")
    queryParams.append("checkOut", searchParams.checkOut || "")
    queryParams.append("adultCount", searchParams.adultCount || "")
    queryParams.append("childCount", searchParams.childCount || "")
    queryParams.append("page", searchParams.page || "")

    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`)
    if(!response.ok){
        throw new Error("Error fetching hotels")
    }
    
    return response.json();

}