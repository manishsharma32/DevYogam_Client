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
    formData.append("capDate", data.capDate);

    // Multiple Images (files)
    if (Array.isArray(data.logoImages)) {
      data.logoImages.forEach((file) => {
        formData.append("logo_image", file);
      });
    }
    if (Array.isArray(data.logoImagesHi)) {
      data.logoImagesHi.forEach((file) => {
        formData.append("ht_logo_image", file);
      });
    }
    if (data.price) {
      formData.append("price[0][single][amaount]", data.price.single || "");
      formData.append(
        "price[0][single][description]",
        data.price.singleDesc || ""
      );
      formData.append("price[0][couple][amaount]", data.price.couple || "");
      formData.append(
        "price[0][couple][description]",
        data.price.coupleDesc || ""
      );
      formData.append("price[0][family][amaount]", data.price.family || "");
      formData.append(
        "price[0][family][description]",
        data.price.familyDesc || ""
      );
    }

    // Benefit array
    if (data.benefit) {
      data.benefit.forEach((b, i) => {
        formData.append(`benefit[${i}][title]`, b.title);
        formData.append(`benefit[${i}][titleHi]`, b.titleHi);
        formData.append(`benefit[${i}][description]`, b.description);
        formData.append(`benefit[${i}][descriptionHi]`, b.descriptionHi);
      });
    }
    // FAQ array
    if (data.faq) {
    data.faq.forEach((f, i) => {
      formData.append(`faq[${i}][question]`, f.question);
      formData.append(`faq[${i}][questionHi]`, f.questionHi);
      formData.append(`faq[${i}][answer]`, f.answer);
      formData.append(`faq[${i}][answerHi]`, f.answerHi);
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
