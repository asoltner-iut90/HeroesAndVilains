import { authAxiosAgent } from "@/services/axios.service";

async function signIn(login, password) {
  try {
    const response = await authAxiosAgent.post("/auth/signin", { login, password });
    return response.data;
  } catch (err) {
    return {
      error: 1,
      data: err.response ? err.response.data : "Network error",
    };
  }
}

async function getUser(login) {
  try {
    const response = await authAxiosAgent.get(`/user/getuser/${login}`);
    return response.data;
  } catch (err) {
    return {
      error: 1,
      data: err.response ? err.response.data : "Network error",
    };
  }
}

export { signIn, getUser };