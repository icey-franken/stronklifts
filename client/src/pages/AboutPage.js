import React from "react";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <>
      <h1>Who is this site for?</h1>
      <p>
        This site is intended for novice lifters making their first foray into
        powerlifting. At present the program implemented is the{" "}
        <span className="bold">Stronglifts 5x5</span> program. More programs
        will be added in the future, but if you're new to powerlifting and
        looking to add functional strength fast this is a great place to start.
      </p>
      <h1>What is Stronglifts 5x5?</h1>
      <h2>Overview</h2>
      <p>
        Stronglifts 5x5 is a beginner powerlifting program similar to Starting
        Strength. In my opinion it is the best place to start for new lifters
        because of its simplicity. The intention of this site is to make an
        already simple program as simple as possible. My aim is to remove all of
        the guesswork and allow you to focus 100% on lifting. An explanation of
        the program follows.
      </p>
      <h2>Exercises</h2>
      <p>
        The program involves five compound exercises, all performed with a
        barbell:
      </p>
      <ul>
        <li>
          <a
            className="link"
            title="Link to squat video"
            target="_blank"
            href="https://www.youtube.com/watch?v=nhoikoUEI8U"
          >
            Low Bar Squat
          </a>
        </li>
        <li>
          <a
            className="link"
            title="Link to overhead press video"
            target="_blank"
            href="https://www.youtube.com/watch?v=8dacy5hjaE8"
          >
            Overhead Press
          </a>
        </li>
        <li>
          <a
            className="link"
            title="Link to deadlift video"
            target="_blank"
            href="https://www.youtube.com/watch?v=wYREQkVtvEc"
          >
            Deadlift
          </a>
        </li>
        <li>
          <a
            className="link"
            title="Link to bench press video"
            target="_blank"
            href="https://www.youtube.com/watch?v=rxD321l2svE"
          >
            Bench Press
          </a>
        </li>
        <li>
          <a
            className="link"
            title="Link to pendlay row video"
            target="_blank"
            href="https://www.youtube.com/watch?v=RQU8wZPbioA"
          >
            Pendlay Row
          </a>
        </li>
      </ul>
      <p>
        Click on an exercise above for information to get you started.{" "}
        <a
          className="link"
          title="Link to Alan Thrall's youtube page"
          href="https://www.youtube.com/channel/UCRLOLGZl3-QTaJfLmAKgoAw"
          target="_blank"
        >
          Alan Thrall
        </a>{" "}
        is a great beginner resource with a ton of informational videos.{" "}
        <a
          className="link"
          title="Link to Mark Rippetoe's youtube page"
          target="_blank"
          href="https://www.youtube.com/c/AasgaardCoStartingStrength/featured"
        >
          Mark Rippetoe
        </a>{" "}
        is another great resource for those with a little more experience. For
        an exhaustive explanation of each lift, check out{" "}
        <a
          className="link"
          title="Link to Starting Strength (book) purchase page"
          target="_blank"
          href="https://aasgaardco.com/store/books-posters-dvd/books/starting-strength-basic-barbell-training/"
        >
          "Starting Strength" (AKA the barbell bible)
        </a>{" "}
        by Mark Rippetoe.
      </p>
      <h2>Workouts</h2>
      <div>These exercises are split into two workouts, A and B:</div>
      <div className="split">
        <div style={{ "padding-left": "16px" }}>
          <h3>Workout A</h3>
          <ul>
            <li>Squat</li>
            <li>Overhead Press</li>
            <li>Deadlift</li>
          </ul>
        </div>
        <div style={{ "padding-left": "16px" }}>
          <h3>Workout B</h3>
          <ul>
            <li>Squat</li>
            <li>Bench Press</li>
            <li>Pendlay Row</li>
          </ul>
        </div>
      </div>
      <div>
        Workouts are performed in an alternating fashion, ideally three times a
        week, with at least one day of rest between each workout. Below is an
        example two week split:
        <div className="split">
          <div style={{ "padding-left": "16px" }}>
            <h3>Week 1</h3>
            <ul>
              <li>Monday: Workout A</li>
              <li className="ital">Tuesday: Rest</li>
              <li>Wednesday: Workout B</li>
              <li className="ital">Thursday: Rest</li>
              <li>Friday: Workout A</li>
              <li className="ital">Saturday: Rest</li>
              <li className="ital">Sunday: Rest</li>
            </ul>
          </div>
          <div style={{ "padding-left": "16px" }}>
            <h3>Week 2</h3>
            <ul>
              <li>Monday: Workout B</li>
              <li className="ital">Tuesday: Rest</li>
              <li>Wednesday: Workout A</li>
              <li className="ital">Thursday: Rest</li>
              <li>Friday: Workout B</li>
              <li className="ital">Saturday: Rest</li>
              <li className="ital">Sunday: Rest</li>
            </ul>
          </div>
        </div>
        These two weeks would be repeated for 3-6 months. After 3-6 months it's
        time to move on to a more advanced program like{" "}
        <a
          target="_blank"
          title="Link to 3x5 Program reference"
          href="https://startingstrength.com/get-started/programs"
          className="link"
        >
          3x5 (AKA Starting Strength)
        </a>
        ,{" "}
        <a
          target="_blank"
          title="Link to Madcow Program reference"
          href="https://stronglifts.com/madcow-5x5/"
          className="link"
        >
          Madcow
        </a>
        , or the{" "}
        <a
          target="_blank"
          title="Link to Texas Method reference"
          href="https://www.t-nation.com/training/texas-method"
          className="link"
        >
          Texas Method
        </a>
        .
      </div>
      <h2>Set and Rep Ranges</h2>
      <div>
        <div>
          <p style={{ "margin-top": "0px" }}>
            For each exercise except for deadlift you will perform 5 sets of 5
            reps at your working weight. For deadlift, only 1 set of 5 reps at
            your working weight is performed. "Working weight" is your current
            top level weight. For most folks with little to no experience with
            weightlifting it is recommended to start at 45 lbs (empty barbell)
            for all exercises except deadlift. A good place to start for
            deadlift is 95 lbs.
          </p>
          <p></p>

          <p id="about-table">
            <table>
              <tbody>
                <tr>
                  <th>Exercise</th>
                  <th>Sets</th>
                  <th>Start Weight</th>
                </tr>
                <tr>
                  <td>Squat</td>
                  <td>5</td>
                  <td>45 lbs</td>
                </tr>{" "}
                <tr>
                  <td>Overhead Press</td>
                  <td>5</td>
                  <td>45 lbs</td>
                </tr>{" "}
                <tr>
                  <td>Deadlift</td>
                  <td>1</td>
                  <td>95 lbs</td>
                </tr>{" "}
                <tr>
                  <td>Bench Press</td>
                  <td>5</td>
                  <td>45 lbs</td>
                </tr>{" "}
                <tr>
                  <td>Pendlay Row</td>
                  <td>5</td>
                  <td>45 lbs</td>
                </tr>
              </tbody>
            </table>
          </p>
        </div>

        <p>
          Warm-up sets (performed with a weight less than your working weight)
          should be added as needed. For example, if you have a squat working
          weight of 225 lbs, a typical warm-up progression might be sets of 5
          reps at 95 lbs, 135 lbs, and 185 lbs before attempting your working
          weight of 225 lbs. In general,{" "}
          <span className="ital">
            jumps of 40-50 lbs between warm-up sets until working weight is
            reached
          </span>{" "}
          is what works best for me.
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
        advantage of novice lifters' ability to quickly add weight (AKA{" "}
        <a
          target="_blank"
          title="Link to noob gains reference"
          href="https://www.gains.af/blog/what-to-expect"
          className="link"
        >
          noob gains
        </a>
        ) while also simple enough for anyone to implement.
      </div>
      <p>
        The skinny is this: each exercise is completed one at a time, always
        beginning with the squat. If 5 sets of 5 reps of a particular exercise
        are successfully completed with{" "}
        <span className="bold">proper form</span>, congratulations! During your
        next workout with this exercise you will add - wait for it -{" "}
        <span className="bold">5 POUNDS</span> to your working weight! It is not
        uncommon for lifters to be able to add 50-100+ lbs to their working
        weights before their first failure. But fret not - failure is the name
        of the game here. Failure means that the program is working. Failure
        means that you have reached your present limit, which you will soon
        smash through, one way or another.
      </p>
      <h2>Failure</h2>
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
      <p>
        During your next workout, if you successfully complete 5 sets of 5 reps
        while repeating your working weight, great! Continue progressing as
        usual (i.e. add 5 lbs during your next workout). If you are unable to
        complete all 5 sets of 5 reps, that's okay - remember: failure is the
        goal! You will repeat this process a second time - your working weight
        will remain the same during your next workout, which will be your third
        attempt at the same working weight. If you fail on your third attempt at
        a particular working weight, then it's time to deload.
      </p>
      <h2>Deloading</h2>
      <p>
        It's time to deload when you've failed three times at the same working
        weight. For most folks this can be disheartening, but like I said
        before: failure is the goal! Please drill this into your brain because
        it is extremely important.{" "}
        <span className="bold">Failure is the goal.</span> This is an exciting
        time. It means you've reached your current strength capacity, and you
        will soon blast through it.
      </p>
      <p>
        In this program, deloading means decreasing your working weight by 20%
        and trying again following the same progression. For example, if your
        working weight was 150 lbs you would deload to 120 lbs following your
        third failure. From there, everything is the same as before. If this
        seems like a pain to keep track of, don't worry - this app takes care of
        all of that for you.
      </p>
      <h3>
        Thanks for reading! If you have any questions, thoughts,
        recommendations, WHATEVER, feel free to reach out to me using any of the
        links in the footer. If you're looking to hire a software developer,
        check out my{" "}
        <a
          className="link"
          title="My Portfolio"
          target="_blank"
          href="https://www.isaacfinken.dev/"
        >
          portfolio site
        </a>{" "}
        or contact me on{" "}
        <a
          className="link"
          title="My Portfolio"
          target="_blank"
          href="https://www.linkedin.com/in/isaac-finken-1bb09447/"
        >
          LinkedIn
        </a>
        .
      </h3>
      <h2>Happy lifting - you can do it!!!</h2>
    </>
  );
}
