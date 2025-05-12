import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import uploadRouter from "./routes/upload.router.js";
import subCategoryRouter from "./routes/subCategory.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import addressRouter from "./routes/address.route.js";
import orderRouter from "./routes/order.route.js";

dotenv.config();
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subcategory", subCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);
// app.use("/", (req, res) => {
//   res.send("Route and server running!!");
// });

const PORT = 8000 || process.env.PORT;
app.get("/", (request, response) => {
  ///server to client
  response.json({
    message: "Server is running " + PORT,
  });
});
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running @ 3000`);
  });
});
