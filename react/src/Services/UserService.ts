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
// creating order
const createOrder  =async (order:any)  => {
        return await axios.post('order/addOrder', order);
    }
// getting order by id
const getOrder  =async (orderInfo:any)  => {
    return await axios.get('order/getOrder', orderInfo);
}

const getOrdersByUsersId = async(userInfo:any)=> {
    return await axios.get('order/getOrderByUserId', userInfo);
}

const UserService = {
        getUser,
        registerUser,
        loginUser,
        logoutUser,
        createOrder,
        getOrdersByUsersId,
        getOrder
      };
export default UserService;