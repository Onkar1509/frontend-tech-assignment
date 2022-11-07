import axios from "axios";

export async function InvokeGetServiceCall(url) {
  return await axios.get(url).then((res) => {
    return res;
  });
}
