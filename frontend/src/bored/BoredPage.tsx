import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoredSite from "./BoredSite";

const BoredPage = () => {
  const [sites, setSites] = useState([
    "https://zoomquilt.org/",
    "https://justtypestuff.com/",
    "https://nycrat.github.io/tic-tac-toe/",
    "https://optical.toys/",
    "https://checkbox.toys/",
    "https://paint.toys/",
    "https://maze.toys/",
    "https://puginarug.com/",
    "https://nycrat.github.io/reaction-time-test/",
    "https://longdogechallenge.com/",
    "https://nycrat.github.io/music-generator-site/",
    "https://weirdorconfusing.com/",
    "https://mondrianandme.com/",
    "https://onesquareminesweeper.com/",
    "https://floatingqrcode.com/",
    "https://sliding.toys/",
    "https://alwaysjudgeabookbyitscover.com/",
    "https://cursoreffects.com/",
    "https://tholman.com/binary-music-player/",
    "https://smashthewalls.com/",
    "http://corndog.io/",
    "https://heeeeeeeey.com/ ",
    "http://eelslap.com/",
    "https://checkboxrace.com/",
    "http://drawing.garden/",
    "https://trypap.com/",
    "http://www.everydayim.com/",
    "http://randomcolour.com/",
    "https://cat-bounce.com/",
    "http://maninthedark.com/",
    "https://chrismckenzie.com/",
    "http://www.koalastothemax.com/",
    "https://www.trashloop.com/",
    "http://www.rrrgggbbb.com/",
    "https://pointerpointer.com/",
    "http://lacquerlacquer.com/",
    "https://www.yesnoif.com/",
    "https://thisisnotajumpscare.com/",
    "http://chihuahuaspin.com/",
    "http://spaceis.cool/",
  ]);

  const navigate = useNavigate();

  const handleSetActive = (i: number) => {
    let newSites = [...sites];
    const temp = newSites[i];
    newSites[i] = newSites[0];
    newSites[0] = temp;
    setSites(newSites);
  };

  return (
    <div className="background-dimmer">
      <h1 className="header-title" onClick={() => navigate("/")}>
        What should I do with my life?
      </h1>
      <div className="bored-page">
        <div>
          <BoredSite url={sites[0]} active={true} setActive={() => {}} />
        </div>
        <div className="things">
          {sites.map(
            (site, i) =>
              i !== 0 && (
                <div>
                  <BoredSite
                    key={i}
                    url={site}
                    active={i === 0}
                    setActive={() => handleSetActive(i)}
                  />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default BoredPage;
