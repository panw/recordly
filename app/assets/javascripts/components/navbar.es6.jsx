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
            <li className="nav-item pull-lg-right">
              <a href='#' role="button" className="btn btn-primary-outline">Sign Up / Sign in</a>
            </li>
            {/*
            <li className="nav-item pull-lg-left">
              <a className="nav-link" href="/posts">Top stories</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Staff picks</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item pull-xs-right navbar-text">
              <button type="button" className="btn btn-secondary-outline" data-toggle="modal" data-target="#account-modal">Sign in / Sign up</button>
            </li>
            */}
          </ul>
        </div>
      </nav>
    );
  }
}