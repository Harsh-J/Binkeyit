import Axios from "./Axios";
import SummaryApi from "../common/SummaryApi";

const fetchUserDetails = async () => {
  try {
    const token = localStorage.getItem("accesstoken");
    if (!token) {
      throw new Error("No access token found");
    }

    console.log("Fetching user details with token:", token);
    const response = await Axios({
      ...SummaryApi.userDetails,
      headers: {
        ...SummaryApi.userDetails.headers, // Preserve existing headers
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("fetchUserDetails response:", response.data);
    if (response.data.error) {
      throw new Error(response.data.message || "Failed to fetch user details");
    }

    return response.data;
  } catch (error) {
    console.error("fetchUserDetails error:", error.message, error.response);
    throw error; // Rethrow to be caught in handleSubmit
  }
};

export default fetchUserDetails;