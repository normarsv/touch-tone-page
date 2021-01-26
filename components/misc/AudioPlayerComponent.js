import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { UserContext } from '../authentication/UserContext';
import API from '../../API/API';
import H5AudioPlayer from 'react-h5-audio-player';

const AudioPlayerComponent = ({ fileName }) => {
  const [getVoiceMail, setGetVoiceMail] = useState(false);
  const [currentAudio, setCurrentAudio] = useState('');
  const { userInfo } = useContext(UserContext);

  const api = new API(userInfo.token);

  const getAudioFile = async () => {
    const audioRes = await api.GET(
      '/Services/audio-converter-url/' + fileName + '.MU'
    );
    setCurrentAudio(audioRes.response);
    console.log(audioRes);
  };

  const handleVoiceMail = () => {
    setGetVoiceMail(!getVoiceMail);
    getAudioFile();
    console.log('File name', fileName);
  };

  console.log('current audio', currentAudio);
  return (
    <>
      {!getVoiceMail ? (
        <Button onClick={handleVoiceMail}>Play</Button>
      ) : (
        <H5AudioPlayer
          autoPlay
          showJumpControls={false}
          src={currentAudio}
          onPlay={(e) => console.log('onPlay')}
          // other props here
        />
      )}
    </>
  );
};

AudioPlayerComponent.propTypes = {
  someData: PropTypes.string,
};

export default AudioPlayerComponent;
