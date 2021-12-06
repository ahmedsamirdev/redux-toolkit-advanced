import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1', price: 44, title: "Product 1", description: "This is the first product"
  },
  { id: 'p2', price: 55, title: "Product 2", description: "This is the second product" },
  { id: 'p6', price: 66, title: "Product 3", description: "This is the third product" }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => <ProductItem
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
        />)}
      </ul>
    </section>
  );
};

export default Products;
