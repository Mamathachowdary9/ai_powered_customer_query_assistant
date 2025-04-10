import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  AlertColor,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Notify from "../common/notify";

const statusOptions = ["pending", "processing", "delivered", "cancelled"];
const refundOptions = ["not requested", "requested", "approved", "rejected"];

const AddProductPage: React.FC = () => {
  const products: any = localStorage.getItem("products");
  const [toastMsg, setToastMsg] = useState({
    severity: "success",
    msg: "",
  } as {
    severity: AlertColor;
    msg: string;
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const saveProductsToStorage = (products: any) => {
    localStorage.setItem("products", JSON.stringify(products));
  };

  const getNextProductId = () => {
    const currentId = parseInt(
      localStorage.getItem("lastProductId") || "7",
      10
    );
    const nextId = currentId + 1;
    localStorage.setItem("lastProductId", nextId.toString());
    return currentId.toString();
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      description: "",
      stock: 0,
      orderDate: "",
      deliveryDate: "",
      status: "",
      refundStatus: "",
      storePolicy: "",
      usageInstructions: "",
      warrantyPeriod: "",
      refundAmount: 0,
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      price: Yup.number().min(0).required("Price is required"),
      description: Yup.string().required("Description is required"),
      stock: Yup.number().min(0).required("Stock is required"),
      orderDate: Yup.string().required("Order date is required"),
      deliveryDate: Yup.string().required("Delivery date is required"),
      status: Yup.string().required("Status is required"),
      refundStatus: Yup.string().required("Refund Amount is required"),
      refundAmount: Yup.number().min(0).required("Stock is required"),
      storePolicy: Yup.string().required("Store policy is required"),
      warrantyPeriod: Yup.string().required("Warranty Period is required"),
      usageInstructions: Yup.string().required(
        "Usage Instructions is required"
      ),
      image: Yup.mixed()
        .required("Product image is required")
        .test("fileRequired", "Image is required", (value) => {
          return value instanceof File;
        }),
    }),
    onSubmit: async (values) => {
      setShowToast(true);
      setToastMsg({
        severity: "success",
        msg: "Product added successfully!",
      });
      let base64Image = "";
      if (values.image) {
        base64Image = await convertToBase64(values.image);
      }
      const newProduct = {
        ...values,
        id: getNextProductId(),
        inStock: values.stock > 0,
        image: base64Image,
      };
      const updatedProducts = [...JSON.parse(products), newProduct];
      saveProductsToStorage(updatedProducts);
      window.location.reload();
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0] ?? null;
    if (file) {
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ padding: "2rem" }}>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        encType="multipart/form-data"
        sx={{
          backgroundColor: "lightgray",
          padding: 4,
          borderRadius: 3,
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          mt: 5,
          marginBottom: "40px",
          color: "black",
        }}
      >
        <p
          style={{
            fontWeight: 600,
            color: "#333",
            textAlign: "center",
            fontSize: "1.5rem",
          }}
        >
          Add New Product
        </p>

        <TextField
          fullWidth
          label="Product Name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          sx={{ mb: 2 }}
        />

        {/* Price */}
        <TextField
          fullWidth
          type="number"
          label="Price"
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          sx={{ mb: 2 }}
        />

        {/* Stock */}
        <TextField
          fullWidth
          type="number"
          label="Stock"
          name="stock"
          value={formik.values.stock}
          onChange={formik.handleChange}
          error={formik.touched.stock && Boolean(formik.errors.stock)}
          helperText={formik.touched.stock && formik.errors.stock}
          sx={{ mb: 2 }}
        />

        {/* Description */}
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          sx={{ mb: 2 }}
        />

        {/* Order Date */}
        <TextField
          fullWidth
          type="date"
          label="Order Date"
          name="orderDate"
          InputLabelProps={{ shrink: true }}
          value={formik.values.orderDate}
          onChange={formik.handleChange}
          error={formik.touched.orderDate && Boolean(formik.errors.orderDate)}
          helperText={formik.touched.orderDate && formik.errors.orderDate}
          sx={{ mb: 2 }}
        />

        {/* Delivery Date */}
        <TextField
          fullWidth
          type="date"
          label="Delivery Date"
          name="deliveryDate"
          InputLabelProps={{ shrink: true }}
          value={formik.values.deliveryDate}
          onChange={formik.handleChange}
          error={
            formik.touched.deliveryDate && Boolean(formik.errors.deliveryDate)
          }
          helperText={formik.touched.deliveryDate && formik.errors.deliveryDate}
          sx={{ mb: 2 }}
        />

        {/* Status */}
        <TextField
          fullWidth
          select
          label="Status"
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          error={formik.touched.status && Boolean(formik.errors.status)}
          helperText={formik.touched.status && formik.errors.status}
          sx={{ mb: 2 }}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        {/* Refund Status */}
        <TextField
          fullWidth
          select
          label="Refund Status"
          name="refundStatus"
          value={formik.values.refundStatus}
          onChange={formik.handleChange}
          error={
            formik.touched.refundStatus && Boolean(formik.errors.refundStatus)
          }
          helperText={formik.touched.refundStatus && formik.errors.refundStatus}
          sx={{ mb: 2 }}
        >
          {refundOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          type="number"
          label="refundAmount"
          name="refundAmount"
          value={formik.values.refundAmount}
          onChange={formik.handleChange}
          error={
            formik.touched.refundAmount && Boolean(formik.errors.refundAmount)
          }
          helperText={formik.touched.refundAmount && formik.errors.refundAmount}
          sx={{ mb: 2 }}
        />

        {/* Store Policy */}
        <TextField
          fullWidth
          multiline
          rows={2}
          label="Store Policy"
          name="storePolicy"
          value={formik.values.storePolicy}
          onChange={formik.handleChange}
          error={
            formik.touched.storePolicy && Boolean(formik.errors.storePolicy)
          }
          helperText={formik.touched.storePolicy && formik.errors.storePolicy}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={2}
          label="Warranty Period"
          name="warrantyPeriod"
          value={formik.values.warrantyPeriod}
          onChange={formik.handleChange}
          error={
            formik.touched.warrantyPeriod &&
            Boolean(formik.errors.warrantyPeriod)
          }
          helperText={
            formik.touched.warrantyPeriod && formik.errors.warrantyPeriod
          }
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={2}
          label="Usage Instructions"
          name="usageInstructions"
          value={formik.values.usageInstructions}
          onChange={formik.handleChange}
          error={
            formik.touched.usageInstructions &&
            Boolean(formik.errors.usageInstructions)
          }
          helperText={
            formik.touched.usageInstructions && formik.errors.usageInstructions
          }
          sx={{ mb: 2 }}
        />

        {/* Image Upload */}
        <Box sx={{ mb: 2 }}>
          <Button variant="outlined" component="label">
            Upload Image
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              onBlur={() => formik.setFieldTouched("image", true)}
            />
          </Button>
          <p>
            {formik.touched.image && formik.errors.image && (
              <Typography variant="caption" color="error">
                {formik.errors.image}
              </Typography>
            )}
          </p>
          {imagePreview && (
            <Box mt={2}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                }}
              />
            </Box>
          )}
        </Box>

        {/* Submit */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1rem",
            py: 1.5,
            "&:hover": {
              backgroundColor: "#115293",
            },
          }}
        >
          Add Product
        </Button>
      </Box>
      <Notify
        open={showToast}
        severity={toastMsg.severity}
        onClose={() => setShowToast(false)}
      >
        <span>{toastMsg.msg}</span>
      </Notify>
    </Container>
  );
};

export default AddProductPage;
