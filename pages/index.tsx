import React, {FunctionComponent} from 'react';
import {css} from '@emotion/core';
import {Button, Divider, Input, Box} from '@chakra-ui/core';
import fetch from 'isomorphic-fetch';

const wrapper = css`
  padding: 25px;
  text-align: center;
`;

const LandingPage: FunctionComponent<{}> = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
    };

    const response = await fetch('http://localhost:3030/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log(data);
  };
  return (
    <div css={wrapper}>
      <h1>Welcome to my dope app</h1>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' />
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch('http://localhost:3030/api/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  console.log(data);
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default LandingPage;

// const HomePage: FunctionComponent<{}> = () => {
//   return (
//     <div css={wrapper}>
//       <div css={loginWrapper}>
//         <div css={loginTop}>
//           <Button w="100%" borderRadius="lg">
//             Register
//           </Button>
//         </div>
//         <Divider w="100%" m="12" />
//         <div css={loginBottom}>
//           <Box w="100%">
//             <Input mb="2" placeholder="Username" css={inputStyling} />
//             <Input placeholder="Password" css={inputStyling} />
//           </Box>
//           <Button w="100%" borderRadius="lg" bg="#03BA9B" color="white">
//             Sign In
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
// const flexCenter = css`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const wrapper = css`
//   ${flexCenter}
//   width: 100%;
//   height: 100vh;
//   background: linear-gradient(#404471, #292b46);
// `;

// const loginWrapper = css`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   flex-direction: column;
//   width: 400px;
//   height: auto;
//   padding: 50px;
//   background-color: #5d5f98;
//   border-radius: 30px;
//   h1 {
//     display: block;
//   }
// `;

// const loginTop = css`
//   width: 100%;
// `;

// const loginBottom = css`
//   width: 100%;
//   height: 150px;
//   display: flex;
//   align-items: center;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const inputStyling = css`
//   background: #404471;
//   border: none;
// `;
