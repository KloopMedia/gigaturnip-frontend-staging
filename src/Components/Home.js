import Graph from "react-graph-vis";
import React, { useEffect, useState } from "react";
import firebase from '../util/Firebase'
import {
  useHistory
} from "react-router-dom";

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
  }
};

function randomColor() {
  const red = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const green = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  const blue = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
  return `#${red}${green}${blue}`;
}

const Home = () => {
  const history = useHistory();
  const [nodeId, setNodeId] = useState()
  const [nodeTitle, setNodeTitle] = useState()
  const [selectedNode, setSelectedNode] = useState()
  const [selectedEdge, setSelectedEdge] = useState()
  const [graph, setGraph] = useState({
    nodes: [
      { id: 'start', label: "Start", color: "#e04141" }
    ],
    edges: []
  })
  const [events, setEvents] = useState({
    doubleClick: ({ nodes, edges }) => {
      if (nodes[0]) {
        history.push('/createStage/' + nodes[0])
      }
      else if (edges[0]) {
        history.push('/createRelation/' + edges[0])
      }
    },
    selectNode: ({ nodes, edges }) => {
      setSelectedNode(nodes[0])
    },
    deselectNode: ({ nodes, edges }) => {
      setSelectedNode(null)
    },
    selectEdge: ({ nodes, edges }) => {
      console.log('edge')
      console.log("Selected edges:");
      console.log(edges);
      setSelectedEdge(edges[0])
    }
  })

  const createNode = (id, label, from) => {
    const color = randomColor();
    setGraph(({ nodes, edges }) => {
      const x = 30
      const y = 30
      const edge = from + '-->' + id
      firebase.firestore().collection('stage').doc(id).set({
        title: label,
        color: color
      }, { merge: true })
      firebase.firestore().collection('relations').doc(edge).set({
        to: id, from: from
      })

      return ({
        nodes: [
          ...nodes,
          { id, label, color, x, y }
        ],
        edges: [
          ...edges,
          { from, to: id, id: edge }
        ]
      })
    });
  }

  useEffect(() => {
    firebase.firestore().collection('stage').get().then((snap) => {
      let nodes = []
      snap.forEach(doc => {
        let data = doc.data()
        nodes.push({ id: doc.id, label: data.title, color: data.color })
      })
      return nodes
    }).then((nodes) => {
      firebase.firestore().collection('relations').get().then((snap) => {
        let edges = []
        snap.forEach(doc => {
          let data = doc.data()
          edges.push({ to: data.to, from: data.from, id: doc.id})
        })
        if (nodes.length > 0) {
          setGraph({ nodes: nodes, edges: edges })
        }
      })
    })
  }, [])

  const handleIdChange = (e) => {
    setNodeId(e.target.value)
  }

  const handleTitleChange = (e) => {
    setNodeTitle(e.target.value)
  }

  return (
    <div style={{ padding: 10 }}>
      id: <input onChange={handleIdChange} />
      <br />
      title: <input onChange={handleTitleChange} />
      <br />
      <button disabled={!selectedNode} onClick={() => createNode(nodeId, nodeTitle, selectedNode)}>createNode</button>
      <Graph graph={graph} options={options} events={events} style={{ height: "640px" }} />
    </div>
  );

}

export default Home