import {createSlice} from '@reduxjs/toolkit';


export const authSlice = createSlice({
    name:'user',
    initialState: { user:"usuario X",token:"espacio para token",},
    reducers: {}
})

export default authSlice.reducer