import React, { useEffect, useState } from 'react'
import { getAllOrdersApi, updateOrderStatusApi } from '../../../apis/Api'
import { toast } from 'react-toastify'



const AdminOrders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getAllOrdersApi().then((res) => {
            console.log(res.data)
            setOrders(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const handleChangeStatus = (orderNumber, status) => {
        console.log(orderNumber, status)
        const orderStatus = {status}

        updateOrderStatusApi(orderNumber, orderStatus).then((res) => {
            toast.success("Order Status Updated")
            window.location.reload()
        }).catch((err) => {
            console.log(err)
            toast.error("Order Status not updated")
        })
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-3">
                    <div className='card p-3 bg-danger bg-gradient text-white'>
                        <h4>Total Orders</h4>
                        <h5>4</h5>
                        <hr />
                        <p></p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='card p-3 bg-info bg-gradient text-white'>
                        <h4>Orders Pending</h4>
                        <h5>4</h5>
                        <hr />
                        <p></p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='card p-3 bg-warning bg-gradient text-white'>
                        <h4>Orders In Process</h4>
                        <h5>4</h5>
                        <hr />
                        <p></p>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className='card p-3 bg-success bg-gradient text-white'>
                        <h4>Orders Delivered</h4>
                        <h5>4</h5>
                        <hr />
                        <p></p>
                    </div>
                </div>
            </div>
            <h3>My Orders</h3>

            {
                orders.map((orders) => (
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <h6>ORDER - {orders.orderNumber}</h6>
                            <div class="dropdown">
                                <button
                                    class="btn btn-primary dropdown-toggle"
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-mdb-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {orders.status}
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><button class="dropdown-item"
                                        onClick={() => handleChangeStatus(orders._id, "Pending")}>Pending
                                    </button></li>
                                    <li><button class="dropdown-item"
                                        onClick={() => handleChangeStatus(orders._id, "In Progress")}>In Progress
                                    </button></li>
                                    <li><button class="dropdown-item"
                                        onClick={() => handleChangeStatus(orders._id, "Delivered")}>Delivered
                                    </button></li>
                                </ul>
                            </div>
                        </div>
                        <div class="card-body">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Quantity</th>

                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                                {
                                    orders.cart.map((item) => (
                                        <tr>
                                            <th scope="row"><img src={item.image} alt="" width={100} /></th>
                                            <td>{item.name}</td>
                                            <td>{item.category}</td>
                                            <td>{item.price}</td>
                                            <td>{item.quantity}</td>
                                        </tr>
                                    ))
                                }

                            </table>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <div>
                                <h6>Order Date : {orders.orderedAt}</h6>
                            </div>
                            <div>
                                <h6>Shipping info : {orders.shippingAddress}</h6>
                            </div>
                            <div>
                                <h6>Total Price : {orders.totalAmount}</h6>
                            </div>

                        </div>

                    </div>
                ))
            }

        </div>
    )
}

export default AdminOrders