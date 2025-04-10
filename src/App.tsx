import "./App.css";
import { useState, useEffect } from "react";
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
  Autocomplete,
  Paper,
  Popper,
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
import Login from "./main/login/login";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  orderDate: string;
  deliveryDate: string;
  status: string;
  refundStatus: string;
  storePolicy: string;
  image: string;
  inStock: boolean;
  refundAmount: number;
  usageInstructions: string;
  warrantyPeriod: string;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  productId?: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);

  const QUESTIONS = [
    "What is this product?",
    "What is the product about?",
    "What does this product do?",
    "What does this amazing product offer?",
    "What is in this product?",
    "What does your product include?",
    "What is the main purpose of the product?",
    "What does the product actually do?",
    "Product description?",
    "Can I get the product description?",
    "What’s the product description?",
    "Please give me the product description.",
    "I’d like to read the product description.",
    "Could you explain what this product does?",
    "What is it used for?",
    "What can I do with this product?",
    "What are the product features?",
    "Can you list product features?",
    "Tell me about product features.",
    "What features does this product have?",
    "Are there any key features?",
    "What makes this product special?",
    "Tell me about the product.",
    "Can you tell me more about this product?",
    "I’d like to know about the product.",
    "Give me info about the product.",
    "Share some details about the product.",
    "Describe the product.",
    "Can you describe this product?",
    "Please describe the product.",
    "How would you describe the product?",
    "Give me a description of the product.",
    "How much does it cost?",
    "How much is the price?",
    "How much will this cost me?",
    "How much does the product cost?",
    "How much should I pay?",
    "How much is this item?",
    "What's the price of the product?",
    "Price of the product?",
    "Can you tell me the product price?",
    "What is the product’s price?",
    "Show me the price for the product.",
    "What's the price?",
    "What is the price?",
    "Can you tell me the price?",
    "I want to know the price.",
    "Product price?",
    "Tell me the product price.",
    "What’s the price tag of the product?",
    "Do you know the price of the product?",
    "What’s the cost of this?",
    "Cost of this item?",
    "How much is the cost of this?",
    "Can you tell me the cost of this?",
    "What is the name of the product?",
    "What’s the product name?",
    "What is the name of this item?",
    "What do you call this product?",
    "What is this item called?",
    "What is this product named?",
    "What’s the name of this product?",
    "Can you tell me the name of the product?",
    "I want the name of this product.",
    "Give me the name of the product.",
    "Tell me the name of this product.",
    "Product name?",
    "What's the product name?",
    "Do you know the product name?",
    "Can I get the product name?",
    "What did I order?",
    "Can you tell me what I ordered?",
    "I forgot what I ordered.",
    "Show me what I ordered.",
    "What is the product availability?",
    "Is it available now?",
    "Can I buy it?",
    "Is it available?",
    "Do you sell this?",
    "What’s the product availability?",
    "Can you tell me the product availability?",
    "Is the product available?",
    "What’s the availability status of the product?",
    "Availability of the product?",
    "Is the product currently available?",
    "Can you check product availability?",
    "Tell me about product availability.",
    "Is this in stock right now?",
    "Is the product available now?",
    "Available now?",
    "Is this available right now?",
    "Is the item available now?",
    "Am I able to purchase this?",
    "Can I order this now?",
    "Is it possible to buy this?",
    "Can I purchase this?",
    "Am I able to buy this?",
    "Is it possible to buy it?",
    "Is this available?",
    "Is this product available?",
    "Is it still available?",
    "Can you check if it's available?",
    "Are you selling this?",
    "Is this for sale?",
    "Can I purchase this from you?",
    "Are you selling this item?",
    "Do you offer this product?",
    "Is it in stock?",
    "Do you have it in stock?",
    "Is this currently in stock?",
    "Is it available in stock?",
    "Is it still in stock?",
    "Is this still available in stock?",
    "Do you still have this in stock?",
    "Is the item still in stock?",
    "What’s the product stock?",
    "Product stock status?",
    "Can you check the product stock?",
    "Do you have stock for this product?",
    "Is there stock left?",
    "Do you have any stock left?",
    "Is there any left in stock?",
    "Is stock remaining?",
    "Can you check stock?",
    "Check stock for this item?",
    "Please check the stock.",
    "Check if this is in stock?",
    "How to use this?",
    "How do I use this?",
    "Can you tell me how to use it?",
    "What is the way to use this?",
    "Instructions on how to use this?",
    "I need instructions.",
    "Do you have instructions?",
    "Where are the instructions?",
    "Show me the instructions.",
    "Provide instructions please.",
    "Do you have a usage guide?",
    "Give me the usage guide.",
    "I need the usage guide.",
    "Is there a usage guide for this?",
    "Where can I find the usage guide?",
    "How does it work?",
    "Can you explain how this works?",
    "What’s the working of this?",
    "How exactly does this work?",
    "Tell me how it works.",
    "What should I do to use this?",
    "Show me how to use this.",
    "Can you guide me on how to use it?",
    "Steps to use this?",
    "How do I operate the product?",
    "Show me how to operate the product.",
    "Product operation steps?",
    "Can I get help to operate the product?",
    "Instructions to operate the product?",
    "What is the warranty?",
    "Does it come with a warranty?",
    "Tell me about the warranty.",
    "Warranty details?",
    "Is warranty included?",
    "Is there a guarantee?",
    "Do you offer a guarantee?",
    "What’s the product guarantee?",
    "Tell me about the guarantee.",
    "Guarantee info?",
    "What’s the warranty period?",
    "Tell me the warranty period.",
    "How long is the warranty period?",
    "Warranty duration?",
    "Do you provide a warranty period?",
    "Is it under warranty?",
    "Is this item still under warranty?",
    "Is my product under warranty?",
    "Can you check if it’s under warranty?",
    "Is this covered by warranty?",
    "How long is the warranty?",
    "What is the warranty length?",
    "Duration of the warranty?",
    "For how many months is the warranty?",
    "Is there a long warranty?",
    "What is the delivery date?",
    "Can you tell me the delivery time?",
    "Delivery date please?",
    "When is the delivery date?",
    "I need the delivery time.",
    "When will it arrive?",
    "When is my order arriving?",
    "When does the product arrive?",
    "When should I expect it to arrive?",
    "When is it supposed to arrive?",
    "What’s the expected delivery?",
    "Expected delivery time?",
    "What is the expected delivery date?",
    "Expected delivery window?",
    "Can I know the expected delivery?",
    "What’s the shipping date?",
    "Shipping date details?",
    "When will it be shipped?",
    "Tell me the shipping date.",
    "When does it ship?",
    "Will it be delivered by tomorrow?",
    "Delivered by next week?",
    "Is it delivered by Friday?",
    "Can I get it delivered by a specific date?",
    "Will it be delivered by today?",
    "What’s my refund status?",
    "Can you check the refund status?",
    "I want to know the refund status.",
    "Refund status please.",
    "Status of my refund?",
    "Has my refund been processed?",
    "Do you know if the refund has been processed?",
    "Has the refund gone through?",
    "Refund processed yet?",
    "Is the refund processing complete?",
    "Is my refund done?",
    "Is the refund complete?",
    "Has my refund finished?",
    "Is the refund finalized?",
    "Is my refund already done?",
    "When will I get my refund?",
    "When can I expect the refund?",
    "When is the refund coming?",
    "When will the refund arrive?",
    "How soon will I get my refund?",
    "What’s my refund amount?",
    "Can you tell me the refund amount?",
    "I want to check the refund amount.",
    "Refund amount please.",
    "How much is the refund amount?",
    "How much will I be refunded?",
    "How much refund am I getting?",
    "How much is my refund?",
    "How much should I expect back?",
    "How much is the refund?",
    "How much will I get back as a refund?",
    "What do I get back in refund?",
    "Am I getting anything back?",
    "Will I get all my money back...",
  ];

  const mockProducts: Product[] = [
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 199.99,
      description:
        "Noise-cancelling wireless headphones with 30-hour battery life",
      stock: 50,
      orderDate: "2025-04-01",
      deliveryDate: "2025-04-08",
      status: "shipped",
      refundStatus: "not requested",
      refundAmount: 1299,
      storePolicy: "30-day return policy with original packaging.",
      inStock: true,
      usageInstructions:
        "Download the app and pair via Bluetooth to start tracking.",
      warrantyPeriod: "1 year",
      image:
        "data:image/png;base64,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",
    },
    {
      id: "2",
      name: "Smart Fitness Tracker",
      price: 89.99,
      description: "Track your steps, heart rate, and sleep patterns",
      stock: 120,
      inStock: true,
      orderDate: "2025-03-29",
      deliveryDate: "2025-04-03",
      status: "delivered",
      refundStatus: "refunded",
      refundAmount: 89.99,
      storePolicy: "Return within 15 days for a full refund.",
      usageInstructions:
        "Download the companion app, turn on Bluetooth, and follow the in-app setup to pair your tracker.",
      warrantyPeriod: "1 year",
      image:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQ43U90WcFKPFDf1D4k6iVucRBcmijGF_JosqFgVJcacI8e_Tw_AEULZIuuO-DUL_T9oihxy3Ynl3P8bmm-re3lnzTghWO3vXIJXLjMYxO7505eE_hdeVOKjQ",
    },
    {
      id: "3",
      name: "4K Ultra HD Smart TV",
      price: 499.99,
      description:
        "50-inch smart TV with built-in streaming apps and HDR support.",
      stock: 100,
      inStock: true,
      orderDate: "2025-03-29",
      deliveryDate: "2025-04-03",
      status: "delivered",
      refundStatus: "refunded",
      refundAmount: 499.99,
      storePolicy: "Return within 15 days for a full refund.",
      warrantyPeriod: "2 years",
      usageInstructions:
        "Plug in the TV, connect to Wi-Fi, and sign in to your favorite streaming apps.",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: "4",
      name: "Gaming Laptop GTX 4060",
      price: 1399.99,
      description:
        "High-performance gaming laptop with 16GB RAM and RTX 4060 GPU.",
      stock: 0,
      inStock: false,
      orderDate: "2025-03-28",
      deliveryDate: "2025-04-04",
      status: "delivered",
      refundStatus: "refunded",
      refundAmount: 1399.99,
      storePolicy: "Return within 15 days for a full refund.",
      warrantyPeriod: "1 year",
      usageInstructions:
        "Charge fully before use. Power on, complete OS setup, and install required drivers or updates.",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: "5",
      name: "Wireless Mouse & Keyboard Combo",
      price: 59.99,
      description:
        "Ergonomic design with silent typing and long-range Bluetooth.",
      stock: 75,
      inStock: true,
      orderDate: "2025-03-25",
      deliveryDate: "2025-03-30",
      status: "shipped",
      refundStatus: "not requested",
      refundAmount: 0.0,
      warrantyPeriod: "6 months",
      usageInstructions:
        "Insert batteries, turn on Bluetooth, and pair with your device.",
      storePolicy: "Exchange within 10 days if unopened.",
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: "6",
      name: "Portable Bluetooth Speaker",
      price: 79.99,
      description: "Waterproof speaker with powerful bass and 12-hour battery.",
      stock: 65,
      inStock: true,
      orderDate: "2025-04-02",
      deliveryDate: "2025-04-09",
      status: "processing",
      refundStatus: "not requested",
      storePolicy: "No returns on opened items.",
      refundAmount: 0.0,
      warrantyPeriod: "1 year",
      usageInstructions:
        "Charge fully, press and hold the power button to turn on, and pair via Bluetooth.",
      image:
        "data:image/jpeg;base64,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",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setProducts(mockProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setMessages([
        {
          id: "1",
          text: `Hello! I'm your AI assistant for ${selectedProduct.name}. How can I help you today?`,
          sender: "ai",
          timestamp: new Date(),
          productId: selectedProduct.id,
        },
      ]);
    }
  }, [selectedProduct]);

  const getTodayKey = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedProduct) return;

    const messageText = newMessage;
    setNewMessage("");
    setInputValue("");

    const productId = selectedProduct.id;
    const todayKey = getTodayKey();

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
      productId,
    };

    const stored = JSON.parse(localStorage.getItem("chatMessages") || "{}");
    const productChats = stored[productId] || {};
    const todayMessages = productChats[todayKey] || [];

    const updatedTodayMessages = [...todayMessages, userMessage];
    const updatedProductChats = {
      ...productChats,
      [todayKey]: updatedTodayMessages,
    };
    const updatedStored = {
      ...stored,
      [productId]: updatedProductChats,
    };

    setMessages(updatedTodayMessages);
    setNewMessage("");
    setIsTyping(true);
    localStorage.setItem("chatMessages", JSON.stringify(updatedStored));

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: selectedProduct,
          message: newMessage,
        }),
      });

      const data = await response.json();

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "Sorry, I couldn't understand that.",
        sender: "ai",
        timestamp: new Date(),
        productId,
      };

      const finalTodayMessages = [...updatedTodayMessages, aiResponse];
      updatedProductChats[todayKey] = finalTodayMessages;
      updatedStored[productId] = updatedProductChats;

      setMessages(finalTodayMessages);
      localStorage.setItem("chatMessages", JSON.stringify(updatedStored));
    } catch (error) {
      console.error("API error:", error);

      const errorResponse: Message = {
        id: (Date.now() + 2).toString(),
        text: "Oops! Something went wrong while fetching the response.",
        sender: "ai",
        timestamp: new Date(),
        productId,
      };

      const finalTodayMessages = [...updatedTodayMessages, errorResponse];
      updatedProductChats[todayKey] = finalTodayMessages;
      updatedStored[productId] = updatedProductChats;

      setMessages(finalTodayMessages);
      localStorage.setItem("chatMessages", JSON.stringify(updatedStored));
    } finally {
      setIsTyping(false);
    }
  };

  const getInitialMessage = (product: Product): Message => ({
    id: Date.now().toString(),
    text: `Hello! I'm your AI assistant for ${product.name}. How can I help you today?`,
    sender: "ai",
    timestamp: new Date(),
    productId: product.id,
  });

  const filtered = QUESTIONS.filter((q) =>
    q.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    if (selectedProduct) {
      const productId = selectedProduct.id;
      const todayKey = getTodayKey();

      const storedMessages = JSON.parse(
        localStorage.getItem("chatMessages") || "{}"
      );
      const productMessages = storedMessages[productId] || {};
      const todayMessages = productMessages[todayKey] || [];

      if (todayMessages.length > 0) {
        setMessages(todayMessages);
      } else {
        const initialMessage = getInitialMessage(selectedProduct);
        const updatedTodayMessages = [initialMessage];

        const updatedProductMessages = {
          ...productMessages,
          [todayKey]: updatedTodayMessages,
        };

        const updatedStoredMessages = {
          ...storedMessages,
          [productId]: updatedProductMessages,
        };

        localStorage.setItem(
          "chatMessages",
          JSON.stringify(updatedStoredMessages)
        );
        setMessages(updatedTodayMessages);
      }
    }
  }, [selectedProduct]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Login />
      {}
      {/* <>
        <Header />
        <Box
          p={4}
          sx={{
            backgroundColor: "#f1f3f6",
            maxHeight: !selectedProduct ? "80vh" : "88vh",
            overflowY: "scroll",
            paddingTop: selectedProduct && "0px !important",
          }}
        >
          {!selectedProduct ? (
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

                      <Typography
                        variant="body2"
                        color="textSecondary"
                        paragraph
                      >
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
          ) : (
            <Box maxWidth="md" mx="auto">
              <Button
                startIcon={<ArrowBack />}
                onClick={() => setSelectedProduct(null)}
              >
                Back to Products
              </Button>

              <Card>
                <CardHeader
                  sx={{
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
                    backgroundColor: "rgb(255, 255, 255)",
                    borderBottom: "2px solid rgb(240, 240, 240)",
                  }}
                  title={`AI Assistant for ${selectedProduct.name}`}
                  subheader="Ask me anything about this product"
                  avatar={
                    <Avatar>
                      <SmartToy />
                    </Avatar>
                  }
                />
                <CardContent
                  sx={{
                    padding: "0px !important",
                  }}
                >
                  <Box
                    height={400}
                    sx={{
                      overflowY: "auto",
                      bgcolor: "rgb(241, 243, 246)",
                      backgroundImage:
                        'url("https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/endless-clouds_5904c7.svg")',
                      borderRadius: 1,
                      p: 2,
                    }}
                  >
                    <List>
                      {messages.map((message) => (
                        <ListItem
                          key={message.id}
                          sx={{
                            justifyContent:
                              message.sender === "user"
                                ? "flex-end"
                                : "flex-start",
                          }}
                        >
                          <Box
                            display="flex"
                            flexDirection={
                              message.sender === "user" ? "row-reverse" : "row"
                            }
                            alignItems="flex-end"
                            maxWidth="80%"
                            gap={message.sender === "user" ? "0.8rem" : "0rem"}
                          >
                            <ListItemAvatar>
                              <Avatar sx={{ width: "30px", height: "30px" }}>
                                {message.sender === "user" ? (
                                  <Person sx={{ width: "0.8em" }} />
                                ) : (
                                  <SmartToy sx={{ width: "0.8em" }} />
                                )}
                              </Avatar>
                            </ListItemAvatar>
                            <Box
                              sx={{
                                bgcolor:
                                  message.sender === "user"
                                    ? "primary.main"
                                    : "rgb(255, 255, 255)",
                                color:
                                  message.sender === "user"
                                    ? "primary.contrastText"
                                    : "text.primary",
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                padding: "6px 12px",
                              }}
                            >
                              <ListItemText
                                primary={message.text}
                                primaryTypographyProps={{
                                  fontSize: "14px",
                                }}
                                secondary={new Date(
                                  message.timestamp
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                                secondaryTypographyProps={{
                                  fontSize: "10px",
                                  fontWeight: 500,
                                  color:
                                    message.sender === "user"
                                      ? "primary.contrastText"
                                      : "text.secondary",
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              />
                            </Box>
                          </Box>
                        </ListItem>
                      ))}
                      {isTyping && (
                        <ListItem>
                          <Box display="flex" alignItems="center">
                            <Avatar>
                              <SmartToy />
                            </Avatar>
                            <Box ml={1} display="flex">
                              {[...Array(3)].map((_, i) => (
                                <Box
                                  key={i}
                                  width={8}
                                  height={8}
                                  bgcolor="grey.500"
                                  borderRadius="50%"
                                  mr={i < 2 ? 1 : 0}
                                />
                              ))}
                            </Box>
                          </Box>
                        </ListItem>
                      )}
                    </List>
                  </Box>
                  <Box display="flex" gap={1}>
                    <Autocomplete
                      sx={{ width: "100%" }}
                      freeSolo
                      options={filtered}
                      inputValue={inputValue}
                      open={!!inputValue}
                      PopperComponent={(props) => (
                        <Popper
                          {...props}
                          placement="top-start"
                          modifiers={[
                            {
                              name: "offset",
                              options: {
                                offset: [0, 8],
                              },
                            },
                          ]}
                          style={{
                            zIndex: 1300,
                            transformOrigin: "bottom left",
                            ...props.style,
                          }}
                        />
                      )}
                      PaperComponent={(props) => (
                        <Paper
                          {...props}
                          sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            backdropFilter: "blur(5px)",
                            boxShadow: "none",
                            "& .MuiAutocomplete-listbox": {
                              maxHeight: "10rem",
                              overflow: "scroll",
                              scrollbarWidth: "none",
                              "&::-webkit-scrollbar": {
                                display: "none",
                              },
                            },
                          }}
                        />
                      )}
                      onInputChange={(e, newInputValue) => {
                        setInputValue(newInputValue);
                        setNewMessage(newInputValue);
                      }}
                      onChange={(e, selectedValue) => {
                        if (selectedValue) {
                          setNewMessage(selectedValue);
                          setInputValue(selectedValue);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          variant="outlined"
                          placeholder="Type your question..."
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "& fieldset": {
                                borderColor: "#fff !important",
                              },
                              "&:hover fieldset": {
                                borderColor: "#fff",
                              },
                            },
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleSendMessage();

                              setInputValue("");
                              setNewMessage("");
                            }
                          }}
                        />
                      )}
                    />
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setInputValue("");
                        handleSendMessage();
                      }}
                      disabled={!newMessage.trim()}
                    >
                      <Send />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          )}
        </Box>
      </> */}
    </>
  );
}

export default App;
