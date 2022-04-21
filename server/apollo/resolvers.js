const {fetch} =require("cross-fetch");
const {UserModel,CategoryModel,SubcategoryModel,ProductModel,OrderModel,HomeGridModel} =require("../models/Schema")
const resolvers = {
    Query: {

        getCategories : async (parent,args,context,info)=> 
        {
            const response = await CategoryModel.find()
            return response
        },
        getSubcategories: async (parent,args,context,info)=>
        {
            const response = await SubcategoryModel.find({categoryId:args.categoryId})
            return response
        },
        getProducts: async (parent,args,context,info)=>
        {
            if(args.subcategoryId)
            {
                
                const response = await ProductModel.find({categoryId:args.categoryId,subcategoryId:args.subcategoryId})
                console.log(response)
                return response
            }
            else
            {
                const response = await ProductModel.find({categoryId:args.categoryId})
                console.log(response)
                return response
            }
           

        },
        getProduct: async (parent,args,context,info)=>
        {
            const response = await ProductModel.findOne({categoryId:args.categoryId,subcategoryId:args.subcategoryId,productId:args.productId})
            return response
        },
        getOrders: async (parent,args,context,info)=>
        {
            const response = await OrderModel.find({userId:args.userId})
            return response
        },
        getOrder: async (parent,args,context,info)=>
        {
            const response = await OrderModel.findOne({userId:args.userId,orderId:args.orderId})
            return response
        },
        myDetails: async (parent,args,context,info)=>
        {
            const response = await UserModel.findOne({userId:args.userId})
           /// console.log(response[0])
            return response
        },
        getAllProducts: async ()=>{
            const response = await ProductModel.find()
            return response
        },
        getGrid: async (parent,args,context,info)=>{
            const response = await HomeGridModel.findOne({rowId:args.row})
           // console.log(response)
            return response
        },
        getProductById: async (parent,args,context,info)=>
        {
            
                const response = await ProductModel.findOne({productId:args.productId})
                console.log(response)
                return response    

        },
        getCart: async(parent,args,context,info)=>
        {
            var list = []
            var l=0
            console.log(args.products)
            while(l<args.products.length)
            {
                const quantityId = args.products[l].quantityId
                const response = await ProductModel.findOne({productId:args.products[l].productId})
                list.push({categoryId:response.categoryId,subcategoryId:response.subcategoryId,productId:response.productId,
                productName:response.productName,productImage:response.productImage,productDescription:response.productDescription,
                cost:response.quantities[quantityId].cost,discount:response.quantities[quantityId].discount,quantity:response.quantities[quantityId].quantity,
                quantityId:quantityId,count:args.products[l].count
            })
                console.log(list[l])
                l++
            }

            return list

        }

    },
    Category :
    {
        async subcategories(parent)
        {
            const response = await SubcategoryModel.find({categoryId:parent.categoryId})
            return response
        }
    },
    Subcategory : 
    {
        async products(parent)
        {
            const response = await ProductModel.find({categoryId:parent.categoryId,subcategoryId:parent.subcategoryId})
            return response
        }
    },
    Banner :
    {
        async products(parent)
        {
            const response = await ProductModel.find({categoryId:parent.categoryId,subcategoryId:parent.subcategoryId})
            return response
        }
    },
   
    Mutation:
    {
        async saveUser(parent,args,context,info)
        {
            try
            {
                const user = await UserModel.create({name:args.name,email:args.email,phone:args.phone,address:args.address})
                return user
            }
            catch(err)
            {
                console.log(err)
                return err
            }
        },
        async saveOrder(parent,args,context,info)
        {
            try
            {
                const orders = await OrderModel.create({orderId:args.orderId,orderDate:args.orderDate,orderTime:args.orderTime,userId:args.userId,
                    products:args.products
                    })
                    console.log(orders)
                return orders
            }
            catch(err)
            {
                console.log(err)
                return err
            }
        }
    }
  };
  


  module.exports = resolvers 