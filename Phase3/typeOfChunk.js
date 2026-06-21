const text = `
React is a JavaScript library for building user interfaces.
It uses components to create reusable UI elements.
The Virtual DOM improves rendering performance.
State allows components to manage dynamic data.
Props are used to pass data between components.
`;
// 1. Fixed Chunking 
function fixedChunk(text,chunksize=50){
    const chunks=[];
    for(let i=0;i<text.length;i+=chunksize){
        chunks.push(text.slice(i,chunksize+i));
    }
    return chunks;
}
// console.log(fixedChunk(text,50)); /// calling fixed chunk 

// 2. Fixed Chunking with Overlap
function fixedChunkwithOverlap(text,chunksize=50,overlap=10){
    const chunks=[];
    for(let i=0;i<text.length;i+=chunksize-overlap){
        chunks.push(text.slice(i,i+chunksize));
    }
    return  chunks;
}
// console.log(fixedChunkwithOverlap(text,50,10)); /// calling fixed chunk with overlap

// 3. Sentence-Based Chunking
function sentenceChunk(text) {
  return text
    .split(".")
    .map(chunk => chunk.trim())
    .filter(Boolean);
}

// console.log(sentenceChunk(text)); /// calling sentenceChunk 

// 4. Paragraph Chunking

const notes = `
React is a JavaScript library.

Node.js runs JavaScript outside the browser.

MongoDB is a NoSQL database.
`;

const chunks = notes
  .split("\n\n")
  .filter(Boolean);

console.log(chunks);