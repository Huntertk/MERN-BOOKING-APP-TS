import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from '../api-client'

type ToastMessage = {
    message:string;
    type:'SUCCESS' | 'ERROR'
}

type AppContextType = {
    showToast: (toastMessage:ToastMessage) => void;
    isLoggedIn:boolean
}

type Props = {
    children:React.ReactNode
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const AppConextProvider = ({children}:Props) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    const {isError} = useQuery('validateToken', apiClient.validateToken, {
        retry:false
    })

    return (
        <AppContext.Provider value={{
            showToast:(toastMessage) => {
                setToast(toastMessage);
            },
            isLoggedIn: !isError
        }}>
            {toast && <Toast 
                message={toast.message} 
                type={toast.type} 
                onClose={() => setToast(undefined)}
            />}
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext)
    return context as AppContextType
}
export default AppConextProvider;