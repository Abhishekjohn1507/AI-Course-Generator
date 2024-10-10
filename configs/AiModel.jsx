/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
   export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate A Course Tutorial on Following Detail With field Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, Level: Basic , Duration:1 hours, NoOfChapters: 5, in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"courseName\": \"Python Programming for Beginners\",\n  \"description\": \"This course will introduce you to the fundamental concepts of Python programming. Learn how to write, execute, and debug simple Python programs, covering topics like variables, data types, operators, control flow, functions, and more.\",\n  \"chapters\": [\n    {\n      \"chapterName\": \"Introduction to Python\",\n      \"about\": \"This chapter will introduce you to the world of Python programming, covering its history, key features, and why it's a popular choice for beginners and experienced programmers alike.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"chapterName\": \"Variables and Data Types\",\n      \"about\": \"Learn how to store and manipulate data in Python using variables, understanding different data types such as integers, floats, strings, and booleans.\",\n      \"duration\": \"25 minutes\"\n    },\n    {\n      \"chapterName\": \"Operators and Expressions\",\n      \"about\": \"Explore different types of operators in Python, including arithmetic, comparison, logical, and assignment operators, and learn how to construct expressions.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Control Flow Statements\",\n      \"about\": \"Discover how to control the execution flow of your Python code using conditional statements (if, else, elif) and loops (for, while).\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapterName\": \"Functions and Modules\",\n      \"about\": \"Learn to create reusable blocks of code using functions and explore the concept of modules, allowing you to organize and import code from external libraries.\",\n      \"duration\": \"15 minutes\"\n    }\n  ],\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Basic\",\n  \"duration\": \"1 hour\",\n  \"noOfChapters\": 5\n}\n```\n"},
          ],
        },
      ],
    });
  
   export const GenerateChapterContent_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Explain the concept in Details on Topic:DJ Music, Chapter:Beatmatching and Mixing Techniques, in JSON Format with list of array with field as title, description, in details,explanation on given chapter in detail, Code Example( Code field in <precode> format) if applicable "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"title\": \"Beatmatching\",\n    \"description\": \"The fundamental skill of aligning the beats of two tracks to create a seamless transition.\",\n    \"in_details\": \"Beatmatching involves manipulating the tempo of one track to match the tempo of another. This is achieved by adjusting the pitch of the track using a DJ mixer's pitch fader or a digital DJ software's tempo control. By carefully adjusting the pitch and timing, DJs can create a smooth and continuous flow of music.\",\n    \"explanation\": \"Beatmatching is essential for creating seamless transitions between tracks, avoiding jarring jumps in the music and maintaining the groove. It involves two key steps:\\n\\n1. **Tempo Matching:** Identifying the BPM (Beats Per Minute) of both tracks and adjusting the tempo of one to match the other. This can be done by ear or using a BPM counter.\\n2. **Phase Alignment:** Ensuring that the beats of both tracks are aligned in time. This involves adjusting the pitch and using beat cues to synchronize the tracks.\\n\\nBeatmatching can be achieved using various techniques, including:\\n\\n* **Manual Pitch Fading:** Adjusting the pitch fader on a DJ mixer to manipulate the tempo of one track to match the other.\\n* **Digital Tempo Control:** Using software or hardware to adjust the tempo of a track electronically.\\n* **Beat Grids:** Using software to analyze the track and automatically generate beat grids for precise beatmatching.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Mixing Techniques\",\n    \"description\": \"The art of blending two or more tracks together to create a cohesive and engaging musical experience.\",\n    \"in_details\": \"Mixing involves transitioning between tracks smoothly and effectively, using various techniques to create a dynamic and exciting soundscape. DJs employ a range of mixing techniques to achieve different effects, including:\\n\\n* **Crossfading:** Gradually fading out one track while simultaneously fading in another, creating a seamless transition.\\n* **Equalizer (EQ) Shaping:** Adjusting the frequency spectrum of tracks to create a balanced mix and avoid clashing frequencies.\\n* **Filter Effects:** Using filters to remove or emphasize specific frequencies, adding sonic interest and texture.\\n* **Cue Points:** Using specific points in a track to trigger transitions, effects, or build tension.\\n* **Beat Juggling:** Manipulating the beat of a track using techniques like scratching and beatmatching to create rhythmic patterns.\",\n    \"explanation\": \"Mixing techniques are crucial for creating a compelling and engaging musical experience. They allow DJs to manipulate the sonic landscape, build tension, create drops, and seamlessly transition between tracks.\\n\\nEffective mixing requires a deep understanding of musical structure, tempo, rhythm, and the dynamics of sound. It also involves the ability to use various mixing techniques creatively and effectively.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Common Mixing Techniques\",\n    \"description\": \"A list of popular mixing techniques used by DJs to create dynamic and engaging transitions.\",\n    \"in_details\": \"Here are some of the most common mixing techniques:\",\n    \"explanation\": \"These are just a few examples of the many mixing techniques DJs use to create dynamic and engaging transitions.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Crossfading\",\n    \"description\": \"A gradual transition between two tracks by fading out one while fading in the other.\",\n    \"in_details\": \"This is a basic but essential mixing technique. DJs use crossfading to create seamless transitions between tracks and maintain the flow of music. It involves adjusting the volume faders on a DJ mixer to fade out one track while simultaneously fading in another.\",\n    \"explanation\": \"Crossfading can be used for various purposes, such as:\\n\\n* **Smooth transitions:** Creating seamless transitions between tracks with similar tempos and styles.\\n* **Building tension:** Gradually fading out a track to build anticipation before introducing a new track with a different vibe.\\n* **Creating a blend:** Blending two tracks with different tempos or styles, creating a unique sonic experience.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Equalizer (EQ) Shaping\",\n    \"description\": \"Adjusting the frequency spectrum of tracks to create a balanced mix and avoid clashing frequencies.\",\n    \"in_details\": \"EQ shaping allows DJs to manipulate the sound of tracks by adjusting the levels of different frequency ranges (bass, midrange, treble). This can be used to:\\n\\n* **Clean up the mix:** Reduce frequencies that clash with other tracks, creating a clearer and more balanced sound.\\n* **Enhance specific frequencies:** Emphasize certain frequencies to add warmth, clarity, or punch.\\n* **Create sonic interest:** Experiment with EQ filters to create unique sonic textures and effects.\",\n    \"explanation\": \"EQ shaping is an essential tool for creating professional-sounding mixes. DJs can use it to create a balanced and dynamic soundscape while avoiding frequency clashes and unwanted noise.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Filter Effects\",\n    \"description\": \"Using filters to remove or emphasize specific frequencies, adding sonic interest and texture.\",\n    \"in_details\": \"DJs use filters to manipulate the frequency spectrum of tracks in real-time, creating interesting sonic effects. This can be done by using high-pass filters to remove low frequencies, low-pass filters to remove high frequencies, or band-pass filters to isolate specific frequency ranges.\",\n    \"explanation\": \"Filter effects can be used for various purposes, such as:\\n\\n* **Creating builds and drops:** Gradually filtering in or out frequencies to create dramatic tension or release.\\n* **Adding texture:** Filtering out frequencies to create a sense of space or atmosphere.\\n* **Transforming the sound:** Completely changing the character of a track by manipulating its frequency spectrum.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Cue Points\",\n    \"description\": \"Specific points in a track that DJs can trigger to start, stop, or effect the track.\",\n    \"in_details\": \"Cue points are predefined points within a track that DJs can use to trigger specific actions, such as:\\n\\n* **Starting a track:** Cueing up the beginning of a track to ensure a smooth transition.\\n* **Creating drops:** Triggering a specific part of a track, such as a breakdown or intro.\\n* **Adding effects:** Using cue points to trigger effects at specific moments in a track.\",\n    \"explanation\": \"Cue points are an essential tool for DJs, allowing them to control the flow of music and create dynamic and engaging mixes. They provide DJs with a level of precision and control that is difficult to achieve without using them.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Beat Juggling\",\n    \"description\": \"Manipulating the beat of a track using techniques like scratching and beatmatching to create rhythmic patterns.\",\n    \"in_details\": \"Beat juggling is a technique used by DJs to manipulate the beat of a track to create rhythmic patterns and grooves. This often involves using scratching, beatmatching, and other creative techniques to create a unique and dynamic soundscape.\",\n    \"explanation\": \"Beat juggling is a highly skilled technique that requires practice and creativity. It can be used to create a variety of effects, from subtle rhythmic variations to complex and intricate patterns.\",\n    \"code\": \"\"\n  }\n]\n```"},
          ],
        },
      ],
    });
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
  