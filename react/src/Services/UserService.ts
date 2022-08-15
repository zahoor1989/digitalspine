import axios from './common';


//set user
const getUser = async () => {
    return await axios.get('/user');
}

//register user  
const registerUser = async (data:any) => {
    console.log(data);
        return await axios.post(`auth/register`,data);
    };

//login user 
const loginUser = async (data:any) => {
        return await axios.post('auth/login', data);
    };
// logout user
const logoutUser = async() => {
    return await axios.get('auth/logout');
    }

    const UserService = {
        getUser,
        registerUser,
        loginUser,
        logoutUser
      };
export default UserService;