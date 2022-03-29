import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';

import ThoughtList from '../components/ThoughtList';

const Home = () => {
  // make a query request via useQuery
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // ? = if data exists, store it in the thoughts const, otherwise return an empty array
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed fpr Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
