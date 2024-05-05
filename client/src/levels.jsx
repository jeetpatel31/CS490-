import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './styles.css';

function Home() {
  const [userName, setUserName] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [levels, setLevels] = useState({
    chest: [
      {
        name: 'Stretching',
        sets: 1,
        repetitions: '10-15',
        description: 'Start with slow and controlled movements. Focus on stretching your chest muscles. Hold each stretch for about 15-30 seconds. Repeat for each stretch.',
        video: './workouts/chestStretch.mp4'
      },
      {
        name: 'Bench Press',
        sets: 3,
        repetitions: '8-12',
        description: 'Lie on a flat bench with your feet flat on the floor. Grip the barbell with hands slightly wider than shoulder-width apart. Lower the barbell to your chest, then press it back up explosively. Repeat for the prescribed number of repetitions.',
        video: 'https://video-previews.elements.envatousercontent.com/1b970427-3c79-45ba-a0de-e6eea5aebd55/watermarked_preview/watermarked_preview.mp4'
      },
      {
        name: 'Incline Bench Press',
        sets: 3,
        repetitions: '8-12',
        description: 'Adjust the bench to a 45-degree angle. Grip the barbell with hands slightly wider than shoulder-width apart. Lower the barbell to your upper chest, then press it back up explosively. Repeat for the prescribed number of repetitions.',
        video: 'https://example.com/incline-bench-press.mp4'
      },
      {
        name: 'Cable Fly',
        sets: 3,
        repetitions: '10-15',
        description: 'Stand between two cable machines. Hold a cable handle in each hand with arms outstretched to the sides. Bring your hands together in a controlled motion, squeezing your chest at the top of the movement. Slowly return to the starting position. Repeat for the prescribed number of repetitions.',
        video: 'https://example.com/cable-fly.mp4'
      }
    ],
    back: [
      {
        name: 'Back Stretch',
        sets: 1,
        repetitions: '10-15',
        description: 'Start with slow and controlled movements. Focus on stretching your back muscles. Hold each stretch for about 15-30 seconds. Repeat for each stretch.',
        video: 'https://example.com/back-stretch.mp4'
      },
      {
        name: 'Deadlifts',
        sets: 3,
        repetitions: '5-8',
        description: 'Stand with feet shoulder-width apart, barbell on the ground in front of you. Bend at the hips and knees to grip the barbell. Keeping your back straight, drive through your heels to lift the barbell until you are standing upright. Lower the barbell back to the ground with control. Repeat for the prescribed number of repetitions.',
        video: 'https://example.com/deadlifts.mp4'
      },
      {
        name: 'Pull-ups',
        sets: 3,
        repetitions: '6-10',
        description: 'Grab a pull-up bar with an overhand grip, hands slightly wider than shoulder-width apart. Hang with arms fully extended. Pull yourself up until your chin clears the bar, then lower yourself back down with control. Repeat for the prescribed number of repetitions.',
        video: 'https://example.com/pull-ups.mp4'
      },
      {
        name: 'Bent Over Rows',
        sets: 3,
        repetitions: '8-12',
        description: 'Hold a barbell with an overhand grip, hands slightly wider than shoulder-width apart. Bend at the hips, keeping your back straight, until your torso is nearly parallel to the ground. Pull the barbell towards your lower chest, then lower it back down with control. Repeat for the prescribed number of repetitions.',
        video: 'https://example.com/bent-over-rows.mp4'
      }
    ],
    shoulders: [
      {
        name: 'Shoulder Stretch',
        sets: 1,
        repetitions: '10-15',
        description: 'Start with slow and controlled movements. Focus on stretching your shoulder muscles. Hold each stretch for about 15-30 seconds. Repeat for each stretch.',
        video: 'https://example.com/shoulder-stretch.mp4'
      },
      {
        name: 'Overhead Press',
        sets: 3,
        repetitions: '8-12',
        description: 'Hold a barbell or dumbbells at shoulder height with palms facing forward. Press the weight overhead until arms are fully extended, then lower it back down with control. Repeat for the prescribed number of repetitions.',
        video: 'https://example.com/overhead-press.mp4'
      },
      {
        name: 'Lateral Raises',
        sets: 3,
        repetitions: '10-15',
        description: 'Hold dumbbells at your sides with palms facing inward. Keeping your arms straight, raise the weights out to the sides until they reach shoulder height. Slowly lower them back down with control. Repeat for the prescribed number of repetitions.',
        video: 'https://example.com/lateral-raises.mp4'
      },
      {
        name: 'Front Raises',
        sets: 3,
        repetitions: '10-15',
        description: 'Hold dumbbells with palms facing down, arms straight in front of you. Lift the weights up to shoulder height, keeping your arms straight. Slowly lower them back down with control. Repeat for the prescribed number of repetitions.',
        video: 'https://example.com/front-raises.mp4'
      }
    ],
    legs: [
      {
        name: 'Leg Stretch',
        sets: 1,
        repetitions: '10-15',
        description: 'Start with slow and controlled movements. Focus on stretching your leg muscles. Hold each stretch for about 15-30 seconds. Repeat for each stretch.',
        video: 'https://example.com/leg-stretch.mp4'
      },
      {
        name: 'Squats',
        sets: 3,
        repetitions: '8-12',
        description: 'Stand with feet shoulder-width apart, toes slightly turned out. Lower your body by bending at the knees and hips, keeping your back straight. Drive through your heels to return to standing. Repeat for the prescribed number of repetitions.',
        video: 'https://example.com/squats.mp4'
      },
      {
        name: 'Leg Press',
        sets: 3,
        repetitions: '10-15',
        description: 'Sit on a leg press machine with your back flat against the pad. Push the platform away from you until your legs are fully extended, then slowly lower it back down. Repeat for the prescribed number of repetitions.',
        video: 'https://example.com/leg-press.mp4'
      },
      {
        name: 'Lunges',
        sets: 3,
        repetitions: '10-12 (each leg)',
        description: 'Stand with feet together, take a step forward with one foot and lower your body until both knees are bent at a 90-degree angle. Push back up to the starting position and repeat with the other leg. Repeat for the prescribed number of repetitions.',
        video: 'https://example.com/lunges.mp4'
      }
    ],
    arms: [
      {
        name: 'Arm Stretch',
        sets: 1,
        repetitions: '10-15',
        description: 'Start with slow and controlled movements. Focus on stretching your arm muscles. Hold each stretch for about 15-30 seconds. Repeat for each stretch.',
        video: 'https://example.com/arm-stretch.mp4'
        },
     {
       name: 'Bicep Curls',
       sets: 3,
       repetitions: '8-12',
       description: 'Hold dumbbells with palms facing forward, arms fully extended. Curl the weights towards your shoulders, then lower them back down with control. Repeat for the prescribed number of repetitions.',
       video: 'https://example.com/bicep-curls.mp4'
     },
     {
       name: 'Tricep Dips',
       sets: 3,
       repetitions: '8-12',
       description: 'Sit on a bench with hands gripping the edge. Slide your buttocks off the bench and lower your body by bending your elbows until they are at a 90-degree angle. Push yourself back up to the starting position. Repeat for the prescribed number of repetitions.',
       video: 'https://example.com/tricep-dips.mp4'
     },
     {
       name: 'Hammer Curls',
       sets: 3,
       repetitions: '8-12',
       description: 'Hold dumbbells with palms facing each other, arms fully extended. Curl the weights towards your shoulders, keeping your palms facing each other throughout the movement. Lower them back down with control. Repeat for the prescribed number of repetitions.',
       video: 'https://example.com/hammer-curls.mp4'
     }
   ]
 });

 const location = useLocation();
 const [showLevels, setShowLevels] = useState(false);

 useEffect(() => {
   // Fetch user data only if the location changes (e.g., after login)
   if (location.pathname === '/home') {
     axios.get('http://localhost:3001/getUserName')
       .then(response => {
         setUserName(response.data.name);
       })
       .catch(error => {
         console.error('Error fetching user data:', error);
       });
   }
 }, [location.pathname]);

 const handleBodyPartChange = (bodyPart) => {
   setSelectedBodyPart(bodyPart);
   setCurrentLevel(1);
 };

 const handleLevelComplete = () => {
   setCurrentLevel(currentLevel + 1);
 };

 return (
   <div>
     <header className="title-bar">
       <a href="/" className="title">HOME</a>
       <div className="dropdown">
         <button className="dropbtn">FITNESS</button>
         <div className="dropdown-content">
           <a href="/show-all-workouts">Show all workouts</a>
           <a href="#" onClick={() => setShowLevels(true)}>New Workout Plan</a>
         </div>
       </div>
     </header>

     {showLevels && (
       <div className="main-content">
         <p>Welcome, {userName}</p>
         <h2>Select a body part:</h2>
         <select onChange={(e) => handleBodyPartChange(e.target.value)}>
           <option value="">Select</option>
           <option value="chest">Chest</option>
           <option value="back">Back</option>
           <option value="shoulders">Shoulders</option>
           <option value="legs">Legs</option>
           <option value="arms">Arms</option>
         </select>

         {selectedBodyPart && (
           <div>
             <h2>Current Level: {currentLevel}</h2>
             <h3>{levels[selectedBodyPart][currentLevel - 1].name}</h3>
             <p><strong>Sets:</strong> {levels[selectedBodyPart][currentLevel - 1].sets}</p>
             <p><strong>Repetitions:</strong> {levels[selectedBodyPart][currentLevel - 1].repetitions}</p>
             <p>{levels[selectedBodyPart][currentLevel - 1].description}</p>
             {levels[selectedBodyPart][currentLevel - 1].video && (
               <video width="100%" height="400" controls>
                 <source src={levels[selectedBodyPart][currentLevel - 1].video} type="video/mp4" />
               </video>
             )}
             {currentLevel < levels[selectedBodyPart].length && (
               <button onClick={handleLevelComplete}>Complete</button>
             )}
           </div>
         )}
       </div>
     )}
   </div>
 );
}

export default Home;