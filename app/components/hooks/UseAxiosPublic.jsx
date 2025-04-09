import axios from 'axios';

const axiosPublic = axios.create({
    baseURL: "http://localhost:3001",
    //  baseURL: "https://streetfood-production.up.railway.app",
  });
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;