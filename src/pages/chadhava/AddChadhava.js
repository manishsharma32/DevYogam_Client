import { Box, Button, Typography, IconButton, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
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
import { CreateChadhavaAPI } from "../../services/CreateChadhavaAPI";
import { GetAllTempleAPI } from "../../services/GetAllTempleAPI";
import AsyncCreatableSelect from "react-select/async-creatable";
import { UploadItemImg } from "../../services/UploadItemImg";
import { CreatePoojaFile } from "../../services/CreatePoojaFile";
import { useNavigate } from "react-router-dom";

const MAX_LOGOS = 5;

const initialValues = {
  title: "",
  titleHi: "",
  subtitle: "",
  subtitleHi: "",
  desc: null,
  descHi: null,
  chadhava: null,
  startDate: null,
  file: null,
  fileHi: null,
  logoImages: [],
  logoImagesHi: [],
  newLogoImages: [],
  newLogoImagesHi: [],
  removedLogoImageIds: [],
  removedLogoImageIdsHi: [],
  faq: [
    {
      title: "",
      titleHi: "",
      description: "",
      descriptionHi: "",
      price: "",
      img: "",
    },
  ],
  benefit: [
    {
      title: "",
      titleHi: "",
      description: "",
      descriptionHi: "",
    },
  ],
};
export default function AddChadhava({ open, handleClose }) {
  const [poojaData, setPoojaData] = useState(initialValues);
  const navigate  = useNavigate();
  const [templeData, setTempleData] = useState([]);
  const [mandirOptions, setMandirOptions] = useState([]);
  const [templeList, setTempleList] = useState([]);
  const [templeListHi, setTempleListHi] = useState([]);
  const getTemple = async () => {
    const res = await GetAllTempleAPI();
    const english = (res || []).map((item) => ({
      value: item?.title || "",
      label: item?.title || "",
    }));
    const hindi = (res || []).map((item) => ({
      value: item?.titleHi || item?.title || "",
      label: item?.titleHi || "",
    }));
    setTempleList(english);
    setTempleListHi(hindi);
  };

  useEffect(() => {
    getTemple();
  }, []);

  const locationOptionsHi = [...templeListHi];

  const locationOptions = [...templeList];

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
    console.log("Submitted values:", val);
    let itemImg;
    if (val?.faq?.length > 0) {
      const images = val.faq.map((i) => i.img);
      itemImg = await UploadItemImg(images);
    }
    const response = await CreateChadhavaAPI(val, itemImg);
    console.log(response);
    if (response?._id) {
      const res = await CreatePoojaFile(
        response?._id,
        val,
        "chadhava"
      );
      alert("Puja created successfully");
      if (res?.data?.status) {
        navigate("/chadhava");
      }
    } else if (response?.error) {
      alert(`Error: ${response?.error}`);
    }
    console.log("Uploaded Image URLs:", itemImg?.data?.images);
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
            <Form
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
                  e.preventDefault();
                }
              }}
            >
              <Box style={{ width: "90%", margin: "auto" }}>
                <Typography className="policies-text" sx={{ mb: 2 }}>
                  Add New Chadhava
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
                          placeholder="Enter Chadhava (English)"
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
                          placeholder="चढावा का नाम (हिंदी)"
                          fullWidth
                          size="small"
                          error={touched.titleHi && Boolean(errors.titleHi)}
                          helperText={touched.titleHi && errors.titleHi}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ mb: 1 }}>
                      <Typography className="policy-form-label policy-text-field-label">
                        Sub Title <span className="required-icon">*</span>
                      </Typography>
                      <Stack spacing={1}>
                        <CustomTextField
                          id="subtitle"
                          name="subtitle"
                          value={values.subtitle}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter sub-Title (English)"
                          fullWidth
                          size="small"
                          error={touched.subtitle && Boolean(errors.subtitle)}
                          helperText={touched.subtitle && errors.subtitle}
                        />
                        <CustomTextField
                          id="subtitleHi"
                          name="subtitleHi"
                          value={values.subtitleHi}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="उपशीर्षक दर्ज करें (हिंदी)"
                          fullWidth
                          size="small"
                          error={
                            touched.subtitleHi && Boolean(errors.subtitleHi)
                          }
                          helperText={touched.subtitleHi && errors.subtitleHi}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ mb: 1 }}>
                      <Typography className="policy-form-label policy-text-field-label">
                        Chadhava <span className="required-icon">*</span>
                      </Typography>
                      <Stack spacing={1}>
                        <CustomTextField
                          id="chadhava"
                          name="chadhava"
                          value={values.chadhava}
                          autoComplete="off"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter chadhava "
                          fullWidth
                          size="small"
                          error={touched.chadhava && Boolean(errors.chadhava)}
                          helperText={touched.chadhava && errors.chadhava}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
                      <Typography className="policy-form-label policy-text-field-label">
                        Mandir <span className="required-icon">*</span>
                      </Typography>
                      <AsyncCreatableSelect
                        id="originator"
                        name="originator"
                        cacheOptions
                        defaultOptions={mandirOptions}
                        options={mandirOptions}
                        value={values.mandir}
                        onChange={(option) => setFieldValue("mandir", option)}
                        isClearable
                        placeholder="Select Mandir"
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                        onBlur={() => setFieldTouched("mandir", true)}
                      />
                      {touched.mandir && errors.mandir && (
                        <Typography
                          color="error"
                          variant="caption"
                          className="error-msg"
                        >
                          {errors.mandir}
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
                        id="logo-images-upload"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={(e) => {
                          handleLogoImagesUpload(e, values, setFieldValue);
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
                          handleLogoImagesUploadHi(e, values, setFieldValue);
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
                        Description <span className="required-icon">*</span>
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
                    {/* Benefit array */}
                    <Grid item xs={12} sm={12} sx={{ mb: 2 }}>
                      <Typography
                        className="policy-form-label policy-text-field-label"
                        sx={{ mb: 1 }}
                      >
                        Benefits <span className="required-icon">*</span>
                      </Typography>
                      <FieldArray name="benefits">
                        {({ push, remove }) => (
                          <Box>
                            {values?.benefit?.map((item, index) => (
                              <Grid
                                container
                                spacing={2}
                                key={index}
                                alignItems="center"
                                sx={{ mb: 1, position: "relative" }}
                              >
                                <Grid item xs={11} size={11}>
                                  <Stack spacing={2}>
                                    <CustomTextField
                                      name={`benefit.${index}.title`}
                                      placeholder="Add Title (English)"
                                      value={item.title}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      fullWidth
                                      size="small"
                                      error={
                                        touched.benefit &&
                                        touched.benefit[index]?.title &&
                                        Boolean(errors.benefit?.[index]?.title)
                                      }
                                      helperText={
                                        touched.benefit &&
                                        touched.benefit[index]?.title &&
                                        errors.benefit?.[index]?.title
                                      }
                                    />
                                    <CustomTextField
                                      name={`benefit.${index}.titleHi`}
                                      placeholder="शीर्षक जोड़ें (हिंदी)"
                                      value={item.titleHi}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      fullWidth
                                      size="small"
                                      error={
                                        touched.benefit &&
                                        touched.benefit[index]?.titleHi &&
                                        Boolean(
                                          errors.benefit?.[index]?.titleHi
                                        )
                                      }
                                      helperText={
                                        touched.benefit &&
                                        touched.benefit[index]?.titleHi &&
                                        errors.benefit?.[index]?.titleHi
                                      }
                                    />
                                    <CustomTextField
                                      as="textarea"
                                      name={`benefit.${index}.description`}
                                      placeholder="Description (English)"
                                      value={item.description}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      fullWidth
                                      size="small"
                                      rows={3}
                                      error={
                                        touched.benefit &&
                                        touched.benefit[index]?.description &&
                                        Boolean(
                                          errors.benefit?.[index]?.description
                                        )
                                      }
                                      helperText={
                                        touched.benefit &&
                                        touched.benefit[index]?.description &&
                                        errors.benefit?.[index]?.description
                                      }
                                    />
                                    <CustomTextField
                                      as="textarea"
                                      name={`benefit.${index}.descriptionHi`}
                                      placeholder="विवरण (हिंदी)"
                                      value={item.descriptionHi}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      fullWidth
                                      size="small"
                                      rows={3}
                                      error={
                                        touched.benefit &&
                                        touched.benefit[index]?.descriptionHi &&
                                        Boolean(
                                          errors.benefit?.[index]?.descriptionHi
                                        )
                                      }
                                      helperText={
                                        touched.benefit &&
                                        touched.benefit[index]?.descriptionHi &&
                                        errors.benefit?.[index]?.descriptionHi
                                      }
                                    />
                                  </Stack>
                                </Grid>
                                <Grid
                                  item
                                  xs={1}
                                  sx={{
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "flex-end",
                                    pt: 1,
                                  }}
                                >
                                  {values.benefit.length > 1 && (
                                    <IconButton
                                      onClick={() => remove(index)}
                                      size="small"
                                      aria-label="delete"
                                      sx={{ m: 0, p: 0 }}
                                    >
                                      <DeleteOutlinedIcon color="error" />
                                    </IconButton>
                                  )}
                                </Grid>
                                {index === values.benefit.length - 1 &&
                                  values.benefit.length < 3 && (
                                    <Grid item xs={12} sx={{ pt: 1 }}>
                                      <Button
                                        onClick={() =>
                                          push({
                                            title: "",
                                            titleHi: "",
                                            description: "",
                                            descriptionHi: "",
                                          })
                                        }
                                        variant="text"
                                      >
                                        Add Benefit
                                      </Button>
                                    </Grid>
                                  )}
                              </Grid>
                            ))}
                          </Box>
                        )}
                      </FieldArray>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{ mb: 1 }}>
                      <Typography
                        className="policy-form-label policy-text-field-label"
                        sx={{ mb: 1 }}
                      >
                        Items <span className="required-icon">*</span>
                      </Typography>
                      <FieldArray name="faq">
                        {({ push, remove }) => (
                          <Box>
                            {values.faq.map((item, index) => (
                              <Box
                                key={index}
                                sx={{
                                  mb: 3,
                                  borderRadius: "8px",
                                }}
                              >
                                <Stack spacing={2}>
                                  <CustomTextField
                                    name={`faq.${index}.title`}
                                    placeholder="Title (English)"
                                    value={item.title}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    size="small"
                                    error={
                                      touched.faq &&
                                      touched.faq[index]?.title &&
                                      Boolean(errors.faq?.[index]?.title)
                                    }
                                    helperText={
                                      touched.faq &&
                                      touched.faq[index]?.title &&
                                      errors.faq?.[index]?.title
                                    }
                                  />

                                  {/* Title (Hindi) */}
                                  <CustomTextField
                                    name={`faq.${index}.titleHi`}
                                    placeholder="शीर्षक (हिंदी)"
                                    value={item.titleHi}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    size="small"
                                    error={
                                      touched.faq &&
                                      touched.faq[index]?.titleHi &&
                                      Boolean(errors.faq?.[index]?.titleHi)
                                    }
                                    helperText={
                                      touched.faq &&
                                      touched.faq[index]?.titleHi &&
                                      errors.faq?.[index]?.titleHi
                                    }
                                  />

                                  <CustomTextField
                                    name={`faq.${index}.description`}
                                    placeholder="Description (English)"
                                    value={item.description}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    size="small"
                                    error={
                                      touched.faq &&
                                      touched.faq[index]?.description &&
                                      Boolean(errors.faq?.[index]?.description)
                                    }
                                    helperText={
                                      touched.faq &&
                                      touched.faq[index]?.description &&
                                      errors.faq?.[index]?.description
                                    }
                                  />

                                  <CustomTextField
                                    name={`faq.${index}.descriptionHi`}
                                    placeholder="विवरण (हिंदी)"
                                    value={item.descriptionHi}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    size="small"
                                    error={
                                      touched.faq &&
                                      touched.faq[index]?.descriptionHi &&
                                      Boolean(
                                        errors.faq?.[index]?.descriptionHi
                                      )
                                    }
                                    helperText={
                                      touched.faq &&
                                      touched.faq[index]?.descriptionHi &&
                                      errors.faq?.[index]?.descriptionHi
                                    }
                                  />

                                  <CustomTextField
                                    name={`faq.${index}.price`}
                                    placeholder="Price"
                                    value={item.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    size="small"
                                    error={
                                      touched.faq &&
                                      touched.faq[index]?.price &&
                                      Boolean(errors.faq?.[index]?.price)
                                    }
                                    helperText={
                                      touched.faq &&
                                      touched.faq[index]?.price &&
                                      errors.faq?.[index]?.price
                                    }
                                  />

                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 2,
                                    }}
                                  >
                                    <input
                                      accept="image/*"
                                      type="file"
                                      style={{ display: "none" }}
                                      id={`faq-${index}-image`}
                                      onChange={(e) => {
                                        if (
                                          e.target.files &&
                                          e.target.files[0]
                                        ) {
                                          const file = e.target.files[0];
                                          setFieldValue(
                                            `faq.${index}.img`,
                                            file
                                          );
                                          setFieldValue(
                                            `faq.${index}.imgName`,
                                            file.name
                                          );
                                        }
                                      }}
                                    />
                                    <label htmlFor={`faq-${index}-image`}>
                                      <Button
                                        variant="outlined"
                                        component="span"
                                        size="small"
                                        sx={{ borderRadius: "2rem" }}
                                      >
                                        <img
                                          src={UploadIcon}
                                          alt="Upload"
                                          style={{ width: 20, marginRight: 8 }}
                                        />
                                        Upload Image
                                      </Button>
                                    </label>

                                    {item.img && (
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          background: "#f3f2f1",
                                          padding: "4px 10px",
                                          borderRadius: 12,
                                        }}
                                      >
                                        <Typography
                                          sx={{ fontFamily: "Poppins" }}
                                        >
                                          {item.img.name || item.imgName}
                                        </Typography>
                                        <IconButton
                                          size="small"
                                          onClick={() => {
                                            setFieldValue(
                                              `faq.${index}.img`,
                                              ""
                                            );
                                            setFieldValue(
                                              `faq.${index}.imgName`,
                                              ""
                                            );
                                          }}
                                        >
                                          <CloseIcon fontSize="small" />
                                        </IconButton>
                                      </Box>
                                    )}
                                  </Box>

                                  {values.faq.length > 1 && (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <IconButton
                                        onClick={() => remove(index)}
                                        size="small"
                                        aria-label="delete"
                                      >
                                        <DeleteOutlinedIcon color="error" />
                                      </IconButton>
                                    </Box>
                                  )}
                                </Stack>

                                {index === values.faq.length - 1 &&
                                  values.faq.length < 5 && (
                                    <Box sx={{ mt: 2 }}>
                                      <Button
                                        onClick={() =>
                                          push({
                                            title: "",
                                            titleHi: "",
                                            description: "",
                                            descriptionHi: "",
                                            price: "",
                                            img: "",
                                            imgName: "",
                                          })
                                        }
                                        variant="outlined"
                                      >
                                        Add Items
                                      </Button>
                                    </Box>
                                  )}
                              </Box>
                            ))}
                          </Box>
                        )}
                      </FieldArray>
                    </Grid>
                  </Box>

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
                        Create Chadhava
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
