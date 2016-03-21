class Track extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			favorited: props.favorited
		};
		this.handleFavorited = (event) => this._handleFavorited(event);
		this.createFavorite = (track) => this._createFavorite(track);
		this.findFavorite = (track) => this._createFavorite(track);
		this.deleteFavorite = (track) => this._deleteFavorite(track);
	}
	_handleFavorited(event) {
		event.stopPropagation();
		if(!this.props.currentUser) {
			location.href = '/users/sign_in';
			return;
		}

		// If favorited track and its corresponding album does not exist on the database yet, 
		// record both the track and album.
		let { iTunesId, title, artist, 
				coverUrl, previewUrl, iTunesAlbumId, 
				album, number, genre } = this.props.data;

		let albumParams = {
			title: album,
			iTunes_id: iTunesAlbumId, // since data is fetched from iTunes API
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
				// If an album has already been favorited and is clicked again
				// the user is probably trying to toggle (delete the favorite).
				let promise = favorited ? this.deleteFavorite(track) : this.createFavorite(track);
				promise.done((favorite) => {
					// Toggle state
					this.setState({favorited: !favorited});
				});
			});
		});
	}
	_createFavorite(track) {
		// Function to save user's favorited track
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
		// Find favorite record corresponding to the track
		// to identify the favorite record to be deleted
		let deletePromise = this.findFavorite(track).done((favorite) => {
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
				  </div>
				  <span className="media-right media-middle">				  	
			  		<i className={`favorite fa ${favoriteIcon}`}
			    		onClick={this.handleFavorited}
			    	/>
		    	</span>
				</div>
			</span>
		);
	}
}