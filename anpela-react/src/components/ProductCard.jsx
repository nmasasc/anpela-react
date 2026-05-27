function ProductCard(props) {
  return (
    <div className="card">
      <img
        src={props.image}
        alt={props.name}
      />

      <h3>{props.name}</h3>

      <p>${props.price}</p>

      <button className={props.buttonClass}> 
        Buy Now
        </button>
    </div>
  )
}

export default ProductCard