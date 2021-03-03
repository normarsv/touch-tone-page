import { Button, Form, Input, message, Space } from 'antd';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useRef, useState } from 'react';
import API from '../../API/API';
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export const EmailConfirmation = ({ query }) => {
  const form = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const confirmToken = async () => {
    if(!query.token) 
    {
      router.push('/')
      return;
    }

    setLoading(true);
    const api = new API(query.token);
    const emailConfirm = await api.GET('/AuthUsers/EmailConfirm');
    console.log(emailConfirm);
    if(emailConfirm.statusCode == 200)
    {
      setConfirmationMessage('Your email address has been successfully confirmed.')
    }
    else{
      message.error(emailConfirm.response.message);
      setConfirmationMessage('There was an error verifying your email')
    }

    if (form.current !== undefined && form.current !== null) {
      form.current.resetFields();
    }
    setLoading(false);
  };

  useEffect(()=>{
    confirmToken();
  }, [])

  const hoverAnimation = {
    x: -2,
    cursor: "pointer",
    color: "red",
    transition: { duration: 0.5 },
  };

  return (
    <>
        <div className='flex center'>
          <div className='login-form-div'>
            <div className='login-form-content-div'>
              <Space
                size='middle'
                direction='vertical'
                style={{ width: '100%' }}
              >
                <div>
                  <h1 className='title-style'>{ "Email confirmation"}</h1>
                  <h4>
                  {loading ? "Loading..." :  confirmationMessage }
                </h4>
                </div>
                <div className="flex flex-wrap">
                  <motion.div whileHover={hoverAnimation}>
                    <Space
                      onClick={() =>  router.push('/')}
                      direction="horizontal"
                    >
                      click here to log in.
                    </Space>
                  </motion.div>
                </div>
              </Space>
           
            </div>
          </div>
      </div>
    </>
  );
};
