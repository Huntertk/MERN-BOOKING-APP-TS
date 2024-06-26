import { createContext, useContext } from "react";

type ToastMessage = {
    message:string;
    type:'SUCCESS' | 'ERROR'
}

type AppContextType = {
    showToast: (toastMessage:ToastMessage) => void
}

type Props = {
    children:React.ReactNode
}

const AppContext = createContext<AppContextType | undefined>(undefined)

const AppConextProvider = ({children}:Props) => {
    return (
        <AppContext.Provider value={{
            showToast:(toastMessage) => {
                console.log(toastMessage);
                
            }
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext)
    return context as AppContextType
}
export default AppConextProvider;