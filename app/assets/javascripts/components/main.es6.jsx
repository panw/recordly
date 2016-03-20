class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResults: []
    };
    this.setSearchResults = (results) => this._setSearchResults(results);
  }
  componentDidMount() {
  }
  _setSearchResults(results) {
    this.setState({searchResults: results});
  }
  render() {
    let {searchResults} = this.state;
    return (
      <div>
        <SearchInput
          setResults={this.setSearchResults}
        />
        {searchResults.map((result, i) => {
          return (
            <Card key={i}
              data={result}
            />
          );
        })}
      </div>
    );
  }
}