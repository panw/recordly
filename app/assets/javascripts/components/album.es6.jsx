
class Album extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			favorited: props.favorited
		};
		this.handleFavorited = (event) => this._handleFavorited(event);
		this.createFavorite = (album) => this._createFavorite(album);
		this.findFavorite = (album) => this._createFavorite(album);
		this.deleteFavorite = (album) => this._deleteFavorite(album);
	}
	_handleFavorited(event) {
		event.stopPropagation();
		if(!this.props.currentUser) {
			location.href = '/users/sign_in';
			return;
		}

		// If favorited album does not exist on the database yet, record it.
		let { title, artist, coverUrl, iTunesId } = this.props.data;
		let { favorited } = this.state;
		let album = {
			iTunes_id: iTunesId, // since data is fetched from iTunes API
			title: title,
			artist: artist,
			cover_url: coverUrl	
		};
		$.ajax({
			url:'/albums',
			method: 'POST',
			data: { album: album }
		})
		.fail((xhr, status, error) => {
			console.log('status', status);
			console.log('error', error);
		})
		.then((album) => {
			// If an album has already been favorited and is clicked again
			// the user is probably trying to toggle (delete the favorite).
			let promise = favorited ? this.deleteFavorite(album) : this.createFavorite(album);
			promise.done((favorite) => {
				// Toggle state
				this.setState({favorited: !favorited});
			});
		});
	}
	_createFavorite(album) {
		// Function to save user's favorited album
		let promise = $.ajax({
			url: '/favorites',
			method: 'POST',
			data: { 
				favorite: {
					user_id: this.props.currentUser.id,
					favorited_id: album.id,
					favorited_type: 'Album'
				} 
			}
		})
		.fail((xhr, status, error) => {
			console.log('status', status);
			console.log('error', error);
		});
		return promise;
	}
	_deleteFavorite(album) {
		// Find favorite record corresponding to the album
		// to identify the favorite record to be deleted
		let deletePromise = this.findFavorite(album)
			.done((favorite) => {
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
		let { coverUrl, title, artist } = this.props.data;
		let { favorited } = this.state;

		// Determine active or inactive favorite icon to display based on state of an album
		let favoriteIcon = favorited ? 'fa-heart' : 'fa-heart-o';
		return (
			<span className="list-group-item">
	    	<div className="media">
				  <span className="media-left">				  	
				    <img className="media-object" src={coverUrl}/>
				  </span>
				  <div className="media-body">
				    <h4 className="media-heading">
				    	{title}
				    	<div className='small'>By {artist}</div>
				    </h4>
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