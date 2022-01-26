import axios from "axios";

const axiosCustom = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
  });
function sendHeader() {
  const token = localStorage.getItem("jwt");
  if(token){
    return {
    headers: {
      Authorization: token,
      "Content-Type": "application/json"
    }}
  }else{
    return {
      headers: {
        "Content-Type": "application/json",
      }}
  }
}

const post = async (url, dataToSend) => {
  const { data } = await axiosCustom.post(url, dataToSend,sendHeader());
  return data;
};

const get = async (url) => {
  const { data,error } = await axiosCustom.get(url,sendHeader());
  return {data,error};
};

const Delete = async (url) => {
  const { data } = await axiosCustom.delete(url,sendHeader());
  return data;
};

export const api = { post, get,Delete };
