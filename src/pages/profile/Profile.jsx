import React, { useState } from 'react'

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"))

    const [fname, setFname] = useState(user.fname)
    const [lname, setLname] = useState(user.lname)
    const [email, setEmail] = useState(user.email)
    const [profileImage, setProfileImage] = useState('')

    const handleImageUpload = (event) => {
        setProfileImage(event.target.files[0])

        
    }

    return (
        <div className='container mt-5'>
            <div className='row justify-content-evenly'>
                <div className='col-md-4'>
                    <div className="card text-center">
                        <div className="m-4 pt-3">
                            <img src="/assets/images/download.jpg" alt="" className='rounded-circle' /> <br /> <br />
                            <h2>Welcome, {user.fname} {user.lname}</h2>
                        </div>
                        <hr />
                        <div className="pt-2 pb-3">
                            <h6>Name: {user.fname} {user.lname}</h6>
                            <h6>Email: {user.email}</h6>

                        </div>
                    </div>
                    <div className="text-center mt-2">
                        <button type="button" className="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
                            Edit profile <i className='fas fa-user-edit'></i>
                        </button>
                    </div>



                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit Profile</h5>
                                    <button type="button" class="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form action="">
                                        <label htmlFor="fname">First name</label>
                                        <input value={fname} onChange={(e) => setFname(e.target.value)} type="text" name='fname' id='fname' className='form-control' />

                                        <label htmlFor="lname">Last name</label>
                                        <input value={lname} onChange={(e) => setLname(e.target.value)} type="text" name='lname' id='lname' className='form-control' />

                                        <label htmlFor="email">Email</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" name='femail' id='email' className='form-control' />

                                        <label htmlFor="profile">Profile</label>
                                        <input type="file" onChange={handleImageUpload} className='form-control' />
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Profile