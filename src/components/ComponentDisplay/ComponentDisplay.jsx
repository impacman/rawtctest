import RawPhoto from "../Raw/RawPhoto";
import RawVideo from "../Raw/RawVideo";
import Eva from "../Eva";
import Flur from "../Flur";
import Flur2 from "../Flur2";
import Flur3 from "../Flur3";
import Sdg from "../Sdg";
import MagnetVideo from "../Magnet/MagnetVideo";
import MagnetPhoto from "../Magnet/MagnetPhoto";

import N1 from "../New/N1";
import N2 from "../New/N2";
import N3 from "../New/N3";
import N4 from "../New/N4";
import N5 from "../New/N5";
import N6 from "../New/N6";
import N7 from "../New/N7";
import N8 from "../New/N8";
import N9 from "../New/N9";

const ComponentDisplay = ({ component, nextComponent }) => (
  <>
    <RawPhoto active={component === "raw-photo" ? true : false} />
    <RawVideo active={component === "raw-video" ? true : false} />
    <MagnetPhoto active={component === "magnet-photo" ? true : false} nextActiveComponent={nextComponent === "magnet-photo"} />
    <MagnetVideo active={component === "magnet-video" ? true : false} />
    <Eva active={component === "eva" ? true : false} />
    <Sdg active={component === "sdg" ? true : false} />
    <Flur active={component === "flur1" ? true : false} />
    <Flur2 active={component === "flur2" ? true : false} />
    <Flur3 active={component === "flur3" ? true : false} />
    <N1 active={component === "new1" ? true : false} />
    <N2 active={component === "new2" ? true : false} />
    <N3 active={component === "new3" ? true : false} />
    <N4 active={component === "new4" ? true : false} />
    <N5 active={component === "new5" ? true : false} />
    <N6 active={component === "new6" ? true : false} />
    <N7 active={component === "new7" ? true : false} />
    <N8 active={component === "new8" ? true : false} />
    <N9 active={component === "new9" ? true : false} />
  </>
);

export default ComponentDisplay;
