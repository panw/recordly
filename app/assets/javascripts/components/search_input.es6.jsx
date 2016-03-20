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
        term: term,
        limit: 200
      },
      dataType: 'jsonp'
    })
    .then((response) => {
    	return _.sortBy(response.results, 'collectionName')
    					.reduce((albums, song) => {
    						let currAlbum = albums.length ? albums[albums.length-1] : null;
    						if(!currAlbum || currAlbum.title !== song.collectionName) {
    							albums.push({
    								title: song.collectionName,
    								artist: song.artistName,
    								coverUrl: song.artworkUrl100,
    								songs: [song]
    							});
    						} else {
    							currAlbum.songs.push(song);
    						}
    						return albums;
    					}, []);
    })
    .done((albums) => {
      console.log(albums);
      setResults(albums);
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