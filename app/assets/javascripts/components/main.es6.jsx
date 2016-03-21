class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.currentUser,
      albums: []
    };
    this.setSearchResults = (results) => this._setSearchResults(results);
  }
  _setSearchResults(results) {
    this.setState({albums: results});
  }
  render() {
    let { albums } = this.state;
    return (
      <div>
        <SearchInput
          currentUser={this.props.currentUser}
          setResults={this.setSearchResults}
        />
        <AlbumsList 
          currentUser={this.props.currentUser}
          favorites={this.props.favorites}
          albums={albums} 
        />
      </div>
    );
  }
}