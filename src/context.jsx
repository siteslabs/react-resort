import React, { useContext, useEffect, useState } from "react"
import Client from "./Contentful"

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    maxPrice: 0,
    minPrice: 0,
    maxSize: 0,
    minSize: 0,
    breakfast: false,
    pets: false,
  })

  const formatData = (items) =>
    items.map((item) => {
      const id = item.sys.id
      const images = item.fields.images.map((image) => image.fields.file.url)

      const room = { ...item.fields, id, images }
      return room
    })

  const getRoom = (slug) => {
    const tempRooms = [...state.rooms]
    const room = tempRooms.find((room) => room.slug === slug)
    return room
  }

  const filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      maxSize,
      minSize,
      breakfast,
      pets,
    } = state

    let tempRooms = [...rooms]
    // transform value
    capacity = parseInt(capacity)
    price = parseInt(price)
    // filter by type
    if (type !== "all") {
      tempRooms = tempRooms.filter((room) => room.type === type)
    }
    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity)
    }
    // filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price)
    // filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size <= maxSize && room.size >= minSize
    )
    // filter by pets and breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter((room) => room.breakfast === true)
    }
    if (pets) {
      tempRooms = tempRooms.filter((room) => room.pets === true)
    }

    setState({
      ...state,
      sortedRooms: tempRooms,
    })
  }

  const handleChange = (e) => {
    const target = e.target
    const value = target.type === "checkbox" ? target.checked : target.value
    const name = e.target.name

    setState({
      ...state,
      [name]: value,
    })
  }

  const getData = async () => {
    try {
      const response = await Client.getEntries({
        content_type: "BeachResortRoom",
        order: "fields.price",
      })

      let rooms = formatData(response.items)
      let featuredRooms = rooms.filter((room) => room.featured === true)
      const maxPrice = Math.max(...rooms.map((item) => item.price))
      const maxSize = Math.max(...rooms.map((item) => item.size))

      setState({
        ...state,
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,
      })
    } catch (error) {}
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    filterRooms()
  }, [
    state.type,
    state.capacity,
    state.price,
    state.size,
    state.breakfast,
    state.pets,
  ])

  return (
    <AppContext.Provider
      value={{ ...state, getRoom, handleChange, filterRooms }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => useContext(AppContext)

export { AppContext, AppProvider }
