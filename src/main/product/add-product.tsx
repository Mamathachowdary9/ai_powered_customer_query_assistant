import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const statusOptions = ["pending", "processing", "delivered", "cancelled"];
const refundOptions = ["not requested", "requested", "approved", "rejected"];

interface ProductFormValues {
  name: string;
  price: number;
  description: string;
  stock: number;
  orderDate: string;
  deliveryDate: string;
  status: string;
  refundStatus: string;
  storePolicy: string;
  image: File | null;
}

const AddProductPage: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const formik = useFormik<ProductFormValues>({
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
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      price: Yup.number()
        .min(0, "Price must be positive")
        .required("Price is required"),
      description: Yup.string().required("Description is required"),
      stock: Yup.number()
        .min(0, "Stock must be positive")
        .required("Stock is required"),
      orderDate: Yup.string().required("Order date is required"),
      deliveryDate: Yup.string().required("Delivery date is required"),
      status: Yup.string().required("Status is required"),
      refundStatus: Yup.string().required("Refund status is required"),
      storePolicy: Yup.string().required("Store policy is required"),
    }),
    onSubmit: (values) => {
      console.log("Submitted product:", values);
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
    <Container maxWidth="md">
      <Box py={4}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 3, bgcolor: "#f9f9f9" }}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ color: "black", fontWeight: 600, fontSize: "2rem" }}
          >
            Add New Product
          </Typography>
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Grid container spacing={3}>
              {/* Name */}
              <Grid>
                <TextField
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  sx={{ fontSize: "1rem" }}
                  InputLabelProps={{ sx: { fontSize: "1rem", color: "black" } }}
                />
              </Grid>

              {/* Price & Stock */}
              <Grid>
                <TextField
                  fullWidth
                  type="number"
                  label="Price"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  InputLabelProps={{ sx: { fontSize: "1rem", color: "black" } }}
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  type="number"
                  label="Stock"
                  name="stock"
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                  error={formik.touched.stock && Boolean(formik.errors.stock)}
                  helperText={formik.touched.stock && formik.errors.stock}
                  InputLabelProps={{ sx: { fontSize: "1rem", color: "black" } }}
                />
              </Grid>

              {/* Description */}
              <Grid>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={3}
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                  InputLabelProps={{ sx: { fontSize: "1rem", color: "black" } }}
                />
              </Grid>

              {/* Dates */}
              <Grid>
                <TextField
                  fullWidth
                  type="date"
                  label="Order Date"
                  name="orderDate"
                  InputLabelProps={{ shrink: true, sx: { color: "black" } }}
                  value={formik.values.orderDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.orderDate && Boolean(formik.errors.orderDate)
                  }
                  helperText={
                    formik.touched.orderDate && formik.errors.orderDate
                  }
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  type="date"
                  label="Delivery Date"
                  name="deliveryDate"
                  InputLabelProps={{ shrink: true, sx: { color: "black" } }}
                  value={formik.values.deliveryDate}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.deliveryDate &&
                    Boolean(formik.errors.deliveryDate)
                  }
                  helperText={
                    formik.touched.deliveryDate && formik.errors.deliveryDate
                  }
                />
              </Grid>

              {/* Status */}
              <Grid>
                <TextField
                  fullWidth
                  select
                  label="Status"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                  InputLabelProps={{ sx: { fontSize: "1rem", color: "black" } }}
                  sx={{ border: "1px solid #ccc", borderRadius: 1, p: 1, m: 1 }}
                >
                  {statusOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Refund Status */}
              <Grid>
                <TextField
                  fullWidth
                  select
                  label="Refund Status"
                  name="refundStatus"
                  value={formik.values.refundStatus}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.refundStatus &&
                    Boolean(formik.errors.refundStatus)
                  }
                  helperText={
                    formik.touched.refundStatus && formik.errors.refundStatus
                  }
                  InputLabelProps={{ sx: { fontSize: "1rem", color: "black" } }}
                  sx={{ border: "1px solid #ccc", borderRadius: 2, p: 1, m: 1 }}
                >
                  {refundOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Store Policy */}
              <Grid>
                <TextField
                  fullWidth
                  label="Store Policy"
                  name="storePolicy"
                  multiline
                  rows={2}
                  value={formik.values.storePolicy}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.storePolicy &&
                    Boolean(formik.errors.storePolicy)
                  }
                  helperText={
                    formik.touched.storePolicy && formik.errors.storePolicy
                  }
                  InputLabelProps={{ sx: { fontSize: "1rem", color: "black" } }}
                />
              </Grid>

              {/* Upload Image */}
              <Grid>
                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    fontSize: "1rem",
                    color: "#1976d2",
                    borderColor: "#1976d2",
                  }}
                >
                  Upload Image
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImageChange}
                  />
                </Button>
                {imagePreview && (
                  <Box mt={2}>
                    <img
                      src={imagePreview}
                      alt="Product Preview"
                      style={{
                        maxWidth: "100%",
                        borderRadius: 8,
                        border: "1px solid #ccc",
                      }}
                    />
                  </Box>
                )}
              </Grid>

              {/* Submit Button */}
              <Grid>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#1976d2",
                    fontSize: "1rem",
                    padding: "10px",
                    fontWeight: 600,
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#115293",
                    },
                  }}
                >
                  Add Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddProductPage;
