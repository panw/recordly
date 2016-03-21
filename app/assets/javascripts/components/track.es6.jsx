class Track extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			favorited: props.favorited
		};
		this.handleFavorited = (event) => this._handleFavorited(event);
		this.createFavorite = (track) => this._createFavorite(track);
		this.deleteFavorite = (track) => this._deleteFavorite(track);
	}
	_handleFavorited(event) {
		event.stopPropagation();
		if(!this.props.currentUser) {
			location.href = '/users/sign_in';
			return;
		}
		let { iTunesId, title, artist, 
				coverUrl, previewUrl, iTunesAlbumId, 
				album, number, genre } = this.props.data;

		let albumParams = {
			title: album,
			iTunes_id: iTunesAlbumId,
			artist: artist,
			cover_url: coverUrl
		};
		$.ajax({
			url:'/albums',
			method: 'POST',
			data: { album: albumParams }
		})
		.fail((xhr, status, error) => {
			console.log('status', status);
			console.log('error', error);
		})
		.then((album) => {
			let track = {
				iTunes_id: iTunesId,
				title: title,
				number: number,
				genre: genre,
				artist: artist,
				cover_url: coverUrl,
				preview_url: previewUrl,
				album_id: album.id
			};
			$.ajax({
				url:'/tracks',
				method: 'POST',
				data: { track: track }
			})
			.fail((xhr, status, error) => {
				console.log('status', status);
				console.log('error', error);
			})
			.then((track) => {
				let { favorited } = this.state;
				let promise = favorited ? this.deleteFavorite(track) : this.createFavorite(track);
				promise.done((favorite) => {
					this.setState({favorited: !favorited});
				});
			});
		});
	}
	_createFavorite(track) {
		let createPromise = $.ajax({
			url: '/favorites',
			method: 'POST',
			data: { 
				favorite: {
					user_id: this.props.currentUser.id,
					favorited_id: track.id,
					favorited_type: 'Track'
				} 
			}
		})
		.fail((xhr, status, error) => {
			console.log('status', status);
			console.log('error', error);
		});
		return createPromise;
	}
	_deleteFavorite(track) {
		let deletePromise = this.createFavorite(track).done((favorite) => {
			return $.ajax({
				url: `/favorites/${favorite.id}`,
				method: 'DELETE'
			})
			.fail((xhr, status, error) => {
				console.log('status', status);
				console.log('error', error);
			});
		});
		return deletePromise;
	}
	render() {
		let {title} = this.props.data;
		let { favorited } = this.state;
		let favoriteIcon = favorited ? 'fa-heart' : 'fa-heart-o';

		return (
			<span href="#" className="list-group-item">
				<div className="media">
				  <div className="media-body">
				    {title}
				    <i className={`fa ${favoriteIcon}`}
			    		onClick={this.handleFavorited}
			    	/>
				  </div>
				</div>
			</span>
		);
	}
}