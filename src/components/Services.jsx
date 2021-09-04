import Title from "./Title"
import { FaCocktail } from "react-icons/fa"
import { FaHiking } from "react-icons/fa"
import { FaShuttleVan } from "react-icons/fa"
import { FaBeer } from "react-icons/fa"

const Services = () => {
  const data = [
    {
      icon: <FaCocktail />,
      title: "free cocktail",
      info:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, cumque.",
    },
    {
      icon: <FaHiking />,
      title: "Endless hiking",
      info:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, cumque.",
    },
    {
      icon: <FaShuttleVan />,
      title: "free shuttle",
      info:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, cumque.",
    },
    {
      icon: <FaBeer />,
      title: "free Beer",
      info:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, cumque.",
    },
  ]
  return (
    <section className="services">
      <Title title="services" />
      <div className="services-center">
        {data.map((item, index) => (
          <article key={index} className="service">
            <span>{item.icon}</span>
            <h6>{item.title}</h6>
            <p>{item.info}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Services
