class Track extends React.Component {
	constructor() {
		super();
		this.state = {
			favorited: false
		};
		this.handleFavorited = (event) => this._handleFavorited(event);
	}
	_handleFavorited(event) {
		event.stopPropagation();
		let { iTunesId, title, artist, coverUrl, previewUrl, iTunesAlbumId, number, genre } = this.props.data;
		let track = {
			iTunes_id: iTunesId,
			title: title,
			number: number,
			genre: genre,
			artist: artist,
			cover_url: coverUrl,
			preview_url: previewUrl
		};

		$.ajax({
			url:'/albums',
			method: 'POST',
			data: {
				album: { iTunes_id: iTunesAlbumId }
			}
		})
		.fail((xhr, status, error) => {
			console.log('status', status);
			console.log('error', error);
		})
		.then((album) => {
			console.log('album', album)
			$.ajax({
				url:'/tracks',
				method: 'POST',
				data: { track: _.merge(track, {album_id: album.id}) }
			})
			.fail((xhr, status, error) => {
				console.log('status', status);
				console.log('error', error);
			})
			.then((response) => {
				console.log('response', response)
				// if(response.)
			});
		});
	}
	render() {
		let {title} = this.props.data;
		return (
			<span className="list-group-item small">
				<div className="media">
				  <div className="media-body">
				    {title}
				    <i className='fa fa-heart-o'
			    		onClick={this.handleFavorited}
			    	/>
				  </div>
				</div>
			</span>
		);
	}
}