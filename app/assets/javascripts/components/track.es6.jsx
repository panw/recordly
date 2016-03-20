class Track extends React.Component {
	render() {
		let {title} = this.props.data;
		return (
			<span className="list-group-item small">
				<div className="media">
				  <div className="media-body">
				    <h4 className="media-heading">{title}</h4>
				  </div>
				</div>
			</span>
		);
	}
}