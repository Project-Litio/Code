import {createSlice} from '@reduxjs/toolkit';
import {login} from '../../api/login.api'
import axios from 'axios';

export const authSlice = createSlice({
    name:'user',
    initialState: { user:null,token:null},
    reducers: {
        loginUser: (state,action) => {
            //console.log(action.payload)
            const user = async () => await login(action.payload)
            console.log(user())
            state.user = user()
        } 
    }
})

export const {loginUser} = authSlice.actions
export default authSlice.reducer