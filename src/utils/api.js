import axios from "axios";

const axiosCustom = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
  });
function sendToken() {
  const token = localStorage.getItem("jwt");
  return {
    headers: {
      Authorization: token,
    },
  };
}

const post = async (url, dataToSend) => {
  const { data } = await axiosCustom.post(url, dataToSend, localStorage.getItem("jwt") && sendToken());
  return data;
};

const get = async (url) => {
  const { data,error } = await axiosCustom.get(url, localStorage.getItem("jwt") && sendToken());
  return {data,error};
};

const Delete = async (url) => {
  const { data } = await axiosCustom.delete(url, localStorage.getItem("jwt") && sendToken());
  return data;
};

export const api = { post, get,Delete };
