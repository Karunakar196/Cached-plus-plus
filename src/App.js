import React, { Component } from 'react';
import './App.css';
import UploadComponent from './uploadComponent/UploadComponent';
// var pg = require('pg');

var conString = "postgres://postgres:admin196@localhost:5432/postgres";

// var client = new pg.Client(conString);
// client.connect();

var d=0;



class App extends Component {
    // super();
    // constructor(){
    //     this.state = {
    //         d:0
    //     };
    //     // this.hitQuery()= this.hitQuery.bind(this);
    // }


    hitQuery(){
        console.log(d);
        d=1;
        // console.log("Successful");
        // console.log(d);

    }

  render() {
    return (
      <div className="App">
          <div className="CardContainer">
              <UploadComponent />
          </div>
          <div>

          </div>

      </div>


//      /*   <header className="App-header">
//             <div >
//             <p className= "main-header"> Cached++ </p>
//             </div>
//
//                 <div>
//
//             <p> A Distributed Database Object Cache System  </p>
//                 <p> DB : </p>*/
//           {/*<p>*/}
//           {/*</p>*/}
//
//           {/*<p> Test </p>*/}
//
//            /* <Button
//
//                 onClick={this.hitQuery()}
//
//             > Query
//
//
//             </Button>
//
//             </div>
// <div>
//     <p>    </p>
// </div>
//             <div>
//                 <p>  </p>
//             </div>
//



    );
  }
}

export default App;
