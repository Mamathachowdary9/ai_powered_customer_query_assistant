import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  TextField,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  IconButton,
  Grid,
  Box,
} from "@mui/material";
import {
  ArrowBack,
  Person,
  SmartToy,
  Send,
  Inventory,
} from "@mui/icons-material";
import ForumIcon from "@mui/icons-material/Forum";
import Header from "./main/header/header";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  status: "active" | "inactive" | "out_of_stock";
  image: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 199.99,
      description:
        "Noise-cancelling wireless headphones with 30-hour battery life",
      stock: 50,
      status: "active",
      image:
        "data:image/png;base64,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",
    },
    {
      id: "2",
      name: "Smart Fitness Tracker",
      price: 89.99,
      description: "Track your steps, heart rate, and sleep patterns",
      stock: 120,
      status: "active",
      image:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ43U90WcFKPFDf1D4k6iVucRBcmijGF_JosqFgVJcacI8e_Tw_AEULZIuuO-DUL_T9oihxy3Ynl3P8bmm-re3lnzTghWO3vXIJXLjMYxO7505eE_hdeVOKjQ",
    },
  ];

  // Simulate fetching products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setProducts(mockProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <Box p={4} sx={{ backgroundColor: "#f1f3f6", height: "80vh" }}>
        {!selectedProduct && (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                <Card>
                  <CardHeader
                    title={product.name}
                    subheader={`$${product.price}`}
                    avatar={
                      <Avatar>
                        <Inventory />
                      </Avatar>
                    }
                  />
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <img
                      src={product.image}
                      alt=""
                      style={{
                        height: "8rem",
                        width: "8rem",
                      }}
                    ></img>
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {product.description}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => setSelectedProduct(product)}
                      startIcon={<ForumIcon />}
                    >
                      Chat with us
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}

export default App;
