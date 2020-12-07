import React from "react";

export default function AboutPage() {
  return (
    <>
      <h1>Who is this site for?</h1>
      <div>
        This site is intended for novice lifters making their first foray into
        powerlifting. At present the program implemented is the{" "}
        <span style={{ "font-weight": "bold" }}>Stronglifts 5x5</span> program.
        More programs will be added in the future, but if you're new to
        powerlifting this is a great place to start.
      </div>
      <h1>What is Stronglifts 5x5?</h1>
      <h2>Overview</h2>
      <div>
        Stronglifts 5x5 is a beginner powerlifting program similar to Starting
        Strength. In my opinion it is the best place to start for new lifters
        because of its simplicity. The intention of this site is to make an
        already simple program as simple as possible. My aim is to remove all of
        the guesswork and allow you to focus 100% on lifting.
      </div>
      <p>The program involves five exercises, all performed with a barbell:</p>
      <ul>
        <li>Squat</li>
        <li>Overhead Press</li>
        <li>Deadlift</li>
        <li>Bench Press</li>
        <li>Pendlay Row</li>
      </ul>
      <div>These exercises are split into two workouts, A and B:</div>
      <div>
        <h3>Workout A</h3>
        <ul>
          <li>Squat</li>
          <li>Overhead Press</li>
          <li>Deadlift</li>
        </ul>
        <h3>Workout B</h3>
        <ul>
          <li>Squat</li>
          <li>Bench Press</li>
          <li>Pendlay Row</li>
        </ul>
      </div>
      <div>
        Workouts are performed in an alternating fashion, ideally three times a
        week, with at least one day of rest between each workout. For example,
        you could do Workout A on Monday, Workout B on Wednesday, and Workout A
        on Friday one week. The next week you would do Workout B on Monday,
        Workout A on Wednesday and Workout B on Friday. Repeat for 3-6 months.
        After 3-6 months it's time to move on to a more advanced program
        like&nbsp;
        <a
          target="_blank"
          title="Linke to 3x5 Program reference"
          href="#"
          style={{ color: "#d22e2e", "font-weight": "bold" }}
        >
          3x5
        </a>
        ,&nbsp;
        <a
          target="_blank"
          title="Link to Madcow Program reference"
          href="#"
          style={{ color: "#d22e2e", "font-weight": "bold" }}
        >
          Madcow
        </a>
        , or the&nbsp;
        <a
          target="_blank"
          title="Link to Texas Method reference"
          href="#"
          style={{ color: "#d22e2e", "font-weight": "bold" }}
        >
          Texas Method
        </a>
        . <h2>*** add working links ***</h2>
      </div>
      <h2>Set and Rep Ranges</h2>
      <div>
        For each exercise you will perform 5 sets of 5 reps at your working
        weight. "Working weight" is your current top level weight. For most
        folks with little to no experience with weightlifting it is recommended
        to start at 45 lbs (empty barbell) for all exercises except deadlift. A
        good place to start for deadlift is 95 lbs.
        <p>
          Warm-up sets (performed with a weight less than your working weight)
          should be added as needed. For example, if you have a squat working
          weight of 225 lbs, a typical warm-up progression might be sets of 5
          reps at 95 lbs, 135 lbs, and 185 lbs before attempting your working
          weight of 225 lbs. In general, jumps of 40-50 lbs between warm-up sets
          until working weight is reached is what works best for me.
        </p>
        <p>
          Once your warm-up is complete you will begin sets at your working
          weight. It is recommended that you perform working weight sets with
          90-180 seconds of rest between sets. It is okay to stray outside of
          these bounds if necessary, but do your best to not - if you rest too
          much you are cheating yourself out of strength gains.
        </p>
      </div>
      <h2>Progression</h2>
      <div>
        The progression in Stronglifts 5x5 is what I think makes it the best
        beginner program. The weight increases are rapid enough to take
        advantage of novice lifters' ability to quickly add weight (AKA noob
        gains) while also simple enough for anyone to implement.
      </div>
      <p>
        The skinny is this: each exercise is completed one at a time, always
        beginning with the squat. If 5 sets of 5 reps of a particular exercise
        are successfully completed with{" "}
        <span style={{ "font-weight": "bold" }}>proper form</span>,
        congratulations! During your next workout with this exercise you will
        add - wait for it -{" "}
        <span style={{ "font-weight": "bold" }}>5 POUNDS</span> to your working
        weight! It is not uncommon for lifters to be able to add 50-100+ lbs to
        their working weights before their first failure. But fret not - failure
        is the name of the game here. Failure means that the program is working.
        Failure means that you have reached your present limit, which you will
        soon smash through, one way or another.
      </p>
      <h2>Failure and Deloading</h2>
      <div>
        In my experience the "lifting mentality" of conceptualizing failure as a
        good thing, and in a sense as the GOAL of lifting, has helped me in
        countless aspects of life unrelated to lifting. Instead of viewing
        failure as a negative and something to be avoided, try to reframe it as
        something to be desired and an opportunity for growth. At the very least
        you must do this when it comes to lifting.
      </div>
      <p>
        Dealing with failure in this program is fairly straightforward. If you
        are unable to complete 5 reps of a working weight set for any exercise
        it is recommended you rest for 5 minutes following the failed set,
        instead of the regular 90-180 seconds. Oftentimes after an extended rest
        period you will be able to complete your next set of 5. Then, during
        your next workout, instead of adding 5 lbs to your working weight you
        will repeat the working weight that you failed at.
      </p>
    </>
  );
}
