const {fetch} =require("cross-fetch");
const {UserModel,CategoryModel,SubcategoryModel,ProductModel,OrderModel,BannerModel} =require("../models/Schema")
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
            const response = await ProductModel.find({categoryId:args.categoryId,subcategoryId:args.subcategoryId})
            return response
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
        getBanners: async (parent,args,context,info)=>
        {
            const response = await BannerModel.find()
            /// console.log(response[0])
             return response
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