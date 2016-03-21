class NavBar extends React.Component{
  render() {
    let { currentUser } = this.props;
    return (
      <nav className="navbar navbar-full navbar-dark bg-primary">
        <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#main-navbar">
          &#9776;
        </button>
        <div className="collapse navbar-toggleable-xs" id="main-navbar">
          <a className="navbar-brand" href="/">Recordly</a>
          <ul className="nav navbar-nav navbar-full">
            
            {currentUser ?
              [
                <li key={1} className="nav-item pull-lg-right">
                  <a href='/users/sign_out' data-method="DELETE" role="button" className="btn btn-secondary-outline">Sign Out</a>
                </li>, 
                <li key={2} className="nav-item pull-lg-right">
                  <a href='/favorites' role="button" className="btn btn-secondary-outline">
                    <i className='fa fa-heart-o'/> Favorites
                  </a>
                </li>
              ]
                  
            :
              <li className="nav-item pull-lg-right">
                <a href='/users/sign_up' role="button" className="btn btn-secondary-outline">Sign Up / Sign in</a>
              </li>
            }
          </ul>
        </div>
      </nav>
    );
  }
}