import './App.css';
import { Graphviz } from 'graphviz-react';
import React, { useState } from 'react';

const App = () => {

  // type NodeName = {
  //   [index: number]: string
  // }

  const [nodes, setNodes] = useState([]);
  const [nodeName, setNodeName] = useState('')
  // const [nodeNames, setNodeNames] = useState<NodeName>({});
  const [isShowForm, setisShowForm] = useState(true)

  const handleNodes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(e.target.value);
  }

  const handleShowForm = () => {
    setisShowForm(!isShowForm);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNodes([...nodes, { name: nodeName }]);
    setNodeName('');
  }

  // Construir la cadena DOT a partir de la matriz de adyacencia
  let dotString = 'digraph {';
  for (let i = 0; i < nodes.length; i++) {
    dotString += `${nodes[i].name};`;
  }
  dotString += '}';

  return (
    <div className='flex justify-between'>
      <div className='w-[20%]'>
        <button onClick={handleShowForm} className='bg-green-400 px-4 py-2 rounded-md'>Form</button>
        {isShowForm && (
          <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
              <label htmlFor="numNodes">Nombre del nodo</label>
              <input onChange={handleNodes} value={nodeName} className='text-black' name="numNodes" id="numNodes" />
            </div>
            <button className='bg-red-400 px-4 py-2 rounded-md'>Añadir</button>
          </form>
        )}
        <div>
          <h5>Nodos</h5>
          <div>
            {nodes.length > 0 && nodes.map((node, index) => (
              <div key={index} className='border-2 rounded-md border-red-400 w-fit'>
                <span>{node.name}</span>
              </div>
            ))} 
          </div>
        </div>
      </div>
      <div className='w-[80%]'>
        {/* <Graphviz dot={dotString} /> */}
      </div>
    </div>
  );
}

export default App;
