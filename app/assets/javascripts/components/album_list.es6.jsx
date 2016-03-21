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
			    		<div className="panel-heading" role="tab">
								<h4 className="panel-title">
									<a data-toggle='collapse' data-target={`#${albumId}`} data-parent='#albums-list'>
										<Album
											currentUser={this.props.currentUser}
											data={album} 
										/>
									</a>
								</h4>
							</div>
							<div id={albumId} className="collapse">
								<div className='list-group'>
								{_.sortBy(album.tracks, 'number').map((track, i) => {
									return (
										<Track key={i} 
											currentUser={this.props.currentUser}
											data={track} 
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