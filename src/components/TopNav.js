import headerImg from '../assets/header.png'

export const TopNav = () => {
  return (
    <nav className="level">
      <p className="level-item has-text-centered">
        <img
          src={headerImg}
          alt="Phasmophobia paranormal guide"
          style={{ height: '150px' }}
        />
      </p>
    </nav>
  )
}

export default TopNav
