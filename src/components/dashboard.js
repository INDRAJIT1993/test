import React, { Component,} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class BrowseList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data_status: false,
            data: [],
            currentCount: 1
        }
        this.readmore = this.readmore.bind(this);



        // var userid = localStorage.getItem('usertoken');
        // if (userid === '') {//owner//sdl//investor
        //     setTimeout(function () { window.location.href = '/' }, 1000)
        // }

        axios.get(`https://reqres.in/api/users?page=${this.state.currentCount}`).then(response => {
            this.setState({
                data: response.data.data,
                data_status: true
            });
        }).catch(error => {
            toast('some error occurred', {
                position: toast.POSITION.BOTTOM_CENTER
            });

        })
    }  

    Next(){
        var { currentCount} = this.state;
        console.log("currentCount", currentCount);
        var next = currentCount+1;
        this.setState(
            (prevState) => ({ currentCount: next }),
            () => { this.getNext(next)  }
        );
    }

    Back(){
        var { currentCount} = this.state;
        if (currentCount>1){
            var pri = currentCount-1
            this.setState(
                (prevState) => ({ currentCount: pri}),
                () => { this.getNext(pri) }
            );
       
    }
}

    getNext(count){
        console.log("g",count);
        axios.get(`https://reqres.in/api/users?page=${count}`).then(response => {
            console.log('yyyyy', response.data.data);
            this.setState({
                data: response.data.data
            });
        }).catch(error => {
            console.log('err', error);
            toast('some error occurred', {
                position: toast.POSITION.BOTTOM_CENTER
            })
        
    })

}

    readmore(id){
    console.log('q',id);
    window.location.href = `/Users/${id}`
}




    render() {
        const { data, currentCount, data_status } = this.state;
        return (
            <div>

                {
                    data != null && data_status  ?

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Avatar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, i)=> {
                                        return (
                                            <tr onClick={() => this.readmore(item.id)}>
                                                <td >{item.id}</td>
                                                <td >{item.first_name}</td>
                                                <td >{item.last_name}</td>
                                                <td >{item.email}</td>
                                                <td ><img src={item.avatar} alt="" width={50} height={50}></img></td>
                                            </tr>
                                        )
                                    })

                                }
                            </tbody>
                            <thead>
                                <tr>
                                    <th><button onClick={()=>this.Back(currentCount)}>Previous</button></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th><button onClick={()=>this.Next(currentCount)} >Next</button></th>
                                </tr>
                            </thead>
                        </Table>
                        :
                        <h1>Loading</h1>
                }
            </div>
        )
    }
}
export default BrowseList