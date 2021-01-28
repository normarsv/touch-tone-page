import { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { UserContext } from '../authentication/UserContext';
import API from '../../API/API';
import H5AudioPlayer from 'react-h5-audio-player';

const AudioPlayerComponent = ({ reloadComponent, fileName }) => {
  const [getVoiceMail, setGetVoiceMail] = useState(false);
  const [currentAudio, setCurrentAudio] = useState('');
  const [currentFileName, setCurrentFileName] = useState(fileName);
  const [currentLoading, setCurrentLoading] = useState(reloadComponent);
  const { userInfo } = useContext(UserContext);

  const api = new API(userInfo.token);

  const getAudioFile = async () => {
    const audioRes = await api.GET(
      '/Services/audio-converter-url/' + fileName + '.MU'
    );
    setCurrentAudio(audioRes.response);
  };

  const handleVoiceMail = () => {
    setGetVoiceMail(!getVoiceMail);
    getAudioFile();
  };

  useEffect(() => {
    if (reloadComponent !== currentLoading) {
      setCurrentFileName(fileName);
      setCurrentAudio('');
      setGetVoiceMail(false);
      setCurrentLoading(false);
    }
  }, [reloadComponent]);

  useEffect(() => {
    if (fileName !== currentFileName) {
      setCurrentFileName(fileName);
      setCurrentAudio('');
      setGetVoiceMail(false);
    }
  }, [fileName]);

  return (
    <>
      {!getVoiceMail ? (
        <Button onClick={handleVoiceMail}>Play</Button>
      ) : (
        <H5AudioPlayer
          autoPlay
          showJumpControls={false}
          src={currentAudio}
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
