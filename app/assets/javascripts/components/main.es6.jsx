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
      	<NavBar/>
        <SearchInput
          setResults={this.setSearchResults}
        />
        <AlbumsList albums={albums} />
      </div>
    );
  }
}

class AlbumsList extends React.Component {
	render() {
		let { albums } = this.props;
		
		if(!albums) 
			return null;

		return (
			<div id='albums-list'>
			{albums.map((album, i) => { 
				let albumId = _.snakeCase(album.title);
				return (
					<div key={i} className="list-group-item">
						<a href="#" data-toggle='collapse' data-target={`#${albumId}`} data-parent='#albums-list'>
							<div className="media">
							  <span className="media-left" href="#">
							    <img className="media-object" src={album.coverUrl}/>
							  </span>
							  <div className="media-body">
							    <h4 className="media-heading">
							    	{album.title}
							    	<div className='small'>By {album.artist}</div>
							    </h4>
							  </div>
							</div>
						</a>
						<div id={albumId} className='sublinks collapse'>
							{_.sortBy(album.tracks, 'number').map((track, i) => {
								return (
									<Track key={i} data={track} />	
								);
							})}
						</div>
					</div>
				);
			})}
			</div>
		);
	}
}

class Track extends React.Component {
	render() {
		let {title} = this.props.data;
		return (
			<span className="list-group-item small">
				<div className="media">
				  <div className="media-body">
				    <h4 className="media-heading">{title}</h4>
				  </div>
				</div>
			</span>
		);
	}
}