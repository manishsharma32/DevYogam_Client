import axiosInstance from "../utils/axiosConfig";

export const CreatePoojaFile = async (id, data) => {
  const transformData = (data) => {
    const formData = new FormData();

    if (Array.isArray(data.logoImages)) {
      data.logoImages.forEach((file) => {
        formData.append("images", file);
      });
    }
    if (Array.isArray(data.logoImagesHi)) {
      data.logoImagesHi.forEach((file) => {
        formData.append("imagesHi", file);
      });
    }
    return formData;
  };

  try {
  const formattedData = transformData(data);
  const response = await axiosInstance.post(`/api/files/${id}`, formattedData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return { status: response.status, data: response.data };  
} catch (error) {
  if (error.response?.data) {
    return { status: error.response.status, error: error.response.data.message };
  } else if (
    error.code === "ECONNABORTED" ||
    error.message === "Network Error"
  ) {
    return { status: 0, error: "Connection timed out. Please try again later." };
  }
  return { status: 0, error: "Something went wrong." };
}

};
