class SearchInput extends React.Component {
  constructor() {
    super();
    this.handleSubmit = (e) => this._handleSubmit(e);
  }
  _handleSubmit(e) {
    e.preventDefault();
    let term = this.refs.term.value;
    let {setResults} = this.props;

    $.ajax({
      url: 'https://itunes.apple.com/search',
      data: {
        term: term
      },
      dataType: 'jsonp'
    })
    .done((response) => {
      console.log(response);
      setResults(response.results);
    });
  }
  render() {
    return (
      <form className='form-inline' onSubmit={this.handleSubmit}>
        <input type='text' ref='term' className='form-control' placeholder='Enter song, album, or artist'/>
        <button type='submit' className='btn btn-primary'>Search</button>
      </form>
    );
  }
}