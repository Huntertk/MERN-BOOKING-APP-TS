import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";


const SignOutButton = () => {
  const queryClient = useQueryClient();
  const {showToast} = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async() => {
      await queryClient.invalidateQueries("validateToken")
      showToast({message:"User Logout", type:"SUCCESS"})
    },
    onError: (error:Error) => {
      console.log(error);
      showToast({message:"Something Wrong", type:"ERROR"})
    } 
  })

  const handleClick = async () => {
    mutation.mutate();
  }
  return (
    <button className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100" onClick={handleClick}>Sign Out</button>
  )
}

export default SignOutButton