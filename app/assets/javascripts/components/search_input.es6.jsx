class SearchInput extends React.Component {
  constructor() {
    super();
    this.handleSubmit = (e) => this._handleSubmit(e);
  }
  _handleSubmit(e) {
    e.preventDefault();
    let term = this.refs.term.value;
    let { setResults } = this.props;

    // Utilizing the iTunes API as a search engine for Albums and Tracks.
    $.ajax({
      url: 'https://itunes.apple.com/search',
      data: {
        term: term,
        limit: 200
      },
      dataType: 'jsonp'
    })
    .then((response) => {
      // Data is returned as individual tracks so reduce it
      // to albums.
    	return _.sortBy(response.results, 'collectionName')
    					.reduce((albums, track) => {
    						let currAlbum = albums.length ? albums[albums.length-1] : null;
    						track = {
                  iTunesId: track.trackId,
    							title: track.trackName, 
									number: track.trackNumber, 
									artist: track.artistName,
									genre: track.primaryGenreName,
									previewUrl: track.previewUrl,
									album: track.collectionName,
                  iTunesAlbumId: track.collectionId,
									coverUrl: track.artworkUrl100
								};
    						if(!currAlbum || currAlbum.title !== track.album) {
    							albums.push({
                    iTunesId: track.iTunesAlbumId,
    								title: track.album,
    								artist: track.artist,
    								coverUrl: track.coverUrl,
    								tracks: [track]
    							});
    						} else {
    							currAlbum.tracks.push(track);
    						}
    						return albums;
    					}, []);
    })
    .done((albums) => {
      setResults(albums);
    });
  }
  render() {
    return (
      <form className='form-inline' id='search-form' onSubmit={this.handleSubmit}>
        <input type='text' ref='term' className='form-control' placeholder='Enter song, album, or artist'/>
        <button type='submit' className='btn btn-primary'>Search</button>
      </form>
    );
  }
}