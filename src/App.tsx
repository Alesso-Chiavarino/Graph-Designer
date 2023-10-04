import './App.css';
import { Graphviz } from 'graphviz-react';
import React, { useState } from 'react';

const App = () => {

  type NodeName = {
    [index: number]: string
  }

  const [numNodes, setNumNodes] = useState(0);
  const [nodeNames, setNodeNames] = useState<NodeName>({});
  const [isShowForm, setisShowForm] = useState(true)

  const handleNumNodes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumNodes(e.target.valueAsNumber);
  }

  const handleNodes = (e: React.ChangeEvent<HTMLInputElement>, nodeIndex: number) => {
    setNodeNames({
      ...nodeNames,
      [nodeIndex]: e.target.value
    });
  }

  const handleShowForm = () => {
    setisShowForm(!isShowForm);
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
  for (let i = 0; i < numNodes; i++) {
    dotString += `${nodeNames[i]} [label="${nodeNames[i]}"];`;
  }
  dotString += '}';

  return (
    <div className='flex justify-between'>
      <div className='w-[20%]'>
        <button onClick={handleShowForm} className='bg-green-400 px-4 py-2 rounded-md'>Form</button>
        {isShowForm && (
          <form className='flex flex-col gap-5'>
            <div className='flex flex-col gap-2'>
              <label htmlFor="numNodes">Número de nodos</label>
              <input onChange={handleNumNodes} className='text-black' type="number" name="numNodes" id="numNodes" />
            </div>
            {mapNodesForm()}
            <button className='bg-red-400 px-4 py-2 rounded-md'>Dibujar</button>
          </form>
        )}
      </div>
      <div className='w-[80%]'>
        <Graphviz dot={dotString} />
      </div>
    </div>
  );
}

export default App;
