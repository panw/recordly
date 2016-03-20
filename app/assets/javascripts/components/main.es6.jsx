class Main extends React.Component {
  constructor() {
    super();
    this.state = {
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
        <AlbumsList albums={albums} />
      </div>
    );
  }
}