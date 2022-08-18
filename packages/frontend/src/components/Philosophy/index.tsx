import React, { FC } from 'react';
import { Box, Card, Grid } from '@material-ui/core';
import { CardContent, Typography } from '@mui/material';
import palette from '../../theme/palette';
import HeroImg from '../../assets/images/static/bed-practice.jpeg';
import ScrollToTop from '../utils/ScrollToTop';

export const Philosophy: FC = () => {
  return (
    <>
      <ScrollToTop />
      <Grid container>
        <Grid
          item
          md={12}
          style={{
            marginTop: '70px',
            height: '85vh',
            width: '100%',
            backgroundImage: `url(${HeroImg})`,
            backgroundSize: '100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <Grid
          item
          container
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '50px',
          }}
        >
          <Grid
            item
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography variant="h5" style={{ paddingBottom: '25px' }}>
              At Rogue K9 Academy, we focus on practicing LIMA and Cynopraxis in all of our affairs.
            </Typography>
            <Typography variant="h4" style={{ fontWeight: 550 }}>
              WHAT IS LIMA? WHAT DOES CYNOPRAXIS MEAN?
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          container
          style={{
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            alignItems: 'center',
            padding: '50px',
          }}
        >
          <Grid
            item
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: palette.text.contrast,
            }}
          >
            <Typography variant="h5" style={{ fontWeight: 600, paddingBottom: '25px' }}>
              Steven R. Lindsay (the founder of these practices) defines it:
            </Typography>
            <Typography variant="h5" style={{ paddingBottom: '25px' }}>
              Cynopraxic trainers should make an effort to conform their training interventions to
              the LIMA (least intrusive and minimally aversive) principle, by employing procedures
              that represent the least necessary intrusion upon the human-dog bond and cause the dog
              a minimal amount of discomfort, as is necessary to achieve the behavioral objective.
            </Typography>
            <Typography variant="h5" style={{ paddingBottom: '25px' }}>
              Further, training recommendations should do no harm to the human-dog relationship, to
              the dog, or to the owner, in the process of implementing them.
            </Typography>
            <Typography variant="h5" style={{ paddingBottom: '25px' }}>
              Rather than dictating a one-sided program that cannot be realistically implemented by
              the family, the cynopraxic counselor should work with the family in a spirit of
              teamwork, to find a common solution.
            </Typography>
            <Typography variant="h5">
              Toward achieving this aim, the counselor should listen to the family’s needs and be
              creative. Just as it is certainly true of dogs, people are individuals possessing
              unique strengths and weaknesses that need to be recognized and integrated into the
              training plan. Good cynopraxic counselors know how to work well with both people and
              dogs.
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" style={{ padding: '50px', fontWeight: 550 }}>
            This means that our training is truly for the benefit of the whole family, both human
            and canine. I want to provide training that actually addresses your goals and your
            concerns, and will walk side by side with you and your family, to provide support
            throughout the entire process.
          </Typography>
        </Grid>
        <Grid
          item
          container
          style={{
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            alignItems: 'center',
            padding: '50px',
          }}
        >
          <Grid
            item
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: palette.text.contrast,
            }}
          >
            <Typography variant="h4" style={{ fontWeight: 550 }}>
              My personal experience and journey, with Foundation Style Dog Training:
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" style={{ padding: '50px' }}>
            I set high standards for myself, and for the people that choose to hire me to help them
            with their dogs. These standards come from years of feeling fear, shame, and confusion
            in my interactions with animals, interactions that were based on repeating and mimicking
            what I was taught and cognitive dissonance that eventually became impossible to
            maintain. I reached a point in my personal life that changed everything, and set me up
            to be teachable, and ready to accept that I had made mistakes. While I can’t go back and
            undo my past, I can be rigorously accountable and remember each of those animals in
            every interaction I have now.
          </Typography>
        </Grid>
        <Grid
          item
          container
          style={{
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            alignItems: 'center',
            padding: '50px',
          }}
        >
          <Grid
            item
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: palette.text.contrast,
            }}
          >
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              I want to share why FSDT is the high standard that we adhere to, and how it is
              different. My goal is transparency, and to help you advocate for your dog based on an
              understanding of facts about this industry, and facts about animal behavioral
              sciences.
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" style={{ padding: '50px 50px 0 50px' }}>
            Most dog training curriculum revolves around how to mimic or implement a protocol to
            change a behavioral issue, with the focus being on obedience. Although obedience is a
            vital part of the process, learning about the dog as a whole, or the science of
            behavioral modification, is not included in the curriculum. Taking a dog away from a
            handler or owner to &quot;train&quot; it, is NOT the same as being able to teach a
            handler or owner how to build a relationship with their dog.
          </Typography>
          <Typography variant="h5" style={{ padding: '50px 50px 0 50px' }}>
            Most training &quot;certifications&quot; require a subscription to an ideology, as
            defined by the creator of the ideology, regardless of whether it contradicts psychology,
            or the science of behavior. Gaps in scientifically accurate curriculum are filled with
            subscription-based diagnoses, and excuses for why the training did not have favorable
            outcomes, including neurosis.
          </Typography>
          <Typography variant="h5" style={{ padding: '50px 50px 0 50px' }}>
            Because there are no standards in this industry, there are thousands of dog trainers.
            Consumers can surely find someone who will just tell them what they want to hear,
            vindicating personal feelings and attitudes, without any actual competency
            substantiated. The rhetoric is that &quot;everyone has their own style&quot; of
            training. Certainly, we all have different personalities and abilities. But in this
            industry, a person can create their own truth, and sell it, with zero consequences for
            the destruction they may leave in their wake, and simply call it their
            &quot;style&quot;...
          </Typography>
          <Typography variant="h5" style={{ padding: '50px' }}>
            Because this is a results based industry, and it often doesn&apos;t matter what is done
            to achieve those results.
          </Typography>
        </Grid>
        <Grid
          item
          container
          style={{
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            alignItems: 'center',
            padding: '50px',
          }}
        >
          <Grid
            item
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: palette.text.contrast,
            }}
          >
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              For example: In my pre-FSDT days, I worked with a reactive German Shepherd.
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" style={{ padding: '50px 50px 0 50px' }}>
            Every time she would bark, lunge, or even look at another animal, she would get cranked
            on and yelled at. She got to where we could walk or run past anything, reaction-free,
            within a very short amount of time. Her owner only had to pop the leash to get the same
            results. People who knew the dog raved about how amazing I was, and how they never
            thought the dog would be able to behave like that. Well, the owner was not willing to
            handle her dog the way I did, and after a while, the behavior returned. Of course I
            blamed her for not doing what needed to be done, and I always justified my behavior with
            something like &quot;
            <span style={{ fontStyle: 'italic' }}>a bite is a bite</span>,&quot; or &quot;
            <span style={{ fontStyle: 'italic' }}>
              she is a German Shepherd, this is how you have to handle her
            </span>
            ,&quot; or &quot;
            <span style={{ fontStyle: 'italic' }}>she will turn on you, or hurt someone else</span>
            .&quot;
          </Typography>
          <Typography variant="h5" style={{ padding: '50px 50px 0 50px' }}>
            I have more stories like this than I would like to admit. I learned to train this way,
            initially with horses, then dogs, from the people who I perceived to be doing the most
            advanced work in the field: celebrity trainers, military, and police trainers.
            Unfortunately, this methodology is common (The Koehler Method) and is in large part
            responsible for the positive-only marketing platform.
          </Typography>
          <Typography variant="h5" style={{ padding: '50px' }}>
            Things that seem so common sense now (making sure a dog understands the expectations
            BEFORE adding compulsion, praising the dog for an achievement rather than to soften the
            blow of an overcorrection, not relying on intimidation as motivation, not correcting
            confusion, not punishing emotional responses) were never a part of the conversation
            before. Symposiums, 72-hour courses, jobs based on what tools I used, and pats on the
            back for not being afraid to &quot;handle&quot; (roughly) certain breeds, were the norm.
          </Typography>
        </Grid>
        <Grid
          item
          container
          style={{
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            alignItems: 'center',
            padding: '50px',
          }}
        >
          <Grid
            item
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: palette.text.contrast,
            }}
          >
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Here are some qualifications from a job search site for “balanced dog trainers” in our
              area:
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" style={{ padding: '50px 50px 0 50px' }}>
            There are a TON of job openings out there for &quot;positive only&quot; trainers, and
            what is important to note is: the term &quot;positive only&quot; is a misuse of operant
            conditioning definitively. This is misleading to consumers, with their use of LIMA being
            fraudulent and fundamentally incorrect.{' '}
            <span style={{ fontStyle: 'italic' }}>
              * See LIMA as defined by Steven R. Lindsay, above.
            </span>
          </Typography>
          <Typography variant="h5" style={{ padding: '50px 50px 0 50px' }}>
            I have removed the names of the following companies and individuals, as the point of
            this is not to point out individuals, but rather an industry-wide problem.
          </Typography>
        </Grid>
        <Grid item md={12} style={{ padding: '50px 50px 0 50px' }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                Formal training is (14 days) provided FREE of cost in Southern Ca. Your only
                INVESTMENT is to provide your own travel, lodging to *TOWN*, Ca and purchase kennels
                to use at your home for board and trains. The training course certifies you as an
                official *NAME OF COMPANY* TRAINER, absolutely FREE! After a short probationary
                period, trainer will make up to $20/hr per private lesson, as well as $900 per 2wk
                board and train upon successful completion. This rate will increase to $1000.00 per
                B/T and $30.00/hr after 6 months of employment with no negative remarks/counselings.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" style={{ fontWeight: 600, padding: '50px 50px 0 50px' }}>
            How is someone going to learn how to off-leash-train a dog humanely, in merely 14 days?
          </Typography>
        </Grid>
        <Grid item md={12} style={{ padding: '50px 50px 0 50px' }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                Great to Have, but Not Required:
              </Typography>
              <ul>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    At least 1 year of previous experience working in a kennel, dog handling, or
                    working with dogs in a professional setting
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    Vet tech certification
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    CPR certification, humans or dogs
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    Dog training experience is a plus
                  </Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" style={{ fontWeight: 600, padding: '50px' }}>
            Experience, is a plus?
          </Typography>
        </Grid>
        <Grid
          item
          container
          style={{
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            alignItems: 'center',
            padding: '50px',
          }}
        >
          <Grid
            item
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: palette.text.contrast,
            }}
          >
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Here is an ad for a certification program:
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={12} style={{ padding: '50px 50px 0 50px' }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h5" style={{ fontWeight: 600, fontStyle: 'italic' }}>
                Fundamentals of Dog Behavior and Training 1
              </Typography>
              <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                Starting at $4905.00 includes:
              </Typography>
              <ul>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    5-days (40 hours total) of Training from *Celebrity Trainer* and his Training
                    Team
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    All tools and workbooks required for program
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    Student dog spots available
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    Certificate of completion
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    Orientation Dinner on Wednesday Evening
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    Catered lunch each day of class
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    Graduation Celebration on Sunday Evening
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    Professional photos throughout the event
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    Drinks and Snacks available throughout the day
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    Discounted hotel room rates with the host hotel
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    Access to the Training *Celebrity Trainer*’s private Facebook page
                  </Typography>
                </li>
                <li>
                  <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                    Installment Plan available
                  </Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" style={{ fontWeight: 600, padding: '50px 50px 0 50px' }}>
            The main “gain” is celebrity affiliations, rather than an education. Only 5 days.
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" style={{ padding: '50px' }}>
            FSDT requires a working knowledge and understanding of the historical studies and
            compilations of data that are recognized and qualified by ethologists, biologists, and
            psychologists. This is information that is pulled from the genius works of
            history&apos;s giants, like B.F. Skinner, Pavlov, Dmitri Belyaev, Lyudmila Trut, and
            Clarence Pfaffenberger (to name a few), and how it relates to LIMA as defined by Steven
            Lindsay. Obedience is broken down into phases that reflect an understanding of the
            above, and how it applies to our goals for our personal or working dogs.
          </Typography>
        </Grid>
        <Grid
          item
          container
          style={{
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            alignItems: 'center',
            padding: '50px',
          }}
        >
          <Grid
            item
            style={{
              display: 'flex',
              flexDirection: 'column',
              color: palette.text.contrast,
            }}
          >
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              In short: obedience, without sacrificing relationships or disrespecting the dog. No
              rushing. No hacks.
            </Typography>
          </Grid>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" style={{ padding: '50px 50px 0 50px' }}>
            My certification included the following, and took just over a year to complete. My
            mentorship still continues to this day, long after the certification. I am always
            learning! During the course, I had to show a fundamental understanding of the material,
            AND competent application on multiple dogs. I continue to submit videos of our sessions
            for critiques, especially as I learn new things like scent detection, and how to
            accomplish specialty training, without deviating from LIMA and FSDT. Without cutting
            corners.
          </Typography>
        </Grid>
        <Grid item md={12} style={{ padding: '50px 50px 0 50px' }}>
          <Card variant="outlined">
            <CardContent>
              <Box>
                <Typography variant="h5" style={{ fontWeight: 600, fontStyle: 'italic' }}>
                  Canine Behavior
                </Typography>
                <ul>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      In the Beginning
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Domestication
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Body Language
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Know Your Traits
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Back to the Roots
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Behavior Problems
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Health
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Diet
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Grooming
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Vaccinations
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      External Parasites
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Internal Parasites
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Effects of Neutering
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Health and Behavior
                    </Typography>
                  </li>
                </ul>
              </Box>
              <Box>
                <Typography variant="h5" style={{ fontWeight: 600, fontStyle: 'italic' }}>
                  Attitude
                </Typography>
                <ul>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      The Importance of Attitude in the Profession
                    </Typography>
                  </li>
                </ul>
              </Box>
              <Box>
                <Typography variant="h5" style={{ fontWeight: 600, fontStyle: 'italic' }}>
                  Applied Behavior Analysis
                </Typography>
                <ul>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Intro to Applied Behavior Analysis
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Establishing Operations
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Classical Conditioning
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Extinction, Spontaneous Recovery, Generalization, Discrimination
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Operant Conditioning
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Shaping and Chaining
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Reward Schedules
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Escape and Avoidance Conditioning
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Observational Learning
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Non-associative learning
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Chaining
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Premack Principle
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Biological Constraints on Learning
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Task Analysis
                    </Typography>
                  </li>
                </ul>
              </Box>
              <Box>
                <Typography variant="h5" style={{ fontWeight: 600, fontStyle: 'italic' }}>
                  Leadership
                </Typography>
                <ul>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Intro to Leadership
                    </Typography>
                  </li>
                </ul>
              </Box>
              <Box>
                <Typography variant="h5" style={{ fontWeight: 600, fontStyle: 'italic' }}>
                  Habitation
                </Typography>
                <ul>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Phase 1 Habitation
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Phase 2 Habitation
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Phase 3 Habitation
                    </Typography>
                  </li>
                </ul>
              </Box>
              <Box>
                <Typography variant="h5" style={{ fontWeight: 600, fontStyle: 'italic' }}>
                  Drive Balance
                </Typography>
                <ul>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Recognizing a Problem
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Finding Balance
                    </Typography>
                  </li>
                </ul>
              </Box>
              <Box>
                <Typography variant="h5" style={{ fontWeight: 600, fontStyle: 'italic' }}>
                  Anxiety
                </Typography>
                <ul>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      The Nature of Anxiety
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Making the Plan
                    </Typography>
                  </li>
                </ul>
              </Box>
              <Box>
                <Typography variant="h5" style={{ fontWeight: 600, fontStyle: 'italic' }}>
                  Obedience
                </Typography>
                <ul>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      What does it really mean?
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Phase 1 Training
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Phase 2 Training
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Phase 3 Training
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Phase 4 Training
                    </Typography>
                  </li>
                </ul>
              </Box>
              <Box>
                <Typography variant="h5" style={{ fontWeight: 600, fontStyle: 'italic' }}>
                  Perception
                </Typography>
                <ul>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Forming and Changing
                    </Typography>
                  </li>
                </ul>
              </Box>
              <Box>
                <Typography variant="h5" style={{ fontWeight: 600, fontStyle: 'italic' }}>
                  Management
                </Typography>
                <ul>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Short Term and Long Term
                    </Typography>
                  </li>
                </ul>
              </Box>
              <Box>
                <Typography variant="h5" style={{ fontWeight: 600, fontStyle: 'italic' }}>
                  Animal Rescues and Shelters
                </Typography>
                <ul>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      The Problem
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Plans
                    </Typography>
                  </li>
                </ul>
              </Box>
              <Box>
                <Typography variant="h5" style={{ fontWeight: 600, fontStyle: 'italic' }}>
                  The Working Dog
                </Typography>
                <ul>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Specialized Training
                    </Typography>
                  </li>
                </ul>
              </Box>
              <Box>
                <Typography variant="h5" style={{ fontWeight: 600, fontStyle: 'italic' }}>
                  Dog Business
                </Typography>
                <ul>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Housing Dogs
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="h5" style={{ fontStyle: 'italic' }}>
                      Ethics
                    </Typography>
                  </li>
                </ul>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" style={{ padding: '50px 50px 0 50px' }}>
            Every dog and handler I have worked with since my FSDT journey started, has been an
            amazing reminder of what it was like, and how much better it is now. The problem in this
            industry is that no one is required to make the effort to understand or learn anything
            about canine behavior and psychology, or to be truthful and ethical in their practices
            or marketing.
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Typography variant="h5" style={{ fontWeight: 600, padding: '50px' }}>
            You deserve better, and your dogs deserve the best.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Philosophy;
