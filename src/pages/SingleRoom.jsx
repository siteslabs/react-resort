import defaultBcg from "../images/room-1.jpeg"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useGlobalContext } from "../context"
import StyledHero from "../components/StyledHero"
import Banner from "../components/Banner"

const SingleRoom = (props) => {
  const [state, setState] = useState({
    slug: props.match.params.slug,
    defaultBcg,
  })
  const { getRoom } = useGlobalContext()
  const room = getRoom(state.slug)

  if (!room) {
    return (
      <div className="error">
        <h3>No such room could be found...</h3>
        <Link className="btn-primary" to="/rooms">
          back to rooms
        </Link>
      </div>
    )
  }

  const {
    extras,
    name,
    description,
    capacity,
    size,
    price,
    breakfast,
    pets,
    images,
  } = room

  const [mainImg, ...defaultImg] = images

  return (
    <>
      <StyledHero img={mainImg || defaultBcg}>
        <Banner title={`${name} room`}>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className="single-room">
        <div className="single-room-images">
          {defaultImg.map((image, index) => (
            <img src={image} key={index} alt="single-room" />
          ))}
        </div>
        <div className="single-room-info">
          <article className="desc">
            <h3>descrition</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price : ${price}</h6>
            <h6>size : {size} SQFT</h6>
            <h6>
              max capacity :
              {capacity > 1 ? `${capacity} people` : `${capacity} person`}
            </h6>
            <h6>{pets ? "pets  allowed" : "no pets allowed"}</h6>
            <h6>{breakfast && "free breakfast included"}</h6>
          </article>
        </div>
      </section>
      <section className="room-extras">
        <h6>Extras</h6>
        <ul className="extras">
          {extras.map((item, index) => (
            <li key={index}>- {item}</li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default SingleRoom
