import React, { useState } from 'react'
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
const { TextArea } = Input;

const Genres = [
    { key: 1, value: "Soups" },
    { key: 2, value: "South Indian" },
    { key: 3, value: "Salad And Raitas" },
    { key: 4, value: "Rice" },
    { key: 5, value: "Ice Creams" },
    { key: 6, value: "Kulfi" },
    { key: 7, value: "Shakes" }
]

function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Genre, setGenre] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const GenreChangeHandler = (event) => {
        setGenre(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Title || !Description || !Price || !Genre || Images.length === 0) {
            return alert(" All values ​​must be entered.")
        }


   

        const body = {
           
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            Genres: Genre
        }

        Axios.post('/api/product', body)
            .then(response => {
                if (response.data.success) {
                    alert( 'Product upload was successful.')
                    props.history.push('/')
                } else {
                    alert('Product upload failed.')
                }
            })
    }


    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>Upload Food Item(s)</h2>
            </div>

            <Form onSubmit={submitHandler}>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input onChange={titleChangeHandler} value={Title} />
                <br />
                <br />
                <label>Description</label>
                <TextArea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>Price/Budget(Rs.)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price} />
                <br />
                <br />
                <select onChange={GenreChangeHandler} value={Genre}>
                    {Genres.map(item => (
                        <option key={item.key} value={item.key}> {item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <button type="submit">
                   Submit
                </button>
            </Form>


        </div>
    )
}

export default UploadProductPage
