import { Box, Button, Typography, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import { CustomTextField, GlobalCssStyles } from "../../style/GlobalCSS";
import { FieldArray, Form, Formik } from "formik";
import Grid from "@mui/material/Grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import AsyncSelect from "react-select/async";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import * as Yup from "yup";
import { CreatePoojaAPI } from "../../services/CreatePoojaAPI";
import UploadIcon from "../../assests/upload-icon.svg";
import CloseIcon from "@mui/icons-material/Close";
import { CreateTempleAPI } from "../../services/CreateTempleAPI";
const MAX_LOGOS = 5;
const MAX_SIZE = 5 * 1024 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

// Validation Schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Pooja Title is required"),
  titleHi: Yup.string().required("पूजा का शीर्षक आवश्यक है"),
  subtitle: Yup.string().required("Subtitle is required"),
  subtitleHi: Yup.string().required("उपशीर्षक आवश्यक है"),
  originator: Yup.object()
    .nullable()
    .required("Location (English) is required"),
  originatorHi: Yup.object().nullable().required("स्थान (हिंदी) आवश्यक है"),
  capDate: Yup.date().nullable().required("Date is required"),
  file: Yup.mixed().required("Image (English) is required"),
  fileHi: Yup.mixed().required("चित्र (हिंदी) आवश्यक है"),
  price: Yup.object().shape({
    single: Yup.number()
      .typeError("Single Price must be a number")
      .required("Single Price is required"),
    couple: Yup.number()
      .typeError("Couple Price must be a number")
      .required("Couple Price is required"),
    family: Yup.number()
      .typeError("Family Price must be a number")
      .required("Family Price is required"),
  }),
  benefit: Yup.array()
    .of(
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        titleHi: Yup.string().required("शीर्षक आवश्यक है"),
        description: Yup.string().required("Description is required"),
        descriptionHi: Yup.string().required("विवरण आवश्यक है"),
      })
    )
    .min(1, "At least one benefit is required")
    .max(3, "Maximum 3 benefits allowed")
    .required("Benefits are required"),
  faq: Yup.array()
    .of(
      Yup.object().shape({
        question: Yup.string().required("Question is required"),
        questionHi: Yup.string().required("प्रश्न आवश्यक है"),
        answer: Yup.string().required("Answer is required"),
        answerHi: Yup.string().required("उत्तर आवश्यक है"),
      })
    )
    .min(1, "At least one FAQ is required")
    .max(5, "Maximum 5 FAQs allowed")
    .required("FAQs are required"),
});

const initialValues = {
  title: "",
  titleHi: "",
  subtitle: "",
  subtitleHi: "",
  originator: null,
  originatorHi: null,
  capDate: null,
  file: null,
  fileHi: null,
  price: {
    single: "",
    couple: "",
    family: "",
  },
  benefit: [{ title: "", titleHi: "", description: "", descriptionHi: "" }],
  faq: [{ question: "", questionHi: "", answer: "", answerHi: "" }],
  logoImages: [],          // Add this
  logoImagesHi: [],        // Add this
  newLogoImages: [],       // Also referenced in upload function
  newLogoImagesHi: [],     // Also referenced in upload function
  removedLogoImageIds: [], // Also referenced in remove function
  removedLogoImageIdsHi: []// Also referenced in remove function
};


