import axiosInstance from "../utils/axiosConfig";

export const CreateChadhavaAPI = async (data) => {
  console.log("apicall", data);

  const transformData = (data) => {
    const formData = new FormData();

    // Simple Strings
    formData.append("title", data.title);
    formData.append("titleHi", data.titleHi);
    formData.append("subtitle", data.subtitle);
    formData.append("subtitleHi", data.subtitleHi);
    formData.append("chadhava", data.chadhava);
    formData.append("desc", data.description);
    formData.append("descHi", data.descriptionHi);
    formData.append("mandir", data.mandir.value);

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

    const response = await axiosInstance.post("/api/chadhavas", formattedData, {
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
