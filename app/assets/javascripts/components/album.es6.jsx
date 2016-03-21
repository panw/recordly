
class Album extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			favorited: props.favorited
		};
		this.handleFavorited = (event) => this._handleFavorited(event);
		this.createFavorite = (album) => this._createFavorite(album);
		this.deleteFavorite = (album) => this._deleteFavorite(album);
	}
	_handleFavorited(event) {
		event.stopPropagation();
		if(!this.props.currentUser) {
			location.href = '/users/sign_in';
			return;
		}
		let { title, artist, coverUrl, iTunesId } = this.props.data;
		let { favorited } = this.state;
		let album = {
			iTunes_id: iTunesId,
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
			let promise = favorited ? this.deleteFavorite(album) : this.createFavorite(album);

			promise.done((favorite) => {
				this.setState({favorited: !favorited});
			});
		});
	}
	_createFavorite(album) {
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
		let deletePromise = this.createFavorite(album).done((favorite) => {
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
			    		style={{cursor: 'pointer'}}
			    	/>
		    	</span>
				</div>
		  </span>
		);
	}
}