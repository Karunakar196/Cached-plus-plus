import {Component} from  "react";
import React from 'react';
import { Form,Table } from 'semantic-ui-react';
import './UploadComponent.css';
var requestify = require('requestify');

class UploadComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query : "",
            toSubmit : "", //query,
            timeUncached : "",
            resUncached : "",
            timeLRU : "",
            resLRU : "",
            timeFIFO : "",
            resFIFO : "",
            timeR : "",
            resR : ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateDisplayUC = this.updateDisplayUC.bind(this);

    }






    //  handleChange =(e, { query, value }) => {
    //     console.log("h");
    //      this.setState({[query]: value})
    // };

    async handleChange (e,query, value ) {
        // console.log(e.target.value);

        await this.setState({query: e.target.value});
    // await this.setState({query: query.value});
    //     console.log(e);
    //     console.log(query.value);
    //     var st = query.value;
    //
    //     await this.setState({query: st});
    //     console.log(query);
    //     console.log(st);


        await this.setState({toSubmit: query.value});
        // console.log(this.state.toSubmit);




    };

    async updateDisplayUC (t,time_uc) {
        await this.setState({resUncached : t,timeUncached :time_uc })
    };

    async updateDisplayfifo (t_fifo,time_fifo) {
        await this.setState({resFIFO : t_fifo,timeFIFO :time_fifo })
    };

    async updateDisplaylru (t_lru,time_lru) {
        await this.setState({resLRU : t_lru,timeLRU :time_lru })
    };

    async updateDisplayr (t_r,time_r) {
        await this.setState({resR : t_r,timeR :time_r })
    };
    handleSubmit = () => {
        const { toSubmit } = this.state;
        console.log("submitting " + this.state.toSubmit);

        // this.setState({ query: query.value });
        // console.log(query);

        // toSubmit = toSubmit.toString();






//https://cors.io/?

        var that = this;



        //------LRU------

        var start_time_lru = new Date().getTime();


        requestify.get('http://127.0.0.1:5050/cached/query/lru/'+ toSubmit.toString()).then(
            // requestify.get('http://192.17.100.193:5050/uncached/query/'+ toSubmit.toString()).then(
            function(response) {
                var time_lru = (new Date().getTime() - start_time_lru)/1000;
                response.getBody();
                // var t =  response.body.substr(1,83);
                var t_lru =  response.body.substr(1,20);
                that.updateDisplaylru(t_lru,time_lru);
            }).catch( function (e){
            console.log("ERROR NO RESPONSE DUE TO ---" + e);
        });



        // --------FIFO-----------

        var start_time_fifo = new Date().getTime();


        requestify.get('http://127.0.0.1:5050/cached/query/fifo/'+ toSubmit.toString()).then(
            // requestify.get('http://192.17.100.193:5050/uncached/query/'+ toSubmit.toString()).then(
            function(response) {
                var time_fifo = (new Date().getTime() - start_time_fifo)/1000;
                response.getBody();
                // var t =  response.body.substr(1,83);
                var t_fifo =  response.body.substr(1,20);
                that.updateDisplayfifo(t_fifo,time_fifo);
            }).catch( function (e){
            console.log("ERROR NO RESPONSE DUE TO ---" + e);
        });




        // --------------Random---------

        var start_time_random = new Date().getTime();


        requestify.get('http://127.0.0.1:5050/cached/query/random/'+ toSubmit.toString()).then(
            // requestify.get('http://192.17.100.193:5050/uncached/query/'+ toSubmit.toString()).then(
            function(response) {
                var time_r = (new Date().getTime() - start_time_random)/1000;
                response.getBody();
                // var t =  response.body.substr(1,83);
                var t_r =  response.body.substr(1,20);
                that.updateDisplayr(t_r,time_r);
            }).catch( function (e){
            console.log("ERROR NO RESPONSE DUE TO ---" + e);
        });



        // ----------------UNCACHED---------------

        var start_time_uc = new Date().getTime();


        requestify.get('http://127.0.0.1:5050/uncached/query/'+ toSubmit.toString()).then(
            // requestify.get('http://192.17.100.193:5050/uncached/query/'+ toSubmit.toString()).then(
            function(response) {
                var time_uc = (new Date().getTime() - start_time_uc)/1000;
                response.getBody();
                // var t =  response.body.substr(1,83);
                var t =  response.body.substr(1,20);
                that.updateDisplayUC(t,time_uc);
            }).catch( function (e){
            console.log("ERROR NO RESPONSE DUE TO ---" + e);
        });

        // requestify.request('http://192.17.100.193:5050/uncached/query/'+ toSubmit.toString(),
        //     method: 'GET',
        //     headers : {
        //
        // }).then(function (response){
        //     response.getBody();
        // } {
        //
        // })




    };




    render() {
        const { query  } = this.state;

        return (
            <div className="Upload" >
                <span className="Title">     Cached++    </span>
                    <Form className = "FormNow" onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Group>
                            <Form.Input
                                className = 'Input_1'
                                placeholder='Query'
                                name='query'
                                value={query}
                                onChange={this.handleChange.bind(this)}
                                style={{ width: "500px", fontSize : "x-large" }}
                            />
                            <Form.Button className="ButtonClass" content='Submit' />
                        </Form.Group>
                    </Form>

                <div>

                    <Table  className = 'ResultsTable'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell className = 'HeaderCellCustomize'>Type</Table.HeaderCell>
                                <Table.HeaderCell className = 'HeaderCellCustomize'>Result</Table.HeaderCell>
                                <Table.HeaderCell className = 'HeaderCellCustomize'>Time(Secs)</Table.HeaderCell>
                                <Table.HeaderCell className = 'HeaderCellCustomize'>Faster(%)</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell className = "col1">UnCached</Table.Cell>
                                <Table.Cell  className = "col2">{this.state.resUncached}</Table.Cell>
                                <Table.Cell className = "col3">{this.state.timeUncached}</Table.Cell>
                                <Table.Cell className = "col4"> </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell  className = "col1">LRU</Table.Cell>
                                <Table.Cell  className = "col2">{this.state.resLRU}</Table.Cell>
                                <Table.Cell className = "col3">{this.state.timeLRU}</Table.Cell>
                                <Table.Cell className = "col4">{ (this.state.timeUncached !== "" ) ?  (((this.state.timeLRU-this.state.timeUncached)/(this.state.timeUncached))*(-100)).toFixed(3) : " "        }</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell className = "col1">FIFO</Table.Cell>
                                <Table.Cell  className = "col2">{this.state.resFIFO}</Table.Cell>
                                <Table.Cell className = "col3">{this.state.timeFIFO}</Table.Cell>
                                <Table.Cell className = "col4">{  (this.state.timeUncached !== "" ) ?   (((this.state.timeFIFO-this.state.timeUncached)/(this.state.timeUncached))*(-100)).toFixed(3) : " "   }</Table.Cell>

                            </Table.Row>
                            <Table.Row>
                                <Table.Cell  className = "col1" >Random</Table.Cell>
                                <Table.Cell  className = "col2">{this.state.resR}</Table.Cell>
                                <Table.Cell className = "col3">{this.state.timeR}</Table.Cell>
                                <Table.Cell className = "col4">{  (this.state.timeUncached !== "" ) ?   (((this.state.timeR-this.state.timeUncached)/(this.state.timeUncached))*(-100)).toFixed(3) : " "   }</Table.Cell>

                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>

        );
    }


}

export default UploadComponent;