import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import { List, ListItem, Typography } from '@mui/material';
import palette from '../../theme/palette';
import BugImg from '../../assets/images/thenAndNow/Bug_Then_Now.jpeg';
import FiggyImg from '../../assets/images/thenAndNow/Figgy_Then_Now.png';

export const ThenAndNow: FC = () => {
  return (
    <Grid container>
      <Grid
        item
        container
        style={{
          marginTop: '60px',
          backgroundColor: palette.paper.secondary,
          display: 'flex',
          padding: '20px',
          color: palette.text.contrast,
        }}
      >
        <Typography variant="h4" style={{ fontWeight: 600 }}>
          Then & Now!
        </Typography>
      </Grid>
      <Grid
        item
        container
        md={12}
        style={{ padding: '50px', marginBottom: '20px' }}
        direction="column"
      >
        <Grid
          item
          container
          direction="column"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Bug
            </Typography>
          </Grid>
          <Grid
            item
            style={{
              height: '500px',
              width: '500px',
              backgroundImage: `url(${BugImg})`,
              backgroundSize: '100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              marginBottom: '20px',
            }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Nutrition!!!!!!! When I tell people that Allie changed Bugs life I really, really,
            really mean it! You can see the changes in his physical appearance because of the food
            and supplement changes we have implemented since meeting with her.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            From a bald belly to a nice shiny coat. The pictures aren’t the best but certainly show
            what a change he has undergone. He’s a happy man loving the raw fed life, and we’re
            happy mamas knowing how much healthier he is. He has suffered with gut related issues
            for years. Sick with a heart problem, he had heart surgery at just 12 weeks to save his
            life. We have fought medical issues for years.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            About 6 months ago, we were introduced to Allie and after swearing for years we wouldn’t
            feed raw, she took the time to educate us on why a diet change would be good for Bug.
            She didn’t just say you have to change..she taught us the benefits of trying. So we did.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Slowly…a lot slower than we needed to but after years of rear end blowouts this mama was
            going slow! I appreciate how respectful Allie was of my feelings, always there to help
            answer questions. Bug is finicky and more than once we had to adjust, but we did and
            today we received the BEST vet report ever!!! Bug’s internist said his stomach walls
            have healed so much they look normal!!
          </Typography>
          <Typography variant="h5">
            For a dog with high level irritable bowl syndrome those words brought tears to my eyes!
            Thank you Allie for all your advice and education!!!!! Me and my handsome little man
            won’t ever be able to thank you enough!!!
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        md={12}
        style={{ padding: '50px', marginBottom: '20px' }}
        direction="column"
      >
        <Grid
          item
          container
          direction="column"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Figgy
            </Typography>
          </Grid>
          <Grid
            item
            style={{
              height: '500px',
              width: '500px',
              backgroundImage: `url(${FiggyImg})`,
              backgroundSize: '100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              marginBottom: '20px',
              borderRadius: '10px',
            }}
          />
        </Grid>
        <Grid item>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Shout out to this little guy and our amazing Allie! Backstory… before Lucy we had Noe
            who was a mini schnauzer. After we bought Noe, we rescued Figgy! That was 15 years ago.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Noe passed away suddenly and we did not want the same to happen with Figgy. We switched
            his food to a dehydrated whole food and he did well on it until we started noticing he
            was having pretty frequent pee accidents. We decided to get his blood work done this
            past August. Results showed early signs of kidney dysfunction.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            After talking to Allie, we decided to change Figgy’s diet. We switched to a raw diet
            that was lower in protein and fat along with adding liver and kidney support and omega
            3s. A month later we had another blood test done and his levels were better but some
            were still out of range. We felt like what we were doing was the right track for him.
            Fast forward to today. We had his blood work done again, 6 months from our first blood
            panel. 3 out of range! AMAZING! Such an amazing results just from changing his diet.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            He’s doing amazing! He has so much energy, keeps up with Lucy’s antics for the most part
            and is just so happy. He’s 15 and he’s turning 16 this year! Since he’s older and we
            believe in getting in front of any health issues, we will continue to get senior blood
            panels done every 6 months or if he shows any new issues. August 2022 - 11 markers out
            of range, September 2022 - 7 out of range, February 2023 - 3 out of range.
          </Typography>
          <Typography variant="h5">
            Thank you Allie for all of your guidance and love! You’ll never know how much we
            appreciate you! Finding you was the best thing that has ever happened to us and we are
            so thankful to have you in our family.
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        md={12}
        style={{ padding: '50px', marginBottom: '20px' }}
        direction="column"
      >
        <Grid
          item
          container
          direction="column"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Shadow
            </Typography>
          </Grid>
          <Grid item>
            <iframe
              width="700px"
              height="500px"
              src="https://www.youtube.com/embed/ObzK6-7YSPY?si=3LupjqEwOxsu6Mpn"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Shadow, Then and Now"
              style={{ borderRadius: '10px', marginBottom: '20px' }}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h5" sx={{ mb: 2 }}>
            I am so grateful to be able to share this before and after video! This is Amanda and her
            incredibly high drive, powerful, pit bull mix, Shadow. Shadow and his momma weigh about
            the same amount. Shadow out muscles and out torques her. Shadow had successfully dragged
            Amanda on leash multiple times; now she can handle him and have control, without
            muscling him, without being rough, and without “showing him who’s boss”.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Like so many of the amazing handlers in this crew Amanda is a beautiful example of
            tenacious love for her dog, poise, and hope! I’m so proud of you and grateful for the
            opportunity to work with you both. Shadow has not been punished for his aggression, he
            has not been told that his pit bullness is "wrong". He has not been roughed up or
            intimidated. He and his momma have learned predictable command structure, advanced
            obedience, advanced leadership and Amanda provides positive outlets for his incredible
            drive to bite something....IE TUUUGGGGG and now dock diving. I am quite sure Shadow
            would jump through a tornado to retrieve his tug!
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Notes about the video: The conditioned punisher is one of my personal favorite things
            about Foundation Style Dogtraining and the proper use of command structure. It is
            utilized to actually help the dog avoid aversives and have a deeper, more meaningful,
            and predictable line of communication with their handler. There is no punishment applied
            to the word “no” it is a conditioned response, “installed” during phase 2. This allows
            the dog the confidence that if he makes an honest or benign mistake that his handler
            will help him. This allows more control with less positive punishment when used
            properly. AKA: LIMA. This is so beautiful because our dogs don’t have to worry, they
            don’t have to walk on eggshells.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            What is Premack? Well, per Applied Behavior Analysis: Premack's Principle suggests that
            if a person (or dog)wants to perform a given activity, the person (or dog) will perform
            a less desirable activity to get at the more desirable activity; that is, activities may
            themselves be reinforcers. An individual will be more motivated to perform a particular
            activity if he knows that he will partake in a more desirable activity as a consequence.
            For example if you eat your veggie’s you get to eat ice cream...or in Shadow’s case: if
            you give me a gorgeous phase 3 heel, you get to go back and bite the tug!!!
          </Typography>
          <Typography variant="h5">
            The best part of this video is Shadow’s body language. He is pumped, full of drive, and
            giving his best effort. He is not afraid and he is giving true obedience. He is also
            receiving an outlet for his absolute need to bite something (I’m so glad we are friends
            buddy).
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        md={12}
        style={{ padding: '50px', marginBottom: '20px' }}
        direction="column"
      >
        <Grid
          item
          container
          direction="column"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Mav
            </Typography>
          </Grid>
          <Grid item>
            <iframe
              width="700px"
              height="500px"
              src="https://www.youtube.com/embed/YpaRA1G2rZI?si=3ZQXF9IzM561qfpf"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Mav, Then and Now"
              style={{ borderRadius: '10px', marginBottom: '20px' }}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Today I went to a dock diving event to see Mav and his momma do their thing. What I saw
            was an abrupt reminder of how important our attitudes are towards our dogs. It reminded
            me of how I learned to train before FSDT and how miserable it was.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Some things that I saw: Choking dogs out to get them to drop toys. Slapping them in the
            face. Prying their mouths open. Hanging dogs. Hanging dogs upside down. Yelling at dogs.
            Cranking on leashes. Dragging dogs with their feet off the ground. Punched in the
            abdomen for not jumping. Dogs straining at the end of their leashes. Dogs afraid of
            their handlers. Dogs being teased up with toys then yelled at, slapped and cranked for
            jumping at the teasing toys. Dogs being yelled at, slapped and cranked on for barking at
            the pool between jumps. Dogs being yelled at and dragged for not getting out of the
            pool. Dogs being punished for not wanting to be pet by passers by.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Most people had their dogs in harnesses, flat collars, or martingales. All tools touted
            as being force free and gentle. Training collars are not allowed on the dock, and
            “inhumane handling” is listed as unacceptable on the event website. All of this
            volatility around getting a dog to jump in a pool after a toy. Something that should be
            enjoyable. Everyone acting like this is a normal and a fun bonding experience.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            I felt so sad for the people there and the dogs because they couldn’t see that treating
            dogs that way is not an effective training method, even though the dogs didn’t obey or
            listen after being treated this way. I know what it's like to be stuck in a cycle of
            cognitive dissonance. Cognitive Dissonance: the discomfort we have when components of
            attitude contradict. Therefore we adjust. The tendency of Confirmation Bias: the
            tendency to only seek out and remember information that aligns with their pre-existing
            views and ideas.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            The silver lining was that Mav's momma has worked hard to teach impulse control through
            obedience instead of just punishing emotions and getting frustrated. Mav didn’t need to
            be held back by a second handler, he practiced exquisite impulse control, he charged out
            of the pool to return to his momma who was praising him from the dock, he dropped the
            tug for his momma, knowing she would be fair.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            He worked hard all day, and was calm and collected, walking around and waiting his turn.
            He held a command when a guy tried to pet him and gave his mom a hard time for saying
            “no” and stood in front of him and made eye contact and talked at him. He out jumped
            himself, advancing into the next group and took 2nd place in his class. Mav looked at
            his mom adoringly and did his best. There was no conflict between them. When things got
            hectic she practiced FSDT management, and had a very comfy kennel set up in the shade.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Mav looked like he genuinely enjoyed himself and his momma was proud of him and loved
            him. They did an amazing job representing LIMA and how cross training is extremely
            beneficial for a dog’s well being. Not one time did she yell, crank on, kick, or express
            frustration toward him.
          </Typography>
          <Typography variant="h5">
            This team put in the work, the time, and Mali momma has absolutely stood her ground and
            advocated for her dog. I am so honored and grateful for them and even for the reminder
            of how important it is to not cut corners, and not settle for hacks. There is never a
            traffic jam on the extra mile.
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        md={12}
        style={{ padding: '50px', marginBottom: '20px' }}
        direction="column"
      >
        <Grid
          item
          container
          direction="column"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Snapshots from our “Aggression” Support” Crew!
            </Typography>
          </Grid>
          <Grid item>
            <iframe
              width="700px"
              height="500px"
              src="https://www.youtube.com/embed/WiGR60zpqF4?si=O26MO2ZiSC81kgMX"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Aggression Support Crew"
              style={{ borderRadius: '10px', marginBottom: '20px' }}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Aggressive dogs are my absolute favorite. I love seeing handlers build relationships
            with their dogs, appreciating them for who they are and helping them learn impulse
            control, advanced obedience, and have freedom! This class was designed to give advanced
            and “finished” dogs an opportunity to face high pressure triggers with the safety of a
            bite suit, so that their handlers could practice cool, calm, handling without worrying.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            You will see a class full of aggressive and reactive dogs working in close proximity
            with each other. This is the result of applying a KNOWLEDGE of NATURAL canine behavior,
            different types of aggression, and RESPECTING the dog for who they are.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            I am very passionate about not punishing dogs for their natural behaviors. We instead
            teach them to practice impulse control (emotional control) through advanced obedience
            and relationship building. We NEVER correct an emotional response, including unwanted
            aggression, rather we teach the dogs positional commands and they receive a correction
            for breaking or ignoring the command, whether it is to lunge at someone, or eat
            bubblegum off the sidewalk. They will learn overtime that the things that used to
            trigger them aren’t such a big deal (just like we do…with experience and guidance). The
            dogs have a perception change and gain freedom!!!!!!!!!!
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            We asked the dogs to move towards the trigger in order to complete the task at hand.
            While this isn’t necessarily something we would do in “real life” this is an excellent
            drill, with safety in place, to help the dogs practice very high levels of emotional
            (aggression) control. It also give their momma’s the opportunity to practice being
            confident and disciplined handlers . By practicing emotional control our dogs are able
            to experience more “life”. They begin to experience fun and they begin to enjoy their
            work. They experience a perception change, and the things that used to trigger them are
            no longer a big deal, so we raise the stakes!
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            As you can see, a dog that is not afraid of his handler, and understands the
            expectations set for him, always sails over the bar, no matter how high it is! This is
            impulse control and this is ABA. Correcting an emotional response teaches the dog
            absolutely nothing positive, rather that the handler is unpredictable and untrustworthy
            in that situation. It can cause a subdued fearful dog, or a more reactive dog with
            handler redirection. We always put the relationship first. Always. Ladies. You and your
            dogs are bad ass. Beautiful work. What a privilege for me to be apart of this.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            A word about "aggression rehabilitation". Since many people reading this are concerned
            about "rehabilitating" a dog's aggressive behavior, we should be clear about what this
            word means. “Rehabilitation" is the act of restoring something to its original state. It
            is derived from the Latin prefix “re-,” meaning “again” and “habitare,” meaning “make
            fit.” Aggression is a natural behavior and its presentation primarily depends on a
            canine's genetics and age. Both these factors determine why and how, if uninterrupted, a
            dog is likely to be aggressive in certain situations.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Aggressive behavior can be interrupted by various forms of human intervention,
            particularly training and management, but neither of these is “rehabilitation.” Both
            fall under the same category as any other learned behavior and the constraints of
            maintaining this behavior. The recent surge in "rehabilitated dogs" being adopted out
            from rescue organizations and then causing significant injury or death underscores the
            importance of understanding just what “rehabilitation” means.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            For example, if a greyhound has predatory aggression toward cats and a trainer uses an
            E-collar to shock the dog for trying to chase a cat, that dog has not been
            rehabilitated. Cat aggression is a natural behavior and the E-collar has been used to
            stop it. In other words, the dog has not been "rehabilitated,” because chasing cats and
            other moving animals is a natural behavior.
          </Typography>
          <Typography variant="h5">
            It’s also worth bearing in mind that unless a trainer knows how to generalize, maintain,
            and prevent spontaneous recovery of a natural behavior, it’s likely that, after a while,
            the dog will revert to that behavior.
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        md={12}
        style={{ padding: '50px', marginBottom: '20px' }}
        direction="column"
      >
        <Grid
          item
          container
          direction="column"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              Pepper
            </Typography>
          </Grid>
          <Grid item>
            <iframe
              width="700px"
              height="500px"
              src="https://www.youtube.com/embed/axrPWwBpoac?si=k-BWyitCR4jdYZcN"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Pepper, Then and Now"
              style={{ borderRadius: '10px', marginBottom: '20px' }}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Julie rescued Pepper physically by getting her out of an abusive home, she rescued her a
            second time by practicing FSDT and freeing her from the darkness of living in constant
            fear, and having conflict with her handlers, and the outside world.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Here is a little video of Pepper's journey. She came in with successful bites under her
            belt, failed attempts with other training systems, and a VERY dedicated momma and auntie
            who were committed to helping her.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Pepper wore her muzzle during our first few sessions and (as you will see) I was wearing
            bite suit pants during a drill designed to help her handlers practice leash handling and
            calm corrections during stressful encounters. Pepper is NOT being corrected for lunging
            at me. She is being corrected for breaking the sit. This is very different in the dog's
            mind because they can understand being corrected for disobedience, but not for their
            natural responses to the environment. I have never handled Pepper, but I do cheer her on
            during our sessions.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            The second part of the video you will see her with a totally different idea about
            meeting strangers and holding commands. This is because she associated training with fun
            activities and confidence building, not with being told she sucks. Pepper knows that the
            command is her safety net and that when her mom gives her an order, she not only has to
            follow it, but that it is good for her to follow it.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            This is the result of applying a KNOWLEDGE of NATURAL canine behavior, different types
            of aggression, and RESPECTING the dog for who they are. Julie, you are exactly who
            Pepper needs; your compassion and determination to find answers and treat her with
            respect are inspiring!
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600, my: 5 }}>
            A description of Protective Aggression/Fear Aggression from Dog Training World by K9-1:
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            These two are grouped together because there's just one key difference is relevant to
            developing a training plan. Protective aggression is triggered by the instinct of a dog
            to defend him/herself and other pack mates from a threat. This is a clearly observable
            behavior in all studies of wild and feral dogs and an instinct that humans have taken
            advantage of in many working dogs.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            "Fear aggression" is a variant of this behavior which is best used as a classifying term
            instead of protective aggression when the triggers seem to be irrational or
            inappropriate for a protective response. There may be some gray area as to what
            constitutes a rational protective response and what would be considered irrational. A
            handler’s expectations of her/his dog further complicate the matter.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            For example, a rottweiler that acts aggressively when a stranger walks within close
            range on a walk, is more likely to be called "protective" while a Labrador is more
            likely to be called "fearful" for the same behavior. Therefore, it is somewhat
            subjective.
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Protective Aggression Examples:
            <List>
              <ListItem> - Aggression when a stranger hugs the owner</ListItem>
              <ListItem> - Aggression from a bitch when a stranger handles her puppies</ListItem>
              <ListItem>
                {' '}
                - Aggression when a stranger approaches in a "threatening" posture
              </ListItem>
              <ListItem>
                {' '}
                - Aggression toward a dog that approaches with threatening posture
              </ListItem>
            </List>
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Fear aggression Examples:
            <List>
              <ListItem>
                {' '}
                - Aggression toward most approaching dogs regardless of the posture
              </ListItem>
              <ListItem>
                {' '}
                - Aggression toward most approaching people regardless of the posture
              </ListItem>
            </List>
          </Typography>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Fear Biter: The term "fear biter" should not be confused with “fear aggression.” Fear
            aggression is a preemptive and proactive --"I'm going to get you before you get me or
            us" -- behavior, while “fear biter” applies to a dog that bites only in defense, and
            only if flight is not an option. A typical fear biter may "fear bite" when cornered by a
            perceived threat, when getting nails clipped, or when he/she cannot escape various other
            types of fear-eliciting stimuli. Dogs who are not fear biters, may bite in the identical
            circumstances. However, whether the bite is the result of protective/fear aggression or
            dominance aggression, will need to be determined by analyzing their behaviors and body
            language, preceding the bite. The true fear biter will have fearful body language and
            will prefer flight if there is an option.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ThenAndNow;
