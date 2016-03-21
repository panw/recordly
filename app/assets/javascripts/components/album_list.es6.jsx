class AlbumsList extends React.Component {
	render() {
		// let { albums } = this.props;
		if(!albums)
			return null;

		return (
			<div id="albums-list" role="tablist" aria-multiselectable="true">
				{albums.map((album, i) => { 
					let albumId = _.snakeCase(album.title);
					return (
						<div key={i} className="panel panel-default">
							<div className="panel-heading" role="tab" id="headingOne">
								<a href="#" className="list-group-item" data-toggle='collapse' data-target={`#${albumId}`} data-parent='#albums-list'>
									<Album data={album} />
								</a>
							</div>
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