import axios from "axios";

const BASE_URL = "/api";
const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(
  function (config) {
    // request처리 로직 (header 등)
    return config;
  },
  function (error) {
    // 요청 오류시 처리 로직
    return Promise.reject(error);
  }
);

export default instance;



// const instance = async () => {
//     const res = await axios.get(url)
//     console.log(res);
//        return res;
//}
