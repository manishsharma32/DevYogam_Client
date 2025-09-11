import axiosInstance from "../utils/axiosConfig";

export const CreateTempleAPI = async (data) => {
  console.log("apicall", data);

  const transformData = (data) => {
    const formData = new FormData();

    // Simple Strings
    formData.append("title", data.title);
    formData.append("titleHi", data.titleHi);
    formData.append("bhagwan", data.subtitle);
    formData.append("bhagwanHi", data.subtitleHi);

    // Locations
    formData.append("location", data.originator?.value || "");
    formData.append("locationHi", data.originatorHi?.value || "");
    formData.append("templeDescription",data.description)
    formData.append("templeDescriptionHi",data.descriptionHi)
    formData.append("longDescription",data.longDescription)
    formData.append("longDescriptionHi",data.longDescriptionHi)
 

    if (Array.isArray(data.logoImages)) {
      data.logoImages.forEach((file) => {
        formData.append("images", file);
      });
    }
    if (Array.isArray(data.logoImagesHi)) {
      data.logoImagesHi.forEach((file) => {
        formData.append("images_hi", file);
      });
    }

    return formData;
  };

  try {
    const formattedData = transformData(data);

    const response = await axiosInstance.post("/api/temples", formattedData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response?.status === 200) {
      return response?.data;
    }
  } catch (error) {
    if (error.response?.data) {
      return { error: error.response.data.msg };
    } else if (
      error.code === "ECONNABORTED" ||
      error.message === "Network Error"
    ) {
      return { error: "Connection timed out. Please try again later." };
    }
    // Log other unexpected errors
    console.error(error);
    return { error: "Something went wrong." };
  }
};
