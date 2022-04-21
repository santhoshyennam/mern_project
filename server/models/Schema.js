const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    userId:String,
    name:String,
    phone:String,
    email:String,
    address:String
});


const QuantitySchema = new mongoose.Schema(
    {
        quantityId:String,
        cost:String,
        discount:String,
        quantity:String
    });
const ProductSchema = new mongoose.Schema(
    {
        productId:String,
        productName:String,
        productDescription:String,
        productImage:String,
        categoryId:String,
        subcategoryId:String,
        quantities:[QuantitySchema]
    });
const SubcategorySchema = new mongoose.Schema(
    {
        subcategoryId:String,
        name:String,
        image:String,
        categoryId:String,
        products:ProductSchema
    });
const CategorySchema = new mongoose.Schema(
{
    categoryId:String,
    image:String,
    name:String,
    subcategories:[SubcategorySchema]
});
const OrderProductSchema = new mongoose.Schema(
    {
        productId:String,
        productName:String,
        productDescription:String,
        productImage:String,
        cost:String,
        discount:String,
        quantity:String,
        
    });
const OrderSchema = new mongoose.Schema(
{
    orderId:String,
    orderDate:String,
    orderTime:String,
    userId:String,
    products:[OrderProductSchema]
});

const HomeProductSchema = new mongoose.Schema(
    {
        categoryId:String,
        subcategoryId:String,
        image:String 

    }
)

const HomeGridSchema = new mongoose.Schema(
    {
        rowId:String,
        title:String,
        items:[HomeProductSchema]
    }
)

const CategoryModel = mongoose.model("Category", CategorySchema,"Category");
const UserModel = mongoose.model("Users", UserSchema,"Users");
const SubcategoryModel = mongoose.model("Subcategory", SubcategorySchema,"Subcategory");
const ProductModel = mongoose.model("Products", ProductSchema,"Products");
const OrderModel = mongoose.model("Orders", OrderSchema,"Orders");
const HomeGridModel = mongoose.model("Homepage", HomeGridSchema,"Homepage");
module.exports = {UserModel,CategoryModel,SubcategoryModel,ProductModel,OrderModel,HomeGridModel};