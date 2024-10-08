import React, { useState, useEffect, useContext } from 'react';
import { Card, Image, Grid, Container } from 'semantic-ui-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import * as ProductService from '../services/ProductService';
import SortBy from './SortBy';
import { AuthContext } from '../AuthContext';


const Home = () => {
    const { userId, isAuthenticated } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const location = useLocation();
    const navigate= useNavigate();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const category = query.get('category');
        const type = query.get('type');

        const fetchProducts = async () => {
            try {
                let response;

                if (category && type) {
                    if (category === 'clothing') {
                        response = await ProductService.getClothingByCategory(type);
                    } else if (category === 'electronics') {
                        response = await ProductService.getElectronicsByCategory(type);
                    } else if (category === 'books') {
                        response = await ProductService.getBooksByCategory(type);
                    }
                } else if (category) {
                    if (category === 'clothing') {
                        response = await ProductService.getAllClothing();
                    } else if (category === 'electronics') {
                        response = await ProductService.getAllElectronics();
                    } else if (category === 'books') {
                        response = await ProductService.getAllBooks();
                    }
                } else {
                    if (isAuthenticated) {
                        response = await ProductService.getFilteredProducts(userId);
                        console.log("girdi");
                    } else {
                        response = await ProductService.getAllProducts();
                        console.log("girmedi");
                    }
                }

                if (sortOption) {
                    console.log('Sort Option:', sortOption); // Debugging line
                    response = await ProductService.sortProducts(sortOption);
                }
        
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };
        

        fetchProducts();
    }, [location, sortOption, userId, isAuthenticated]);

    const handleSortChange = (value) => setSortOption(value);

    const handleCardClick = (id) => {
        navigate(`/product/${id}`);
    };


    return (
        <Container style={{ padding: '20px' }}>
            <SortBy onSortChange={handleSortChange} />
            <Grid>
                <Grid.Row columns={4}>
                    {products.map(product => (
                        <Grid.Column key={product.id} style={{ marginBottom: '20px' }}>
                            <Card onClick={() => handleCardClick(product.id)}>
                                <Image src={product.imageUrl || 'https://via.placeholder.com/150'} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>{product.title}</Card.Header>
                                    <Card.Meta>{product.category}</Card.Meta>
                                    <Card.Meta>${product.price}</Card.Meta>
                                    <Card.Meta>
                                        <Link to={`/products/users/${product.userId}`}>
                                            User: {product.userId}
                                        </Link>
                                    </Card.Meta>
                                    <Card.Description>
                                        Average Score: {product.score || 'N/A'} / 5
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default Home;
