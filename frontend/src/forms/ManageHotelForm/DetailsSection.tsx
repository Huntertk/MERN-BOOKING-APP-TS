import { useFormContext } from "react-hook-form"
import { HotelTypeForm } from "./ManageHotelForm"

const DetailsSection = () => {
    const {register,formState:{errors}} = useFormContext<HotelTypeForm>()
  return (
    <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
        <label className="text-gray-700 text-sm font-bold flex-1">
            Name
            <input 
                type="text"
                className="border rounded w-full py-1 px-2 font-medium "
                {...register("name", {required:"This feild is required"})}
            />
            {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
            )}
        </label>
        <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
            City
            <input 
                type="text"
                className="border rounded w-full py-1 px-2 font-medium "
                {...register("city", {required:"This feild is required"})}
            />
            {errors.city && (
                <span className="text-red-500">{errors.city.message}</span>
            )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
            Country
            <input 
                type="text"
                className="border rounded w-full py-1 px-2 font-medium "
                {...register("city", {required:"This feild is required"})}
            />
            {errors.country && (
                <span className="text-red-500">{errors.country.message}</span>
            )}
        </label>
        </div>

        <label className="text-gray-700 text-sm font-bold flex-1">
            Description
            <textarea
            rows={10}
                className="border rounded w-full py-1 px-2 font-medium "
                {...register("description", {required:"This feild is required"})}
            ></textarea>
            {errors.description && (
                <span className="text-red-500">{errors.description.message}</span>
            )}
        </label>

        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
            Price Per Night
            <input 
                type="number"
                min={1}
                className="border rounded w-full py-1 px-2 font-medium "
                {...register("pricePerNight", {required:"This feild is required"})}
            />
            {errors.pricePerNight && (
                <span className="text-red-500">{errors.pricePerNight.message}</span>
            )}
        </label>

        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
            Star Rating
            <select 
            {...register("starRating", {required: "This feild is required"})}
            className="border rounded w-full p-2 text-gray-700 font-normal"
            >
                <option value="" className="text-sm font-bold">Select as rating</option>
                {[1,2,3,4,5].map((num) => (
                <option value={num} key={num} className="text-sm font-bold">{num}</option>
                ))}
            </select> 
            {errors.starRating && (
                <span className="text-red-500">{errors.starRating.message}</span>
            )}
        </label>
    </div>
  )
}

export default DetailsSection