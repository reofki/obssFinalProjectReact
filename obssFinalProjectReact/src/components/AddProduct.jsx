import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const AddProduct = () => {
    const { userId, token } = useContext(AuthContext);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [explanation, setExplanation] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [property1, setProperty1] = useState('');
    const [property2, setProperty2] = useState('');
    const [property3, setProperty3] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Bu satırı en başta yerleştiriyoruz

        let productData = {
            title,
            explanation,
            imageUrl,
            price,
            amount,
            category:type,
        };

        switch (category) {
            case 'electronic':
                productData = {
                    ...productData,
                    brand: property1,
                    storage: property2,
                    ram: property3,
                };
                break;
            case 'clothing':
                productData = {
                    ...productData,
                    brand: property1,
                    size: property2,
                    color: property3,
                };
                break;
            case 'book':
                productData = {
                    ...productData,
                    author: property1,
                    genre: property2,
                    pageNumber: property3,
                };
                break;
            default:
                break;
        }

        try {
            const response = await axios.post(
                `http://localhost:8080/api/${category}/${userId}`,  // Uygun endpoint'i ekleyin
                productData,
            );
            console.log("Product added successfully:", response.data);
            alert("Product added successfully");
            //navigate('/');  // İşlem başarıyla tamamlandığında yönlendirme yapın
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const getTypeOptions = () => {
        switch (category) {
            case 'electronic':
                return [
                    { key: 'laptop', text: 'Laptop', value: 'laptop' },
                    { key: 'cellphone', text: 'CellPhone', value: 'cellphone' },
                    { key: 'tablet', text: 'Tablet', value: 'tablet' },
                ];
            case 'clothing':
                return [
                    { key: 'shorts', text: 'Shorts', value: 'shorts' },
                    { key: 'tshirt', text: 'T-Shirt', value: 'tshirt' },
                    { key: 'pants', text: 'Pants', value: 'pants' },
                    { key: 'jacket', text: 'Jacket', value: 'jacket' },
                ];
            case 'book':
                return [
                    { key: 'novel', text: 'Novel', value: 'novel' },
                    { key: 'story', text: 'Story', value: 'story' },
                    { key: 'biography', text: 'Biography', value: 'biography' },
                    { key: 'magazine', text: 'Magazine', value: 'magazine' },
                    { key: 'education', text: 'Education', value: 'education' },
                ];
            default:
                return [];
        }
    };

    const getPropertyLabels = () => {
        switch (category) {
            case 'electronic':
                return ['Brand', 'Storage', 'RAM'];
            case 'clothing':
                return ['Brand', 'Size', 'Color'];
            case 'book':
                return ['Author', 'Genre', 'Page Number'];
            default:
                return [];
        }
    };

    return (
        <Container>
            <Form>
                <Form.Input
                    label="Product Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Form.TextArea
                    label="Explanation"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                />
                <Form.Input
                    label="Image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                <Form.Input
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <Form.Input
                    label="Price"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Form.Select
                    label="Category"
                    options={[
                        { key: 'electronic', text: 'Electronic', value: 'electronic' },
                        { key: 'clothing', text: 'Clothing', value: 'clothing' },
                        { key: 'book', text: 'Book', value: 'book' },
                    ]}
                    value={category}
                    onChange={(e, { value }) => setCategory(value)}
                />
                {category && (
                    <>
                        <Form.Select
                            label="Type"
                            options={getTypeOptions()}
                            value={type}
                            onChange={(e, { value }) => setType(value)}
                        />
                        <Form.Input
                            label={getPropertyLabels()[0]}
                            value={property1}
                            onChange={(e) => setProperty1(e.target.value)}
                        />
                        <Form.Input
                            label={getPropertyLabels()[1]}
                            value={property2}
                            onChange={(e) => setProperty2(e.target.value)}
                        />
                        <Form.Input
                            label={getPropertyLabels()[2]}
                            value={property3}
                            onChange={(e) => setProperty3(e.target.value)}
                        />
                    </>
                )}
                <Button primary onClick={handleSubmit}>
                    Add Product
                </Button>
            </Form>
        </Container>
    );
};

export default AddProduct;
