import { useGlobalContext } from "../context"
import RoomsFilter from "./RoomsFilter"
import RoomsList from "./RoomsList"
import Loading from "./Loading"

const RoomsContainer = () => {
  const { loading, sortedRooms, rooms } = useGlobalContext()

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </div>
  )
}

export default RoomsContainer
