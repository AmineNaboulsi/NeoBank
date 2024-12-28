import {createSlice, PayloadAction } from "@reduxjs/toolkit"

type AccountType = {
    "type" : number,
    "Owner": string,
    "email": string,
    "Solde": number
}

const initialState :AccountType = {
    "type" : 1,
    "Owner": "",
    "email": "",
    "Solde": 0
}

const account_slice = createSlice({
name : "Account" ,
initialState ,
reducers :{
    userinfovalidation: (state , action: PayloadAction<{owner?: string , email?: string}>) =>{
        const { owner, email } = action.payload;
        if(owner) state.Owner = owner;
        if(email) state.email = email ; 
    },
    accountypevalidation: (state ,action: PayloadAction<{numberpicker : number}>) =>{
        const {numberpicker} = action.payload;
        state.type = numberpicker;
    },
}
});


export const {userinfovalidation , accountypevalidation } = account_slice.actions

export default account_slice.reducer