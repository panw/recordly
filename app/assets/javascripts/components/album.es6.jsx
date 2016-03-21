
class Album extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			favorited: props.favorited ? true : false
		};
		this.handleFavorited = (event) => this._handleFavorited(event);
	}
	_handleFavorited(event) {
		event.stopPropagation();
		if(!this.props.currentUser) {
			location.href = '/users/sign_in';
			return;
		}
		let { title, artist, coverUrl, iTunesId } = this.props.data;
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
			$.ajax({
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
			})
			.then((favorited) => {
				this.setState({favorited: !this.state.favorited});
			})
		});
	}
	render() {
		let { coverUrl, title, artist } = this.props.data;
		let { favorited } = this.state;

		let favoriteIcon = favorited ? 'fa-heart' : 'fa-heart-o';
		return (
			<span className="list-group-item">
	    	<div className="media">
				  <span className="media-left" href="#">
				    <img className="media-object" src={coverUrl}/>
				  </span>
				  <div className="media-body">
				    <h4 className="media-heading">
				    	{title}
				    	<div className='small'>By {artist}</div>
				    </h4>
				    <button className='btn btn-primary'>
							<i className={`fa ${favoriteIcon}`}
				    		onClick={this.handleFavorited}
				    	/>
			    	</button>
				  </div>
				</div>
		  </span>
		);
	}
}