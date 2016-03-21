class FavoritesList extends React.Component {
  render () {
  	let { albums, tracks } = this.props.favorites;
    return (
    	<div id="favorites" role="tablist" aria-multiselectable="true">
			  <div className="panel panel-default">
			    <div className="panel-heading" role="tab">
			      <h4 className="panel-title">
			        <a data-toggle="collapse" href="#albums">
			          Albums
			        </a>
			      </h4>
			    </div>
			    <div id="albums" className="panel-collapse collapse">
			      <div className="list-group">
						  {albums.map((album, i) => {
						  	return (
						  		<Album key={i}
						  			currentUser={this.props.currentUser}
						  			data={album}
						  			favorited={true}
						  		/>
						  	);
						  })}
						</div>
			    </div>
			  </div>
			  <div className="panel panel-default">
			    <div className="panel-heading" role="tab">
			      <h4 className="panel-title">
			        <a className="collapsed" data-toggle="collapse" href="#tracks">
			          Tracks
			        </a>
			      </h4>
			    </div>
			    <div id="tracks" className="panel-collapse collapse in" role="tabpanel">
			      <div className="list-group">
						  {tracks.map((track, i) => {
						  	return (
						  		<Track key={i}
						  			currentUser={this.props.currentUser}
						  			data={track}
						  			favorited={true}
						  		/>
						  	);
						  })}
						</div>
			    </div>
			  </div>
			</div>
    );
  }
}