export default function AddTemple({ open, handleClose }) {
  const [poojaData, setPoojaData] = useState(initialValues);

  const locationOptions = [
    { value: "new_york", label: "New York" },
    { value: "london", label: "London" },
    { value: "paris", label: "Paris" },
    { value: "tokyo", label: "Tokyo" },
    { value: "sydney", label: "Sydney" },
    { value: "berlin", label: "Berlin" },
    { value: "dubai", label: "Dubai" },
    { value: "singapore", label: "Singapore" },
    { value: "toronto", label: "Toronto" },
    { value: "san_francisco", label: "San Francisco" },
  ];

  const locationOptionsHi = [
    { value: "delhi", label: "दिल्ली" },
    { value: "mumbai", label: "मुंबई" },
    { value: "varanasi", label: "वाराणसी" },
    { value: "ayodhya", label: "अयोध्या" },
    { value: "haridwar", label: "हरिद्वार" },
    { value: "rishikesh", label: "ऋषिकेश" },
  ];
  const loadLocationOptions = (inputValue, callback) => {
    const filtered = locationOptions.filter((opt) =>
      opt.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtered);
  };
  const loadLocationOptionsHi = (inputValue, callback) => {
    const filtered = locationOptionsHi.filter((opt) =>
      opt.label.includes(inputValue)
    );
    callback(filtered);
  };

  const handleLogoImagesUpload = (event, values, setFieldValue) => {
    const files = Array.from(event.target.files);
    const combined = [...(values.logoImages || []), ...files].slice(
      0,
      MAX_LOGOS
    );
    setFieldValue("logoImages", combined);
    setFieldValue(
      "newLogoImages",
      [...(values.newLogoImages || []), ...files].slice(0, MAX_LOGOS)
    );
  };
  const removeLogoImage = (index, values, setFieldValue) => {
    const updated = [...values.logoImages];
    const removedFile = updated[index];
    if (removedFile && removedFile._id) {
      setFieldValue("removedLogoImageIds", [
        ...(values.removedLogoImageIds || []),
        removedFile._id,
      ]);
    } else {
      setFieldValue(
        "newLogoImages",
        (values.newLogoImages || []).filter((file) => file !== removedFile)
      );
    }

    updated.splice(index, 1);
    setFieldValue("logoImages", updated);
  };
  const handleLogoImagesUploadHi = (event, values, setFieldValue) => {
    const files = Array.from(event.target.files);
    const combined = [...(values.logoImagesHi || []), ...files].slice(
      0,
      MAX_LOGOS
    );
    setFieldValue("logoImagesHi", combined);
    setFieldValue(
      "newLogoImagesHi",
      [...(values.newLogoImagesHi || []), ...files].slice(0, MAX_LOGOS)
    );
  };
  const removeLogoImageHi = (index, values, setFieldValue) => {
    const updated = [...values.logoImagesHi];
    const removedFile = updated[index];
    if (removedFile && removedFile._id) {
      setFieldValue("removedLogoImageIdsHi", [
        ...(values.removedLogoImageIdsHi || []),
        removedFile._id,
      ]);
    } else {
      setFieldValue(
        "newLogoImagesHi",
        (values.newLogoImagesHi || []).filter((file) => file !== removedFile)
      );
    }

    updated.splice(index, 1);
    setFieldValue("logoImagesHi", updated);
  };
  const handleSubmit = async (val) => {
    const formData = new FormData();
    Object.keys(val).forEach((key) => {
      if (key === "logoImages") {
        val.logoImages.forEach((file) => {
          formData.append("logoImages", file);
        });
      } else if (key === "logoImagesHi") {
        val.logoImages.forEach((file) => {
          formData.append("logoImagesHi", file);
        });
      } else if (val[key] !== null && val[key] !== undefined) {
        formData.append(key, val[key]);
      }
    });
    await CreateTempleAPI(val);
  };
  return (
    <GlobalCssStyles>
      <Box style={{ width: "90%", margin: "auto", marginTop: "2%   " }}>
        <Formik
          initialValues={poojaData}
          // validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
            console.log("Submitted data", values);
          }}
          enableReinitialize={true}
        >
          {({
            values,
            setFieldValue,
            errors,
            touched,
            handleBlur,
            handleChange,
            isValid,
            dirty,
            setFieldTouched,
          }) => (
            <Form>
              <Box style={{ width: "90%", margin: "auto" }}>
                <Typography className="policies-text" sx={{ mb: 2 }}>
                  Add New Temple
                </Typography>

                <Grid container spacing={2} sx={{ width: "100%" }}>
                  <Box sx={{ width: "80%" }}>
                    {/*  Title */}
                    <Grid item xs={12} sm={12} sx={{ mb: 1 }}>
                      <Typography className="policy-form-label policy-text-field-label">
                        Title <span className="required-icon">*</span>
                      </Typography>
                      <Stack spacing={1}>
                        <CustomTextField
                          id="title"
                          name="title"
                          value={values.title}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter Title (English)"
                          fullWidth
                          size="small"
                          error={touched.title && Boolean(errors.title)}
                          helperText={touched.title && errors.title}
                        />
                        <CustomTextField
                          id="titleHi"
                          name="titleHi"
                          value={values.titleHi}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="मंदिर का नाम (हिंदी)"
                          fullWidth
                          size="small"
                          error={touched.titleHi && Boolean(errors.titleHi)}
                          helperText={touched.titleHi && errors.titleHi}
                        />
                      </Stack>
                    </Grid>

                    {/* Location English */}
                    <Grid item xs={12} sm={12} sx={{ mb: 1 }}>
                      <Typography className="policy-form-label policy-text-field-label">
                        Location (English){" "}
                        <span className="required-icon">*</span>
                      </Typography>
                      <AsyncSelect
                        id="originator"
                        name="originator"
                        cacheOptions
                        isClearable
                        placeholder="Select Location (English)"
                        value={values.originator}
                        defaultOptions={locationOptions}
                        loadOptions={loadLocationOptions}
                        onChange={(option) => {
                          setFieldValue("originator", option);
                        }}
                        onBlur={() => setFieldTouched("originator", true)}
                      />
                      {touched.originator && errors.originator && (
                        <Typography
                          color="error"
                          variant="caption"
                          className="error-msg"
                        >
                          {errors.originator}
                        </Typography>
                      )}
                    </Grid>

                    {/* Location Hindi */}
                    <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
                      <Typography className="policy-form-label policy-text-field-label">
                        स्थान (हिंदी) <span className="required-icon">*</span>
                      </Typography>
                      <AsyncSelect
                        id="originatorHi"
                        name="originatorHi"
                        cacheOptions
                        isClearable
                        placeholder="स्थान चुनें (हिंदी)"
                        value={values.originatorHi}
                        defaultOptions={locationOptionsHi}
                        loadOptions={loadLocationOptionsHi}
                        onChange={(option) => {
                          setFieldValue("originatorHi", option);
                        }}
                        onBlur={() => setFieldTouched("originatorHi", true)}
                      />
                      {touched.originatorHi && errors.originatorHi && (
                        <Typography
                          color="error"
                          variant="caption"
                          className="error-msg"
                        >
                          {errors.originatorHi}
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ mb: 1 }}>
                      <Typography className="policy-form-label policy-text-field-label">
                        Bhagwan <span className="required-icon">*</span>
                      </Typography>
                      <Stack spacing={1}>
                        <CustomTextField
                          id="bhagwan"
                          name="bhagwan"
                          value={values.bhagwan}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter Deity (English)"
                          fullWidth
                          size="small"
                          error={touched.bhagwan && Boolean(errors.bhagwan)}
                          helperText={touched.bhagwan && errors.bhagwan}
                        />
                        <CustomTextField
                          id="bhagwanHi"
                          name="bhagwanHi"
                          value={values.bhagwanHi}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="भगवान का नाम (हिंदी)"
                          fullWidth
                          size="small"
                          error={touched.bhagwanHi && Boolean(errors.bhagwanHi)}
                          helperText={touched.bhagwanHi && errors.bhagwanHi}
                        />
                      </Stack>
                    </Grid>
                    {/* File upload (English) */}
                    <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
                      <Typography className="policy-form-label policy-text-field-label">
                        Add Image (English){" "}
                        <span className="required-icon">*</span>
                      </Typography>
                      <input
                        type="file"
                         id="logo-images-upload"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={(e) => {
                         handleLogoImagesUpload(e,values,setFieldValue)
                        }}
                      />
                     <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "0.7rem",
                        }}
                      >
                        {values?.logoImages &&
                          values?.logoImages?.map((file, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                background: "#f3f2f1",
                                padding: "4px 10px",
                                borderRadius: 12,
                                mb: 0.5,
                              }}
                            >
                              <Typography sx={{ fontFamily: "Poppins" }}>
                                {file.name}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  removeLogoImage(idx, values, setFieldValue)
                                }
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          ))}
                        {(values.logoImages?.length ?? 0) < MAX_LOGOS && (
                          <Button
                            type="button"
                            variant="outlined"
                            size="small"
                            style={{
                              minHeight: "2.5rem",
                              marginLeft: "10px",
                              borderRadius: 20,
                              background: "#fff",
                            }}
                            onClick={() =>
                              document
                                .getElementById("logo-images-upload")
                                .click()
                            }
                          >
                            <img
                              src={UploadIcon}
                              alt="Upload"
                              style={{ width: 20, marginRight: 8 }}
                            />
                            Upload Images
                          </Button>
                        )}
                      </Box>
                      {touched.logoImages && errors.logoImages && (
                        <Typography
                          color="error"
                          variant="caption"
                          className="error-msg"
                        >
                          {errors.logoImages}
                        </Typography>
                      )}
                    </Grid>

                    {/* File upload (Hindi) */}
                    <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
                      <Typography className="policy-form-label policy-text-field-label">
                        चित्र जोड़ें (हिंदी){" "}
                        <span className="required-icon">*</span>
                      </Typography>
                      <input
                        type="file"
                        id="logo-images-upload-hi"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={(e) => {
                           handleLogoImagesUploadHi(e, values, setFieldValue)
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: "0.7rem",
                        }}
                      >
                        {values.logoImagesHi &&
                          values.logoImagesHi.map((file, idx) => (
                            <Box
                              key={idx}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                background: "#f3f2f1",
                                padding: "4px 10px",
                                borderRadius: 12,
                                mb: 0.5,
                              }}
                            >
                              <Typography sx={{ fontFamily: "Poppins" }}>
                                {file.name}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() =>
                                  removeLogoImageHi(idx, values, setFieldValue)
                                }
                              >
                                <CloseIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          ))}
                        {values.logoImagesHi.length < MAX_LOGOS && (
                          <Button
                            type="button"
                            variant="outlined"
                            size="small"
                            style={{
                              minHeight: "2.5rem",
                              marginLeft: "10px",
                              borderRadius: 20,
                              background: "#fff",
                            }}
                            onClick={() =>
                              document
                                .getElementById("logo-images-upload-hi")
                                .click()
                            }
                          >
                            <img
                              src={UploadIcon}
                              alt="Upload"
                              style={{ width: 20, marginRight: 8 }}
                            />
                            चित्र अपलोड करें
                          </Button>
                        )}
                      </Box>
                      {touched.logoImages && errors.logoImages && (
                        <Typography
                          color="error"
                          variant="caption"
                          className="error-msg"
                        >
                          {errors.logoImages}
                        </Typography>
                      )}{" "}
                    </Grid>

                    {/* Benefits Field Array - max 3 */}
                    <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
                      <Typography
                        className="policy-form-label policy-text-field-label"
                        sx={{ mb: 1 }}
                      >
                        Temple Description{" "}
                        <span className="required-icon">*</span>
                      </Typography>
                      <CustomTextField
                        as="textarea"
                        name="description"
                        sx={{ minWidth: "100%", minHeight: "10vh" }}
                        placeholder="Description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        size="small"
                        error={
                          touched.description &&
                          touched.description &&
                          Boolean(errors.description)
                        }
                        helperText={
                          touched.description &&
                          touched.description &&
                          errors.description
                        }
                      />
                       <CustomTextField
                        as="textarea"
                        name="descriptionHi"
                        sx={{ minWidth: "100%", minHeight: "10vh" }}
                        placeholder="डिस्क्रिप्शन जोड़े (हिंदी)"
                        value={values.descriptionHi}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        size="small"
                        error={
                          touched.descriptionHi &&
                          touched.descriptionHi &&
                          Boolean(errors.descriptionHi)
                        }
                        helperText={
                          touched.descriptionHi &&
                          touched.descriptionHi &&
                          errors.descriptionHi
                        }
                      />
                    </Grid>
                    {/* Long Description  */}
                    <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
                      <Typography
                        className="policy-form-label policy-text-field-label"
                        sx={{ mb: 1 }}
                      >
                        Long Description{" "}
                        <span className="required-icon">*</span>
                      </Typography>
                      <CustomTextField
                        as="textarea"
                        name="longDescription"
                        sx={{ minWidth: "100%", minHeight: "15vh" }}
                        placeholder="Long Description"
                        value={values?.longDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        size="small"
                        error={
                          touched.longDescription &&
                          touched.longDescription &&
                          Boolean(errors.longDescription)
                        }
                        helperText={
                          touched.longDescription &&
                          touched.longDescription &&
                          errors.longDescription
                        }
                      />
                       <CustomTextField
                        as="textarea"
                        name="longDescriptionHi"
                        sx={{ minWidth: "100%", minHeight: "15vh" }}
                        placeholder="बड़ा डिस्क्रिप्शन जोड़े (हिंदी)"
                        value={values?.longDescriptionHi}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        fullWidth
                        size="small"
                        error={
                          touched.longDescriptionHi &&
                          touched.longDescriptionHi &&
                          Boolean(errors.longDescriptionHi)
                        }
                        helperText={
                          touched.longDescriptionHi &&
                          touched.longDescriptionHi &&
                          errors.longDescriptionHi
                        }
                      />
                    </Grid>
                  </Box>

                  {/* Submit Button */}
                  <Grid item xs={12} sm={6} size={12} sx={{ mt: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "1rem",
                      }}
                    >
                      <Button
                        className="create-btn"
                        type="submit"
                        disabled={!isValid || !dirty}
                      >
                        Create Temple
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </GlobalCssStyles>
  );
}
