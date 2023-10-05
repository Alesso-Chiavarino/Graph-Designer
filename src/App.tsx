import './App.css';
import { Graphviz } from 'graphviz-react';
import React, { useState } from 'react';

const App = () => {

  type NodeName = {
    [index: number]: string
  }

  const [numNodes, setNumNodes] = useState(0);
  const [nodeNames, setNodeNames] = useState<NodeName>({});

  const adjacencyMatrix = [
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ];

  const handleNumNodes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumNodes(e.target.valueAsNumber);
  }

  const handleNodes = (e: React.ChangeEvent<HTMLInputElement>, nodeIndex: number) => {
    setNodeNames({
      ...nodeNames,
      [nodeIndex]: e.target.value
    });
  }

  const mapNodesForm = () => {
    const nodesForm = [];
    for (let i = 0; i < numNodes; i++) {
      nodesForm.push(
        <div key={i}>
          <hr />
          <div className='flex flex-col gap-2'>
            <label htmlFor={`node${i}`}>Nombre del nodo {i + 1}</label>
            <input onChange={(e) => handleNodes(e, i)} className='text-black' type="text" name={`node${i}`} id={`node${i}`} />
          </div>
        </div>
      );
    }
    return nodesForm;
  }

  // Construir la cadena DOT a partir de la matriz de adyacencia
  let dotString = 'digraph {';
  for (let i = 0; i < adjacencyMatrix.length; i++) {
    for (let j = 0; j < adjacencyMatrix[i].length; j++) {
      if (adjacencyMatrix[i][j] === 1) {
        const sourceNodeName = nodeNames[i] || String.fromCharCode(97 + i);
        const targetNodeName = nodeNames[j] || String.fromCharCode(97 + j);
        dotString += ` ${sourceNodeName} -> ${targetNodeName};`;
      }
    }
  }
  dotString += '}';

  return (
    <div className='flex'>
      <div className='w-[50%]'>
        <form className='flex flex-col gap-5'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="numNodes">Número de NODOS</label>
            <input onChange={handleNumNodes} className='text-black' type="number" name="numNodes" id="numNodes" />
          </div>
          {mapNodesForm()}
          <button className='bg-red-400 px-4 py-2 rounded-md'>Dibujar</button>
        </form>
      </div>
      <div className='w-[50%]'>
        <Graphviz dot={dotString} />
      </div>
    </div>
  );
}

export default App;
