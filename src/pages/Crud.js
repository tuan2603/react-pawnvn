import React, {Component} from 'react';
import './Crud.css';
import '../App.css';
import ProductItem from './CrudItem';
import ProductAdd from './CrudAdd';
import { getFromStorage, setInStorage } from '../utils/storage';
import socketIOClient from 'socket.io-client';

class CRUD extends Component {
    constructor(props){
        super(props);
        this.state = {
            products:[],
            endpoint: "http://125.212.216.80:8080",
        }

        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onSubmitEdit = this.onSubmitEdit.bind(this);
    }

    componentWillMount(){
        let products = getFromStorage('products');
        if (products) {
            this.setState({products});
        }
    }

    // method for emitting a socket.io event
    send = () => {
        const socket = socketIOClient(this.state.endpoint);

        // this emits an event to the socket (your server) with an argument of 'red'
        // you can make the argument any color you would like, or any kind of data you want to send.

        socket.emit('change color', 'red');
        // socket.emit('change color', 'red', 'yellow') | you can have multiple arguments
    }


    onDelete(name){
        let products = this.state.products;
        let filteredProducts = products.filter(product =>{
           return product.name !== name;
        });
        setInStorage('products',filteredProducts);
        this.setState({products: filteredProducts});

    }

    onAdd(name, price){
        let products = this.state.products;

        products.push({
            name,
            price
        })
        setInStorage('products',products);
        this.setState({products});
    }

    onSubmitEdit(name, price, key){
        let products = this.state.products;
        products =  products.map(product => {
            if (product.name === key) {
                product.name = name;
                product.price = price;
            }
            return product;
        })
        setInStorage('products',products);
        this.setState({products});
    }

    render() {
        const socket = socketIOClient(this.state.endpoint);
        socket.on('change color', (color) => {
            // setting the color of our button
            document.body.style.backgroundColor = color;
        })
        return (
            <div className="CRUD">

                <h1>Products manager</h1>
                <div style={{ textAlign: "center" }}>
                    <button onClick={() => this.send()}>Change Color</button>
                </div>
                <ProductAdd
                    onAdd={this.onAdd}
                />
                {
                    this.state.products.map(product => {
                      return (
                      <ProductItem
                       key={product.name}
                       {...product}
                          onDelete={this.onDelete}
                       onSubmitEdit={this.onSubmitEdit}
                      />
                      );
                    })
                }
            </div>
        );
    }
}

export default CRUD;
