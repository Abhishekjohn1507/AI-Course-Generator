import ReactPlayer from 'react-player';
import ReactMarkdown from 'react-markdown'
import YouTube from 'react-youtube';
const opts = {
  height: '720',
  width: '1080',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};
function ChapterContent({ chapter, content }) {
console.log(chapter)

  // Construct the YouTube URL dynamically using the video ID
//   const videoUrl = content?.videoId ? `https://www.youtube.com/watch?v=${content?.videoId}` : null;
// console.log(content);
  return (
    <div>
      <div className='p-10'>
        {/* Chapter title and description */}
        <h2 className='font-bold text-3xl'>{chapter?.chapterName}</h2>
        <h2 className='text-gray-400'>{chapter?.about}</h2>

        {/* Render YouTube video player dynamically */}
<div className='flex justify-center my-6'>{content?.videoId?(<YouTube 
videoId={content?.videoId}
opts={opts}/>):(
  <p> Video is Not Available </p>
)}</div>


        {/* <div className='flex justify-center my-6' >
        {videoUrl ? (
          <ReactPlayer  url={videoUrl} width="1000px" height="600px" controls  />
        ) : (
          <p>No video available for this chapter.</p>
        )}

        </div> */}

        <div>
{content?.content?.map((item,index)=>(
  <div className='p-5 bg-slate-50 mb-3 rounded-lg'>
    <h2 className='font-bold text-lg'>{item.title}</h2>
    <p className='text-gray-500'>{item.description}</p>

    <div className='my-3'>
      <h2 className='font-bold'>Explantion</h2>
    <p className='text-gray-400'>{item.explanation}</p>
    </div>

    <div className='my-3'>
    
    <ReactMarkdown>{item.in_details}</ReactMarkdown>
    </div>

    {item.code&&<div className='my-3 p-3 bg-black text-white'>
      <h2 className='font-bold'>CODE</h2>
      <pre>
      <p className='text-gray-400'>{item.code}</p>
      </pre>
   
    </div>}

    


    </div>
))}
        </div>
        

        {/* Additional content */}
      </div>
    </div>
  );
}

export default ChapterContent;
