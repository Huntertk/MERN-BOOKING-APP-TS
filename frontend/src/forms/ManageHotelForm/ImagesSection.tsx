import { useFormContext } from "react-hook-form";
import { HotelTypeForm } from "./ManageHotelForm";

const ImagesSection = () => {
    const {register, formState:{errors}} = useFormContext<HotelTypeForm>();
  return (
    <div>
        <h2 className="text-2xl font-bold mb-3">Images</h2>
        <div className="border rounded p-4 flex flex-col gap-4">
            <input type="file" 
                multiple
                accept="image/*"
                className="w-full text-gray-700 font-normal"
                {...register("imageFiles", {
                    validate:(imageFiles) => {
                        const totalLength = imageFiles.length;
                        if(totalLength === 0){
                            return "Atleast one should be added"
                        }
                        if(totalLength > 6){
                            return "You can only upload 6 images"
                        }
                        return true
                    }
                })}
            />
        </div>
        {errors.imageFiles && (
            <span className="text-red-500 text-sm font-bold">
                {errors.imageFiles.message}
            </span>
        )}
    </div>
  )
}

export default ImagesSection