import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const CountDown = ({stop}) => {

    const renderTime = (dimension, time) => {
        if (time ===0 ){
            stop(true)
        }
    return (
        <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>{dimension}</div>
        </div>
    );
    };

    return (
  <CountdownCircleTimer
    isPlaying
    duration={30}
    size= {100}
    strokeWidth= {6}
    colors={[["#218380"]]}
    // colors={[
    //   ['#004777', 0.33],
    //   ['#F7B801', 0.33],
    //   ['#A30000', 0.33],
    // ]}
  >
    {({ remainingTime }) => renderTime("sec", remainingTime)}
  </CountdownCircleTimer>
)}

export default CountDown;