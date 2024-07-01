import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypesSection from "./TypesSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

export type HotelFormData = {
    name:string;
    city:string;
    country:string;
    description:string;
    type:string;
    pricePerNight:number;
    starRating:number;
    facilities:string[];
    images:FileList;
    adultCount:number;
    childCount:number;
}

type PropsType = {
  onSave: (hotelFormData:FormData) => void;
  isLoading:boolean
}


const ManageHotelForm = ({onSave, isLoading}:PropsType) => {

    const formMethods = useForm<HotelFormData>();
    const {handleSubmit} = formMethods;

    const onSubmit = handleSubmit((formDataJson:HotelFormData) => {
      console.log(formDataJson);
      const formData = new FormData()
      formData.append('name', formDataJson.name)
      formData.append('city', formDataJson.city)
      formData.append('country', formDataJson.country)
      formData.append('description', formDataJson.description)
      formData.append('type', formDataJson.type)
      formData.append('pricePerNight', formDataJson.pricePerNight.toString())
      formData.append('starRating', formDataJson.starRating.toString())
      formData.append('adultCount', formDataJson.adultCount.toString())
      formData.append('childCount', formDataJson.childCount.toString())

      formDataJson.facilities.forEach((facility, i) => {
        formData.append(`facilities[${i}]`, facility)
      })

      Array.from(formDataJson.images).forEach((imageFile) => {
        formData.append(`imageFiles`, imageFile)
      })
      
      onSave(formData)
    })

  return (
    <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
            <DetailsSection />
            <TypesSection />
            <FacilitiesSection />
            <GuestsSection />
            <ImagesSection />
            <span className="flex justify-end">
              <button 
              type="submit" 
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-400 disabled:bg-gray-500 disabled:cursor-not-allowed"
              disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Save"}
              </button>

            </span>
        </form>
    </FormProvider>
  )
}

export default ManageHotelForm