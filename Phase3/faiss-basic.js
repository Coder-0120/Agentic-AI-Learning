import faiss from "faiss-node";
const { IndexFlatL2 } = faiss;
const index = new IndexFlatL2(3);
console.log(index.ntotal()); // 0  means No vectors stored

//Adding Vectors
index.add([1, 2, 3]);     // Vector 0
index.add([2, 3, 4]);     // Vector 1
index.add([10, 20, 30]);  // Vector 2
console.log(index.ntotal()); // 3 means 3 vectors stored

// Search for vectors that are most similar to: [1, 2, 3] and return the top 2 matches.
const result =index.search([1,2,3],2);
console.log(result);