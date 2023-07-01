import React, { useEffect, useState } from 'react'
import { addProductApi, deleteProductApi, getAllProductsApi, getCount } from '../../../apis/Api'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {

    // for form data
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [productCategory, setProductCategory] = useState('')
    const [productDescription, setProductDescription] = useState('')

    //for count
    const [productCount, setProductCount] = useState(0)
    const [pendingOrderCount, setPendingOrderCount] = useState(0);
    const [deliveredOrderCount, setDeliveredOrderCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    // for response data
    const [products, setProducts] = useState([])

    // for image upload and preview
    const [productImage, setProductImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)

    const handleImageUpload = (event) => {
        setProductImage(event.target.files[0])

        const reader = new FileReader()
        reader.onload = () => {
            setPreviewImage(reader.result)
        }
        reader.readAsDataURL(event.target.files[0])
    }

    const handleSubmit = () => {
        const formData = new FormData()
        formData.append('productName', productName)
        formData.append('productPrice', productPrice)
        formData.append('productCategory', productCategory)
        formData.append('productDescription', productDescription)
        formData.append('productImage', productImage)

        // calling the api
        addProductApi(formData).then(res => {
            toast.success("Product added successfully")
        }).catch(err => {
            console.log(err)
            toast.error("Product add failed!!")
        })
    }


    useEffect(() => {
        getAllProductsApi().then(res => {
            setProducts(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    getCount().then(res => {
        setProductCount(res.data.productCount)
        setPendingOrderCount(res.data.pendingOrders)
        setDeliveredOrderCount(res.data.deliveredOrders)
        setUserCount(res.data.userCount)
    })

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?")
        if (confirmDelete) {
            deleteProductApi(id).then(res => {
                toast.success("Product deleted successfully")
            }).catch(err => {
                toast.error("Product delete failed!!")
            })

        }
    }

    //error form validation
    const [productNameError, setProductNameError] = useState('')
    const [productPriceError, setProductPriceError] = useState('')
    const [productCategoryError, setProductCategoryError] = useState('')
    const [productDescriptionError, setProductDescriptionError] = useState('')
    const [productImageError, setProductImageError] = useState('')

    const validate = () => {
        let isValid = true;

        if (productName === "") {
            setProductNameError("Product Name is required");
            isValid = false;
        }
        if (productPriceError === "") {
            setProductPriceError("PProduct Price is required");
            isValid = false;
        }
        if (productCategoryError === "") {
            setProductCategoryError("Product Category is required");
            isValid = false;
        }
        if (productDescriptionError === "") {
            setProductDescriptionError("Product Description is required");
            isValid = false;
        }
        if (productImageError === "") {
            setProductImageError("Product Image is required");
            isValid = false;
        }
        return isValid;
    }

    return (
        <>
            <div className='container mt-2'>
                <div className="row mt-3">
                    <div className="col-md-3">
                        <div className='card bg-danger bg-gradient text-white'>
                            <div className='card-header'>Total Products</div>
                            <div className="card-body">
                                <h3>{productCount}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className='card bg-info bg-gradient text-white'>
                            <div className='card-header'>Total Pending Orders</div>
                            <div className="card-body">
                                <h3>{pendingOrderCount}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className='card bg-warning bg-gradient text-white'>
                            <div className='card-header'>Total Delivered orders</div>
                            <div className="card-body">
                                <h3>{deliveredOrderCount}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className='card bg-success bg-gradient text-white'>
                            <div className='card-header'>Total Users</div>
                            <div className="card-body">
                                <h3>{userCount}</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-between mt-5'>
                    <h3>Admin Dashboard</h3>
                    <button type="button" class="btn btn-danger" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
                        Add Product
                    </button>

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Add product</h5>
                                    <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form action="">
                                        <div class="mb-3">

                                         <label htmlFor="">Product Name</label>
                                           <input
                                                onChange={(e) => setProductName(e.target.value)}
                                                type="text" class="form-control" placeholder='Enter product name' />
                                            {
                                                productNameError && <div className="text-danger">{productNameError}</div>
                                            }

                                            <label className='mt-2' htmlFor="">Product Price</label>
                                            <input
                                                onChange={(e) => setProductPrice(e.target.value)}
                                                type="text" class="form-control" placeholder='Enter product price' />
                                            {
                                                productPriceError && <div className="text-danger">{productPriceError}</div>
                                            }

                                            <label className='mt-2' htmlFor="">Product Category</label>
                                            <input
                                                onChange={(e) => setProductCategory(e.target.value)}
                                                type="text" class="form-control" placeholder='Enter product category' />
                                            {
                                                productCategoryError && <div className="text-danger">{productCategoryError}</div>
                                            }

                                            <label className='mt-2' htmlFor="">Product Description</label>
                                            <textarea
                                                onChange={(e) => setProductDescription(e.target.value)}
                                                className='form-control' name="" id="" rows={4}></textarea>{
                                                productDescriptionError && <div className="text-danger">{productDescriptionError}</div>
                                            }


                                            <label className='mt-2' htmlFor="">Product Image</label>
                                            <input onChange={handleImageUpload} type="file" class="form-control" placeholder='Enter product image' />
                                            {
                                                productImageError && <div className="text-danger">{productImageError}</div>
                                            }

                                            {
                                                previewImage && <img src={previewImage} alt="" className='object-cover rounded-3 mt-2' height={'300px'} width={'100%'} />
                                            }

                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={handleSubmit}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <table class="table mt-3">
                    <thead class="table-info">
                        <tr>
                            <th scope="col">Product Image</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Price</th>
                            <th scope="col">Category</th>
                            <th scope="col">Description</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            products.map(product => {
                                return (
                                    <tr>
                                        <td>
                                            <img src={product.image} alt="" height={40} />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.description}</td>
                                        <td>

                                            <div class="btn-group" role="group" aria-label="Basic example">
                                                <Link to={`/admin/product/edit/${product._id}`} type="button" class="btn btn-success">Edit</Link>
                                                <button type="button" class="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

            </div>
        </>
    )
}

export default AdminDashboard