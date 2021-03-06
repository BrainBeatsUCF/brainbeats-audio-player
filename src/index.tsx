/// <reference path='./index.d.ts'/>

import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import PlayButton from '../public/assets/playButton.png';
import BackwardButton from '../public/assets/backButton.png';
import PauseButton from '../public/assets/pauseButton.png';
import ForwardButton from '../public/assets/forwardButton.png';

interface AudioObject {
  title: string,
  authorName: string,
  imageUrl: string,
  audioUrl: string
}

interface AudioPlayerProps { 
  audioObjectArray: AudioObject[],
  style?: React.CSSProperties,
  setPlayingIndexAudioPackage: any,
}

const useStyles = makeStyles(() => ({
  pictureContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pictureBorder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 120,
    height: 110,
    width: 110,
    border: 'solid rgb(208, 53, 30) 1px',
  },
  picture: {
    height: 100,
    width: 100,
    borderRadius: '50%'
  },
  audioPictureContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: 80,
    border: 'solid rgb(208, 53, 30) 1px',
    borderRadius: '130px',
  },
  audioPicture: {
    height: 60,
    width: 60,
    borderRadius: '50%'
  }
}));

const BrainBeatsAudioPlayer: React.FC<AudioPlayerProps> = ({...props}) => {
  const classes = useStyles();
  const audioLength = props.audioObjectArray.length;
  const [indexPlaying, setIndexPlaying] = React.useState(0);
  const PlayButtonIcon = <img src={PlayButton} alt='Play Button'></img>
  const BackwardButtonIcon = <img src={BackwardButton} alt='Backward Button'></img>
  const PauseButtonIcon = <img src={PauseButton} alt='Pause Button'></img>
  const ForwardButtonIcon = <img src={ForwardButton} alt='Forward Button'></img>

  const playForward = () => {
    let newIndex: number;
    if (indexPlaying === audioLength - 1) {
      newIndex = 0;
    } else {
      newIndex = indexPlaying + 1;
    }
    setIndexPlaying(newIndex);
  }


  const playBackward = () => {
    let newIndex: number;
    if (indexPlaying === 0) {
      newIndex = audioLength - 1;
    } else {
      newIndex = indexPlaying - 1;
    }
    setIndexPlaying(newIndex);
  }

  React.useEffect(() => {
    props.setPlayingIndexAudioPackage(indexPlaying);
  }, [indexPlaying]);

  return (
    <div>
      <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
        <div className={classes.audioPictureContainer}>
          <img className={classes.audioPicture} alt='' src={props.audioObjectArray[indexPlaying].imageUrl}></img>
        </div>
      </div>
      
      <AudioPlayer
        style={props.style}
        onClickPrevious={playBackward}
        onClickNext={playForward}
        src={props.audioObjectArray[indexPlaying].audioUrl}
        onPlay={e => props.setPlayingIndexAudioPackage(indexPlaying)}
        onEnded={playForward}
        header={props.audioObjectArray[indexPlaying].title + ` by ` + props.audioObjectArray[indexPlaying].authorName}
        showSkipControls
        showJumpControls = {false}
        customIcons = {{
          play: PlayButtonIcon,
          pause: PauseButtonIcon,
          next: ForwardButtonIcon,
          previous: BackwardButtonIcon,
        }}
        autoPlay
      />
    </div>
  );
};

export default BrainBeatsAudioPlayer;

