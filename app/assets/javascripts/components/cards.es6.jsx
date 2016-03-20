class Card extends React.Component {
  constructor() {
    super();
    this.addItem = (item) => this._addItem(item);
  }

  _addItem(item) {
    
  }

  render() {
    let {trackName, artworkUrl100} = this.props.data;
    return (
      <div className="card">
        <img className="card-img-top" src={artworkUrl100} alt="Card image cap"/>
        <div className="card-block">
          <h4 className="card-title">{trackName}</h4>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <button className="btn btn-primary" onClick={this.addItem}>Add</button>
        </div>
      </div>
    );
  }
}