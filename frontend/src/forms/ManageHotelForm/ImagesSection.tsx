import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"


const ImagesSection = () => {
    const {register, formState:{errors}} = useFormContext<HotelFormData>()

  return (
    <div>
        <h2 className="text-2xl font-bold mb-3">Images</h2>
        <div className="border rounded p-4 flex flex-col gap-4">
            <input 
            type="file"
            multiple
            accept="image/*"
            className="w-full text-gray-700 font-normal"
            {...register('images', {
               validate: (imageFile) => {
                    const totalLength = imageFile.length;
                    if(totalLength === 0) {
                        return "Atleast one image is required"
                    }
                    if(totalLength > 6) {
                        return "You cannot upload image more than 5"
                    }
                    return true;
               }
            })}
            />
        </div>
            {errors.images && (
                <span className="text-red-500">{errors.images.message}</span>
            )}
    </div>
  )
}

export default ImagesSection