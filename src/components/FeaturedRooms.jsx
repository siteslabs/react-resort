import { useGlobalContext } from "../context"
import Loading from "./Loading"
import Room from "./Room"
import Title from "./Title"

const FeaturedRooms = () => {
  let { featuredRooms: rooms, loading } = useGlobalContext()
  rooms = rooms.map((room) => <Room key={room.id} room={room} />)

  return (
    <section className="featured-rooms">
      <Title title="Featured rooms" />
      <div className="featured-rooms-center">
        {loading ? <Loading /> : rooms}
      </div>
    </section>
  )
}

export default FeaturedRooms
