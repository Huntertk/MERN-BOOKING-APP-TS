import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";

export type HotelTypeForm = {
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
    imageUrls: FileList;
}


const ManageHotelForm = () => {
    const formMethods = useForm<HotelTypeForm>();
  return (
    <FormProvider {...formMethods}>
        <form className="flex flex-col gap-10">
          <DetailsSection />
          <TypeSection />
          <FacilitiesSection />
          <GuestSection />
        </form>
    </FormProvider>
  )
}

export default ManageHotelForm