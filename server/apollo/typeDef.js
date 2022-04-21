const {ApolloServer,gql,IResolverObject} = require('apollo-server');


const typeDefs = gql`
type User {
  name: String
  email: String
  phone: String
  address:String
}

type Category
{
    categoryId:String!
    image:String!
    name:String!
    subcategories:[Subcategory]
}

type Subcategory
{
    subcategoryId:String
    name:String
    image:String
    categoryId:String
    products:[Product]
}

type Product
{
    productId:String
    productName:String
    productDescription:String
    productImage:String
    quantities:[Quantity]
    categoryId:String
    subcategoryId:String
}
type Quantity
{
    quantityId:String
    cost:String
    discount:String
    quantity:String
}
type Banner
{
    categoryId:String
    subcategoryId:String
    image:String
    products:[Product]
}
type Order
{
    orderId:String
    orderDate:String
    orderTime:String
    userId:String
    products:[OrderProduct]
}
type OrderProduct
{
    productId:String
    productName:String
    productDescription:String
    productImage:String
    cost:String
    discount:String
    quantity:String
}
type HomeProduct
{
    categoryId:String,
    subcategoryId:String
    image:String
}
type HomeGrid
{
    rowId:String
    title:String
    items:[HomeProduct]
}

type Query {
  getCategories : [Category]
  getSubcategories(categoryId:String):[Subcategory]
  getProducts(categoryId:String,subcategoryId:String):[Product]
  getAllProducts : [Product]
  getProduct(categoryId:String,subcategoryId:String,productId:String):Product
  getOrders(userId:String):[Order]
  getOrder(userId:String,orderId:String):Order
  myDetails(userId:String):User
  getGrid(row:String):HomeGrid
  getProductById(productId:String):Product
  getCart(products:[CartType]):[CartProduct]
 
}
type CartProduct
{
    productId:String
    productName:String
    productDescription:String
    productImage:String
    cost:String
    discount:String
    quantity:String
    quantityId:Int
    categoryId:String
    subcategoryId:String
    count:Int
}
input CartType
{
    productId:String,
    quantityId:Int,
    count:Int
}
input OrderType
{
    productId:String
    productName:String
    productDescription:String
    productImage:String
    cost:String
    discount:String
    quantity:String
    
}
type Mutation
{
    saveUser(name:String,email:String,phone:String,address:String):User
    saveOrder(orderId:String,
        orderDate:String,
        orderTime:String,
        userId:String
        products:[OrderType]
        ):Order

}
`;





  module.exports = typeDefs


  /*


   getMostPopular()
  getBestSeller()
  getDealofWeek()
  getBigDiscount
  */