// Spinner.js
import React from 'react';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
`;

const Spinner = () => {
  return (
    <div>
      <ClipLoader color="rgba(209, 107, 30)" loading={true} css={override} size={50} />
    </div>
  );
};

export default Spinner;
