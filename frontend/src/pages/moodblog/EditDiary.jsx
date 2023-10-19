// import { Box, Typography } from "@mui/material";
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Layout from "../../partials/dashboard/Layout";
import { useUser } from "@clerk/clerk-react";
import axios from 'axios';

export default function MoodBlogComponent({onClick}) {
  const { TextArea } = Input;
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // Clerk user.
  const { user } = useUser();

  // Format current date.
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();

  // 當使用者按下儲存，創建session。
  // TODO: 沒有儲存到內容，改後端API。
  const createSession = (user) => {
    axios.post(`http://localhost:3000/users/${user.id}/sessions`)
    .then((res) => {
      console.log(res.data)
      setSessionId(res.data._id)
    }).catch((err) => {
      console.log("Create session error!")
      console.log(err)
    })
  };

  const AddAiChat = async () => {
    if (!isLoading) {
      setIsLoading(true);
      // setText("");
      await onClick(); // API
      setIsLoading(false);
    }
  };

  return (
      <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* 標題 */}
        <div className='pt-8 pb-4 font-medium text-lg'>撰寫日記 - {formattedDate}</div>
        
        {/* 輸入框 */}
        <TextArea
          showCount
          maxLength={300}
          style={{
            width: 800,
            height: 200,
            marginBottom: 18,
          }}
          onChange={ (e) => setText(e.target.value)}
          placeholder="今天發生了什麼呢？"
        />
        <div className="justify-between items-start self-center flex w-[228px] max-w-full gap-5 mt-12 mb-20 px-5">
          <Link to={`/AiFeedback/${sessionId}/${user.id}/${text}`}>
            <div className="self-stretch flex flex-col w-[89px]">
              <button className="text-pink-100 font-semibold rounded-lg bg-orange-600/95  hover:bg-amber-600 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-600/75" style={{ height: '40px' }}>
                AI聊聊
              </button>
            </div>
          </Link>
              <div className="self-stretch flex flex-col w-[89px]">
                  <button onClick={() => createSession(user)} className="text-pink-100 font-semibold rounded-lg bg-orange-600/95  hover:bg-amber-600 active:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-600/75" style={{ height: '40px'}}>
                      儲存
                  </button>
              
              </div>
          </div>

        
      </div>
    </Layout>
  );
}


