
import Navbar from "../../components/Navbar"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faMagnifyingGlass, faShoppingCart } from "@fortawesome/free-solid-svg-icons"
// import { useEffect, useState } from "react"
import axios from "axios"
import ProductContainer from "../../components/ProductContainer"
// import { useRouter } from "next/navigation"


async function fetchProducts(id){
    console.log(id)
    const productResponse = await fetch(`http://localhost:3000/api/product/${id}`,{
        cache: "force-cache",
        headers: {
            "Content-Type": "application/json",
        },
        next:{
            revalidate:100
        }
    })
    // console.log(productResponse.json())
    // console.log("Fetched product data")
    // console.log(productResponse.json())
    
    return productResponse.json()
}

export default async function Product({params}){

    const Product  = await fetchProducts(params.id)
    // const [productData, setProductData] = useState({
    //     productDesc: "",
    //     productName: "",
    //     productCost: 0,
    //     productImage: "",
    //     productType: ""
    // })
    // const [productId, setProductId] = useState("")
    // const [amount, setAmount] = useState(0)
    // const router = useRouter()
    // const getProductData = async () => {
    //     console.log(params.id)
    //     axios.get(`/api/product/${params.id}`).then((response)=>{
    //         console.log(response.data.product)
    //         const {productCost, productDesc, productImage, productName, productId, productType} = response.data.product
    //         setProductData(
    //             {productCost, productDesc, productImage, productName, productType} 
    //         )
    //         setProductId(productId)
    //     }).catch((error)=>{
    //         console.log(error.message)
    //     })
    // }


    
    // useEffect(()=>{
    //     getProductData()
    // }, [])




    return (
        <main className="bg-white-0">
            <Navbar></Navbar>
            
            {
                Product.productDesc == "" ?
            
            (
                <div className="flex justify-center items-center p-64">
                    <h1 className="text-4xl animate-bounce text-theme-2 font-bold">Loading...</h1>
                </div>
            )
            :
            (<ProductContainer Product = {Product}></ProductContainer>)
            }
            
        </main>
    )
}

// export async function getStaticProps() {
//     // Fetch data from an API or database
//     let ProductData = {}
//     axios.get(`/api/product/${params.id}`).then((response)=>{
//         console.log(response.data.product)
//         ProductData = response.data.product
//     }).catch((error)=>{
//         console.log(error.message)
//     })
  
//     // Return the data as props
//     return {
//       props: {
//         ProductData
//       },
//     };
// }

