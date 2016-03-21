class NavBar extends React.Component{
  render() {
    return (
      <nav className="navbar navbar-full navbar-light" style={{backgroundColor: "#e3f2fd"}}>
        <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#main-navbar">
          &#9776;
        </button>
        <div className="collapse navbar-toggleable-xs" id="main-navbar">
          <a className="navbar-brand" href="/">Recordly</a>
          <ul className="nav navbar-nav navbar-full">
            {this.props.currentUser ?
              <li className="nav-item pull-lg-right">
                <a href='/users/sign_out' data-method="DELETE" role="button" className="btn btn-primary-outline">Sign Out</a>
              </li>
            :
              <li className="nav-item pull-lg-right">
                <a href='/users/sign_up' role="button" className="btn btn-primary-outline">Sign Up / Sign in</a>
              </li>
            }
          </ul>
        </div>
      </nav>
    );
  }
}