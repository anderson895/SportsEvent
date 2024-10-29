/* eslint-disable @typescript-eslint/no-explicit-any */
import { type StateCreator } from "zustand/vanilla";


interface AdminState {
    info?:any;
    loading?:boolean;
    isAuthenticated?:boolean;
}

export interface AdminSlice {
    admin: AdminState;
    saveAdminInfo: (payload:any) => void;
    setShowLoading: (payload: boolean) => void;
}

const initialState: AdminState = {  
    info:null,
    loading: false,
    isAuthenticated:false
}

const createAdminSlice: StateCreator<AdminSlice> = (set) =>({
    admin: initialState,
    saveAdminInfo:(payload:any) =>{
        set((state) =>({
            ...state,
            admin:{
                ...state.admin,
                info:payload,
                isAuthenticated:true
            }
        }))
    },
    setShowLoading:(payload:any) =>{
        set((state) =>({
            ...state,
            admin:{
                ...state.admin,
                loading: payload,
            }
        }))
    },
})

export default createAdminSlice