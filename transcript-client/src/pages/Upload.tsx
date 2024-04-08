import { Center, Button, Text, Flex, Checkbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useUploader from "src/hooks/useUploader";
import Progress from "src/components/uploads/Progress";
import UploadedFileInfo from "src/components/uploads/UploadedFileInfo";
import FileUploadArea from "src/components/uploads/FileUploadArea";
import { useTranscription } from "src/hooks/useTranscription";
import { useAudioContext } from "src/context/AudioContext";
import { useTutorialContext } from "src/context/TutorialContext";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateTranscript } from "src/utils/backendCalls";

const uploadTutorials = {
  id: "upload",
  tutorials: [
    {
      position: {
        pos: "fixed",
        top: { base: "130px", md: "50%" },
        right: { md: "15%" },
      },
      text: "Upload an audio file in a variety of formats (mp3, mp4, mpeg, mpga, mp4a, wav, webm). Once uploaded, select the transcript language from the dropdown menu and click 'Transcribe'.",
    },
  ],
};

function Upload() {
  const [uploaded, setUploaded] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(false)
  const [progress, setProgress] = useState(0);
  const { getInputProps, getRootProps } = useUploader(setUploaded);
  const navigate = useNavigate();
  const { setTranscriptionData, setTranscriptionVTT, isVideo, setVideoFile, setIsVideo } =
    useTranscription();
  const [languageCode, setLanguageCode] = useState("en");
  const { updateTutorialList } = useTutorialContext();

  useEffect(() => {
    updateTutorialList(uploadTutorials);
  }, [updateTutorialList]);

  
  
  const { setAudioFile } = useAudioContext();
  const passTranscript = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (uploaded) {
      try {
        // add file format and size checks before making request
        const allowedFormats = [
          ".mp3",
          ".wav",
          ".m4a",
          ".mpga",
          ".mp4",
          ".webm",
          ".mpeg",
        ];
        const maxFileSize = 300; // max file size in MB

        if (
          !allowedFormats.some((format) =>
            uploaded.name.toLowerCase().endsWith(format)
          )
        ) {
          toast.error("File format not supported");
          return;
        } // file size too large error
        else if (uploaded.size > maxFileSize * 1000000) {
          toast.error(
            "File size is too large. Please upload file smaller than 300 MB."
          );
          return;
        }

        // const data = await generateTranscript(
        //   uploaded,
        //   languageCode,
        //   isVideo,
        //   setProgress
        // );
       
        const data =`WEBVTT

        00:00:00.000 --> 00:00:09.200
        I have a feeling most people in this room would like to have a robot at home.
        
        00:00:09.200 --> 00:00:14.360
        It'd be nice to be able to do the chores and take care of things. Where are these
        
        00:00:14.360 --> 00:00:20.240
        robots? What's taking so long? I mean we have our tricorders and we have
        
        00:00:20.240 --> 00:00:29.639
        satellites, we have laser beams, but where are the robots? I mean okay wait we do
        
        00:00:29.639 --> 00:00:36.119
        have some robots in our home but not really doing anything that exciting okay.
        
        00:00:36.119 --> 00:00:42.080
        Now I've been doing research at UC Berkeley for 30 years with my students
        
        00:00:42.080 --> 00:00:48.360
        on robots and in the next 10 minutes I'm going to try to explain the gap between
        
        00:00:48.360 --> 00:00:53.959
        fiction and reality. Now we've seen images like this right these are real
        
        00:00:53.959 --> 00:00:58.080
        robots they're pretty amazing but those of us who work in the field well the
        
        00:00:58.080 --> 00:01:06.160
        reality is more like this. That's 99 out of 100 times that's what happens and in
        
        00:01:06.160 --> 00:01:09.480
        the field there's something that explains this that we call Moravec's
        
        00:01:09.480 --> 00:01:15.000
        paradox and that is what's easy for robots like being able to pick up a
        
        00:01:15.000 --> 00:01:22.360
        large object large heavy object is hard for humans but what's easy for humans
        
        00:01:22.360 --> 00:01:27.559
        like being able to pick up some blocks and stack them well it turns out that
        
        00:01:27.559 --> 00:01:35.320
        is very hard for robots and this is a persistent problem so the ability to
        
        00:01:35.320 --> 00:01:41.599
        grasp arbitrary objects is a grand challenge for my field. Now by the way I
        
        00:01:41.599 --> 00:01:48.080
        was a very klutzy kid I I was I would drop things anytime someone would throw
        
        00:01:48.080 --> 00:01:51.839
        me a ball I would drop it I was the last kid to get picked on a basketball team
        
        00:01:51.959 --> 00:01:57.680
        I'm still pretty klutzy actually but I have spent my entire career studying how
        
        00:01:57.680 --> 00:02:04.800
        to make robots less clumsy. Now let's start with the hardware so the hands now
        
        00:02:04.800 --> 00:02:08.639
        these are this is a robot hand a particular type of hand it's a lot like
        
        00:02:08.639 --> 00:02:14.000
        our hand and it has a lot of motors a lot of tendons and cables as you can see
        
        00:02:14.000 --> 00:02:19.119
        so it's unfortunately not very reliable it's also very heavy and very expensive
        
        00:02:19.119 --> 00:02:25.399
        so I'm in favor of very simple hands like this so this has just two fingers
        
        00:02:25.399 --> 00:02:31.360
        it's known as a parallel jaw gripper so it's very simple it's lightweight and
        
        00:02:31.360 --> 00:02:37.199
        reliable and it's very inexpensive and if you're doubting that simple hands can
        
        00:02:37.199 --> 00:02:42.679
        be effective look at this video where you can see that two very simple grippers
        
        00:02:42.679 --> 00:02:46.720
        these are being operated by the by the way by humans who are controlling the
        
        00:02:46.720 --> 00:02:50.320
        grippers like a puppet but very simple grippers are capable of doing very
        
        00:02:50.320 --> 00:02:55.360
        complex things now actually an industry there's even a simpler robot gripper and
        
        00:02:55.360 --> 00:02:59.800
        that's the suction cup and that only makes a single point of contact so again
        
        00:02:59.800 --> 00:03:05.039
        simplicity is very helpful in our field now let's talk about the software and
        
        00:03:05.039 --> 00:03:10.000
        this is where it gets really really difficult because of a fundamental issue
        
        00:03:10.000 --> 00:03:15.440
        which is uncertainty there's uncertainty in the control there's uncertainty in
        
        00:03:15.440 --> 00:03:20.320
        the perception and there's uncertainty in the physics now what do I mean by the
        
        00:03:20.320 --> 00:03:25.080
        control well if you look at a robots gripper trying to do something it's
        
        00:03:25.080 --> 00:03:29.240
        there's a lot of uncertainty in the cables and the mechanisms that cause
        
        00:03:29.240 --> 00:03:33.679
        very small errors and these can accumulate and make it very difficult to
        
        00:03:33.679 --> 00:03:39.559
        manipulate things now in terms of the sensors yes robots have very high
        
        00:03:39.559 --> 00:03:43.759
        resolution cameras just like we do and that allows them to take images of
        
        00:03:44.479 --> 00:03:49.720
        scenes in traffic or in a retirement center or in a warehouse or in an
        
        00:03:49.720 --> 00:03:53.800
        operating room but these don't give you the three-dimensional structure of what's
        
        00:03:53.800 --> 00:03:59.160
        going on so recently there was a new development called LiDAR and this is a
        
        00:03:59.160 --> 00:04:04.080
        new class of cameras that use light beams to build up a three-dimensional
        
        00:04:04.080 --> 00:04:08.800
        model of the environment and these are fairly effective they've really were a
        
        00:04:08.919 --> 00:04:14.000
        breakthrough in our field but they're not perfect so if the objects have
        
        00:04:14.000 --> 00:04:18.959
        anything that's shiny or transparent well then the light acts in
        
        00:04:18.959 --> 00:04:22.440
        unpredictable ways and ends up with noise and holes in the images so these
        
        00:04:22.440 --> 00:04:26.399
        aren't really the silver bullet and there's one other form of sensor out
        
        00:04:26.399 --> 00:04:30.320
        there now called a tactile sensor and these are very interesting they use
        
        00:04:30.320 --> 00:04:36.040
        cameras to actually image the surfaces as a robot would make contact but these
        
        00:04:36.040 --> 00:04:42.160
        are still in their infancy now the last issue is the physics and let me
        
        00:04:42.160 --> 00:04:46.519
        illustrate for you by showing you we take a bottle on a table and we just
        
        00:04:46.519 --> 00:04:50.959
        push it and the robots pushing it in exactly the same way each time but you
        
        00:04:50.959 --> 00:04:55.720
        can see that the bottle ends up in a very different place each time why is
        
        00:04:55.720 --> 00:05:00.880
        that well it's because it depends on the microscopic surface topography
        
        00:05:00.880 --> 00:05:05.799
        underneath the bottle as it slid for example if you put a grain of sand under
        
        00:05:05.799 --> 00:05:09.519
        there it would react very differently than if there weren't a grain of sand
        
        00:05:09.519 --> 00:05:14.480
        and we can't see if there's a grain of sand because it's under the bottle it
        
        00:05:14.480 --> 00:05:21.279
        turns out that we can predict the motion of an asteroid a million miles away far
        
        00:05:21.279 --> 00:05:25.359
        better than we can predict the motion of an object as it's being grasped by a
        
        00:05:25.359 --> 00:05:32.119
        robot now let me give you an example put yourself here into the position of being
        
        00:05:32.119 --> 00:05:36.760
        a robot you're trying to clear the table and your sensors are noisy and
        
        00:05:36.760 --> 00:05:42.040
        imprecise your actuators your cables and motors are uncertain so you can't fully
        
        00:05:42.040 --> 00:05:46.480
        control your own gripper and there's uncertainty in the physics so you really
        
        00:05:46.480 --> 00:05:50.040
        don't know what's going to happen so it's not surprising that robots are
        
        00:05:50.040 --> 00:05:56.079
        still very clumsy now there's one sweet spot for robots and that has to do with
        
        00:05:56.079 --> 00:06:00.200
        e-commerce and this has been growing it's a huge trend and during the
        
        00:06:00.200 --> 00:06:06.440
        pandemic it really jumped up I think most of us can relate to that we started
        
        00:06:06.440 --> 00:06:10.519
        ordering things like never before and this trend is continuing and that
        
        00:06:10.519 --> 00:06:15.760
        challenge is to meet the demand we have to be able to get all these packages
        
        00:06:15.760 --> 00:06:20.519
        delivered in a timely manner and the challenge is that every package is
        
        00:06:20.519 --> 00:06:25.679
        different every order is different so you might order some some nail polish
        
        00:06:25.679 --> 00:06:32.119
        and an electric screwdriver and those two objects are going to be somewhere
        
        00:06:32.119 --> 00:06:36.679
        inside one of these giant warehouses and what needs to be done is someone has to
        
        00:06:36.679 --> 00:06:40.440
        go in find the nail polish and then go and find the screwdriver bring them
        
        00:06:40.440 --> 00:06:44.399
        together put them into a box and deliver them to you so this is extremely
        
        00:06:44.399 --> 00:06:49.239
        difficult it requires grasping so today this is almost entirely done with humans
        
        00:06:49.239 --> 00:06:52.640
        and the humans don't like doing this work there's a huge amount of turnover
        
        00:06:52.640 --> 00:06:59.519
        so it's a challenge and people have tried to put robots into warehouses to
        
        00:06:59.519 --> 00:07:02.200
        do this work
        
        00:07:09.959 --> 00:07:16.399
        hasn't turned out all that well but my students and I about five years ago we
        
        00:07:16.399 --> 00:07:21.279
        came up with a method using advances in AI and deep learning to have a robot
        
        00:07:21.279 --> 00:07:25.320
        essentially train itself to be able to grasp objects and the idea was that the
        
        00:07:25.320 --> 00:07:29.040
        robot would do this in simulation it was almost as if the robot would dreaming
        
        00:07:29.040 --> 00:07:33.279
        about how to grasp things and learning how to grasp them reliably and here's
        
        00:07:33.279 --> 00:07:38.679
        the result this is a system called Dexnet that is able to reliably pick up
        
        00:07:38.679 --> 00:07:42.720
        objects that we put into these bins in front of the robot these are objects
        
        00:07:42.720 --> 00:07:47.359
        it's never been trained on and it's able to pick these objects up and reliably
        
        00:07:47.359 --> 00:07:52.239
        clear these bins over and over again so we were very excited about this result
        
        00:07:52.239 --> 00:07:57.000
        and the students and I went out to form a company and we now have a company
        
        00:07:57.000 --> 00:08:02.959
        called Ambirobotics and what we do is make machines that use the algorithms
        
        00:08:02.959 --> 00:08:08.600
        the software we developed at Berkeley to pick up packages and this is for
        
        00:08:08.600 --> 00:08:12.839
        e-commerce the packages arrive in large bins all different shapes and sizes and
        
        00:08:12.839 --> 00:08:16.720
        they have to be picked up scanned and then put into smaller bins depending on
        
        00:08:16.720 --> 00:08:21.600
        their zip code we now have 80 of these machines operating across the United
        
        00:08:21.600 --> 00:08:29.600
        States sorting over a million packages a week now that's that's some progress but
        
        00:08:29.600 --> 00:08:34.719
        it's not exactly the home robot that we're all been waiting for so I want to
        
        00:08:34.719 --> 00:08:38.599
        give you a little bit of an idea of some of the new research that we're doing to
        
        00:08:38.599 --> 00:08:42.880
        try to be able to have robots more capable in homes and one particular
        
        00:08:43.039 --> 00:08:47.520
        challenge is being able to manipulate deformable objects like strings in one
        
        00:08:47.520 --> 00:08:52.440
        dimension two-dimensional sheets and three dimensions like like like fruits
        
        00:08:52.440 --> 00:08:58.320
        and vegetables so we've been working on a project to untangle knots and what we
        
        00:08:58.320 --> 00:09:02.679
        do is we take a cable we put that in front of the robot it has to use a
        
        00:09:02.679 --> 00:09:06.719
        camera to look down analyze the cable figure out where to grasp it and how to
        
        00:09:06.719 --> 00:09:11.479
        pull it apart to be able to untangle it and this is a very hard problem because
        
        00:09:11.479 --> 00:09:15.599
        the cable is much longer than the reach of the robot so it has to go through and
        
        00:09:15.599 --> 00:09:20.359
        manipulate manage the slack as it's working and I would say this is doing
        
        00:09:20.359 --> 00:09:24.840
        pretty well it's gotten up to about 80% success when we give it a tangled cable
        
        00:09:24.840 --> 00:09:29.840
        at being able to untangle it the other one is something I think we also all are
        
        00:09:29.840 --> 00:09:35.520
        waiting for robot to fold the laundry now roboticists have actually been
        
        00:09:35.520 --> 00:09:39.840
        looking at this for a long time and there was some research that has been
        
        00:09:39.840 --> 00:09:44.919
        done on this but the problem is that it's very very slow so this was about
        
        00:09:44.919 --> 00:09:54.440
        three to six folds per hour okay so we decided to revisit this problem and
        
        00:09:54.440 --> 00:09:57.400
        try to have a robot work very fast so one of the things we did was try to
        
        00:09:57.400 --> 00:10:00.919
        think about a two-armed robot that could fling the fabric the way we do when
        
        00:10:00.919 --> 00:10:04.479
        we're folding and then we also use friction in this case to drag the
        
        00:10:04.479 --> 00:10:07.799
        fabric to open to smooth out some wrinkles and then we borrowed a trick
        
        00:10:08.159 --> 00:10:12.960
        which is known as the two-second fold you might have heard of this it's
        
        00:10:12.960 --> 00:10:17.039
        amazing because the robot is doing exactly the same thing and it's a little
        
        00:10:17.039 --> 00:10:21.320
        bit longer but that's real time it's not sped up so we're making some progress
        
        00:10:21.320 --> 00:10:27.159
        there and the last example is bagging so you all encounter this all the time you
        
        00:10:27.159 --> 00:10:31.000
        go to a corner store you have to put something in a bag now it's easy again
        
        00:10:31.000 --> 00:10:36.159
        for humans but it's actually very very tricky for robots because for humans you
        
        00:10:36.159 --> 00:10:40.000
        know how to take the bag and how to manipulate it but robots the bag can
        
        00:10:40.000 --> 00:10:43.799
        arrive in many different configurations it's very hard to tell what's going on
        
        00:10:43.799 --> 00:10:48.760
        and for the robot to figure out how to open up that bag so what we did was we
        
        00:10:48.760 --> 00:10:54.359
        had the robot train itself by we painted one of these bags with fluorescent paint
        
        00:10:54.359 --> 00:10:57.080
        and we had fluorescent lights that would turn on and off and the robot would
        
        00:10:57.080 --> 00:11:02.400
        essentially teach itself how to manipulate these bags and so we've got
        
        00:11:02.400 --> 00:11:06.880
        it now up to the point where we're able to solve this problem about half the
        
        00:11:06.880 --> 00:11:11.559
        time so it works but I'm saying it's still we're still not we're still not
        
        00:11:11.559 --> 00:11:15.599
        quite there yet so I want to come back to Moravec's paradox what's easy for
        
        00:11:15.599 --> 00:11:22.760
        robots is hard for humans and what's easy for us is still hard for robots we
        
        00:11:22.760 --> 00:11:29.520
        have incredible capabilities we're very good at manipulation but robots still
        
        00:11:29.520 --> 00:11:36.400
        are not there I want to say I understand it's been 60 years and we're
        
        00:11:36.400 --> 00:11:42.159
        still waiting for the robots that the Jetsons had why is this difficult we
        
        00:11:42.159 --> 00:11:48.880
        need robots because we want them to be able to do tasks that we can't do or we
        
        00:11:48.880 --> 00:11:53.640
        don't really want to do but I want you to keep in mind that these robots
        
        00:11:53.640 --> 00:11:59.760
        they're coming just be patient because we want the robots but robots also need
        
        00:11:59.760 --> 00:12:08.599
        us to do the many things that robots still can't do thank you
        `

        toast.success("File successfully uploaded");
        setTimeout(() => {
          if (isVideo) {
            //@ts-ignore
            setTranscriptionVTT(data);
            setVideoFile(uploaded)
            navigate("/transcription", { state: { uploadedFile: uploaded } });
          } else {
            //@ts-ignore
            setTranscriptionData(data.transcript);
          }
          navigate("/transcription", { state: { uploadedFile: uploaded } });
        }, 1000); // Pass the uploaded file to the TranscriptionPage
      } catch (err: any) {
        setIsLoading(false);
        if (err.message) {
          toast.error(err.message); // get error message from server
        } else {
          toast.error(
            "Error uploading file. Please ensure file is an acceptable format."
          );
        }
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
        setAudioFile(null); // Clear the audio file from the audio context
        setUploaded(null);
      }
    }
  };

  return (
    <Center textAlign="center" height="100%">
      {isLoading ? (
        <Progress value={progress} />
      ) : uploaded ? (
        <UploadedFileInfo
          file={uploaded}
          onChange={(value) => setLanguageCode(value)}
          onVideoFlagChange ={(isVideo) => setIsVideo(isVideo)} 
          
        >
          <Button width="100%" onClick={passTranscript}>
            Transcribe
          </Button>
          <Flex alignItems="center" justifyContent="center" mt={4}>
              <Checkbox isChecked={isVideo} onChange={(e) => setIsVideo(e.target.checked)}>
                Is this file in video format?
              </Checkbox>
              <Text ml={2}>Video File</Text>
            </Flex>
        </UploadedFileInfo>
      ) : (
        <FileUploadArea
          getInputProps={getInputProps}
          getRootProps={getRootProps}
        />
      )}
    </Center>
  );
}

export default Upload;
