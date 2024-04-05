import GithubIcon from './../../assets/icons/github.svg';

function Navigation() {
  return (
    <nav className="menu">
        <div>
          <h1 className="pacifico-regular">TYPEER</h1>
        </div>
        <div>
          <a href="https://github.com/GaryCantuche/01-typerr">
            <img target="_blank" src={GithubIcon} alt='Github Link'/>
          </a>
        </div>
    </nav>
  );
}

export default Navigation;