'use client';
import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { getUserGenerations } from '@/lib/leonardo';

type Props = {};

const useGenerations = () => {
  const { user } = useAuth();
  const [generations, setGenerations] = React.useState([]);

  React.useEffect(() => {
    if (!user) {
      return;
    }
    getUserGenerations({ userId: user.id });
  }, [user?.id]);

  return {
    generations,
  };
};

const GenerationHeader = (props) => {

}

const Gallery = (props: Props) => {
  const { generations } = useGenerations();
  return <div>Gallery</div>;
};

export default Gallery;
