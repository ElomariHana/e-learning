import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#17bf9e"]}
        percentFillValue={80}
        cardInfo={{
          title: "Total Course Sales",
          value: "$20.4K",
          text: "Courses",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={50}
        cardInfo={{
          title: "Total Revenue",
          value: "$8.2K",
          text: "Revenues",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: "Today's Sales",
          value: "$18.2K",
          text: "Sales",
        }}
      />
    </section>
  );
};

export default AreaCards;