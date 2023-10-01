'use client';
import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { getUserGenerations } from '@/lib/leonardo';
import {
  GeneratedImage,
  Generation,
  GenerationStatus,
  Generations,
  UserID,
} from '@/lib/types';
import { getModelByID } from '@/lib/utils';
import { useGenerationContext } from './GenerationContext';

const useGenerations = () => {
  const { user } = useAuth();
  const [generations, setGenerations] = React.useState<Generations>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGenerating, seIsGenerating] = React.useState<boolean>(false);
  const generation = useGenerationContext();

  const fetchGenerations = async (userId: UserID) => {
    setIsLoading(true);
    const gens = await getUserGenerations({ userId });
    if (!gens.length) {
      return;
    }
    setGenerations(gens);
    if (gens[0].status === GenerationStatus.PENDING) {
      seIsGenerating(true);
    } else {
      seIsGenerating(false);
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    if (!user) {
      return;
    }
    fetchGenerations(user.id);
  }, [user?.id, generation.isLoading]);

  return {
    generations,
    isLoading: !generations.length && isLoading,
    isUpdating: isLoading,
    isGenerating,
  };
};

const GenerationHeader = ({ prompt }: Omit<Generation, 'generated_images'>) => {
  return (
    <div className="flex flex-col w-60">
      <div className="">
        <p className="text-[12px] text-ellipsis h-60 overflow-hidden text-white">
          {prompt}
        </p>
      </div>
    </div>
  );
};

type ImageModalType = {
  src: string;
  onClose: () => void;
};

const ImageModal = ({ src, onClose }: ImageModalType) => {
  return (
    <div
      id="extralarge-modal"
      tabIndex={-1}
      className={`fixed top-0 left-0 right-0 h-[95vh] z-50 ${
        !src ? 'hidden' : ''
      } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative w-full max-w-7xl max-h-full">
        <div className="relative bg-gray-900 rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-medium  text-white">Image Preview</h3>
            <button
              onClick={onClose}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="extralarge-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-1 space-y-6 max-h-[70%]">
            <img
              src={src}
              alt="generation"
              loading="eager"
              className="object-contain max-w-[80vw] max-h-[80vh] m-auto"
            />
          </div>
          <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"></div>
        </div>
      </div>
    </div>
  );
};

type GenerationImagesProp = {
  generatedImages: Array<GeneratedImage>;
  isGenerating: boolean;
  onImageClick: (src: string) => () => void;
};
const GenerationImages = ({
  generatedImages,
  isGenerating,
  onImageClick,
}: GenerationImagesProp) => {
  const fakeId = React.useId();
  const cards = isGenerating
    ? Array(4)
        .fill({ id: fakeId, url: '' })
        .map((obj, ind) => ({ ...obj, id: obj.id + ind }))
    : generatedImages;
  return (
    <div className="flex flex-row flex-wrap flex-1 justify-end gap-2">
      {cards.map((img) => {
        return (
          <div
            className="max-h-50 max-w-[30%] w-[22%] flex-shrink rounded overflow-hidden"
            key={img.id}
          >
            {img.url ? (
              <div>
                <img
                  src={img.url}
                  className="object-contain h-full "
                  loading="lazy"
                  onClick={onImageClick(img.url)}
                />
              </div>
            ) : (
              <div className="w-[200px] h-[160px] max-w-[98%] bg-gray-800 flex justify-center items-center text-gray-50  text-sm">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const HeadTag = ({ name, value }: { name?: string; value?: string }) => {
  return (
    <div className="p-1">
      {name ? <span className="text-blue-400 mr-1">{name}</span> : null}
      {value ? <span>{value}</span> : null}
    </div>
  );
};

const Gallery = () => {
  const { generations, isLoading, isGenerating } = useGenerations();
  const [popupSrc, setPopupSrc] = React.useState('');

  const closePopup = () => {
    setPopupSrc('');
  };

  const openPopup = (src: string) => () => {
    setPopupSrc(src);
  };

  if (isLoading) {
    return <div>Loading generations...</div>;
  }
  return (
    <div className="flex flex-col max-h-full">
      <ImageModal src={popupSrc} onClose={closePopup} />
      {generations.map((gen, ind) => {
        const isGen = isGenerating && ind === 0;
        return (
          <div
            key={gen.id}
            className="flex flex-col bg-gray-600 my-2 rounded-md overflow-hidden"
          >
            <div className="bg-gray-700 text-[8px] text-white mb-1 flex flex-row justify-start gap-2">
              <HeadTag name={getModelByID(gen.modelId)} />
              <HeadTag name="SEED" value={gen?.seed?.toString() || 'Pending'} />
              <HeadTag name="ID" value={gen.id} />
              <HeadTag
                name="Size"
                value={`${gen.imageWidth} x ${gen.imageHeight}`}
              />
              <HeadTag value={gen.status} />
            </div>
            <div className="flex flex-row mb-4 background p-2">
              <GenerationHeader {...gen} />
              <GenerationImages
                generatedImages={gen.generated_images}
                isGenerating={isGen}
                onImageClick={openPopup}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Gallery;
