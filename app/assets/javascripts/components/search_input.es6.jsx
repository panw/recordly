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
        limit: 10
      },
      dataType: 'jsonp'
    })
    .then((response) => {
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
      console.log(JSON.stringify(albums));
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