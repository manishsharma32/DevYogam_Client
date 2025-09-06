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

  const handleSubmit = async (val) => {
    const res = await CreatePoojaAPI(val);
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

                    {/* File upload (English) */}
                    <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
                      <Typography className="policy-form-label policy-text-field-label">
                        Add Image (English){" "}
                        <span className="required-icon">*</span>
                      </Typography>
                      <input
                        type="file"
                        id="file-upload-english"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFieldValue("file", e.target.files[0]);
                          }
                        }}
                      />
                      {values.file ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <Typography className="evidence-details-text">
                            {values.file.name}
                          </Typography>
                          <CloseIcon
                            style={{ cursor: "pointer" }}
                            fontSize="small"
                            onClick={() => {
                              setFieldValue("file", null);
                            }}
                          />
                        </Box>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            document
                              .getElementById("file-upload-english")
                              .click()
                          }
                          style={{
                            background: "white",
                            marginTop: "10px",
                            borderRadius: "20px",
                            width: "14rem",
                            height: "2.5rem",
                            color: "black",
                            fontWeight: 500,
                            border: "1px solid #DADCE0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "1rem",
                          }}
                        >
                          <img src={UploadIcon} alt="Upload" />
                          <Typography style={{ fontFamily: "Poppins" }}>
                            Upload File (English)
                          </Typography>
                        </button>
                      )}
                      {touched.file && errors.file && (
                        <Typography
                          color="error"
                          variant="caption"
                          className="error-msg"
                        >
                          {errors.file}
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
                        id="file-upload-hindi"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setFieldValue("fileHi", e.target.files[0]);
                          }
                        }}
                      />
                      {values.fileHi ? (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <Typography className="evidence-details-text">
                            {values.fileHi.name}
                          </Typography>
                          <CloseIcon
                            style={{ cursor: "pointer" }}
                            fontSize="small"
                            onClick={() => {
                              setFieldValue("fileHi", null);
                            }}
                          />
                        </Box>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("file-upload-hindi").click()
                          }
                          style={{
                            background: "white",
                            marginTop: "10px",
                            borderRadius: "20px",
                            width: "14rem",
                            height: "2.5rem",
                            color: "black",
                            fontWeight: 500,
                            border: "1px solid #DADCE0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "1rem",
                          }}
                        >
                          <img src={UploadIcon} alt="Upload" />
                          <Typography style={{ fontFamily: "Poppins" }}>
                            फाइल अपलोड करें (हिंदी)
                          </Typography>
                        </button>
                      )}
                      {touched.fileHi && errors.fileHi && (
                        <Typography
                          color="error"
                          variant="caption"
                          className="error-msg"
                        >
                          {errors.fileHi}
                        </Typography>
                      )}
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
                        placeholder="डिस्क्रिप्शन जोड़े (हिंदी)"
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
                        placeholder="बड़ा डिस्क्रिप्शन जोड़े (हिंदी)"
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
                        Create Pooja
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
