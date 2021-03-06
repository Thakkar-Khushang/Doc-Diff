import React, { useRef, useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { DiffEditor } from "@monaco-editor/react";
import arr from "./array.js";
import { Container, Row, Col} from 'react-bootstrap';
const useStyles = makeStyles({
  root: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
});

function App() {
  const dbArr = ["TestArrMyFirstDatabaseblabla","akjgbaljgnkalgnMyFirstDatabase"];
  const classes = useStyles();
  const diffEditorRef = useRef(null);
  const [expanded, setExpanded] = React.useState([]);
  var [uri, setUri] = useState("");
  var [name, setName] = useState("Choose a file");
  var [code,setCode] = useState("Paste Code Here");
  var [layout, setLayout] = useState(true);

  useEffect(() => {
    setCode("Paste Code here");
  }, [code]);

  function handleEditorMount(editor) {
    diffEditorRef.current = editor;
  }

  function generator(){
    name = document.getElementById("dbname");
    var rand = Math.floor((Math.random() * 2));
    setUri("Your DB URI: " + dbArr[rand].replace("MyFirstDatabase", name.value));
  }

  function changeLayout1() {
    setLayout(false);
  }

  function changeLayout2() {
    setLayout(true);
  }

  function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    if(nodeIds==="0"){
      setCode("Resetter");
    }
    if(!isLetter(nodeIds)){
      setName(arr[nodeIds]);
    }
  };

  return (
    <>
      <Container fluid style={{backgroundColor: "rgb(22,22,22)", color: "white", paddingBottom: "30px"}}>
        <Row style={{paddingBottom: "20px", paddingTop: "15px"}}>
          <Col sm={4} style={{display: "flex", alignItems: "center"}}>
            <a href="https://istevit.in"><img src="iste-icon.png" alt="" style={{width: "69px"}}></img></a>
          </Col>
          <Col sm={4} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <h1 onClick={changeLayout2} style={layout ? {color: "white"} : {color: "#524f4f"}}>Doc Diff</h1>
            <h1> / </h1>
            <h1 onClick={changeLayout1} style={layout ? {color: "#524f4f"} : {color: "white"}}>Randomizer</h1>
          </Col>
          <Col sm={4} style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
            <a href="https://horizon.istevit.in"><img src="horizon-logo.png" alt="" style={{width: "65px"}}></img></a>
          </Col>
        </Row>
      {layout ? 
        <Row id="maincontainer">
          <Col sm={2} className="pt-3">
            <h5 style={{fontFamily: "Source Sans Pro"}}>File Explorer</h5>
              <TreeView
          className={classes.root}
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          expanded={expanded}
          onNodeToggle={handleToggle}
          onNodeSelect={handleSelect}
        >
          <TreeItem nodeId="0" label="Reset"/>
          <TreeItem nodeId="a" label="Frontend">
            <TreeItem nodeId="b" label="Components">
                <TreeItem nodeId="1" label="HOC.jsx" />
                <TreeItem nodeId="2" label="Home.jsx" />
                <TreeItem nodeId="c" label="MusicPlayer">
                  <TreeItem nodeId="3" label="MusicPlayer.jsx"/>
                  <TreeItem nodeId="4" label="MusicPlayer.scss"/>
                </TreeItem>
                <TreeItem nodeId="5" label="Search.jsx"/>  
            </TreeItem>
            <TreeItem nodeId="6" label="App.jsx"/>  
            <TreeItem nodeId="7" label="App.scss"/>
            <TreeItem nodeId="8" label="colors.scss"/>
          </TreeItem>
          <TreeItem nodeId="d" label="Backend">
            <TreeItem nodeId="e" label="models">
              <TreeItem nodeId="9" label="song.js"/>
            </TreeItem>
            <TreeItem nodeId="f" label="routes">
              <TreeItem nodeId="10" label="api.js"/>
            </TreeItem>
            <TreeItem nodeId="11" label="index.js"/>
          </TreeItem>
        </TreeView>
          
          </Col>
          <Col>
            <DiffEditor            
              height="80vh"
              defaultLanguage="javascript"
              original={name}
              modified={code}
              onMount={handleEditorMount}
              theme='vs-dark'
            />
            </Col>
          </Row>
      :
      <div class="container">
            <h4 class="mb-5">VITians put your registration number<br></br>Non-VITians put your college ID <br></br>Feel free to contact us on our <a href="https://discord.gg/zbmMUJfxRU">discord server</a></h4>
            <input type="text" id="dbname" class="mt-5"/>
            <button type="button" class="btn btn-light mt-3 mb-5" onClick={generator}>Submit</button>
            <h1>{uri}</h1>
          </div>
      }
            </Container>
    </>
  );
}

export default App;
