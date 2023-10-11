import React, { FC, useState } from 'react';
import { Typography, Box, Grid, List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import { ListItemButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import palette from '../../theme/palette';
import HeroImg from '../../assets/images/training.png';
import ScrollToTop from '../utils/ScrollToTop';

export const Services: FC = () => {
  const [showRelationshipBuilding, setShowRelationshipBuilding] = useState(false);
  const [showInHouseGroupClasses, setShowInHouseGroupClasses] = useState(false);
  const [showContinuedExercise, setShowContinuedExercise] = useState(false);
  const [showPrivateSessions, setShowPrivateSessions] = useState(false);
  const [showVirtualPrivateSessions, setShowVirtualPrivateSessions] = useState(false);
  const [showGroupClasses, setShowGroupClasses] = useState(false);
  const [showBiothaneLeash, setShowBiothaneLeash] = useState(false);
  const [showSessionSupport, setShowSessionSupport] = useState(false);
  const [showVirtualSessionSupport, setShowVirtualSessionSupport] = useState(false);
  const [showWellnessCoaching, setShowWellnessCoaching] = useState(false);
  const [showVirtualWellnessCoaching, setShowVirtualWellnessCoaching] = useState(false);
  const [showPersonalShopping, setShowPersonalShopping] = useState(false);
  const [showVirtualPersonalShopping, setShowVirtualPersonalShopping] = useState(false);
  const [showOwnerParticipation, setShowOwnerParticipation] = useState(false);
  const [showAttitude, setShowAttitude] = useState(false);

  return (
    <>
      <ScrollToTop />
      <Grid container>
        <Grid
          item
          md={12}
          style={{
            margin: '70px 0 50px 0',
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
            backgroundColor: palette.paper.secondary,
            padding: '20px',
            color: palette.text.contrast,
          }}
        >
          <Typography variant="h4" style={{ fontWeight: 600 }}>
            Setting Expectations
          </Typography>
        </Grid>
        <Grid item md={12} style={{ padding: '50px' }}>
          <Typography variant="h5" style={{ fontWeight: 600, paddingBottom: '25px' }}>
            Rogue K9 Academy’s primary purpose is to educate dog owners so that they no longer have
            to rely on, or be subject to an unstandardized industry, helping you and your dog
            overcome barriers preventing you from enjoying each other freely. Please read through
            this and consider what your expectations are through this process.
          </Typography>
          <Typography variant="h5" style={{ paddingBottom: '25px' }}>
            This will be an educational journey. You will be the student, and I will be the teacher.
            The curriculum will make you a competent dog handler. You will receive a journal with
            homework including video instructionals, lectures, and personalized directions for you
            and your dog. Including instructions for protocols in the home. In order for behavioral
            modification to be effective we need to work from the ground up. While obedience
            training is a vital part of the program, to be successful and lasting it must be based
            on a good understanding of how to communicate with and be a good leader for your dog. I
            treat each client as though they were my only client and am all in, working with you
            toward your goals.
          </Typography>
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <List>
              <ListItemButton onClick={() => setShowOwnerParticipation(!showOwnerParticipation)}>
                <ListItemText primary="Owner Participation" />
                {showOwnerParticipation ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showOwnerParticipation} timeout="auto" unmountOnExit>
                <Typography style={{ padding: '20px 10px 20px 50px' }}>
                  Owner participation is the heart of the success of this program. Dog’s can only be
                  as proficient as their handlers. We can’t teach our dogs things we don’t
                  understand. Though you and your dogs will be learning and progressing together,
                  you ultimately are responsible for your dog’s behavior. This process will
                  essentially teach you how to do so and failure to adhere to the curriculum will
                  result in compromised results. Do you have time to daily and intentionally work
                  with your dogs?
                </Typography>
              </Collapse>
              <ListItemButton onClick={() => setShowAttitude(!showAttitude)}>
                <ListItemText primary="Attitude in Dog Training" />
                {showAttitude ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showAttitude} timeout="auto" unmountOnExit>
                <Typography style={{ padding: '10px 10px 10px 50px' }}>
                  Although it’s normal to feel frustrated, worried, afraid, even jaded, in order to
                  succeed at training your dog you have to be willing to learn new ideas, change old
                  attitudes and develop a realistic, empathetic, respectful understanding of your
                  dog.
                </Typography>
                <Typography style={{ padding: '10px 10px 10px 50px' }}>
                  Attitude is not just as simple as having a good attitude or a bad attitude.
                  Attitude has to do with the structure of our thought processes and how they relate
                  to our interactions and our decision making. It is important to remember that we
                  are teaching our dogs new things, and oftentimes attempting to make changes to or
                  “undo” behaviors that have been in practice for some time. Our dogs are not
                  robots. Our dogs deserve the same patience and respect during their learning
                  process that we would want shown to us. A confused dog is not a bad or disobedient
                  dog.
                </Typography>
              </Collapse>
            </List>
          </Box>
          <Typography variant="h5" style={{ padding: '25px 0' }}>
            It is also worth noting that while you will be learning, you will also be also teaching
            your dog. Therefore his behavior will reflect you and your progress directly.
            Maintaining poise and compassionate respect is required. We will approach training our
            dogs in a composed, calm, and patient manner. Losing our tempers, intimidating, or
            taking out frustrations on our dog is not a part of this program. If our dogs are not
            reaching their goals we need to take an inventory of ourselves and our practice to find
            where the loose ends are.{' '}
            <span style={{ fontWeight: 550, color: palette.paper.secondary }}>
              Dogs will not be held responsible for human error.
            </span>
          </Typography>
          <Typography variant="h5" style={{ paddingBottom: '25px' }}>
            The dog will not be expected to obey a handler who does not have a properly established
            relationship with the dog.{' '}
            <span style={{ fontWeight: 550, color: palette.paper.secondary }}>
              Relationships are a two way street and your dogs will happily reflect your efforts.
            </span>
          </Typography>
          <Typography variant="h5" style={{ fontWeight: 600, paddingBottom: '25px' }}>
            Please take this opportunity to consider the above and whether this is a modality that
            feels right for you and your dog(s).
          </Typography>
        </Grid>
        <Grid
          item
          container
          style={{
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            color: palette.text.contrast,
          }}
        >
          <Typography variant="h4" style={{ fontWeight: 600 }}>
            Consultation
          </Typography>
          <Typography variant="h4" style={{ display: 'flex', alignSelf: 'end', fontWeight: 600 }}>
            $75
          </Typography>
        </Grid>
        <Grid item md={12} style={{ padding: '50px' }}>
          <Typography variant="h5" style={{ fontWeight: 600 }}>
            To set up your consultation, contact us at{' '}
            <a
              href="mailto: allie@dogtraining.love"
              style={{ fontStyle: 'italic', color: palette.black }}
            >
              allie@dogtraining.love
            </a>{' '}
            or{' '}
            <a href="tel: 909-964-1382" style={{ fontStyle: 'italic', color: palette.black }}>
              (909) 964-1382
            </a>
            .
          </Typography>
          <Typography variant="h5" style={{ paddingBottom: '25px' }}>
            Consultations are held via zoom and last about 1.5 to 2 hours. The purpose of the
            consultation is for us to go over the reasons your dog is exhibiting the behaviors that
            brought you here, the curriculum and how it applies to you and your dog, and the
            expectations of this program.
          </Typography>
          <Typography variant="h5" style={{ paddingBottom: '15px' }}>
            Prior to your consultation, you will receive a welcome packet with a bunch of
            complimentary information that will help you right away, and help you decide if you want
            to invest further.
          </Typography>
          <Typography variant="h5" style={{ paddingBottom: '25px' }}>
            <span style={{ fontWeight: 600 }}>Foundation Style Dog Training</span> can help any dog
            and handler team achieve any goal, because it is based on understanding animal behavior
            and how to train animals. It is not a hack, or “quick fix”!
          </Typography>
        </Grid>
        <Grid
          item
          container
          style={{
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            color: palette.text.contrast,
          }}
        >
          <Typography variant="h4" style={{ fontWeight: 600 }}>
            In-Person Training Package
          </Typography>
          <Typography variant="h4" style={{ display: 'flex', alignSelf: 'end', fontWeight: 600 }}>
            $655
          </Typography>
        </Grid>
        <Grid item md={12} style={{ padding: '50px' }}>
          <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant="h5" style={{ fontWeight: 600, paddingBottom: '25px' }}>
              Your Initial Dog Training Purchase of $655 includes all the good stuff listed below:
            </Typography>
            <Typography variant="h5" style={{ paddingBottom: '25px', fontStyle: 'italic' }}>
              *click on each to learn more
            </Typography>
          </Box>
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <List>
              <ListItemButton onClick={() => setShowPrivateSessions(!showPrivateSessions)}>
                <ListItemText primary="Five, 60 minute Private Sessions" />
                {showPrivateSessions ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showPrivateSessions} timeout="auto" unmountOnExit>
                <List>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - One on one, in person coaching. Here you will learn how to teach your dog and
                    practice new behaviors. This is where the rubber meets the road.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - Full access to myself and the RK9 community between sessions to troubleshoot
                    issues and maintain momentum.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - An interactive training journal where you can upload videos of you practicing
                    your homework, between sessions, and receive feedback in real time.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - You and your dog will learn how to communicate predictably, tackling
                    housebreaking, management, leadership and obedience that will progress at you
                    and your dog’s pace.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - Once you complete your initial 5 pack, continuing sessions will be discounted
                    and designed to reach your goals and needs.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px', fontWeight: 600 }}>
                    - The possibilities are endless. You and your dog deserve the freedom of a
                    mutual relationship and the loving bond that comes with fair and advanced
                    training.
                  </ListItem>
                </List>
              </Collapse>
              <ListItemButton onClick={() => setShowGroupClasses(!showGroupClasses)}>
                <ListItemText primary="Group Classes" />
                {showGroupClasses ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showGroupClasses} timeout="auto" unmountOnExit>
                <List>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - Group classes and social events are scheduled monthly for you to practice
                    training and proper social skills in a safe and controlled environment.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - We do everything from obedience classes, to aggression support groups, to
                    swimming lessons and fitness with Fido.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - These classes are uplifting, fun, and will make you a more confident dog
                    handler, who your dog can trust, in any situation.
                  </ListItem>
                </List>
              </Collapse>
              <ListItemButton onClick={() => setShowBiothaneLeash(!showBiothaneLeash)}>
                <ListItemText primary="One 6ft Biothane Leash in your color of choice" />
                {showBiothaneLeash ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showBiothaneLeash} timeout="auto" unmountOnExit>
                <List>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - Super comfy, easy to handle and clean, and perfect for the dedicated handler!
                  </ListItem>
                </List>
              </Collapse>
              <ListItemButton onClick={() => setShowSessionSupport(!showSessionSupport)}>
                <ListItemText
                  primary="Between session support, video instruction, troubleshooting, and homelife problem
            solving"
                />
                {showSessionSupport ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showSessionSupport} timeout="auto" unmountOnExit>
                <List>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - Relationship building and keeping momentum takes more than one practice per
                    week, and, as you will be doing homework between sessions and committed to your
                    dogs, so will I.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - I will keep in touch and respond to questions via text, emails or phone calls,
                    and communicate solutions as they arise. I will also send instructional videos
                    to help, when needed.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - You will also have access to our group forum where there will be training
                    tips, videos and a community of other Rogue K9 Academy members, like yourself,
                    who are working to achieve their goals.
                  </ListItem>
                </List>
              </Collapse>
              <ListItemButton onClick={() => setShowWellnessCoaching(!showWellnessCoaching)}>
                <ListItemText primary="Wellness Coaching" />
                {showWellnessCoaching ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showWellnessCoaching} timeout="auto" unmountOnExit>
                <List>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - There is more to dog ownership than obedience. A healthy dog is a happy dog. I
                    will help you make educated decisions about health care and nutrition.
                  </ListItem>
                </List>
              </Collapse>
              <ListItemButton onClick={() => setShowPersonalShopping(!showPersonalShopping)}>
                <ListItemText primary="“Personal Shopping”" />
                {showPersonalShopping ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showPersonalShopping} timeout="auto" unmountOnExit>
                <List>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - I will help you pick out any additional gear you and your dog may need,
                    including training collars, and the very best training treats.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - Consider me your dog’s concierge service (these items will be charged
                    separately)!
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Box>
        </Grid>
        <Grid
          item
          container
          style={{
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            color: palette.text.contrast,
          }}
        >
          <Typography variant="h4" style={{ fontWeight: 600 }}>
            Virtual Training Package
          </Typography>
          <Typography variant="h4" style={{ display: 'flex', alignSelf: 'end', fontWeight: 600 }}>
            $500
          </Typography>
        </Grid>
        <Grid item md={12} style={{ padding: '50px' }}>
          <Typography variant="h5" style={{ fontWeight: 600, paddingBottom: '25px' }}>
            This is a great modality for aggression cases out of the area, or for people on a
            budget. I currently have clients internationally who are reaping the benefits of
            learning how to become the handler their dog needs.
          </Typography>
          <Box style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Typography variant="h5" style={{ fontWeight: 600, paddingBottom: '25px' }}>
              Your Initial Dog Training Purchase of $500 includes all the good stuff listed below:
            </Typography>
            <Typography variant="h5" style={{ paddingBottom: '25px', fontStyle: 'italic' }}>
              *click on each to learn more
            </Typography>
          </Box>
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <List>
              <ListItemButton
                onClick={() => setShowVirtualPrivateSessions(!showVirtualPrivateSessions)}
              >
                <ListItemText primary="Five, 60 minute Private Sessions" />
                {showVirtualPrivateSessions ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showVirtualPrivateSessions} timeout="auto" unmountOnExit>
                <List>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - Here you will learn how to teach your dog and practice new behaviors. This is
                    where the rubber meets the road.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - Full access to myself and the RK9 community between sessions to troubleshoot
                    issues and maintain momentum.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - An interactive training journal where you can upload videos of you practicing
                    your homework, between sessions, and receive feedback in real time.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - You and your dog will learn how to communicate predictably, tackling
                    housebreaking, management, leadership and obedience that will progress at you
                    and your dog’s pace.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - Once you complete your initial 5 pack, continuing sessions will be discounted
                    and designed to reach your goals and needs.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px', fontWeight: 600 }}>
                    - The possibilities are endless. You and your dog deserve the freedom of a
                    mutual relationship and the loving bond that comes with fair and advanced
                    training.
                  </ListItem>
                </List>
              </Collapse>
              <ListItemButton
                onClick={() => setShowVirtualSessionSupport(!showVirtualSessionSupport)}
              >
                <ListItemText
                  primary="Between session support, video instruction, troubleshooting, and homelife problem
            solving"
                />
                {showVirtualSessionSupport ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showVirtualSessionSupport} timeout="auto" unmountOnExit>
                <List>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - Relationship building and keeping momentum takes more than one practice per
                    week, and, as you will be doing homework between sessions and committed to your
                    dogs, so will I.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - I will keep in touch and respond to questions via text, emails or phone calls,
                    and communicate solutions as they arise. I will also send instructional videos
                    to help, when needed.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - You will also have access to our group forum where there will be training
                    tips, videos and a community of other Rogue K9 Academy members, like yourself,
                    who are working to achieve their goals.
                  </ListItem>
                </List>
              </Collapse>
              <ListItemButton
                onClick={() => setShowVirtualWellnessCoaching(!showVirtualWellnessCoaching)}
              >
                <ListItemText primary="Wellness Coaching" />
                {showVirtualWellnessCoaching ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showVirtualWellnessCoaching} timeout="auto" unmountOnExit>
                <List>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - There is more to dog ownership than obedience. A healthy dog is a happy dog. I
                    will help you make educated decisions about health care and nutrition.
                  </ListItem>
                </List>
              </Collapse>
              <ListItemButton
                onClick={() => setShowVirtualPersonalShopping(!showVirtualPersonalShopping)}
              >
                <ListItemText primary="“Personal Shopping”" />
                {showVirtualPersonalShopping ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showVirtualPersonalShopping} timeout="auto" unmountOnExit>
                <List>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - I will help you pick out any additional gear you and your dog may need,
                    including training collars, and the very best training treats.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - Consider me your dog’s concierge service (these items will be charged
                    separately)!
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Box>
        </Grid>
        <Grid
          item
          container
          style={{
            backgroundColor: palette.paper.secondary,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px',
            color: palette.text.contrast,
          }}
        >
          <Typography variant="h4" style={{ fontWeight: 600 }}>
            In-house Training Package
          </Typography>
          <Typography variant="h4" style={{ display: 'flex', alignSelf: 'end', fontWeight: 600 }}>
            Let&apos;s Talk!
          </Typography>
        </Grid>
        <Grid item md={12} style={{ padding: '50px' }}>
          <Typography variant="h5" style={{ fontWeight: 600, paddingBottom: '25px' }}>
            This is often utilized by people with mobility issues and families with special
            circumstances, who want the transparency of being able to see exactly what their dog is
            learning and how they are being handled, but aren&apos;t able to do the training
            themselves. I will do the hands-on teaching of the commands you want your dog to know.
          </Typography>
          <Typography variant="h5" style={{ paddingBottom: '25px' }}>
            Training will reflect the needs and requirements you may have for example: dogs learning
            to walk with a motorized scooter, pick up and retrieve dropped objects, off leash
            control etc. I will take your dogs into environments and on field trips as they progress
            so they can have a well rounded education, and be ready for variable environments. You
            will practice leadership and relationship building in the home. You will still
            participate, but won&apos;t have to do the repetitive drills the dogs need to learn. As
            the dog builds momentum you will attend benchmark sessions to learn how to handle your
            dog.
          </Typography>
          <Typography variant="h5" style={{ fontWeight: 600, paddingBottom: '25px' }}>
            Our dogs can only be as proficient as their handlers and I want YOU to be the
            predictable handler your dog deserves, while helping you achieve these goals without
            sacrificing your relationship with your dog.
          </Typography>
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <List>
              <ListItemButton
                onClick={() => setShowRelationshipBuilding(!showRelationshipBuilding)}
              >
                <ListItemText primary="Relationship building support and home life troubleshooting" />
                {showRelationshipBuilding ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showRelationshipBuilding} timeout="auto" unmountOnExit>
                <List>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - Relationship building is built on interactions that develop trust, I will give
                    you the tools to achieve your relationship goals.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - I will keep in touch and respond to questions via text, emails or phone calls,
                    and communicate solutions as they arise. I will also send instructional videos
                    to help, when needed.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - You will also have access to our group forum where there will be training
                    tips, videos and a community of other Rogue K9 Academy members, like yourself,
                    who are working to achieve their goals.
                  </ListItem>
                </List>
              </Collapse>
              <ListItemButton onClick={() => setShowInHouseGroupClasses(!showInHouseGroupClasses)}>
                <ListItemText primary="Group Classes" />
                {showInHouseGroupClasses ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showInHouseGroupClasses} timeout="auto" unmountOnExit>
                <List>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - As part of this package I will take your dog to group classes and pack walks
                    with other clients&apos; dogs. This will help them develop real social
                    confidence and composure they need to be steady in variable environments.
                  </ListItem>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - When you are ready you will be able to attend uplifting and fun classes that
                    will make you a more confident dog handler, who your dog can trust, in any
                    situation.
                  </ListItem>
                </List>
              </Collapse>
              <ListItemButton onClick={() => setShowContinuedExercise(!showContinuedExercise)}>
                <ListItemText primary="Continued Exercise" />
                {showContinuedExercise ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={showContinuedExercise} timeout="auto" unmountOnExit>
                <List>
                  <ListItem style={{ paddingLeft: '50px' }}>
                    - Some people need ongoing help with exercising their dogs after training is
                    complete. We have various solutions for this need, and are happy to help you
                    give your dog a full life that respects and honors your relationship with him.
                  </ListItem>
                </List>
              </Collapse>
            </List>
          </Box>
        </Grid>
        <Grid
          item
          container
          style={{
            backgroundColor: palette.paper.secondary,
            padding: '20px',
            color: palette.text.contrast,
          }}
        >
          <Typography variant="h4" style={{ fontWeight: 600 }}>
            Advanced Training Options
          </Typography>
        </Grid>
        <Grid item md={12} style={{ padding: '50px' }}>
          <Typography variant="h5" style={{ fontWeight: 600, paddingBottom: '25px' }}>
            The sky is the limit, when it comes to training your pup!
          </Typography>
          <Typography variant="h5" style={{ paddingBottom: '25px' }}>
            We also offer the following extracurricular activities, for those who have completed
            their advanced obedience:
          </Typography>
          <Typography variant="h5" style={{ paddingBottom: '15px' }}>
            - Personal Protection
          </Typography>
          <Typography variant="h5" style={{ paddingBottom: '15px' }}>
            - Scent Detection
          </Typography>
          <Typography variant="h5" style={{ paddingBottom: '15px' }}>
            - Dock Diving
          </Typography>
          <Typography variant="h5" style={{ paddingBottom: '15px' }}>
            - Cart Pulling
          </Typography>
          <Typography variant="h5" style={{ paddingBottom: '15px' }}>
            - Retrieving
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Services;
