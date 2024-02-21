import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelTypeForm } from "./ManageHotelForm";

const FacilitiesSection = () => {
    const {register, formState:{errors}} = useFormContext<HotelTypeForm>();
  return (
    <div>
        <h2 className="text-2xl font-bold mb-3">Facilities</h2>
        <div className="grid grid-cols-5 gap-3">
            {
                hotelFacilities.map((facility, i) => (
                    <label 
                    key={i}
                    className="text-sm flex gap-1 text-gray-700"
                    >
                        <input 
                        type="checkbox"
                        value={facility}
                        {
                            ...register("facilities", {
                                validate:(facilities) => {
                                    if(facilities && facilities.length > 0){
                                        return true 
                                    } else {
                                        return "Atleast one facilities is required"
                                    }
                                }
                            })
                        }
                        />
                        {facility}
                    </label>
                ))
            }
        </div>
        {errors.facilities && (
            <span className="text-red-500 font-bold text-sm">
                {errors.facilities.message}
            </span>
        )}
    </div>
  )
}

export default FacilitiesSection