import axios from "axios";
import { BPA_API_URL } from "../constants/envVariables";

const axiosClient = axios.create({
  baseURL: BPA_API_URL,
});

export default axiosClient;
