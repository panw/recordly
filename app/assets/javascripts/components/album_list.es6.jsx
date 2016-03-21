class AlbumsList extends React.Component {
	render() {
		let { albums, favorites } = this.props;
		if(!albums)
			return null;

		return (
			<div id="albums-list" role="tabList" aria-multiselectable="true">
				{albums.map((album, i) => { 
					let titleLink = _.snakeCase(album.title);
					let isFavoritedAlbum = favorites.albums.find((favAlbum) => {
						return favAlbum.iTunes_id === album.iTunesId;
					}) ? true : false;
					return (
						<div key={i} className="panel panel-default">
			    		<div className="panel-heading" role="tab">
								<h4 className="panel-title">
									<a data-target={`#${titleLink}`} data-toggle='collapse'>
										<Album
											currentUser={this.props.currentUser}
											data={album}
											favorited={isFavoritedAlbum}
										/>
									</a>
								</h4>
							</div>
							<div id={titleLink} className="panel-collapse collapse">
								<div className='list-group'>
								{_.sortBy(album.tracks, 'number').map((track, i) => {
									let isFavoritedTrack = favorites.tracks.find((favTrack) => {
										return favTrack.iTunes_id === track.iTunesId;
									}) ? true : false;
									return (
										<Track key={i} 
											currentUser={this.props.currentUser}
											data={track} 
											favorited={isFavoritedTrack}
										/>	
									);
								})}
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}