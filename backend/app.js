const express = require("express");
const app = express();
const port = 80;
const db = require("./config/db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Brand = require("./models/Brand");
const Category = require("./models/Category");

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { name, email, phone, address, identification } = req.body;

    if (!name || !email || !phone || !address || !identification) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const buffer = Buffer.from(identification);
    const password = buffer.toString("utf-8");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword
    });
    res.status(200).json({
      success: true,
      message: "Registration successful"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, identification } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        loginSuccessfull: false,
        message: "Invalid Email"
      });
    }

    const buffer = Buffer.from(identification);
    const password = buffer.toString("utf-8");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        loginSuccessfull: false,
        message: "Invalid Password"
      });
    }

    res.status(200).json({
      loginSuccessfull: true,
      message: "Login successful",
      token: "sdsadsads",
      userName: user.name,
      role: "user"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/*  Brands   */

app.get("/brands", async (req, res) => {
  try {
    const brands = await Brand.find({}).populate("category");;
    res.status(200).json({
      message: "Brands fetched successfully",
      data: brands
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/brands", async (req, res) => {
  try {
    const { name, description, category } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const brandExists = await Brand.findOne({ name });

    if (brandExists) {
      return res.status(400).json({ message: "Brand already exists" });
    }

    const brands = await Brand.create({
      name,
      description,
      category
    });

    res.status(200).json({
      message: "Brands Added successfully",
      data: brands.name
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/brand/:id", async (req, res) => {
  try {
    const brands = await Brand.findById(req.params.id);
    if (!brands) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({
      message: "Brands fetched successfully",
      data: brands
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/brand/:id", async (req, res) => {
  try {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({
      message: "Brand deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/brand/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    const brand = await Brand.findByIdAndUpdate(req.params.id, {
      name,
      description
    });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json({
      message: "Brand updated successfully",
      data: brand
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/*  Brands   */

/*  Categories   */

app.get("/categories", async (req, res) => {
  try {
    const Categories = await Category.find({});
    res.status(200).json({
      message: "Categories fetched successfully",
      data: Categories
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/category", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const CategoryExists = await Category.findOne({ name });

    if (CategoryExists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const categories = await Category.create({
      name,
      description
    });

    res.status(200).json({
      message: "Category Added successfully",
      data: categories.name
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/category/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      message: "Category fetched successfully",
      data: category
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/category/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      message: "Category deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/category/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(req.params.id, {
      name,
      description
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      data: category
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


/*  Categories   */

app.listen(port, () => {
  console.log(`App Started successfully on port: ${port}`);
});
