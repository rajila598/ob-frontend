import React, { useEffect, useState } from 'react'
import { getOrdersByUserApi } from '../../apis/Api'

const Orders = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrdersByUserApi().then((res) => {
            console.log(res.data)
            setOrders(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className="container mt-3">
            <h3>My Orders</h3>

            {
                orders.map((orders) => (
                    <div class="card">
                        <div class="card-header d-flex justify-content-between">
                            <h6>ORDER - {orders.orderNumber}</h6>
                            <h6>{orders.status}</h6>
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

export default Orders