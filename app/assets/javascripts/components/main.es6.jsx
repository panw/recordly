class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      albums: []
    };
    this.setSearchResults = (results) => this._setSearchResults(results);
  }
  componentWillMount() {

  }
  _setSearchResults(results) {
    this.setState({albums: results});
  }
  render() {
    let { albums } = this.state;

    return (
      <div>
        <SearchInput
          setResults={this.setSearchResults}
        />
        <AlbumsList 
          user={this.props.user}
          albums={albums} 
        />
      </div>
    );
  }
}