import Itinerary from "./components/Itinerary";
import Transport from "./components/Transport";
import BarsRestaurants from "./components/BarsRestaurants";
const Main = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        <div className="flex justify-center">
          <Transport />
        </div>
        <div className="flex justify-center">
          <Itinerary />
        </div>
        <div className="flex justify-center">
          <BarsRestaurants />
        </div>
      </div>
    </>
  );
};

export default Main;
