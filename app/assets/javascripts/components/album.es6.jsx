
class Album extends React.Component {
	constructor() {
		super();
		this.state = {
			favorited: false
		};
		this.handleFavorited = (event) => this._handleFavorited(event);
	}
	_handleFavorited(event) {
		event.stopPropagation();
		console.log(this.props.currentUser);
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
			}).then((favorited) => {
				console.log('favorited', favorited);
			})
		});
	}
	render() {
		let { coverUrl, title, artist } = this.props.data;

		return (
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
						<i className='fa fa-heart-o'
			    		onClick={this.handleFavorited}
			    	/>
		    	</button>
			  </div>
			</div>
		);
	}
}