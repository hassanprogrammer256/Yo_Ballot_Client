import { useEffect, useState } from "react";

const CountDown = () => {
  const [timeData, setTimeData] = useState({
    hoursRemaining: 0,
    minutesRemaining: 0,
    secondsRemaining: 0,
    percentageElapsed: 0,
    totalSecondsRemaining: 86400,
    totalSecondsElapsed: 0
  });

  useEffect(() => {
    const calculateTimeData = () => {
      const now = new Date();
      const startOfDay = new Date(now);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(now);
      endOfDay.setHours(23, 59, 59, 999);
      
      const totalDaySeconds = 86400; // 24 hours in seconds
      const elapsedSeconds = Math.floor((now.getTime() - startOfDay.getTime()) / 1000);
      const remainingSeconds = Math.max(0, totalDaySeconds - elapsedSeconds);
      
      // Calculate remaining time (for countdown display)
      const hoursRemaining = Math.floor(remainingSeconds / 3600);
      const minutesRemaining = Math.floor((remainingSeconds % 3600) / 60);
      const secondsRemaining = remainingSeconds % 60;
      
      // Calculate percentage elapsed (for progress circle)
      const percentageElapsed = (elapsedSeconds / totalDaySeconds) * 100;
      
      setTimeData({
        hoursRemaining: hoursRemaining,
        minutesRemaining: minutesRemaining,
        secondsRemaining: secondsRemaining,
        percentageElapsed: Math.min(100, percentageElapsed),
        totalSecondsRemaining: remainingSeconds,
        totalSecondsElapsed: elapsedSeconds
      });
    };

    calculateTimeData();
    const timer = setInterval(calculateTimeData, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  // Calculate circle properties for elapsed percentage
  const size = 300;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // For elapsed percentage, we want to fill the circle as time passes
  // strokeDashoffset starts at circumference (empty) and decreases to 0 (full)
  const strokeDashoffset = circumference - (timeData.percentageElapsed / 100) * circumference;

  // Determine color based on elapsed percentage
  const getProgressColor = (percentage: number): string => {
    if (percentage < 33) return '#22c55e'; // green-500 (morning)
    if (percentage < 66) return '#eab308'; // yellow-500 (afternoon)
    return '#ef4444'; // red-500 (evening/night)
  };

  const progressColor = getProgressColor(timeData.percentageElapsed);

  return (
    <div className='relative w-[50vh] h-[50vh] flex items-center justify-center'>
      {/* SVG Circular Progress - Shows ELAPSED percentage */}
      <svg
        className='absolute top-0 left-0 w-full h-full -rotate-90 transform'
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke='#e6e6e6'
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle - fills as time passes */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap='round'
          className='transition-all duration-1000 ease-linear'
          style={{
            filter: `drop-shadow(0 0 6px ${progressColor})`
          }}
        />
      </svg>

      {/* Inner content */}
      <div className='relative bg-linear-to-br from-gray-50 to-gray-100 rounded-full w-[85%] h-[85%] flex flex-col items-center justify-center shadow-2xl border-4 border-gray-800'>
        {/* Decorative inner circle */}
        <div className='absolute inset-4 border-2 border-gray-800 border-dashed rounded-full opacity-30'></div>
        
        {/* Title */}
        <div className='text-center mb-2 z-10'>
          <h2 className='text-gray-900 font-bold text-xl uppercase tracking-wider'>
            Ends In
          </h2>
          <div className='w-16 h-0.5 bg-gray-800 mx-auto mt-2'></div>
        </div>

        {/* Percentage Elapsed Display */}
        <div className='absolute top-6 right-6 bg-gray-800 text-white rounded-full w-16 h-16 flex items-center justify-center text-xl font-bold shadow-lg border-4 border-white'>
          {Math.round(timeData.percentageElapsed)}%
        </div>

        {/* COUNTDOWN display - showing REMAINING time */}
        <div className='flex items-center justify-center gap-2 z-10 mt-4'>
          <div className='text-center'>
            <div className='text-3xl md:text-4xl font-black bg-transparent px-2 py-1 rounded-lg text-gray-800'>
              {formatNumber(timeData.hoursRemaining)}
            </div>
            <span className='text-[10px] md:text-xs uppercase tracking-wider mt-1 block font-semibold text-gray-700'>
              Hours
            </span>
          </div>

          <div className='text-3xl font-black text-gray-800'>:</div>

          <div className='text-center'>
            <div className='text-3xl md:text-4xl font-black bg-transparent px-2 py-1 rounded-lg text-gray-800'>
              {formatNumber(timeData.minutesRemaining)}
            </div>
            <span className='text-[10px] md:text-xs uppercase tracking-wider mt-1 block font-semibold text-gray-700'>
              Mins
            </span>
          </div>

          <div className='text-3xl font-black text-gray-800'>:</div>

          <div className='text-center'>
            <div className='text-3xl md:text-4xl font-black bg-transparent px-2 py-1 rounded-lg text-gray-800'>
              {formatNumber(timeData.secondsRemaining)}
            </div>
            <span className='text-[10px] md:text-xs uppercase tracking-wider mt-1 block font-semibold text-gray-700'>
              Secs
            </span>
          </div>
        </div>

        <div className='absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg whitespace-nowrap'>
          {formatNumber(timeData.hoursRemaining)}h {formatNumber(timeData.minutesRemaining)}m LEFT
        </div>
      </div>
    </div>
  );
};

export default CountDown;