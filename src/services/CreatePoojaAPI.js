import axiosInstance from "../utils/axiosConfig";

export const CreatePoojaAPI = async (data) => {
  console.log("apicall", data);

  const transformData = (data) => {
    const formData = new FormData();

    // Simple Strings
    formData.append("title", data.title);
    formData.append("titleHi", data.titleHi);
    formData.append("subtitle", data.subtitle);
    formData.append("subtitleHi", data.subtitleHi);

    // Locations
    formData.append("location", data.originator?.value || "");
    formData.append("locationHi", data.originatorHi?.value || "");

    // Date
     if (data.capDate) {
    formData.append("capDate", new Date(data.capDate).toISOString());
  }


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
    if (Array.isArray(data.price) && data.price.length > 0) {
    const price = data.price[0];
    formData.append("price[0][single]", price.single ?? "");
    formData.append("price[0][couple]", price.couple ?? "");
    formData.append("price[0][family]", price.family ?? "");
  }

  // Benefit array
  if (Array.isArray(data.benefit)) {
    data.benefit.forEach((b, i) => {
      formData.append(`benefit[${i}][title]`, b.title || "");
      formData.append(`benefit[${i}][titleHi]`, b.titleHi || "");
      formData.append(`benefit[${i}][description]`, b.description || "");
      formData.append(`benefit[${i}][descriptionHi]`, b.descriptionHi || "");
    });
  }

  // FAQ array
  if (Array.isArray(data.faq)) {
    data.faq.forEach((f, i) => {
      formData.append(`faq[${i}][question]`, f.question || "");
      formData.append(`faq[${i}][questionHi]`, f.questionHi || "");
      formData.append(`faq[${i}][answer]`, f.answer || "");
      formData.append(`faq[${i}][answerHi]`, f.answerHi || "");
    });
  }
    return formData;
  };

  try {
    const formattedData = transformData(data);

    const response = await axiosInstance.post("/api/poojas", formattedData, {
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