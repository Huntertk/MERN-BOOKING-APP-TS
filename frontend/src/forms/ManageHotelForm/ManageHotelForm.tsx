import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";

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
        <form>
          <DetailsSection />
        </form>
    </FormProvider>
  )
}

export default ManageHotelForm